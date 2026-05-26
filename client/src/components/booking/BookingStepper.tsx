type BookingStep = "service" | "staff" | "date" | "form" | "confirm";

const ALL_STEPS: { key: BookingStep; label: string; number: number }[] = [
  { key: "service", label: "Hizmet", number: 1 },
  { key: "staff", label: "Personel", number: 2 },
  { key: "date", label: "Tarih", number: 3 },
  { key: "form", label: "Bilgiler", number: 4 },
  { key: "confirm", label: "Onay", number: 5 },
];

interface BookingStepperProps {
  currentStep: BookingStep;
  completedSteps: BookingStep[];
  onStepClick: (step: BookingStep) => void;
}

export function BookingStepper({ currentStep, completedSteps, onStepClick }: BookingStepperProps) {
  const currentIndex = ALL_STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
      {ALL_STEPS.map((step, i) => {
        const isActive = step.key === currentStep;
        const isCompleted = completedSteps.includes(step.key);
        const isClickable =
          isCompleted || completedSteps.includes(ALL_STEPS[i - 1]?.key) || i === 0;

        return (
          <div key={step.key} className="flex items-center gap-1">
            <button
              onClick={() => isClickable && onStepClick(step.key)}
              disabled={!isClickable}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                isActive
                  ? "bg-accent text-white ring-2 ring-accent/30"
                  : isCompleted
                  ? "bg-green-600 text-white"
                  : "bg-dark-700 text-dark-400"
              } ${!isClickable ? "cursor-default" : "cursor-pointer hover:bg-dark-600"}`}
            >
              {isCompleted ? "✓" : step.number}
            </button>
            <span
              className={`text-xs hidden sm:inline ${
                isActive ? "text-white" : "text-dark-400"
              }`}
            >
              {step.label}
            </span>
            {i < ALL_STEPS.length - 1 && (
              <div
                className={`w-6 h-px hidden sm:block ${
                  i < currentIndex ? "bg-green-600" : "bg-dark-700"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
