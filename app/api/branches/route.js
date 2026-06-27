import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { Branch } from '../../../lib/models';

const TEMP_STORE_ID = '64f000000000000000000001';

export async function GET() {
  try {
    await connectToDatabase();
    const branches = await Branch.find({ storeId: TEMP_STORE_ID }).sort({ createdAt: -1 });
    return NextResponse.json({ ok: true, data: branches });
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Failed to load stores' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const name = (body.name || '').trim();
    if (!name) return NextResponse.json({ ok: false, message: 'Store name is required' }, { status: 400 });
    const branch = await Branch.create({
      storeId: TEMP_STORE_ID,
      name,
      address: (body.address || '').trim()
    });
    return NextResponse.json({ ok: true, data: branch });
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Unable to save store' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    if (!body.id) return NextResponse.json({ ok: false, message: 'Missing store id' }, { status: 400 });
    const name = (body.name || '').trim();
    if (!name) return NextResponse.json({ ok: false, message: 'Store name is required' }, { status: 400 });
    const updated = await Branch.findByIdAndUpdate(
      body.id,
      {
        name,
        address: (body.address || '').trim()
      },
      { new: true }
    );
    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Unable to update store' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return NextResponse.json({ ok: false, message: 'Missing store id' }, { status: 400 });
    await Branch.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, message: 'Unable to delete store' }, { status: 500 });
  }
}
