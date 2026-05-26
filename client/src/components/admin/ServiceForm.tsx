import { useState } from "react";
import type { Service } from "../../types";

const CATEGORIES = ["Kesim", "Boyama", "Bakım", "Diğer"];

interface ServiceFormProps {
  initial?: Service | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export function ServiceForm({ initial, onSave, onCancel }: ServiceFormProps) {
  const [name, setName] = useState(initial?.name || "");
  const [durationMinutes, setDurationMinutes] = useState(
    String(initial?.durationMinutes || 30)
  );
  const [price, setPrice] = useState(String(initial?.price || ""));
  const [category, setCategory] = useState(initial?.category || "Kesim");
  const [active, setActive] = useState(initial?.active ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const duration = parseInt(durationMinutes, 10);
    const priceNum = parseFloat(price);

    if (!name.trim()) { setError("Hizmet adı gerekli"); return; }
    if (isNaN(duration) || duration < 15 || duration > 180) {
      setError("Süre 15-180 dakika arasında olmalıdır");
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0 || priceNum > 10000) {
      setError("Geçerli bir fiyat giriniz");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        durationMinutes: duration,
        price: priceNum,
        category,
        active,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kaydetme başarısız");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark-800 border border-dark-700 rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">
        {initial ? "Hizmet Düzenle" : "Yeni Hizmet"}
      </h3>

      <div>
        <label className="block text-sm text-dark-200 mb-1">Hizmet Adı</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent"
          placeholder="Saç Kesimi"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-dark-200 mb-1">Süre (dk)</label>
          <input
            type="number"
            min={15}
            max={180}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm text-dark-200 mb-1">Fiyat (₺)</label>
          <input
            type="number"
            min={0}
            max={10000}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-dark-200 mb-1">Kategori</label>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                category === cat
                  ? "bg-accent text-white"
                  : "bg-dark-700 text-dark-300 hover:bg-dark-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
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
