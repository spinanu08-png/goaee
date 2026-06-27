"use client";

import { useEffect, useState } from 'react';
import SectionCard from './SectionCard';

const emptyForm = { id: '', name: '', categoryId: '', unit: 'ชิ้น', minQty: 0, isActive: true };

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export default function ProductsClient() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [sourceError, setSourceError] = useState('');

  const loadAll = async () => {
    setLoading(true);
    setMessage('');
    setSourceError('');
    const [productResponse, categoryResponse] = await Promise.all([fetch('/api/products'), fetch('/api/categories')]);
    const productData = await readJson(productResponse);
    const categoryData = await readJson(categoryResponse);

    if (productResponse.ok && productData.ok) {
      setItems(productData.data || []);
    } else {
      setItems([]);
      setSourceError(productData.message || 'Failed to load products');
    }

    if (categoryResponse.ok && categoryData.ok) {
      setCategories(categoryData.data || []);
    } else {
      setCategories([]);
      setSourceError((prev) => `${prev}${prev ? ' | ' : ''}${categoryData.message || 'Failed to load categories'}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setMessage('Product name is required');
    if (!form.categoryId) return setMessage('Choose a category');
    if (Number(form.minQty) < 0) return setMessage('minQty must be zero or higher');

    const res = await fetch('/api/products', {
      method: form.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await readJson(res);

    if (!res.ok || !data.ok) {
      setMessage(data.message || 'Unable to save product');
      return;
    }

    setMessage('Product saved');
    setForm(emptyForm);
    loadAll();
  };

  const remove = async (id) => {
    const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    const data = await readJson(res);
    if (!res.ok || !data.ok) return setMessage(data.message || 'Unable to delete product');
    setMessage('Product deleted');
    loadAll();
  };

  const seed = async () => {
    const res = await fetch('/api/seed', { method: 'POST' });
    const data = await readJson(res);
    setMessage(data.message || (data.ok ? 'Sample data seeded' : 'Seed failed'));
    loadAll();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <SectionCard title="Add / Edit Product">
        <form className="space-y-3" onSubmit={save}>
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <select
            className="w-full rounded-xl border px-3 py-2"
            value={form.categoryId}
            onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
          >
            <option value="">Choose category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Unit"
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          />
          <input
            className="w-full rounded-xl border px-3 py-2"
            type="number"
            min="0"
            placeholder="minQty"
            value={form.minQty}
            onChange={(e) => setForm({ ...form, minQty: Number(e.target.value) })}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
            />
            Active
          </label>
          {message ? <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm">{message}</div> : null}
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-slate-900 px-4 py-2 text-white">Save</button>
            <button className="rounded-full border px-4 py-2" type="button" onClick={seed}>
              Seed sample data
            </button>
            <button className="rounded-full border px-4 py-2" type="button" onClick={loadAll}>
              Refresh
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Products">
        {loading ? (
          <div>Loading...</div>
        ) : sourceError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">{sourceError}</div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            No products in MongoDB yet. Click “Seed sample data” or add a new product.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500">
                <tr>
                  <th className="py-3">Product</th>
                  <th>Unit</th>
                  <th>minQty</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id} className="border-t border-slate-100">
                    <td className="py-3 font-medium">{item.name}</td>
                    <td>{item.unit}</td>
                    <td>{item.minQty}</td>
                    <td>{item.isActive ? 'Active' : 'Inactive'}</td>
                    <td className="space-x-2">
                      <button
                        className="rounded-full border px-3 py-1"
                        onClick={() =>
                          setForm({
                            id: item._id,
                            name: item.name,
                            categoryId: item.categoryId?._id || item.categoryId,
                            unit: item.unit,
                            minQty: item.minQty,
                            isActive: item.isActive !== false
                          })
                        }
                      >
                        Edit
                      </button>
                      <button className="rounded-full border px-3 py-1" onClick={() => remove(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
