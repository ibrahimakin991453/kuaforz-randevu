import { useState } from "react";
import type { Staff } from "../../types";

interface StaffFormProps {
  initial?: Staff | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export function StaffForm({ initial, onSave, onCancel }: StaffFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [role, setRole] = useState(initial?.role || "");
  const [active, setActive] = useState(initial?.active ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("İsim gerekli");
      return;
    }
    if (!role.trim()) {
      setError("Rol gerekli");
      return;
    }

    setSaving(true);
    try {
      await onSave({ name: name.trim(), role: role.trim(), active });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kaydetme başarısız");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark-800 border border-dark-700 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">
        {initial ? "Personel Düzenle" : "Yeni Personel"}
      </h3>

      <div>
        <label className="block text-sm text-dark-200 mb-1">Ad Soyad</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent"
          placeholder="Personel adı"
        />
      </div>

      <div>
        <label className="block text-sm text-dark-200 mb-1">Rol / Unvan</label>
        <input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent"
          placeholder="Kuaför, Berber, Stilist"
        />
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
          className="w-4 h-4 rounded accent-accent"
        />
        <span className="text-sm text-dark-200">Aktif</span>
      </label>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-dark-700 hover:bg-dark-600 text-white rounded-lg text-sm transition-colors"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
