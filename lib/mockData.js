export const stores = [
  { id: 'st-1', name: 'สาขาอโศก', code: 'ASK-01', status: 'เปิดอยู่' },
  { id: 'st-2', name: 'สาขาพระราม 9', code: 'PR9-02', status: 'เปิดอยู่' }
];

export const categories = [
  { id: 'cat-1', name: 'เครื่องดื่ม', count: 12 },
  { id: 'cat-2', name: 'ขนมขบเคี้ยว', count: 9 },
  { id: 'cat-3', name: 'ของใช้ในบ้าน', count: 7 }
];

export const products = [
  { id: 'p-1', name: 'ชาเขียว 250ml', sku: 'DRK-001', category: 'เครื่องดื่ม', stock: 18, minStock: 24, purchased: false },
  { id: 'p-2', name: 'กาแฟดำ 3-in-1', sku: 'DRK-002', category: 'เครื่องดื่ม', stock: 41, minStock: 20, purchased: true },
  { id: 'p-3', name: 'มันฝรั่งทอด', sku: 'SNK-114', category: 'ขนมขบเคี้ยว', stock: 6, minStock: 18, purchased: false },
  { id: 'p-4', name: 'น้ำยาล้างจาน', sku: 'HOU-208', category: 'ของใช้ในบ้าน', stock: 13, minStock: 10, purchased: true },
  { id: 'p-5', name: 'ทิชชู่ม้วนใหญ่', sku: 'HOU-209', category: 'ของใช้ในบ้าน', stock: 3, minStock: 12, purchased: false }
];

export const history = [
  { id: 'h-1', action: 'เพิ่มสินค้า', detail: 'เพิ่มชาเขียว 250ml เข้าคลัง', date: '27 มิ.ย. 2569 09:20' },
  { id: 'h-2', action: 'แก้สต๊อก', detail: 'ปรับสินค้ามันฝรั่งทอดเป็น 6 ชิ้น', date: '27 มิ.ย. 2569 10:05' },
  { id: 'h-3', action: 'ปิดรายการซื้อ', detail: 'ปิดสถานะน้ำยาล้างจาน', date: '27 มิ.ย. 2569 11:30' }
];
