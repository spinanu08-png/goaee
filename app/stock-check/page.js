import Shell from '../../components/Shell';
import SectionCard from '../../components/SectionCard';
import { products } from '../../lib/mockData';

export default function StockCheckPage() {
  const lowStock = products.filter((item) => item.stock <= item.minStock);

  return (
    <Shell title="Stock Check" subtitle="Current items that need review">
      <SectionCard title="Items below minimum">
        <div className="space-y-3">
          {lowStock.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
              <div>
                <div className="font-semibold text-slate-900">{item.name}</div>
                <div className="text-sm text-slate-600">{item.category}</div>
              </div>
              <div className="text-sm font-semibold text-amber-700">Remaining {item.stock}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </Shell>
  );
}
