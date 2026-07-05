import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Image de partage (WhatsApp, Instagram, Facebook, iMessage…) générée au build :
 * photo du lagon au crépuscule + titre en Fraunces. 1200×630, le format standard.
 */

export const alt =
  "Le Bichique — restaurant de poisson frais au port de Saint-Gilles, La Réunion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [fraunces, photo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/fraunces-600.ttf")),
    readFile(join(process.cwd(), "public/images/hero-ocean-2.jpg")),
  ]);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />
        {/* Voile sombre pour la lisibilité (satori ne supporte pas le raccourci inset) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(100deg, rgba(4,31,43,0.9) 0%, rgba(4,31,43,0.6) 45%, rgba(4,31,43,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 80px",
            color: "#eef9f7",
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#2ec4b6",
            }}
          >
            Poisson frais • Port de Saint-Gilles, La Réunion
          </div>
          <div
            style={{
              fontFamily: "Fraunces",
              fontSize: 110,
              lineHeight: 1.05,
              marginTop: 18,
            }}
          >
            Le Bichique
          </div>
          <div style={{ fontSize: 34, marginTop: 22, color: "#f2b950" }}>
            Les pêcheurs du coin pêchent. Vous, vous régalez.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fraunces, weight: 600, style: "normal" }],
    }
  );
}
