import type { TradeAnalysis, Recommendation } from "@/types";

export function analyzeTradeValue(
  buyPrice: number,
  sellPrice: number,
  buyKamaPrice: number,
  sellKamaPrice: number
): TradeAnalysis {
  const normalizedBuyPrice = buyPrice * (buyKamaPrice / sellKamaPrice);
  const profitPerUnit = sellPrice - normalizedBuyPrice;
  const profitPercentage =
    ((sellPrice - normalizedBuyPrice) / normalizedBuyPrice) * 100;

  let recommendation: Recommendation;
  let description: string;

  if (profitPercentage >= 50) {
    recommendation = "excellent";
    description = "Exceptional profit margin!";
  } else if (profitPercentage >= 25) {
    recommendation = "good";
    description = "Solid profit opportunity";
  } else if (profitPercentage >= 10) {
    recommendation = "marginal";
    description = "Small profit, consider volume";
  } else if (profitPercentage >= 0) {
    recommendation = "bad";
    description = "Barely profitable";
  } else {
    recommendation = "loss";
    description = "You will lose kamas!";
  }

  return {
    profitPerUnit: Math.round(profitPerUnit),
    profitPercentage: Math.round(profitPercentage * 10) / 10,
    recommendation,
    description,
  };
}

export function formatKamas(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

export function getRecommendationStyles(
  recommendation: Recommendation
): string {
  switch (recommendation) {
    case "excellent":
      return "bg-emerald-900/40 border-emerald-500/50 text-emerald-300";
    case "good":
      return "bg-emerald-900/20 border-emerald-600/30 text-emerald-400";
    case "marginal":
      return "bg-amber-900/20 border-amber-600/30 text-amber-400";
    case "bad":
      return "bg-orange-900/20 border-orange-600/30 text-orange-400";
    case "loss":
      return "bg-red-900/30 border-red-500/40 text-red-400";
  }
}

export function getRecommendationIcon(recommendation: Recommendation): string {
  switch (recommendation) {
    case "excellent":
      return "✦";
    case "good":
      return "▲";
    case "marginal":
      return "◆";
    case "bad":
      return "▼";
    case "loss":
      return "✕";
  }
}
