import mongoose from 'mongoose';

const baseOptions = {
  timestamps: true
};

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ownerId: { type: String, required: true, trim: true }
  },
  baseOptions
);

const branchSchema = new mongoose.Schema(
  {
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    name: { type: String, required: true, trim: true },
    address: { type: String, default: '', trim: true }
  },
  baseOptions
);

const categorySchema = new mongoose.Schema(
  {
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    name: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  baseOptions
);

const productSchema = new mongoose.Schema(
  {
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true, trim: true },
    unit: { type: String, default: 'ชิ้น', trim: true },
    minQty: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true }
  },
  baseOptions
);

const stockCheckSchema = new mongoose.Schema(
  {
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    checkDate: { type: Date, required: true },
    checkedBy: { type: String, default: 'temporary-user', trim: true },
    note: { type: String, default: '', trim: true }
  },
  baseOptions
);

const stockCheckItemSchema = new mongoose.Schema(
  {
    stockCheckId: { type: mongoose.Schema.Types.ObjectId, ref: 'StockCheck', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    productName: { type: String, required: true, trim: true },
    unit: { type: String, required: true, trim: true },
    remainingQty: { type: Number, default: 0, min: 0 },
    buyQty: { type: Number, default: 0, min: 0 },
    needBuy: { type: Boolean, default: false },
    purchased: { type: Boolean, default: false },
    note: { type: String, default: '', trim: true }
  },
  baseOptions
);

const calculationSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, index: true },
    expression: { type: String, required: true, trim: true },
    result: { type: String, required: true, trim: true }
  },
  baseOptions
);

export const Store = mongoose.models.Store || mongoose.model('Store', storeSchema);
export const Branch = mongoose.models.Branch || mongoose.model('Branch', branchSchema);
export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export const StockCheck = mongoose.models.StockCheck || mongoose.model('StockCheck', stockCheckSchema);
export const StockCheckItem =
  mongoose.models.StockCheckItem || mongoose.model('StockCheckItem', stockCheckItemSchema);
export const Calculation =
  mongoose.models.Calculation || mongoose.model('Calculation', calculationSchema);
