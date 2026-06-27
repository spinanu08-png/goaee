import Shell from '../components/Shell';
import SectionCard from '../components/SectionCard';
import { connectToDatabase } from '../lib/mongodb';
import { Branch, Category, Product, StockCheck } from '../lib/models';

async function loadCounts() {
  try {
    await connectToDatabase();
    const [branches, categories, products, stockChecks] = await Promise.all([
      Branch.countDocuments(),
      Category.countDocuments(),
      Product.countDocuments(),
      StockCheck.countDocuments()
    ]);

    return { branches, categories, products, stockChecks };
  } catch {
    return { branches: 0, categories: 0, products: 0, stockChecks: 0 };
  }
}

export default async function HomePage() {
  const counts = await loadCounts();

  return (
    <Shell
      title="Stock Count App"
      subtitle="Simple inventory tracking for products, branches, categories, and stock checks."
      actions={<a className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white" href="/products">Open products</a>}
    >
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ['Products', counts.products],
          ['Categories', counts.categories],
          ['Branches', counts.branches],
          ['Stock checks', counts.stockChecks]
        ].map(([label, value]) => (
          <SectionCard key={label} title={label}>
            <div className="text-3xl font-semibold text-slate-900">{value}</div>
          </SectionCard>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Quick actions">
          <div className="flex flex-wrap gap-3">
            <a className="rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white" href="/products">Products</a>
            <a className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700" href="/categories">Categories</a>
            <a className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700" href="/stores">Branches</a>
            <a className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700" href="/stock-check">Stock check</a>
          </div>
        </SectionCard>

        <SectionCard title="Status">
          <p className="text-sm text-slate-600">
            MongoDB is wired for CRUD and stock records. Use the product page to seed sample data if the database is empty.
          </p>
        </SectionCard>
      </section>
    </Shell>
  );
}
