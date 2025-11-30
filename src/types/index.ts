// Database types matching Supabase schema
export interface DbItem {
  id: number;
  created_at: string;
  name: string;
  mikhal_price: number | null;
  draconiros_price: number | null;
}

export interface DbServerEconomy {
  id: number;
  created_at: string;
  server: string;
  kama_per_million: number;
}

// Frontend types (camelCase for convenience)
export interface Item {
  id: number;
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

export type Server = "mikhal" | "draconiros";

// Helper to convert DB item to frontend item
export function toItem(dbItem: DbItem): Item {
  return {
    id: dbItem.id,
    name: dbItem.name,
    mikhalPrice: dbItem.mikhal_price,
    draconiroPrice: dbItem.draconiros_price,
  };
}

// Helper to convert frontend item to DB format for insert/update
export function toDbItem(item: Partial<Item>): Partial<DbItem> {
  const result: Partial<DbItem> = {};
  if (item.name !== undefined) result.name = item.name;
  if (item.mikhalPrice !== undefined) result.mikhal_price = item.mikhalPrice;
  if (item.draconiroPrice !== undefined)
    result.draconiros_price = item.draconiroPrice;
  return result;
}
