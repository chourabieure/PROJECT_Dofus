import { KamaPriceInput } from "./KamaPriceInput";

interface KamaRatesProps {
  mikhalKamaPrice: number;
  draconiroKamaPrice: number;
  onMikhalChange: (value: number) => void;
  onDraconiroChange: (value: number) => void;
}

export function KamaRates({
  mikhalKamaPrice,
  draconiroKamaPrice,
  onMikhalChange,
  onDraconiroChange,
}: KamaRatesProps) {
  const showSummary = mikhalKamaPrice > 0 && draconiroKamaPrice > 0;
  const exchangeFactor = (mikhalKamaPrice / draconiroKamaPrice).toFixed(2);

  const getSummaryMessage = () => {
    if (mikhalKamaPrice > draconiroKamaPrice) {
      return "Mikhal kamas are worth more (good for buying there!)";
    } else if (mikhalKamaPrice < draconiroKamaPrice) {
      return "Draconiros kamas are worth more (harder to profit)";
    }
    return "Same value on both servers";
  };

  return (
    <section className="mb-8">
      <div className="grid md:grid-cols-2 gap-4">
        <KamaPriceInput
          server="mikhal"
          value={mikhalKamaPrice}
          onChange={onMikhalChange}
        />
        <KamaPriceInput
          server="draconiros"
          value={draconiroKamaPrice}
          onChange={onDraconiroChange}
        />
      </div>

      {showSummary && (
        <div className="mt-4 bg-(--card-bg)/50 border border-(--card-border) rounded-xl p-4 text-center">
          <p className="text-(--text-muted)">
            Exchange factor:{" "}
            <span className="text-(--accent-gold) font-semibold">
              {exchangeFactor}x
            </span>
            {" — "}
            <span className="text-sm">{getSummaryMessage()}</span>
          </p>
        </div>
      )}
    </section>
  );
}
