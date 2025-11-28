import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "TrailUp - Learning Roadmap Generator",
  description:
    "Search a skill, assess your level, get a tailored learning roadmap.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="container-max py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
