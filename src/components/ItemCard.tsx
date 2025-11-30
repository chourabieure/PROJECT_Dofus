import type { Item, TradeAnalysis, Server } from "@/types";
import {
  formatKamas,
  getRecommendationStyles,
  getRecommendationIcon,
} from "@/utils/trade";

interface ItemCardProps {
  item: Item;
  analysis: TradeAnalysis | null;
  index: number;
  onUpdatePrice: (id: string, server: Server, price: number | null) => void;
  onRemove: (id: string) => void;
}

export function ItemCard({
  item,
  analysis,
  index,
  onUpdatePrice,
  onRemove,
}: ItemCardProps) {
  const cardClasses = `
    animate-fade-in bg-(--card-bg) border rounded-xl p-4
    ${analysis ? getRecommendationStyles(analysis.recommendation) : "border-(--card-border)"}
    ${analysis?.recommendation === "excellent" ? "profit-glow" : ""}
  `;

  return (
    <div className={cardClasses} style={{ animationDelay: `${index * 50}ms` }}>
      {/* Card Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-semibold text-(--foreground) leading-tight">
          {item.name}
        </h3>
        <button
          onClick={() => onRemove(item.id)}
          className="p-1 -mt-1 -mr-1 text-(--text-muted) hover:text-(--accent-ruby) transition-colors"
          title="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Price Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <PriceInput
          server="mikhal"
          value={item.mikhalPrice}
          onChange={(price) => onUpdatePrice(item.id, "mikhal", price)}
        />
        <PriceInput
          server="draconiro"
          value={item.draconiroPrice}
          onChange={(price) => onUpdatePrice(item.id, "draconiro", price)}
        />
      </div>

      {/* Analysis Result */}
      <div className="pt-3 border-t border-(--card-border)/50">
        {analysis ? (
          <AnalysisResult analysis={analysis} />
        ) : (
          <p className="text-(--text-muted) text-sm text-center">
            Enter both prices to analyze
          </p>
        )}
      </div>
    </div>
  );
}

interface PriceInputProps {
  server: Server;
  value: number | null;
  onChange: (price: number | null) => void;
}

function PriceInput({ server, value, onChange }: PriceInputProps) {
  const config = {
    mikhal: {
      label: "Mikhal",
      dotClass: "bg-(--mikhal-accent)",
      borderClass: "border-(--mikhal-accent)/30",
      focusClass: "focus:border-(--mikhal-accent)",
    },
    draconiro: {
      label: "Draconiros",
      dotClass: "bg-(--draconiros-accent)",
      borderClass: "border-(--draconiros-accent)/30",
      focusClass: "focus:border-(--draconiros-accent)",
    },
  }[server];

  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs text-(--text-muted) mb-1">
        <span className={`w-2 h-2 rounded-full ${config.dotClass}`}></span>
        {config.label}
      </label>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) =>
          onChange(e.target.value ? parseFloat(e.target.value) : null)
        }
        className={`w-full bg-(--input-bg) border ${config.borderClass} rounded-lg px-3 py-2 text-sm text-(--foreground) focus:outline-none ${config.focusClass} transition-colors`}
        placeholder="Price..."
      />
    </div>
  );
}

interface AnalysisResultProps {
  analysis: TradeAnalysis;
}

function AnalysisResult({ analysis }: AnalysisResultProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-1.5 text-lg font-bold">
          <span>{getRecommendationIcon(analysis.recommendation)}</span>
          <span>
            {analysis.profitPercentage > 0 ? "+" : ""}
            {analysis.profitPercentage}%
          </span>
        </div>
        <p className="text-xs mt-0.5">{analysis.description}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-(--text-muted)">
          {analysis.profitPerUnit > 0 ? "+" : ""}
          {formatKamas(analysis.profitPerUnit)}
        </p>
        <p className="text-xs text-(--text-muted)">per unit</p>
      </div>
    </div>
  );
}

