'use client';

import { signIn, signOut } from 'next-auth/react';
import { useMemo, useState } from 'react';

const keys = [
  '7',
  '8',
  '9',
  '/',
  '4',
  '5',
  '6',
  '*',
  '1',
  '2',
  '3',
  '-',
  '0',
  '.',
  '=',
  '+'
];

export default function CalculatorClient({ session, initialCalculations }) {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState(initialCalculations);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const signedIn = Boolean(session?.user?.email);

  const preview = useMemo(() => {
    if (display === '0') return 'Ready';
    return display;
  }, [display]);

  const applyInput = async (value) => {
    if (value === 'C') {
      setDisplay('0');
      setError('');
      return;
    }
    if (value === '=') {
      try {
        // Evaluate a calculator-only expression made from numbers and operators.
        const result = Function(`"use strict"; return (${display});`)();
        const nextValue = String(Number.isFinite(result) ? result : result);
        setDisplay(nextValue);
        setError('');
        if (signedIn) {
          const response = await fetch('/api/calculations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              expression: display,
              result: nextValue
            })
          });
          if (response.ok) {
            const data = await response.json();
            setHistory((current) => [data.item, ...current].slice(0, 12));
          }
        }
      } catch {
        setError('Invalid expression');
      }
      return;
    }

    setDisplay((current) => (current === '0' ? value : current + value));
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#1e293b,_#020617_60%)] px-4 py-8 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
        <section className="flex-1 rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl shadow-sky-950/40 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-sky-200/80">calculator</p>
              <h1 className="mt-2 text-4xl font-black tracking-tight">Gmail Login Calculator</h1>
              <p className="mt-3 max-w-xl text-sm text-slate-200">
                Sign in with Google, do quick calculations, and keep recent results in MongoDB.
              </p>
            </div>
            <button
              onClick={() => (signedIn ? signOut() : signIn('google'))}
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              {signedIn ? 'Sign out' : 'Sign in with Google'}
            </button>
          </div>

          <div className="mt-8 rounded-[1.75rem] bg-slate-950/80 p-5">
            <div className="flex min-h-24 items-end justify-end rounded-[1.25rem] bg-slate-900 px-5 py-4 text-right">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-400">{preview}</div>
                <div className="mt-2 text-4xl font-bold text-white">{display}</div>
              </div>
            </div>
            {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}

            <div className="mt-5 grid grid-cols-4 gap-3">
              {['C', ...keys].map((key) => (
                <button
                  key={key}
                  onClick={() => applyInput(key)}
                  className={`rounded-2xl px-4 py-4 text-lg font-semibold transition ${
                    key === '='
                      ? 'bg-sky-400 text-slate-950 hover:bg-sky-300'
                      : key === 'C'
                        ? 'bg-rose-400 text-slate-950 hover:bg-rose-300'
                        : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Account</h2>
            <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              {signedIn ? 'Connected' : 'Locked'}
            </span>
          </div>

          <div className="mt-4 rounded-2xl bg-white/5 p-4 text-sm text-slate-200">
            {signedIn ? (
              <>
                <div className="font-semibold text-white">{session.user?.name || 'Google user'}</div>
                <div className="mt-1 break-all text-slate-300">{session.user?.email}</div>
              </>
            ) : (
              'Login with Gmail to save calculation history to MongoDB.'
            )}
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent history</h3>
              {loading ? <span className="text-xs text-slate-400">Loading</span> : null}
            </div>
            <div className="mt-3 space-y-3">
              {history.length ? (
                history.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm text-slate-300">{item.expression}</div>
                    <div className="mt-1 text-2xl font-bold text-white">{item.result}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                  No saved calculations yet.
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
