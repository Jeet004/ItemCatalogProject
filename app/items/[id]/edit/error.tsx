"use client";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h2 className="text-xl font-semibold text-red-600 mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-600 mb-4">
        Unable to load the item. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-4 py-2 border rounded hover:bg-gray-50"
      >
        Retry
      </button>
    </div>
  );
}
