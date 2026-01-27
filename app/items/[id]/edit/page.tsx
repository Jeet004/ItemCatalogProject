"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Item } from "@/lib/types";

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchItem = async () => {
      try {
        const res = await fetch(`/api/items?id=${id}`);
        if (!res.ok) throw new Error();

        const item: Item = await res.json();

        setForm({
          title: item.title,
          description: item.description,
          price: item.price.toString(),
          category: item.category
        });
      } catch {
        setError("Failed to load item");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.price || !form.category) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await fetch("/api/items", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          title: form.title,
          description: form.description,
          price: Number(form.price),
          category: form.category
        })
      });

      if (!res.ok) throw new Error();

      router.push(`/items/${id}`);
    } catch {
      setError("Failed to update item");
    }
  };

  if (loading) return <p className="px-6 py-10">Loading...</p>;

  return (
    <main className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Item</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-3 py-2 border rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full px-3 py-2 border rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Home">Home</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
