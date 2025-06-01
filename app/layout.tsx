import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./typing-effect.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nayaka Ghana Subrata | Portfolio",
  description: "Video Editor, Cryptography Enthusiast, Blockchain Developer & Cybersecurity Researcher",
  keywords: "video editing, cryptography, blockchain, cybersecurity, web development, portfolio",
  authors: [{ name: "Nayaka Ghana Subrata" }],
  creator: "Nayaka Ghana Subrata",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nayekah.dev",
    title: "Nayaka Ghana Subrata | Portfolio",
    description: "Video Editor, Cryptography Enthusiast, Blockchain Developer & Cybersecurity Researcher",
    siteName: "Nayeka Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayaka Ghana Subrata | Portfolio",
    description: "Video Editor, Cryptography Enthusiast, Blockchain Developer & Cybersecurity Researcher",
    creator: "@Katounasai"
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}