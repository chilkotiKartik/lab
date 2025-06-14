import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LiveChatSystem } from "@/components/live-chat-system"
import { AchievementsNotification } from "@/components/achievements-notification"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Infinity Tech Society - Innovation & Collaboration",
  description:
    "Join a vibrant community of tech enthusiasts building the future through innovative projects and collaboration.",
  keywords: ["technology", "innovation", "collaboration", "projects", "community", "AI", "machine learning"],
  authors: [{ name: "Infinity Tech Society" }],
  creator: "Infinity Tech Society",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://infinitytech.com",
    title: "Infinity Tech Society",
    description: "Innovation & Collaboration Platform",
    siteName: "Infinity Tech Society",
  },
  twitter: {
    card: "summary_large_image",
    title: "Infinity Tech Society",
    description: "Innovation & Collaboration Platform",
    creator: "@infinitytech",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <LiveChatSystem />
            <Toaster />
            <AchievementsNotification />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
