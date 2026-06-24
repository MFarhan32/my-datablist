import mongoose from 'mongoose';

const listSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    recordCount: { type: Number, default: 0 },
    columns: { type: [String], default: [] },
  },
  { timestamps: true }
);

listSchema.index({ ownerId: 1, title: 1 });

export const List = mongoose.model('List', listSchema);
