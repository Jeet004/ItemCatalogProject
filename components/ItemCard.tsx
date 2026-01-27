"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Item } from "@/lib/types";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const router = useRouter();

  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Image */}
      {item.imageUrl && (
        <div className="bg-gray-50 flex items-center justify-center h-44">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={0}
            height={0}
            sizes="100vw"
            className="max-h-40 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold text-gray-900 leading-snug">
          {item.title}
        </h3>

        <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
          {item.category}
        </span>

        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>

        {/* Actions */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={() => router.push(`/items/${item.id}`)}
            className="flex-1 text-sm px-3 py-1.5 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            View Details
          </button>

          <button
            onClick={() => router.push(`/items/${item.id}/edit`)}
            className="flex-1 text-sm px-3 py-1.5 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
          >
            Edit Item
          </button>
        </div>
      </div>
    </div>
  );
}
