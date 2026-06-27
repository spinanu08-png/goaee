import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { connectToDatabase } from '../lib/mongodb';
import { Calculation } from '../lib/models';
import CalculatorClient from '../components/CalculatorClient';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  let recentCalculations = [];

  if (session?.user?.email) {
    await connectToDatabase();
    recentCalculations = await Calculation.find({ email: session.user.email })
      .sort({ createdAt: -1 })
      .limit(12)
      .lean();
  }

  return <CalculatorClient session={session} initialCalculations={recentCalculations.map((item) => ({
    id: item._id.toString(),
    expression: item.expression,
    result: item.result,
    createdAt: item.createdAt.toISOString()
  }))} />;
}
