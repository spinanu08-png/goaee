import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Product } from '../../../lib/models';

const TEMP_STORE_ID = '64f000000000000000000001';

function getErrorMessage(error, fallback) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({ storeId: TEMP_STORE_ID }).sort({ createdAt: -1 });
    return NextResponse.json({ ok: true, data: products });
  } catch (error) {
    console.error('GET /api/products failed:', error);
    return NextResponse.json({ ok: false, message: getErrorMessage(error, 'Failed to load products') }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const name = (body.name || '').trim();
    if (!name) return NextResponse.json({ ok: false, message: 'Product name is required' }, { status: 400 });
    if (!body.categoryId) return NextResponse.json({ ok: false, message: 'Category is required' }, { status: 400 });
    const minQty = Number(body.minQty || 0);
    if (Number.isNaN(minQty) || minQty < 0) return NextResponse.json({ ok: false, message: 'minQty must be 0 or higher' }, { status: 400 });
    const product = await Product.create({
      storeId: TEMP_STORE_ID,
      categoryId: body.categoryId,
      name,
      unit: (body.unit || 'ชิ้น').trim(),
      minQty,
      isActive: body.isActive !== false
    });
    return NextResponse.json({ ok: true, data: product });
  } catch (error) {
    console.error('POST /api/products failed:', error);
    return NextResponse.json({ ok: false, message: getErrorMessage(error, 'Unable to save product') }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    if (!body.id) return NextResponse.json({ ok: false, message: 'Missing product id' }, { status: 400 });
    const name = (body.name || '').trim();
    if (!name) return NextResponse.json({ ok: false, message: 'Product name is required' }, { status: 400 });
    if (!body.categoryId) return NextResponse.json({ ok: false, message: 'Category is required' }, { status: 400 });
    const minQty = Number(body.minQty || 0);
    if (Number.isNaN(minQty) || minQty < 0) return NextResponse.json({ ok: false, message: 'minQty must be 0 or higher' }, { status: 400 });
    const updated = await Product.findByIdAndUpdate(
      body.id,
      {
        categoryId: body.categoryId,
        name,
        unit: (body.unit || 'ชิ้น').trim(),
        minQty,
        isActive: body.isActive !== false
      },
      { new: true }
    );
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    console.error('PUT /api/products failed:', error);
    return NextResponse.json({ ok: false, message: getErrorMessage(error, 'Unable to update product') }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ ok: false, message: 'Missing product id' }, { status: 400 });
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/products failed:', error);
    return NextResponse.json({ ok: false, message: getErrorMessage(error, 'Unable to delete product') }, { status: 500 });
  }
}
