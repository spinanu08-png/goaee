import Shell from '../../components/Shell';
import SectionCard from '../../components/SectionCard';
import PrintButtons from '../../components/PrintButtons';
import { products } from '../../lib/mockData';

const needBuy = products.filter((item) => item.stock <= item.minStock);
const notBought = needBuy.filter((item) => !item.purchased);

export default function BuyListPage() {
  return (
    <Shell
      title="รายการต้องซื้อ"
      subtitle="สรุปรายการสำหรับพิมพ์และใช้งานหน้าร้าน"
      actions={<PrintButtons />}
    >
      <SectionCard title="ตัวกรองรายการ">
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium">ทั้งหมด {products.length}</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">ต้องซื้อ {needBuy.length}</span>
          <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700">ยังไม่ได้ซื้อ {notBought.length}</span>
        </div>
      </SectionCard>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <SectionCard title="รายการทั้งหมด">
          <ul className="space-y-3">
            {products.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>{item.name}</span>
                <span className="text-sm text-slate-500">{item.stock}/{item.minStock}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="รายการที่ต้องซื้อ">
          <ul className="space-y-3">
            {needBuy.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>{item.name}</span>
                <span className="text-sm text-slate-500">{item.purchased ? 'ซื้อแล้ว' : 'ยังไม่ได้ซื้อ'}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
      <div className="mt-6">
        <SectionCard title="รายการที่ยังไม่ได้ซื้อ">
          <ul className="space-y-3">
            {notBought.map((item) => (
              <li key={item.id} className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>{item.name}</span>
                <span className="text-sm text-slate-500">รอจัดซื้อ</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </Shell>
  );
}
