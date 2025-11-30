"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DbServerEconomy } from "@/types";
import toast from "react-hot-toast";

interface ServerEconomy {
  mikhal: number;
  draconiros: number;
}

export function useServerEconomy() {
  const [rates, setRates] = useState<ServerEconomy>({
    mikhal: 1,
    draconiros: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const supabaseRef = useRef(createClient());
  const debounceTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Fetch rates on mount
  useEffect(() => {
    async function fetchRates() {
      setIsLoading(true);
      const { data, error } = await supabaseRef.current
        .from("server-economy")
        .select("*");

      console.log(data);
      if (error) {
        toast.error("Failed to load kama rates");
        console.error("Error fetching rates:", error);
      } else if (data) {
        const newRates: ServerEconomy = { mikhal: 1, draconiros: 1 };
        (data as DbServerEconomy[]).forEach((row) => {
          if (row.server === "mikhal") {
            newRates.mikhal = row.kama_per_million;
          } else if (row.server === "draconiros") {
            newRates.draconiros = row.kama_per_million;
          }
        });
        setRates(newRates);
      }
      setIsLoading(false);
    }

    fetchRates();
  }, []);

  const updateRate = useCallback(
    (server: "mikhal" | "draconiros", value: number) => {
      // Optimistic update immediately
      setRates((prev) => ({ ...prev, [server]: value }));

      // Debounce the actual save
      const existingTimer = debounceTimers.current.get(server);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = setTimeout(async () => {
        debounceTimers.current.delete(server);
        const { error } = await supabaseRef.current
          .from("server-economy")
          .update({ kama_per_million: value })
          .eq("server", server);

        if (error) {
          toast.error(`Failed to save ${server} rate`);
          console.error("Error updating rate:", error);
        } else {
          toast.success("Rate saved", { duration: 1000 });
        }
      }, 800);

      debounceTimers.current.set(server, timer);
    },
    []
  );

  return {
    mikhalKamaPrice: rates.mikhal,
    draconiroKamaPrice: rates.draconiros,
    isLoading,
    setMikhalKamaPrice: (value: number) => updateRate("mikhal", value),
    setDraconiroKamaPrice: (value: number) => updateRate("draconiros", value),
  };
}
