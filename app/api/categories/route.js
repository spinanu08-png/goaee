import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Category } from '../../../lib/models';

const TEMP_STORE_ID = '64f000000000000000000001';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({ storeId: TEMP_STORE_ID }).sort({ sortOrder: 1, createdAt: -1 });
    return NextResponse.json({ ok: true, data: categories });
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Failed to load categories' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const name = (body.name || '').trim();
    if (!name) return NextResponse.json({ ok: false, message: 'Category name is required' }, { status: 400 });
    const category = await Category.create({
      storeId: TEMP_STORE_ID,
      name,
      sortOrder: Number(body.sortOrder || 0),
      isActive: body.isActive !== false
    });
    return NextResponse.json({ ok: true, data: category });
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Unable to save category' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    if (!body.id) return NextResponse.json({ ok: false, message: 'Missing category id' }, { status: 400 });
    const name = (body.name || '').trim();
    if (!name) return NextResponse.json({ ok: false, message: 'Category name is required' }, { status: 400 });
    const updated = await Category.findByIdAndUpdate(
      body.id,
      {
        name,
        sortOrder: Number(body.sortOrder || 0),
        isActive: body.isActive !== false
      },
      { new: true }
    );
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Unable to update category' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ ok: false, message: 'Missing category id' }, { status: 400 });
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Unable to delete category' }, { status: 500 });
  }
}
