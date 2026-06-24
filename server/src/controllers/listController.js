import { List } from '../models/List.js';
import { DataRecord } from '../models/DataRecord.js';
import { OperationsLog } from '../models/OperationsLog.js';
import { AppError } from '../middleware/errorHandler.js';

export const getLists = async (req, res, next) => {
  try {
    const lists = await List.find({ ownerId: req.user.userId }).sort({ updatedAt: -1 });
    res.json(lists);
  } catch (error) {
    next(error);
  }
};

export const createList = async (req, res, next) => {
  try {
    const list = await List.create({ ...req.body, ownerId: req.user.userId });
    await OperationsLog.create({ userId: req.user.userId, action: 'create_list', target: `list:${list.id}` });
    req.io?.to(req.user.userId).emit('list:created', list);
    res.status(201).json(list);
  } catch (error) {
    next(error);
  }
};

export const updateList = async (req, res, next) => {
  try {
    const list = await List.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!list) throw new AppError(404, 'List not found');
    await OperationsLog.create({ userId: req.user.userId, action: 'update_list', target: `list:${list.id}` });
    req.io?.to(req.user.userId).emit('list:updated', list);
    res.json(list);
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (req, res, next) => {
  try {
    const list = await List.findOneAndDelete({ _id: req.params.id, ownerId: req.user.userId });
    if (!list) throw new AppError(404, 'List not found');
    await DataRecord.deleteMany({ listId: list.id });
    await OperationsLog.create({ userId: req.user.userId, action: 'delete_list', target: `list:${list.id}` });
    req.io?.to(req.user.userId).emit('list:deleted', { id: list.id });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
