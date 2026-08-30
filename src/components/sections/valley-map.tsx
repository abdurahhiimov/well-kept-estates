"use client";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { LiquidGlass } from "@/components/motion/glass";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * VALLEY MAP
 * ─────────────────────────────────────────────────────────────────────────
 * Drawn here, not fetched.
 *
 * This used CARTO's `dark_nolabels` raster tiles until CARTO began requiring
 * an API key for raster and stamping every un-keyed tile with a repeating
 * "API KEY REQUIRED" watermark — which landed on the live site without
 * warning. Their free tier is real (5M tiles/month) and the key is free, but
 * a brochure map that shows eight towns does not need to be a third party's
 * uptime, terms, or billing decision. So the geography is drawn from a short
 * table of coordinates instead: the corridor freeways, the ridgelines that
 * define the Valley, and nothing else.
 *
 * What that buys: no key, no watermark, no attribution obligation, no 45 tile
 * requests, and it cannot break again on someone else's schedule. What it
 * costs: street-level detail, which nobody was navigating by.
 *
 * The projection is unchanged — real Web Mercator, same as the tiles used —
 * so every feature and every pin is placed from true lon/lat and the pins sit
 * on their towns by construction rather than by eye.
 *
 * The layer is a fixed pixel size centred in its container: 1:1 on a wide
 * screen, scaled by `--map-scale` below that, with the drawing and the markers
 * inside one wrapper so a pin cannot drift off its town. Before that the
 * container simply cropped the middle of a 2048px layer and the towns at each
 * end fell off the edges.
 */

const ZOOM = 11;
const TILE = 256;
const CENTER = { lat: 34.157, lon: -118.617 };
const LAYER = { w: 2048, h: 1024 };

const scale = Math.pow(2, ZOOM) * TILE;
const lonToX = (lon: number) => ((lon + 180) / 360) * scale;
const latToY = (lat: number) => {
  const r = (lat * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * scale;
};

const originX = lonToX(CENTER.lon) - LAYER.w / 2;
const originY = latToY(CENTER.lat) - LAYER.h / 2;

/** lon/lat → layer pixels. Everything drawn below goes through this. */
const at = (lon: number, lat: number): [number, number] => [
  lonToX(lon) - originX,
  latToY(lat) - originY,
];

const line = (pts: [number, number][]) =>
  pts
    .map(([lon, lat], i) => {
      const [x, y] = at(lon, lat);
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

const area = (pts: [number, number][]) => `${line(pts)} Z`;

/** Quadratic smoothing through the points — freeways bend, they don't kink. */
const curve = (pts: [number, number][], close = false) => {
  const P = pts.map(([lo, la]) => at(lo, la));
  if (P.length < 3) return line(pts);
  let d = `M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 1; i < P.length - 1; i++) {
    const [cx, cy] = P[i];
    const [nx, ny] = P[i + 1];
    d += ` Q${cx.toFixed(1)} ${cy.toFixed(1)} ${((cx + nx) / 2).toFixed(1)} ${((cy + ny) / 2).toFixed(1)}`;
  }
  const L = P[P.length - 1];
  d += ` L${L[0].toFixed(1)} ${L[1].toFixed(1)}`;
  return close ? `${d} Z` : d;
};

/*
  Drawn as a basin rather than as mountains.

  The first attempt filled the ranges as dark polygons, and clipped by the
  frame they read as black slabs laid over the picture — design blocks, not
  landscape. Inverting it works far better: light the valley FLOOR, leave
  everything around it as the dark ground, and soften the boundary so it
  reads as a basin rimmed by hills instead of a shape with an outline.

  It also happens to tell the truth about the service area. The San Fernando
  floor holds the five core towns; Calabasas, Agoura Hills and Thousand Oaks
  sit west through the hills in the Conejo, which is exactly why they are the
  "also serving" list.
*/
const SFV_FLOOR = curve(
  [
    [-118.70, 34.168], [-118.66, 34.196], [-118.625, 34.244], [-118.585, 34.286],
    [-118.52, 34.312], [-118.44, 34.316], [-118.375, 34.292], [-118.335, 34.242],
    [-118.345, 34.192], [-118.392, 34.152], [-118.452, 34.142], [-118.515, 34.146],
    [-118.575, 34.152], [-118.64, 34.158], [-118.70, 34.168],
  ],
  true,
);

/* The Conejo, west over the grade — smaller, and drawn fainter to match. */
const CONEJO_FLOOR = curve(
  [
    [-118.90, 34.196], [-118.855, 34.212], [-118.795, 34.208], [-118.755, 34.184],
    [-118.745, 34.152], [-118.79, 34.132], [-118.855, 34.136], [-118.895, 34.162],
    [-118.90, 34.196],
  ],
  true,
);

const FREEWAYS = {
  // US-101, the Ventura — the spine every town on the list sits along.
  us101: curve([
    [-119.02, 34.212], [-118.95, 34.196], [-118.885, 34.178], [-118.825, 34.160],
    [-118.760, 34.148], [-118.700, 34.142], [-118.645, 34.148], [-118.600, 34.162],
    [-118.550, 34.170], [-118.500, 34.164], [-118.450, 34.154], [-118.400, 34.144],
    [-118.345, 34.134], [-118.300, 34.126],
  ]),
  // I-405, crossing the 101 at the Sepulveda Pass.
  i405: curve([
    [-118.492, 34.315], [-118.486, 34.262], [-118.478, 34.212],
    [-118.471, 34.166], [-118.464, 34.126], [-118.452, 34.075],
  ]),
  // CA-118, the Reagan, across the north Valley.
  ca118: curve([
    [-118.72, 34.281], [-118.63, 34.280], [-118.54, 34.277],
    [-118.44, 34.273], [-118.36, 34.268],
  ]),
  // CA-27, Topanga Canyon, north–south on the west side.
  ca27: curve([[-118.603, 34.240], [-118.601, 34.196], [-118.598, 34.140], [-118.590, 34.086]]),
  // CA-170, the Hollywood, peeling north from the 101.
  ca170: curve([[-118.401, 34.148], [-118.397, 34.196], [-118.393, 34.244]]),
};

/*
  The towns sit roughly 150px apart at this zoom and the labels are wider than
  that, so pinning each name to its own dot guarantees collisions. Alternating
  them above and below the corridor puts ~300px between any two labels sharing
  a row, which clears every one of them, and a short leader keeps each name
  tied to its dot.
*/
const cities = [
  { name: "Thousand Oaks", lon: -118.837, lat: 34.17, core: false },
  { name: "Agoura Hills", lon: -118.762, lat: 34.153, core: false },
  { name: "Calabasas", lon: -118.66, lat: 34.138, core: false },
  { name: "Woodland Hills", lon: -118.605, lat: 34.168, core: true },
  { name: "Tarzana", lon: -118.553, lat: 34.173, core: true },
  { name: "Encino", lon: -118.501, lat: 34.159, core: true },
  { name: "Sherman Oaks", lon: -118.449, lat: 34.151, core: true },
  { name: "Studio City", lon: -118.396, lat: 34.14, core: true },
];

const LEADER = 58;

/*
  Two label systems, because the layer is scaled on small screens.

  At `lg` the layer is 1:1, so a 0.68rem pill is 0.68rem on screen and two
  tiers (above / below) leave ~184 layer-px between any two names sharing a
  tier — more than a 110px pill needs.

  Below `lg` the layer is scaled to 0.46, and that same pill lands at about
  5px: present, unreadable, which is the state this replaced. Sizing the type
  UP in layer coordinates fixes the reading and breaks the spacing — a pill
  legible after scaling is ~240 layer-px wide, wider than the 184 two tiers
  allow. Four tiers put same-tier names 4 towns apart (~368 layer-px), which
  clears them. Offsets are in layer pixels; multiply by 0.46 for the screen.
*/
const TIERS_SM = [-195, 105, -85, 210];

/** Leader runs from the dot to just short of the pill. */
function leader(offset: number) {
  const gap = 26;
  return offset < 0
    ? { top: offset + gap, height: Math.abs(offset) - gap }
    : { top: 0, height: offset - gap };
}

export function ValleyMap() {
  return (
    /* Taller than a map band would otherwise want to be: the towns sit on an
       east-west line but their labels stack four deep below `lg`, and the
       southernmost (Studio City) hangs lowest, so the box has to carry that. */
    <div className="valley-map relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[2.6/1]">
      {/* One wrapper, one transform — tiles and pins scale together, so the
          projection stays honest at every width. */}
      <div
        className="absolute left-1/2 top-1/2 origin-center"
        style={{
          width: LAYER.w,
          height: LAYER.h,
          transform: "translate(-50%, -50%) scale(var(--map-scale, 1))",
        }}
      >
        <svg
          aria-hidden
          className="absolute inset-0"
          width={LAYER.w}
          height={LAYER.h}
          viewBox={`0 0 ${LAYER.w} ${LAYER.h}`}
          preserveAspectRatio="none"
        >
          <defs>
            {/* Blurred edges: a basin has a rim, not an outline. */}
            <filter id="wke-soft" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="15" />
            </filter>
            <filter id="wke-soft-sm" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
            {/*
              The cross freeways genuinely run off past the Valley, but drawn
              at full strength to the frame edge they read as scratches across
              the picture rather than roads. Fading them out top and bottom
              lets them leave without drawing attention to where they stop.
            */}
            <linearGradient id="wke-roadfade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000" />
              <stop offset="16%" stopColor="#fff" />
              <stop offset="72%" stopColor="#fff" />
              <stop offset="96%" stopColor="#000" />
            </linearGradient>
            <mask id="wke-roadmask">
              <rect width={LAYER.w} height={LAYER.h} fill="url(#wke-roadfade)" />
            </mask>
            {/* Everything inside the floors, nothing outside. */}
            <mask id="wke-basin">
              <rect width={LAYER.w} height={LAYER.h} fill="#000" />
              <path d={SFV_FLOOR} fill="#fff" filter="url(#wke-soft)" />
            </mask>
            <mask id="wke-basin-w">
              <rect width={LAYER.w} height={LAYER.h} fill="#000" />
              <path d={CONEJO_FLOOR} fill="#fff" filter="url(#wke-soft-sm)" />
            </mask>
            {/* The Valley is famously gridded; at this zoom that texture is all
                of the street network that survives. */}
            <pattern id="wke-grid" width="46" height="46" patternUnits="userSpaceOnUse">
              <path
                d="M46 0V46M0 46H46"
                fill="none"
                stroke="hsl(36 16% 70%)"
                strokeWidth="1"
                opacity="0.3"
              />
            </pattern>
          </defs>

          {/* Ground — the hills, unlit. */}
          <rect width={LAYER.w} height={LAYER.h} fill="hsl(24 17% 8%)" />

          {/* The two floors, lit, with the street grid only where there are
              streets. The Conejo sits lower — it is the outer half of the area. */}
          <g mask="url(#wke-basin-w)">
            <rect width={LAYER.w} height={LAYER.h} fill="hsl(28 14% 13%)" />
            <rect width={LAYER.w} height={LAYER.h} fill="url(#wke-grid)" opacity="0.72" />
          </g>
          <g mask="url(#wke-basin)">
            <rect width={LAYER.w} height={LAYER.h} fill="hsl(30 15% 16%)" />
            <rect width={LAYER.w} height={LAYER.h} fill="url(#wke-grid)" />
          </g>

          {/* Freeways. The 101 is the one that matters — it is the service area
              in a single line — so it is brighter and heavier than the rest,
              and it alone is exempt from the fade, because it should read from
              one edge of the frame to the other. */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <g mask="url(#wke-roadmask)">
              {[FREEWAYS.i405, FREEWAYS.ca118, FREEWAYS.ca27, FREEWAYS.ca170].map((d, i) => (
                <path key={i} d={d} stroke="hsl(36 16% 72%)" strokeWidth="2.5" opacity="0.26" />
              ))}
            </g>
            <path d={FREEWAYS.us101} stroke="hsl(30 40% 70%)" strokeWidth="9" opacity="0.09" />
            <path d={FREEWAYS.us101} stroke="hsl(34 30% 78%)" strokeWidth="3.25" opacity="0.5" />
          </g>
        </svg>

        <Stagger gap={0.07} className="absolute inset-0">
          {cities.map((c, i) => {
            const above = i % 2 === 0;
            const offLg = above ? -LEADER : LEADER;
            const offSm = TIERS_SM[i % 4];
            const lLg = leader(offLg);
            const lSm = leader(offSm);
            /* The end towns would hang off the edge if centred on their dot at
               the wider small-screen pill size, so they anchor inward. */
            const anchor =
              i === 0
                ? "translate-x-0 lg:-translate-x-1/2"
                : i === cities.length - 1
                  ? "-translate-x-full lg:-translate-x-1/2"
                  : "-translate-x-1/2";
            return (
              <div
                key={c.name}
                className="absolute"
                style={{ left: lonToX(c.lon) - originX, top: latToY(c.lat) - originY }}
              >
                <StaggerItem>
                  <div className="relative">
                    {/* The dot marks the town; everything else hangs off it.
                        Scaled down on small screens, the dots would shrink to
                        nothing, so they grow back as the scale falls. */}
                    <span
                      className={
                        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full " +
                        (c.core
                          ? "size-4 bg-stamp shadow-[0_0_22px_6px_hsl(var(--stamp)/0.75)] lg:size-2 lg:shadow-[0_0_12px_3px_hsl(var(--stamp)/0.75)]"
                          : "size-3 bg-foreground/55 lg:size-1.5")
                      }
                    />
                    {/* Leader + name pill. The offsets and sizes differ per
                        breakpoint and are dynamic, so they ride in on custom
                        properties and `globals.css` picks the pair. */}
                    <span
                      aria-hidden
                      className="city-leader absolute left-0 w-px bg-foreground/25"
                      style={
                        {
                          "--lead-t-sm": `${lSm.top}px`,
                          "--lead-h-sm": `${lSm.height}px`,
                          "--lead-t-lg": `${lLg.top}px`,
                          "--lead-h-lg": `${lLg.height}px`,
                        } as React.CSSProperties
                      }
                    />
                    <span
                      className={`city-label absolute ${anchor}`}
                      style={
                        {
                          left: 0,
                          "--off-sm": `${offSm}px`,
                          "--off-lg": `${offLg}px`,
                        } as React.CSSProperties
                      }
                    >
                      <LiquidGlass
                        strength="soft"
                        className="glass-pill -translate-y-1/2 whitespace-nowrap px-8 py-[0.55rem] leading-none lg:px-4 lg:py-[0.3rem]"
                      >
                        <span
                          className={
                            "font-mono text-[1.4rem] uppercase tracking-[0.07em] lg:text-[0.68rem] " +
                            (c.core ? "text-foreground" : "text-foreground/70")
                          }
                        >
                          {c.name}
                        </span>
                      </LiquidGlass>
                    </span>
                  </div>
                </StaggerItem>
              </div>
            );
          })}
        </Stagger>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night/35 via-transparent to-night/55"
      />
    </div>
  );
}
