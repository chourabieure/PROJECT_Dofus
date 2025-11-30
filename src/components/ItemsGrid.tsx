import type { Item, Server } from "@/types";
import { analyzeTradeValue } from "@/utils/trade";
import { ItemCard } from "./ItemCard";

interface ItemsGridProps {
  items: Item[];
  mikhalKamaPrice: number;
  draconiroKamaPrice: number;
  onUpdatePrice: (id: string, server: Server, price: number | null) => void;
  onRemove: (id: string) => void;
}

export function ItemsGrid({
  items,
  mikhalKamaPrice,
  draconiroKamaPrice,
  onUpdatePrice,
  onRemove,
}: ItemsGridProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-amber-600">
          Price Comparison
        </h2>
        <p className="text-sm text-(--text-muted)">
          {items.length} item{items.length > 1 ? "s" : ""} • sorted by profit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => {
          const hasBothPrices =
            item.mikhalPrice !== null && item.draconiroPrice !== null;
          const analysis = hasBothPrices
            ? analyzeTradeValue(
                item.mikhalPrice!,
                item.draconiroPrice!,
                mikhalKamaPrice,
                draconiroKamaPrice
              )
            : null;

          return (
            <ItemCard
              key={item.id}
              item={item}
              analysis={analysis}
              index={index}
              onUpdatePrice={onUpdatePrice}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </section>
  );
}

