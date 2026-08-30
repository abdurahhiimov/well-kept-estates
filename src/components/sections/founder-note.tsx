import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { founder } from "@/lib/content";

export function FounderNote() {
  const signature = founder.name.trim() || "The founder";

  return (
    <section className="border-y border-border bg-secondary/50 py-20 md:py-28">
      <div className="container">
        {/*
          No portrait. The note is the founder's voice and carries itself —
          an empty frame captioned "photo to come" advertised something
          missing, and a face was never what this section asks anyone to
          trust. Set in a single measured column instead.
        */}
        <div className="mx-auto max-w-3xl">
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
            {/* Still no portrait — the reasoning above holds. The mark is a
                different thing: a seal at the foot of the note, next to the
                signature, the way a stamp sits under a signed page. */}
            <Reveal delay={0.1} className="mt-8 flex max-w-md items-center gap-4">
              <Image
                src="/logo-emblem.png"
                alt=""
                width={560}
                height={416}
                className="h-14 w-auto shrink-0 opacity-90"
              />
              <div className="min-w-0 flex-1">
                <RuleDraw accent />
                <p className="pt-3 font-mono text-xs text-muted-foreground">
                  <span className="text-foreground">{signature}</span> · Well
                  Kept Estates, San Fernando Valley
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
