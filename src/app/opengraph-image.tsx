import { ImageResponse } from "next/og";
import { commission, serviceArea } from "@/lib/content";

export const alt =
  "Well Kept Estates — estate sales in the San Fernando Valley, 30% of gross with a $1,500 minimum";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time from the same numbers the page states, so the share
 * card can never quote a fee the site has stopped charging. Deliberately
 * typographic — there are no photographs of a completed sale yet, and a stock
 * image of someone else's living room would be worse than none.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#17110d",
          padding: "72px 80px",
          color: "#f4efe7",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Well Kept
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.34em",
              opacity: 0.55,
              marginTop: 8,
            }}
          >
            ESTATES
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 66,
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
            borderTop: "1px solid rgba(244,239,231,0.18)",
            paddingTop: 28,
            fontSize: 22,
          }}
        >
          <div style={{ display: "flex", opacity: 0.75 }}>
            {serviceArea.core.slice(0, 4).join(" · ")}
          </div>
          <div style={{ display: "flex", color: "#d9705f" }}>
            {commission.rateLabel} of gross · {commission.minimumLabel} minimum
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
