"use client";

export default function PrintButtons() {
  const base = 'rounded-full px-4 py-2 text-sm font-semibold transition print-hide';
  return (
    <div className="flex flex-wrap gap-2">
      <button className={`${base} bg-slate-900 text-white hover:bg-slate-700`} onClick={() => window.print()}>
        พิมพ์รายการทั้งหมด
      </button>
      <button className={`${base} bg-emerald-600 text-white hover:bg-emerald-500`} onClick={() => window.print()}>
        พิมพ์เฉพาะรายการที่ต้องซื้อ
      </button>
      <button className={`${base} bg-amber-500 text-white hover:bg-amber-400`} onClick={() => window.print()}>
        พิมพ์เฉพาะรายการที่ยังไม่ได้ซื้อ
      </button>
    </div>
  );
}
