import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { commission, serviceArea } from "@/lib/content";

export const alt =
  "Well Kept Estates — estate sales in the San Fernando Valley, 30% of gross with a $1,500 minimum";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time from the same numbers the page states, so the share
 * card can never quote a fee the site has stopped charging.
 *
 * The badge replaces the typeset "Well Kept / ESTATES" that used to sit here —
 * it carries the name in its own lettering, so setting the words again beside
 * it printed them twice. It's inlined as a data URI because `ImageResponse`
 * resolves at build time and has no origin to fetch a relative path from.
 */
export default async function Image() {
  const badge = await readFile(join(process.cwd(), "public", "logo-badge.png"));
  const badgeSrc = `data:image/png;base64,${badge.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#2A2622",
          padding: "64px 80px",
          color: "#F6F2EA",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={badgeSrc} width={150} height={164} alt="" />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          Estate sales with a written record of where everything went.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(246,242,234,0.18)",
            paddingTop: 26,
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", opacity: 0.75 }}>
            {serviceArea.core.slice(0, 4).join(" · ")}
          </div>
          <div style={{ display: "flex", color: "#90B078" }}>
            {commission.rateLabel} of gross · {commission.minimumLabel} minimum
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
