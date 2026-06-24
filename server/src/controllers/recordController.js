import { Parser } from 'json2csv';
import { List } from '../models/List.js';
import { DataRecord } from '../models/DataRecord.js';
import { OperationsLog } from '../models/OperationsLog.js';
import { AppError } from '../middleware/errorHandler.js';
import { constants } from '../config/constants.js';
import { findDuplicates } from '../utils/deduplication.js';

const ensureListOwner = async (listId, userId) => {
  const list = await List.findOne({ _id: listId, ownerId: userId });
  if (!list) throw new AppError(404, 'List not found');
  return list;
};

export const getRecords = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { page = 1, limit = constants.defaultPageSize, search = '', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    await ensureListOwner(listId, req.user.userId);

    const query = { listId };
    if (search) query.$or = [{ 'data.name': { $regex: search, $options: 'i' } }, { 'data.email': { $regex: search, $options: 'i' } }];

    const records = await DataRecord.find(query)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await DataRecord.countDocuments(query);
    res.json({ records, page: Number(page), limit: Number(limit), total });
  } catch (error) {
    next(error);
  }
};

export const createRecord = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const list = await ensureListOwner(listId, req.user.userId);
    const record = await DataRecord.create({ listId, data: req.body.data || {} });
    list.recordCount += 1;
    list.columns = [...new Set([...list.columns, ...Object.keys(record.data || {})])];
    await list.save();
    await OperationsLog.create({ userId: req.user.userId, action: 'create_record', target: `record:${record.id}` });
    req.io?.to(req.user.userId).emit('record:created', record);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
};

export const updateRecord = async (req, res, next) => {
  try {
    const { listId, id } = req.params;
    await ensureListOwner(listId, req.user.userId);
    const record = await DataRecord.findOneAndUpdate({ _id: id, listId }, { data: req.body.data || {} }, { new: true });
    if (!record) throw new AppError(404, 'Record not found');
    await OperationsLog.create({ userId: req.user.userId, action: 'update_record', target: `record:${record.id}` });
    req.io?.to(req.user.userId).emit('record:updated', record);
    res.json(record);
  } catch (error) {
    next(error);
  }
};

export const deleteRecord = async (req, res, next) => {
  try {
    const { listId, id } = req.params;
    const list = await ensureListOwner(listId, req.user.userId);
    const record = await DataRecord.findOneAndDelete({ _id: id, listId });
    if (!record) throw new AppError(404, 'Record not found');
    list.recordCount = Math.max(0, list.recordCount - 1);
    await list.save();
    await OperationsLog.create({ userId: req.user.userId, action: 'delete_record', target: `record:${record.id}` });
    req.io?.to(req.user.userId).emit('record:deleted', { id });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const bulkDeleteRecords = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { ids = [] } = req.body;
    const list = await ensureListOwner(listId, req.user.userId);
    const result = await DataRecord.deleteMany({ listId, _id: { $in: ids } });
    list.recordCount = Math.max(0, list.recordCount - result.deletedCount);
    await list.save();
    req.io?.to(req.user.userId).emit('record:bulk_deleted', { ids });
    res.json({ deletedCount: result.deletedCount });
  } catch (error) {
    next(error);
  }
};

export const exportRecords = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { format = 'json' } = req.query;
    await ensureListOwner(listId, req.user.userId);
    const records = await DataRecord.find({ listId }).lean();
    const rows = records.map((r) => ({ id: r._id.toString(), ...r.data }));

    if (format === 'csv') {
      const parser = new Parser({ fields: rows.length ? Object.keys(rows[0]) : [] });
      const csv = parser.parse(rows);
      res.setHeader('Content-Type', 'text/csv');
      return res.send(csv);
    }

    return res.json(rows);
  } catch (error) {
    return next(error);
  }
};

export const detectDuplicates = async (req, res, next) => {
  try {
    const { listId } = req.params;
    const { keys = [] } = req.body;
    await ensureListOwner(listId, req.user.userId);
    const records = await DataRecord.find({ listId });
    const duplicates = findDuplicates(records, keys);
    res.json({ duplicates, count: duplicates.length });
  } catch (error) {
    next(error);
  }
};
