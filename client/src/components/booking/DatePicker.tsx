import { useMemo } from "react";
import { format, addDays, startOfDay, isSameDay } from "date-fns";
import { tr } from "date-fns/locale";

interface DatePickerProps {
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

export function DatePicker({ selectedDate, onSelect }: DatePickerProps) {
  const today = startOfDay(new Date());

  const dates = useMemo(() => {
    const result: { date: Date; dateStr: string; isPast: boolean }[] = [];
    for (let i = 0; i < 30; i++) {
      const date = addDays(today, i);
      result.push({
        date,
        dateStr: format(date, "yyyy-MM-dd"),
        isPast: false,
      });
    }
    return result;
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-4">Tarih Seçin</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
        {dates.map(({ date, dateStr }) => {
          const isSelected = selectedDate === dateStr;
          const isToday = isSameDay(date, today);

          return (
            <button
              key={dateStr}
              onClick={() => onSelect(dateStr)}
              className={`p-2 rounded-lg text-center text-sm transition-all ${
                isSelected
                  ? "bg-accent text-white"
                  : isToday
                  ? "bg-dark-700 text-white border border-accent/30"
                  : "bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white border border-dark-700"
              }`}
            >
              <div className="text-xs opacity-70">
                {format(date, "EEE", { locale: tr })}
              </div>
              <div className="font-medium">{format(date, "d")}</div>
              <div className="text-xs opacity-70">
                {format(date, "MMM", { locale: tr })}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
