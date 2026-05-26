import { useState } from "react";

interface CustomerFormProps {
  initial: { customerName: string; customerPhone: string; notes: string };
  onSubmit: (data: { customerName: string; customerPhone: string; notes: string }) => void;
  onBack: () => void;
}

export function CustomerForm({ initial, onSubmit, onBack }: CustomerFormProps) {
  const [name, setName] = useState(initial.customerName);
  const [phone, setPhone] = useState(initial.customerPhone);
  const [notes, setNotes] = useState(initial.notes);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = "İsim en az 2 karakter olmalıdır";
    }
    const phoneRegex = /^(\+90|0)?[ -]?5\d{2}[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/;
    if (!phoneRegex.test(phone.trim())) {
      errs.phone = "Geçerli bir telefon numarası giriniz";
    }
    if (notes.length > 500) {
      errs.notes = "Not 500 karakteri aşamaz";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        customerName: name.trim(),
        customerPhone: phone.trim(),
        notes: notes.trim(),
      });
    }
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="text-sm text-dark-300 hover:text-white transition-colors"
        >
          ← Geri
        </button>
        <span className="text-sm text-dark-400">İletişim Bilgileri</span>
      </div>

      <h2 className="text-xl font-semibold text-white mb-4">Bilgileriniz</h2>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm text-dark-200 mb-1">Ad Soyad</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent transition-colors ${
              errors.name ? "border-red-500" : "border-dark-600"
            }`}
            placeholder="Adınız Soyadınız"
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-dark-200 mb-1">Telefon</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent transition-colors ${
              errors.phone ? "border-red-500" : "border-dark-600"
            }`}
            placeholder="+90 5XX XXX XX XX"
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-dark-200 mb-1">
            Not (isteğe bağlı)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-accent transition-colors resize-none"
            rows={3}
            maxLength={500}
            placeholder="Eklemek istediğiniz bir not..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-colors"
        >
          Devam Et
        </button>
      </form>
    </div>
  );
}
