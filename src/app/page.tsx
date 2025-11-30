"use client";

import { Toaster } from "react-hot-toast";
import {
  Header,
  KamaRates,
  AddItemForm,
  ItemsGrid,
  EmptyState,
  HowItWorks,
  Footer,
  KamaRatesSkeleton,
  ItemsGridSkeleton,
} from "@/components";
import { useItems, useServerEconomy } from "@/hooks";

export default function Home() {
  const {
    mikhalKamaPrice,
    draconiroKamaPrice,
    isLoading: isRatesLoading,
    setMikhalKamaPrice,
    setDraconiroKamaPrice,
  } = useServerEconomy();

  const {
    items,
    sortedItems,
    isLoading: isItemsLoading,
    addItem,
    updateItemPrice,
    removeItem,
  } = useItems(mikhalKamaPrice, draconiroKamaPrice);

  return (
    <div className="min-h-screen bg-pattern">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--card-bg)",
            color: "var(--foreground)",
            border: "1px solid var(--card-border)",
          },
          success: {
            iconTheme: {
              primary: "var(--accent-emerald)",
              secondary: "var(--foreground)",
            },
          },
          error: {
            iconTheme: {
              primary: "var(--accent-ruby)",
              secondary: "var(--foreground)",
            },
          },
        }}
      />

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isRatesLoading ? (
          <KamaRatesSkeleton />
        ) : (
          <KamaRates
            mikhalKamaPrice={mikhalKamaPrice}
            draconiroKamaPrice={draconiroKamaPrice}
            onMikhalChange={setMikhalKamaPrice}
            onDraconiroChange={setDraconiroKamaPrice}
          />
        )}

        <AddItemForm onAdd={addItem} />

        {isItemsLoading ? (
          <ItemsGridSkeleton count={3} />
        ) : (
          <>
            <ItemsGrid
              items={sortedItems}
              mikhalKamaPrice={mikhalKamaPrice}
              draconiroKamaPrice={draconiroKamaPrice}
              onUpdatePrice={updateItemPrice}
              onRemove={removeItem}
            />

            {items.length === 0 && <EmptyState />}
          </>
        )}

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
