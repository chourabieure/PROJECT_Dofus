"use client";

import {
  Header,
  KamaRates,
  AddItemForm,
  ItemsGrid,
  EmptyState,
  HowItWorks,
  Footer,
} from "@/components";
import { useLocalStorage, useMarketItems } from "@/hooks";

const MIKHAL_PRICE_KEY = "dofus-mikhal-kama-price";
const DRACONIRO_PRICE_KEY = "dofus-draconiro-kama-price";

export default function Home() {
  const [mikhalKamaPrice, setMikhalKamaPrice] = useLocalStorage(
    MIKHAL_PRICE_KEY,
    1
  );
  const [draconiroKamaPrice, setDraconiroKamaPrice] = useLocalStorage(
    DRACONIRO_PRICE_KEY,
    1
  );

  const { items, sortedItems, addItem, updateItemPrice, removeItem } =
    useMarketItems(mikhalKamaPrice, draconiroKamaPrice);

  return (
    <div className="min-h-screen bg-pattern">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <KamaRates
          mikhalKamaPrice={mikhalKamaPrice}
          draconiroKamaPrice={draconiroKamaPrice}
          onMikhalChange={setMikhalKamaPrice}
          onDraconiroChange={setDraconiroKamaPrice}
        />

        <AddItemForm onAdd={addItem} />

        <ItemsGrid
          items={sortedItems}
          mikhalKamaPrice={mikhalKamaPrice}
          draconiroKamaPrice={draconiroKamaPrice}
          onUpdatePrice={updateItemPrice}
          onRemove={removeItem}
        />

        {items.length === 0 && <EmptyState />}

        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
