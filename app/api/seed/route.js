import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Branch, Category, Product } from '../../../lib/models';

const TEMP_STORE_ID = '64f000000000000000000001';

export async function POST() {
  try {
    await connectToDatabase();
    const existingCategories = await Category.countDocuments({ storeId: TEMP_STORE_ID });
    if (existingCategories === 0) {
      const categories = await Category.insertMany([
        { storeId: TEMP_STORE_ID, name: 'Vegetables', sortOrder: 1, isActive: true },
        { storeId: TEMP_STORE_ID, name: 'Meat', sortOrder: 2, isActive: true },
        { storeId: TEMP_STORE_ID, name: 'Noodles', sortOrder: 3, isActive: true },
        { storeId: TEMP_STORE_ID, name: 'Drinks', sortOrder: 4, isActive: true },
        { storeId: TEMP_STORE_ID, name: 'Supplies', sortOrder: 5, isActive: true }
      ]);
      const map = Object.fromEntries(categories.map((category) => [category.name, category._id]));
      await Branch.create([
        { storeId: TEMP_STORE_ID, name: 'Main Branch', address: 'Bangkok' },
        { storeId: TEMP_STORE_ID, name: 'Second Branch', address: 'Bangkok' }
      ]);
      await Product.insertMany([
        { storeId: TEMP_STORE_ID, categoryId: map.Vegetables, name: 'Cabbage', unit: 'kg', minQty: 10, isActive: true },
        { storeId: TEMP_STORE_ID, categoryId: map.Vegetables, name: 'Onion', unit: 'kg', minQty: 8, isActive: true },
        { storeId: TEMP_STORE_ID, categoryId: map.Meat, name: 'Duck', unit: 'kg', minQty: 12, isActive: true },
        { storeId: TEMP_STORE_ID, categoryId: map.Meat, name: 'Chicken', unit: 'kg', minQty: 10, isActive: true },
        { storeId: TEMP_STORE_ID, categoryId: map.Noodles, name: 'Rice noodles', unit: 'pack', minQty: 20, isActive: true },
        { storeId: TEMP_STORE_ID, categoryId: map.Drinks, name: 'Water', unit: 'bottle', minQty: 10, isActive: true },
        { storeId: TEMP_STORE_ID, categoryId: map.Supplies, name: 'Plastic bag', unit: 'box', minQty: 5, isActive: true }
      ]);
    }

    return NextResponse.json({ ok: true, message: 'Sample data seeded successfully' });
  } catch {
    return NextResponse.json({ ok: false, message: 'Unable to seed sample data' }, { status: 500 });
  }
}
