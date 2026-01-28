import { NextRequest, NextResponse } from "next/server";
import { items } from "@/lib/data";
import { Item } from "@/lib/types";

function findItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id);
}

// GET: fetch all items or single item by id
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  // Single item lookup
  if (id) {
    const item = findItemById(id);

    if (!item) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(item, { status: 200 });
  }

  // Filter items based on search and category
  let filteredItems = [...items];

  // Apply category filter
  if (category && category !== "") {
    filteredItems = filteredItems.filter(
      (item) => item.category === category
    );
  }

  // Apply search filter
  if (search && search.trim() !== "") {
    const searchLower = search.toLowerCase().trim();
    filteredItems = filteredItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchLower) 
        
    );
  }

  return NextResponse.json(filteredItems, { status: 200 });
}

// POST
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, price, category, imageUrl } = body;

    // Validation
    if (!title || !description || price === undefined || !category) {
      return NextResponse.json(
        { message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    if (typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        { message: "Title must be a non-empty string" },
        { status: 400 }
      );
    }

    if (typeof description !== "string" || description.trim().length === 0) {
      return NextResponse.json(
        { message: "Description must be a non-empty string" },
        { status: 400 }
      );
    }

    if (typeof price !== "number" || price <= 0) {
      return NextResponse.json(
        { message: "Price must be a positive number" },
        { status: 400 }
      );
    }

    const validCategories = ["Electronics", "Stationery", "Lifestyle", "Home"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { message: "Invalid category" },
        { status: 400 }
      );
    }

    
    const maxId = items.reduce((max, item) => {
      const itemId = parseInt(item.id);
      return itemId > max ? itemId : max;
    }, 0);
    
    const newId = (maxId + 1).toString();

    // Create new item
    const newItem: Item = {
      id: newId,
      title: title.trim(),
      description: description.trim(),
      price,
      category,
      createdAt: new Date().toISOString(),
      imageUrl: imageUrl || undefined,
    };

    // Add to items array (in-memory storage)
    items.push(newItem);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error creating item:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}

// PATCH: update existing item
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { id, title, description, price, category, imageUrl } = body;

    if (!id || !title || !description || price === undefined || !category) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const item = findItemById(id);

    if (!item) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    // Update item properties
    item.title = title;
    item.description = description;
    item.price = price;
    item.category = category;
    item.imageUrl = imageUrl;

    return NextResponse.json(
      { message: "Item updated successfully", item },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating item:", error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}