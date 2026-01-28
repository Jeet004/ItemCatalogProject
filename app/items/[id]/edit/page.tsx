"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Item } from "@/lib/types";

export default function EditItemPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  if (!id) {
    return <p className="px-6 py-10">Invalid item ID</p>;
  }

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: ""
  });

  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);

 useEffect(() => {
  if (!id) return;

  const fetchItem = async () => {
    const res = await fetch(`/api/items?id=${id}`);

    if (!res.ok) {
      throw new Error("Failed to load item");
    }

<<<<<<< HEAD
        setForm({
          title: item.title,
          description: item.description,
          price: item.price.toString(),
          category: item.category,
          imageUrl: item.imageUrl || ""
        });
      } catch {
        setError("Failed to load item");
      } finally {
        setLoading(false);
      }
    };
=======
    const item: Item = await res.json();

    setForm({
      title: item.title,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      imageUrl: item.imageUrl || ""
    });
  };

  fetchItem();
}, [id]);
>>>>>>> 14456be (Commit through amending)


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
          category: form.category,
          imageUrl: form.imageUrl
        })
      });

      if (!res.ok) throw new Error();

      router.push(`/items/${id}`);
    } catch {
      setError("Failed to update item");
    }
  };

  // if (loading) return <p className="px-6 py-10">Loading...</p>;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* Back Link */}
      <Link 
        href={`/items/${id}`}
        className="inline-block text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Item
      </Link>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Item</h1>

      {/* Error Message */}
<<<<<<< HEAD
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
=======
      {/* {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )} */}
>>>>>>> 14456be (Commit through amending)

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Item Image
            </label>

            {/* Image Preview */}
            {form.imageUrl && !showImageInput ? (
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="relative h-64 flex items-center justify-center">
                    <Image
                      src={form.imageUrl}
                      alt={form.title || "Item image"}
                      width={300}
                      height={200}
                      className="object-contain max-h-full"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowImageInput(true)}
                  className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Change Image
                </button>
              </div>
            ) : !showImageInput ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <p className="text-gray-500 mb-3">No image set</p>
                <button
                  type="button"
                  onClick={() => setShowImageInput(true)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                >
                  Add Image
                </button>
              </div>
            ) : null}

            {/* Image URL Input */}
            {showImageInput && (
              <div className="space-y-3 p-4 border border-blue-200 rounded-lg bg-blue-50">
                {form.imageUrl && (
                  <div className="relative h-48 bg-white rounded flex items-center justify-center mb-3">
                    <Image
                      src={form.imageUrl}
                      alt="Preview"
                      width={200}
                      height={150}
                      className="object-contain max-h-full"
                    />
                  </div>
                )}
                <input
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL (e.g., /Mouse.jpg)"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowImageInput(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Save URL
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ ...form, imageUrl: "" });
                      setShowImageInput(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Form Fields */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter item title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your item"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) <span className="text-red-500">*</span>
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Stationery">Stationery</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Home">Home</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => router.push(`/`)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}