import Shell from '../../components/Shell';
import SectionCard from '../../components/SectionCard';
import { history } from '../../lib/mockData';

export default function HistoryPage() {
  return (
    <Shell title="History" subtitle="Recent activity and change log">
      <SectionCard title="Latest events">
        <div className="space-y-4">
          {history.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div className="font-semibold text-slate-900">{item.action}</div>
                <div className="text-sm text-slate-500">{item.date}</div>
              </div>
              <div className="text-sm text-slate-600">{item.detail}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </Shell>
  );
}
