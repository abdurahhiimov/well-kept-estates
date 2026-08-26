"use client";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { LiquidGlass } from "@/components/motion/glass";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * VALLEY MAP
 * ─────────────────────────────────────────────────────────────────────────
 * Real map tiles, placed by hand.
 *
 * Tiles come from CARTO's `dark_nolabels` basemap rather than standard OSM.
 * Two reasons. It's already dark and desaturated, so it needs a light touch
 * instead of the heavy filter stack that was smearing OSM's bright tiles into
 * mud. And it ships without place names, so the only labels on the map are
 * ours — no competing with a printed "Tarzana" sitting next to our pin for it.
 *
 * Fixing centre and zoom ourselves (rather than handing a bounding box to
 * OSM's iframe embed, which snaps to whole zoom levels and reframes on its
 * own) means tiles and markers come out of the same Web Mercator projection,
 * so a pin lands on its town by construction.
 *
 * The tile layer is a fixed pixel size centred in its container. On a wide
 * screen it is shown 1:1. Narrower than that, the whole layer — tiles AND
 * markers together, inside one wrapper — is scaled down by `--map-scale`, so
 * a pin still lands on its town: both are in the same coordinate space and
 * the same transform applies to both. Without this the container simply
 * cropped the middle of a 2048px layer and the outer towns (Thousand Oaks on
 * one end, Studio City on the other) fell off the edges entirely.
 *
 * The tiles are @2x, so they survive being scaled down — at 0.46 they are
 * still supersampled rather than blurred.
 *
 * The name pills do NOT survive it: scaled with the layer they become
 * illegible, and counter-scaling them back up makes neighbours overlap, since
 * the towns sit ~150px apart and a pill is wider than that. So below `lg` the
 * pins carry the geography on their own and the town list underneath the map
 * does the naming.
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

const tiles: { x: number; y: number }[] = [];
for (let x = Math.floor(originX / TILE); x <= Math.floor((originX + LAYER.w) / TILE); x++) {
  for (let y = Math.floor(originY / TILE); y <= Math.floor((originY + LAYER.h) / TILE); y++) {
    tiles.push({ x, y });
  }
}

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
        <div aria-hidden className="map-tint absolute inset-0">
          {tiles.map((t) => (
            <img
              key={`${t.x}-${t.y}`}
              src={`https://basemaps.cartocdn.com/dark_nolabels/${ZOOM}/${t.x}/${t.y}@2x.png`}
              alt=""
              loading="lazy"
              width={TILE}
              height={TILE}
              className="absolute max-w-none"
              style={{ left: t.x * TILE - originX, top: t.y * TILE - originY }}
            />
          ))}
        </div>

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
