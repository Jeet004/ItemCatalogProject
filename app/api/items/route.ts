import { NextRequest, NextResponse } from "next/server";
import { items } from "@/lib/data";
import { Item } from "@/lib/types";


function findItemById(id: string): Item | undefined {
  return items.find((item) => item.id === id);
}


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  
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

  
  return NextResponse.json(items, { status: 200 });
}

// PATCH: update existing item
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { id, title, description, price, category } = body;

    if (!id || !title || !description || !price || !category) {
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

    
    item.title = title;
    item.description = description;
    item.price = price;
    item.category = category;

    return NextResponse.json(
      { message: "Item updated successfully", item },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}
