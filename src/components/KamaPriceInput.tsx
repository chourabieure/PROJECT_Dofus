import type { Server } from "@/types";

interface KamaPriceInputProps {
  server: Server;
  value: number;
  onChange: (value: number) => void;
}

const serverConfig = {
  mikhal: {
    label: "Mikhal Kama Price",
    accentClass: "bg-(--mikhal-accent)",
    focusClass: "focus:border-(--mikhal-accent)",
  },
  draconiros: {
    label: "Draconiros Kama Price",
    accentClass: "bg-(--draconiros-accent)",
    focusClass: "focus:border-(--draconiros-accent)",
  },
};

export function KamaPriceInput({
  server,
  value,
  onChange,
}: KamaPriceInputProps) {
  const config = serverConfig[server];

  return (
    <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-4 h-4 rounded-full ${config.accentClass}`}></div>
        <h2 className="text-lg font-semibold text-amber-600">{config.label}</h2>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-(--text-muted)">1M kamas =</span>
        <input
          type="number"
          step="0.01"
          value={value || ""}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`flex-1 bg-(--input-bg) border border-(--card-border) rounded-lg px-4 py-2 text-lg text-(--foreground) focus:outline-none ${config.focusClass} transition-colors`}
          placeholder="Enter price..."
        />
        <span className="text-(--text-muted)">€</span>
      </div>
    </div>
  );
}
