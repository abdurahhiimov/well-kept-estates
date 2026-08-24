import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { founder } from "@/lib/content";

export function FounderNote() {
  const signature = founder.name.trim() || "The founder";

  return (
    <section className="border-y border-border bg-secondary/50 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[minmax(0,14rem)_1fr] md:items-start md:gap-16">
          {/* Photo placeholder — an honest empty frame, not a stock photo. */}
          <Reveal>
            <figure className="mx-auto w-full max-w-[14rem]">
              <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden border border-dashed border-border bg-card">
                <div aria-hidden className="ruled absolute inset-0 opacity-40" />
                <div className="relative text-center">
                  <span className="font-display text-4xl font-semibold text-muted-foreground">
                    WK
                  </span>
                  <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                    Photo to come
                  </p>
                </div>
              </div>
            </figure>
          </Reveal>

          <div>
            <Reveal>
              <SectionLabel>A note from the founder</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="space-y-6 font-display text-[1.35rem] font-medium leading-[1.45] text-foreground sm:text-[1.7rem]">
                <p>
                  I started Well Kept Estates because I kept seeing families
                  handed an impossible job at the worst possible time — a whole
                  house of belongings to deal with, on a deadline, while they
                  were still grieving or just worn out.
                </p>
                <p>
                  I take one estate at a time, myself. I sort the drawers, price
                  the furniture, and run the sale. And because you deserve to
                  see exactly what became of your family&apos;s things, I write
                  it down as it goes — what sold, what it brought, what was
                  given away.
                </p>
                <p>
                  That&apos;s the whole idea: take care of what someone kept,
                  and keep an honest record of it.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 max-w-sm">
              <RuleDraw accent />
              <p className="pt-3 font-mono text-xs text-muted-foreground">
                <span className="text-foreground">{signature}</span> · Well Kept
                Estates, San Fernando Valley
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
