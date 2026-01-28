"use client";

import Link from "next/link";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-red-600 mb-3">
          Something went wrong
        </h2>

        <p className="text-gray-600 mb-6">
          We couldn’t load this item. It may not exist or there was a network issue.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={reset}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
