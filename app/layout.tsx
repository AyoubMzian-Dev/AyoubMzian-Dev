import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import RegistrationMarks from "@/components/instrument/registration-marks";
import TelemetryBar from "@/components/instrument/telemetry-bar";
import Crosshair from "@/components/instrument/crosshair";
import { sections, titleBlock, origin } from "@/content/site";

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export const metadata: Metadata = {
  title: `${titleBlock.cells[0].value} — ${titleBlock.cells[1].value}`,
  description: origin.body[0],
};

/* Calibration runs on first visit only — set before paint to avoid a flash. */
const calibrationScript = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("instrument-calibrated")){sessionStorage.setItem("instrument-calibrated","1");document.documentElement.classList.add("calibrating")}}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${body.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: calibrationScript }} />
        <a className="skip mono" href="#index">
          Index
        </a>
        {children}
        <RegistrationMarks />
        <TelemetryBar sections={sections} />
        <Crosshair />
      </body>
    </html>
  );
}
