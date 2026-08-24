import { useState } from 'react';
import { submitSeed } from '../lib/community.js';

const EMPTY = { seed: '', edition: 'Java', version: '1.21.1', description: '', tags: '', x: '', y: '', z: '' };

export default function Submit() {
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(null);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const record = submitSeed({
      seed: form.seed,
      edition: form.edition,
      version: form.version,
      description: form.description,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      spawn: { x: Number(form.x) || 0, y: Number(form.y) || 0, z: Number(form.z) || 0 },
      screenshots: []
    });
    setSubmitted(record);
    setForm(EMPTY);
  }

  return (
    <div className="aurora-bg min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-2xl font-bold text-frost-50 sm:text-3xl">Submit a seed</h1>
        <p className="mt-1 text-sm text-white/50">
          No account required for this prototype. Submissions are held for review in this session — see README for how to wire this to real accounts and moderation.
        </p>

        {submitted && (
          <div className="mt-5 glass rounded-xl px-4 py-3 text-sm text-emerald-300">
            ✓ Submitted — "{submitted.seed}" is pending review (mock queue, not yet public).
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 shard-panel px-5 py-6 sm:px-6">
          <div>
            <label className="mb-1 block text-xs font-medium text-white/50">Seed number</label>
            <input required value={form.seed} onChange={(e) => update('seed', e.target.value)} className="glass w-full rounded-lg px-3 py-2.5 text-sm text-white/80 outline-none" placeholder="e.g. -8739184756123890" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-white/50">Edition</label>
              <select value={form.edition} onChange={(e) => update('edition', e.target.value)} className="glass w-full rounded-lg px-3 py-2.5 text-sm text-white/80 outline-none">
                <option>Java</option>
                <option>Bedrock</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-white/50">Version</label>
              <input value={form.version} onChange={(e) => update('version', e.target.value)} className="glass w-full rounded-lg px-3 py-2.5 text-sm text-white/80 outline-none" placeholder="1.21.1" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-white/50">Spawn X</label>
              <input value={form.x} onChange={(e) => update('x', e.target.value)} className="glass w-full rounded-lg px-3 py-2.5 text-sm text-white/80 outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-white/50">Spawn Y</label>
              <input value={form.y} onChange={(e) => update('y', e.target.value)} className="glass w-full rounded-lg px-3 py-2.5 text-sm text-white/80 outline-none" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-white/50">Spawn Z</label>
              <input value={form.z} onChange={(e) => update('z', e.target.value)} className="glass w-full rounded-lg px-3 py-2.5 text-sm text-white/80 outline-none" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-white/50">Description</label>
            <textarea required value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} className="glass w-full rounded-lg px-3 py-2.5 text-sm text-white/80 outline-none" placeholder="What makes this seed worth sharing?" />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-white/50">Tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => update('tags', e.target.value)} className="glass w-full rounded-lg px-3 py-2.5 text-sm text-white/80 outline-none" placeholder="snowy, mountains, aesthetic" />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-white/50">Screenshots</label>
            <div className="glass flex items-center justify-center rounded-lg px-3 py-6 text-xs text-white/35">
              File upload disabled in this prototype — connect real storage later (see README)
            </div>
          </div>

          <button type="submit" className="w-full rounded-lg bg-gradient-to-br from-frost-300 to-frost-500 py-3 text-sm font-semibold text-void">
            Submit for review
          </button>
        </form>
      </div>
    </div>
  );
}
