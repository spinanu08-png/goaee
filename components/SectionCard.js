export default function SectionCard({ title, children, className = '' }) {
  return (
    <section className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-soft print-card ${className}`}>
      <h3 className="mb-4 text-lg font-semibold text-slate-900">{title}</h3>
      {children}
    </section>
  );
}
