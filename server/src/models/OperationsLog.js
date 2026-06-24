import mongoose from 'mongoose';

const operationsLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    action: { type: String, required: true },
    target: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: { createdAt: 'timestamp', updatedAt: false } }
);

export const OperationsLog = mongoose.model('OperationsLog', operationsLogSchema);
