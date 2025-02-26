import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Providers from "@/contexts/Providers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tabela FIPE",
  description: "Consulta de preços de veículos usando a API FIPE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
