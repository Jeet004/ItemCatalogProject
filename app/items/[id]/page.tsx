import Image from "next/image";
import Link from "next/link";
import { Item } from "@/lib/types";

interface ItemDetailPageProps {
  params: {
    id: string;
  };
}

async function getItem(id: string): Promise<Item | null> {
  const res = await fetch(
    `http://localhost:3000/api/items?id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function ItemDetailPage({
  params
}: ItemDetailPageProps) {
  const item = await getItem(params.id);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-10">
        <p className="text-red-600">Item not found.</p>
        <Link href="/" className="text-blue-600 underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <Link href="/" className="text-sm text-blue-600 underline">
        ← Back to Items
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {item.imageUrl && (
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
            <Image
              src={item.imageUrl}
              alt={item.title}
              width={400}
              height={300}
              className="object-contain"
            />
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{item.title}</h1>
          <p className="text-gray-500 mt-1">{item.category}</p>
          <p className="text-xl font-semibold mt-4">₹{item.price}</p>
          <p className="text-gray-700 mt-4">{item.description}</p>

          <Link
            href={`/items/${item.id}/edit`}
            className="inline-block mt-6 px-4 py-2 border rounded hover:bg-gray-100"
          >
            Edit Item
          </Link>
        </div>
      </div>
    </main>
  );
}
