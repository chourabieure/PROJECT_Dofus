"use client";

import { useMemo, useCallback } from "react";
import type { Item, Server } from "@/types";
import { analyzeTradeValue } from "@/utils/trade";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "dofus-market-items";

export function useMarketItems(
  mikhalKamaPrice: number,
  draconiroKamaPrice: number
) {
  const [items, setItems] = useLocalStorage<Item[]>(STORAGE_KEY, []);

  const addItem = useCallback(
    (name: string) => {
      if (!name.trim()) return;
      const newItem: Item = {
        id: crypto.randomUUID(),
        name: name.trim(),
        mikhalPrice: null,
        draconiroPrice: null,
      };
      setItems((prev) => [newItem, ...prev]);
    },
    [setItems]
  );

  const updateItemPrice = useCallback(
    (id: string, server: Server, price: number | null) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                [server === "mikhal" ? "mikhalPrice" : "draconiroPrice"]: price,
              }
            : item
        )
      );
    },
    [setItems]
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setItems]
  );

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aHasPrices = a.mikhalPrice !== null && a.draconiroPrice !== null;
      const bHasPrices = b.mikhalPrice !== null && b.draconiroPrice !== null;

      if (!aHasPrices && !bHasPrices) return 0;
      if (!aHasPrices) return 1;
      if (!bHasPrices) return -1;

      const aAnalysis = analyzeTradeValue(
        a.mikhalPrice!,
        a.draconiroPrice!,
        mikhalKamaPrice,
        draconiroKamaPrice
      );
      const bAnalysis = analyzeTradeValue(
        b.mikhalPrice!,
        b.draconiroPrice!,
        mikhalKamaPrice,
        draconiroKamaPrice
      );

      return bAnalysis.profitPercentage - aAnalysis.profitPercentage;
    });
  }, [items, mikhalKamaPrice, draconiroKamaPrice]);

  return {
    items,
    sortedItems,
    addItem,
    updateItemPrice,
    removeItem,
  };
}
