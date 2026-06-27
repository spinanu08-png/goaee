import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Dashboard' },
  { href: '/stores', label: 'Stores' },
  { href: '/categories', label: 'Categories' },
  { href: '/products', label: 'Products' },
  { href: '/stock-check', label: 'Stock Check' },
  { href: '/buy-list', label: 'Buy List' },
  { href: '/history', label: 'History' }
];

export default function Shell({ title, subtitle, actions, children }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#f8fafc_26%,#ffffff_100%)]">
      <header className="print-hide border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">Inventory</div>
            <h1 className="text-xl font-bold text-slate-900">Stock Count App</h1>
          </div>
          <div className="flex flex-wrap gap-2">{actions}</div>
        </div>
        <nav className="mx-auto max-w-7xl overflow-x-auto px-4 pb-4 lg:px-8">
          <div className="flex min-w-max gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:text-sky-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <section className="mb-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft print-card">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-sky-700">{subtitle}</p>
              <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
            </div>
          </div>
        </section>
        {children}
      </main>
    </div>
  );
}
