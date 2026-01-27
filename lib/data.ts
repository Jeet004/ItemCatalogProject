import { Item } from "./types";

export const items: Item[] = [
  {
    id: "1",
    title: "Wireless Mouse",
    description: "Ergonomic wireless mouse for daily use",
    price: 799,
    category: "Electronics",
    createdAt: new Date().toISOString(),
    imageUrl: "/Mouse.jpg"
  },
  {
    id: "2",
    title: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    price: 2499,
    category: "Electronics",
    createdAt: new Date().toISOString(),
    imageUrl: "/keyboard.jpg"
  },
  {
    id: "3",
    title: "Notebook",
    description: "A5 ruled notebook for daily notes",
    price: 199,
    category: "Stationery",
    createdAt: new Date().toISOString(),
    imageUrl: "/Notebook.jpg"
  },
  {
    id: "4",
    title: "Pen Set",
    description: "Premium gel pen set",
    price: 299,
    category: "Stationery",
    createdAt: new Date().toISOString(),
    imageUrl: "/PenSet.jpg"
  },
  {
    id: "5",
    title: "Water Bottle",
    description: "1L stainless steel bottle",
    price: 599,
    category: "Lifestyle",
    createdAt: new Date().toISOString(),
    imageUrl: "/WaterBottle.jpg"
  },
  {
    id: "6",
    title: "Backpack",
    description: "Laptop backpack with multiple compartments",
    price: 1999,
    category: "Lifestyle",
    createdAt: new Date().toISOString(),
    imageUrl: "/LaptopBackpack.jpg"
  },
  {
    id: "7",
    title: "Headphones",
    description: "Over-ear wired headphones",
    price: 1499,
    category: "Electronics",
    createdAt: new Date().toISOString(),
    imageUrl: "/Headphones.jpg"
  },
  {
    id: "8",
    title: "Desk Lamp",
    description: "LED desk lamp with adjustable brightness",
    price: 999,
    category: "Home",
    createdAt: new Date().toISOString(),
    imageUrl: "/DeskLamp.jpg"
  }
];
