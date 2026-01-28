"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import HomeItems from "@/components/HomeItems";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  
  return (

      <>
      <Navbar
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />
    <main className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero / Intro Section */}
      {/* <section className="max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Items Catalog
        </h1>
      </section> */}

      {/* All Items Section */}
      <HomeItems search={search} category={category} />

      <div className="mt-6 flex gap-4">
        {/* <Link
          href="/items"
          className="px-4 py-2 border border-gray-900 rounded hover:bg-gray-100 transition"
        >
          View Items Page
        </Link> */}

        <Link
          href="/items/new"
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
        >
          Create Item
        </Link>
      </div>
    </main>
    </>
  );
}
