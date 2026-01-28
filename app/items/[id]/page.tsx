import Image from "next/image";
import Link from "next/link";
import { Item } from "@/lib/types";

interface ItemDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

<<<<<<< HEAD
async function getItem(id: string): Promise<Item | null> {
  // For server components, we need to use the full URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(
      `${baseUrl}/api/items?id=${id}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching item:', error);
    return null;
  }
=======
async function getItem(id: string): Promise<Item> {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(
    `${baseUrl}/api/items?id=${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch item");
  }

  return res.json();
>>>>>>> 14456be (Commit through amending)
}


export default async function ItemDetailPage({
  params
}: ItemDetailPageProps) {
  const resolvedParams = await params;
  const item = await getItem(resolvedParams.id);

<<<<<<< HEAD
  if (!item) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="text-center py-12">
          <p className="text-red-600 text-lg font-medium mb-4">Item not found</p>
          <Link 
            href="/" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }
=======
  // if (!item) {
  //   return (
  //     <main className="max-w-4xl mx-auto px-6 py-10">
  //       <div className="text-center py-12">
  //         <p className="text-red-600 text-lg font-medium mb-4">Item not found</p>
  //         <Link 
  //           href="/" 
  //           className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  //         >
  //           Back to Home
  //         </Link>
  //       </div>
  //     </main>
  //   );
  // }
>>>>>>> 14456be (Commit through amending)

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* Back Link */}
      <Link 
        href="/"
        className="inline-block text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Items
      </Link>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div>
          {item.imageUrl ? (
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="relative h-96 flex items-center justify-center">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="object-contain max-h-full"
                />
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 h-96 flex items-center justify-center bg-gray-50">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="space-y-5">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
          </div>

          {/* Category Badge */}
          <div>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {item.category}
            </span>
          </div>

          {/* Price */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Price</p>
            <p className="text-2xl font-bold text-gray-900">
              ₹{item.price.toLocaleString('en-IN')}
            </p>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Created Date */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Created</p>
            <p className="text-sm text-gray-600">
              {new Date(item.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Link
              href="/"
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-center rounded-lg hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>
            <Link
              href={`/items/${item.id}/edit`}
              className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition"
            >
              Edit Item
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}