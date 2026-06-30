import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tara Applications | Full-Stack Development & B2B Lead Generation",
  description:
    "Full-stack development, mobile apps, game development, email marketing & B2B lead generation. 2500+ projects delivered, 1200+ clients worldwide since 2017.",
  keywords: ["web development", "app development", "game development", "lead generation", "B2B", "digital marketing", "India"],
  openGraph: {
    title: "Tara Applications | Development & Lead Generation",
    description: "Full-stack digital solutions and B2B lead generation for growing businesses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
