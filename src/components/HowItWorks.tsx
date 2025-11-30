export function HowItWorks() {
  return (
    <section className="mt-12 bg-(--card-bg)/50 border border-(--card-border) rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4 text-amber-600">
        How it works
      </h3>
      <div className="grid md:grid-cols-2 gap-6 text-sm text-(--text-muted)">
        <div>
          <h4 className="font-semibold text-(--foreground) mb-2">
            Profit Calculation
          </h4>
          <p>
            Enter the price for 1M kamas on each server (e.g., from RMT sites).
            The tool normalizes item prices to compare real € value. If Mikhal
            kamas cost more, items bought there are &quot;cheaper&quot; relative
            to Draconiros.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-(--foreground) mb-2">
            Recommendations
          </h4>
          <ul className="space-y-1">
            <li>
              <span className="text-emerald-300">✦ Excellent:</span> 50%+ profit
              margin
            </li>
            <li>
              <span className="text-emerald-400">▲ Good:</span> 25-50% profit
              margin
            </li>
            <li>
              <span className="text-amber-400">◆ Marginal:</span> 10-25% profit
            </li>
            <li>
              <span className="text-orange-400">▼ Bad:</span> 0-10% profit
            </li>
            <li>
              <span className="text-red-400">✕ Loss:</span> Negative profit
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

