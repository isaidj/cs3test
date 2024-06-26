import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import VerticalMenu from "@/components/DropDownMenu/VerticalMenu";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CS3 Mercado Libre",
  description: "CS3 TEST FRONTEND",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col"}>
        <div className="bg-slate-900  w-full flex justify-start items-center h-14 border-b-2 border-slate-800">
          <h1 className="text-2xl font-bold ml-20 py-5 text-blue-300">
            <Link href="/">Cliente CS3</Link>
          </h1>
        </div>
        <div className="bg-slate-900 w-full  flex-1 flex overflow-x-hidden">
          <div className=" w-0 min-w-0 border-r-2 border-slate-800 overflow-y-auto h-auto md:w-1/6 md:min-w-64">
            <VerticalMenu />
          </div>
          <AppRouterCacheProvider
            options={{
              key: "css",
            }}
          >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </div>
      </body>
    </html>
  );
}
