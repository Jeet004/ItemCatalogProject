"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CreateItemPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: ""
  });

  const [error, setError] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    if (!form.description.trim()) {
      setError("Description is required");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    if (!form.category) {
      setError("Please select a category");
      return;
    }

    setIsCreating(true);
    setError("");

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          price: Number(form.price),
          category: form.category,
          imageUrl: form.imageUrl || undefined
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create item");
      }

      const newItem = await res.json();
      
      // Navigate to the newly created item's detail page
      router.push(`/items/${newItem.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create item");
      setIsCreating(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* Back Link */}
      <Link 
        href="/"
        className="inline-block text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Home
      </Link>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Item</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Item Image (Optional)
            </label>

            {/* Image Preview */}
            {form.imageUrl && !showImageInput ? (
              <div className="space-y-3">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="relative h-64 flex items-center justify-center">
                    <Image
                      src={form.imageUrl}
                      alt="Item preview"
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
                <p className="text-gray-500 mb-3">No image added</p>
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
                disabled={isCreating}
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
                disabled={isCreating}
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
                disabled={isCreating}
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
                disabled={isCreating}
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
                onClick={() => router.push("/")}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                disabled={isCreating}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create Item"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}