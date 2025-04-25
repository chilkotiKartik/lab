import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { AchievementsNotification } from "@/components/achievements-notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Avasya Research Lab",
  description: "Pioneering the future of aerospace technology and space innovation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <PageTransition>
                <main className="flex-1">{children}</main>
              </PageTransition>
              <Footer />
            </div>
            <AchievementsNotification />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
