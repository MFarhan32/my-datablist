import { List } from '../models/List.js';
import { DataRecord } from '../models/DataRecord.js';
import { AppError } from '../middleware/errorHandler.js';
import { parseCsvStream } from '../utils/csvParser.js';
import { constants } from '../config/constants.js';

export const uploadCsv = async (req, res, next) => {
  try {
    const { listId } = req.params;
    if (!req.file) throw new AppError(400, 'CSV file is required');
    const list = await List.findOne({ _id: listId, ownerId: req.user.userId });
    if (!list) throw new AppError(404, 'List not found');

    const rows = await parseCsvStream(req.file.stream, constants.maxUploadRows);
    if (!rows.length) throw new AppError(400, 'CSV is empty');

    const docs = rows.map((data) => ({ listId, data }));
    await DataRecord.insertMany(docs);
    list.recordCount += rows.length;
    list.columns = [...new Set([...list.columns, ...Object.keys(rows[0] || {})])];
    await list.save();
    req.io?.to(req.user.userId).emit('record:bulk_created', { listId, count: rows.length });

    res.status(201).json({ imported: rows.length, columns: list.columns });
  } catch (error) {
    next(error);
  }
};
