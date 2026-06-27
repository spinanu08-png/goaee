import mongoose from 'mongoose';

const baseOptions = {
  timestamps: true
};

const calculationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, index: true },
    expression: { type: String, required: true, trim: true },
    result: { type: String, required: true, trim: true }
  },
  baseOptions
);

export const Calculation =
  mongoose.models.Calculation || mongoose.model('Calculation', calculationSchema);
