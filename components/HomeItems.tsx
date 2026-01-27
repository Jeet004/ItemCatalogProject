"use client";

import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import { Item } from "@/lib/types";

interface HomeItemsProps {
  search: string;
  category: string;
}

export default function HomeItems({ search, category }: HomeItemsProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (category) params.append("category", category);

        const res = await fetch(`/api/items?${params.toString()}`);

        if (!res.ok) throw new Error("Failed to fetch");

        const data: Item[] = await res.json();
        setItems(data);
      } catch {
        setError("Unable to load items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [search, category]);

  if (loading) return <p className="mt-10 text-gray-500">Loading items...</p>;
  if (error) return <p className="mt-10 text-red-600">{error}</p>;
  if (items.length === 0)
    return <p className="mt-10 text-gray-500">No items found.</p>;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-6">All Items</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
