import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Items Catalog - Browse and Manage Your Items",
    template: "%s | Items Catalog"
  },
  description: "Browse, create, and manage your items catalog. Find electronics, stationery, lifestyle products, and home goods all in one place.",
  keywords: ["items", "catalog", "products", "electronics", "stationery", "lifestyle", "home goods"],
  authors: [{ name: "Items Catalog" }],
  creator: "Items Catalog",
  publisher: "Items Catalog",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "http://localhost:3000",
    siteName: "Items Catalog",
    title: "Items Catalog - Browse and Manage Your Items",
    description: "Browse, create, and manage your items catalog. Find electronics, stationery, lifestyle products, and home goods.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Items Catalog"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Items Catalog - Browse and Manage Your Items",
    description: "Browse, create, and manage your items catalog.",
    images: ["/og-image.jpg"]
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}