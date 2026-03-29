import { MOTION_PRESET } from "@/lib/motion-preset";
import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sital | Software Developer and Network Engineer",
  description: "Portfolio of Sital focused on backend systems, network engineering, and decentralized architecture.",
};

const themeInitScript = `(() => {
  const stored = window.localStorage.getItem("theme");
  const theme = stored === "light" ? "light" : "dark";
  const storedMotion = window.localStorage.getItem("motionPreset");
  const motion = storedMotion === "calm" || storedMotion === "dynamic" || storedMotion === "balanced"
    ? storedMotion
    : "${MOTION_PRESET}";
  const storedAccent = window.localStorage.getItem("accentPreset");
  const accent = storedAccent === "emerald" || storedAccent === "amber" || storedAccent === "cyan"
    ? storedAccent
    : "cyan";
  const a11y = window.localStorage.getItem("a11yMode") === "on" ? "on" : "off";
  const storedSpotlight = window.localStorage.getItem("spotlightIntensity");
  const spotlight = storedSpotlight === "low" || storedSpotlight === "high" || storedSpotlight === "medium"
    ? storedSpotlight
    : "medium";

  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.accent = accent;
  document.documentElement.dataset.a11y = a11y;
  document.documentElement.dataset.spotlight = spotlight;

  const applyMotion = () => {
    const body = document.body;
    if (!body) {
      window.requestAnimationFrame(applyMotion);
      return;
    }
    body.classList.remove("motion-calm", "motion-balanced", "motion-dynamic");
    body.classList.add("motion-" + motion);
  };

  applyMotion();
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-accent="cyan"
      data-a11y="off"
      data-spotlight="medium"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body className="theme-transition min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
