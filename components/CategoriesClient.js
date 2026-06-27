"use client";

import { useEffect, useState } from 'react';
import SectionCard from './SectionCard';

const emptyForm = { id: '', name: '', sortOrder: 0, isActive: true };

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export default function CategoriesClient() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/categories');
    const data = await readJson(res);
    if (res.ok && data.ok) {
      setItems(data.data || []);
    } else {
      setItems([]);
      setMessage(data.message || 'Failed to load categories');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setMessage('Category name is required');
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/categories', {
      method: form.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await readJson(res);
    setSaving(false);
    if (!res.ok || !data.ok) {
      setMessage(data.message || 'Unable to save category');
      return;
    }
    setMessage('Category saved');
    setForm(emptyForm);
    loadItems();
  };

  const remove = async (id) => {
    const res = await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
    const data = await readJson(res);
    if (!res.ok || !data.ok) return setMessage(data.message || 'Unable to delete category');
    setMessage('Category deleted');
    loadItems();
  };

  const seed = async () => {
    const res = await fetch('/api/seed', { method: 'POST' });
    const data = await readJson(res);
    setMessage(data.message || (data.ok ? 'Sample data seeded' : 'Seed failed'));
    loadItems();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <SectionCard title="Add / Edit Category">
        <form className="space-y-3" onSubmit={save}>
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            placeholder="Category name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full rounded-xl border border-slate-200 px-3 py-2"
            type="number"
            placeholder="Sort order"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
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
            <button className="rounded-full bg-slate-900 px-4 py-2 text-white" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button className="rounded-full border px-4 py-2" type="button" onClick={seed}>
              Seed sample data
            </button>
            <button className="rounded-full border px-4 py-2" type="button" onClick={loadItems}>
              Refresh
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Categories">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-slate-500">Sort order: {item.sortOrder}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-full border px-3 py-1 text-sm"
                    onClick={() => setForm({ id: item._id, name: item.name, sortOrder: item.sortOrder || 0, isActive: item.isActive !== false })}
                  >
                    Edit
                  </button>
                  <button className="rounded-full border px-3 py-1 text-sm" onClick={() => remove(item._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
