"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Item, DbItem, Server } from "@/types";
import { toItem } from "@/types";
import { analyzeTradeValue } from "@/utils/trade";
import toast from "react-hot-toast";

export function useItems(mikhalKamaPrice: number, draconiroKamaPrice: number) {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabaseRef = useRef(createClient());
  const debounceTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Fetch items on mount
  useEffect(() => {
    async function fetchItems() {
      setIsLoading(true);
      const { data, error } = await supabaseRef.current
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Failed to load items");
        console.error("Error fetching items:", error);
      } else {
        setItems((data as DbItem[]).map(toItem));
      }
      setIsLoading(false);
    }

    fetchItems();
  }, []);

  const addItem = useCallback(async (name: string) => {
    if (!name.trim()) return;

    const toastId = toast.loading("Adding item...");

    const { data, error } = await supabaseRef.current
      .from("items")
      .insert({ name: name.trim() })
      .select()
      .single();

    if (error) {
      toast.error("Failed to add item", { id: toastId });
      console.error("Error adding item:", error);
    } else {
      const newItem = toItem(data as DbItem);
      setItems((prev) => [newItem, ...prev]);
      toast.success("Item added!", { id: toastId });
    }
  }, []);

  const updateItemPrice = useCallback(
    (id: number, server: Server, price: number | null) => {
      // Optimistic update immediately
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

      // Debounce the actual save
      const timerKey = `${id}-${server}`;
      const existingTimer = debounceTimers.current.get(timerKey);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = setTimeout(async () => {
        debounceTimers.current.delete(timerKey);
        const column =
          server === "mikhal" ? "mikhal_price" : "draconiros_price";
        const { error } = await supabaseRef.current
          .from("items")
          .update({ [column]: price })
          .eq("id", id);

        if (error) {
          toast.error("Failed to save price");
          console.error("Error updating price:", error);
        } else {
          toast.success("Price saved", { duration: 1000 });
        }
      }, 800);

      debounceTimers.current.set(timerKey, timer);
    },
    []
  );

  const removeItem = useCallback(async (id: number) => {
    const toastId = toast.loading("Removing item...");

    // Store previous state for potential rollback
    let previousItems: Item[] = [];
    setItems((prev) => {
      previousItems = prev;
      return prev.filter((item) => item.id !== id);
    });

    const { error } = await supabaseRef.current
      .from("items")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to remove item", { id: toastId });
      setItems(previousItems); // Revert
      console.error("Error removing item:", error);
    } else {
      toast.success("Item removed", { id: toastId });
    }
  }, []);

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
    isLoading,
    addItem,
    updateItemPrice,
    removeItem,
  };
}
