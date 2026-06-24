import mongoose from 'mongoose';

const dataRecordSchema = new mongoose.Schema(
  {
    listId: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true, index: true },
    data: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

dataRecordSchema.index({ listId: 1, createdAt: -1 });

export const DataRecord = mongoose.model('DataRecord', dataRecordSchema);
