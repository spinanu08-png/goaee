import Shell from '../components/Shell';
import SectionCard from '../components/SectionCard';
import { categories, products, stores } from '../lib/mockData';

const quickStats = [
  { label: 'Stores', value: stores.length },
  { label: 'Categories', value: categories.length },
  { label: 'Products', value: products.length }
];

export default function DashboardPage() {
  return (
    <Shell
      title="Dashboard"
      subtitle="Overview of the stock system"
      actions={null}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {quickStats.map((item) => (
          <SectionCard key={item.label} title={item.label}>
            <div className="text-4xl font-bold text-slate-900">{item.value}</div>
          </SectionCard>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="What you can do">
          <ul className="space-y-3 text-sm text-slate-700">
            <li>• Add and edit categories.</li>
            <li>• Add products with minimum stock levels.</li>
            <li>• Seed sample inventory into MongoDB.</li>
            <li>• Extend this into stock in/out history later.</li>
          </ul>
        </SectionCard>
        <SectionCard title="Current mode">
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            This version uses MongoDB-backed API routes for categories and products, with a temporary store id ready for Atlas.
          </div>
        </SectionCard>
      </div>
    </Shell>
  );
}
