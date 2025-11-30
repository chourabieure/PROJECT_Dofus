export interface Item {
  id: string;
  name: string;
  mikhalPrice: number | null;
  draconiroPrice: number | null;
}

export type Recommendation = "excellent" | "good" | "marginal" | "bad" | "loss";

export interface TradeAnalysis {
  profitPerUnit: number;
  profitPercentage: number;
  recommendation: Recommendation;
  description: string;
}

export type Server = "mikhal" | "draconiro";

