"use client";

import { useEffect, useState } from 'react';
import SectionCard from './SectionCard';

const emptyForm = { id: '', name: '', address: '' };

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export default function BranchesClient() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    setLoading(true);
    const res = await fetch('/api/branches');
    const data = await readJson(res);
    if (res.ok && data.ok) {
      setItems(data.data || []);
      setMessage('');
    } else {
      setItems([]);
      setMessage(data.message || 'Failed to load stores');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setMessage('Store name is required');
    const res = await fetch('/api/branches', {
      method: form.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await readJson(res);
    if (!res.ok || !data.ok) return setMessage(data.message || 'Unable to save store');
    setMessage('Store saved');
    setForm(emptyForm);
    loadItems();
  };

  const remove = async (id) => {
    const res = await fetch(`/api/branches?id=${id}`, { method: 'DELETE' });
    const data = await readJson(res);
    if (!res.ok || !data.ok) return setMessage(data.message || 'Unable to delete store');
    setMessage('Store deleted');
    loadItems();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <SectionCard title="Add / Edit Store">
        <form className="space-y-3" onSubmit={save}>
          <input
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Store name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            className="w-full rounded-xl border px-3 py-2"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          {message ? <div className="rounded-xl bg-slate-100 px-3 py-2 text-sm">{message}</div> : null}
          <button className="rounded-full bg-slate-900 px-4 py-2 text-white">Save</button>
        </form>
      </SectionCard>

      <SectionCard title="Stores">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item._id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-slate-500">{item.address}</div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-full border px-3 py-1 text-sm"
                    onClick={() => setForm({ id: item._id, name: item.name, address: item.address || '' })}
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
