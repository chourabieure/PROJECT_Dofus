"use client";

import { useState } from "react";

interface AddItemFormProps {
  onAdd: (name: string) => void;
}

export function AddItemForm({ onAdd }: AddItemFormProps) {
  const [itemName, setItemName] = useState("");

  const handleSubmit = () => {
    if (!itemName.trim()) return;
    onAdd(itemName);
    setItemName("");
  };

  return (
    <section className="mb-8">
      <div className="bg-(--card-bg) border border-(--card-border) rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4 text-amber-600">
          Add Item to Compare
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="flex-1 bg-(--input-bg) border border-(--card-border) rounded-lg px-4 py-3 text-(--foreground) focus:outline-none focus:border-(--accent-gold) transition-colors"
            placeholder="Enter item name (e.g., Bois de Frêne, Gelée Royale...)"
          />
          <button
            onClick={handleSubmit}
            disabled={!itemName.trim()}
            className="px-6 py-3 bg-(--accent-gold) text-(--background) font-semibold rounded-lg hover:bg-(--accent-copper) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Item
          </button>
        </div>
      </div>
    </section>
  );
}

