import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDatabase } from '../../../lib/mongodb';
import { Calculation } from '../../../lib/models';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const items = await Calculation.find({ email: session.user.email })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  return NextResponse.json({
    items: items.map((item) => ({
      id: item._id.toString(),
      expression: item.expression,
      result: item.result,
      createdAt: item.createdAt.toISOString()
    }))
  });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const expression = String(body.expression || '').trim();
  const result = String(body.result || '').trim();

  if (!expression || !result) {
    return NextResponse.json({ error: 'Missing expression or result' }, { status: 400 });
  }

  await connectToDatabase();
  const item = await Calculation.create({
    email: session.user.email,
    expression,
    result
  });

  return NextResponse.json({
    item: {
      id: item._id.toString(),
      expression: item.expression,
      result: item.result,
      createdAt: item.createdAt.toISOString()
    }
  });
}
