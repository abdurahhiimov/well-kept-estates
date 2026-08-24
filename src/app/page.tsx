import { JsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/content";
import { faqSchema, organizationSchema, websiteSchema } from "@/lib/site";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { SettlementLedger } from "@/components/sections/settlement-ledger";
import { Commission } from "@/components/sections/commission";
import { ServiceArea } from "@/components/sections/service-area";
import { FounderNote } from "@/components/sections/founder-note";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[organizationSchema(), websiteSchema(), faqSchema(faqs)]}
      />
      <Hero />
      <HowItWorks />
      <SettlementLedger />
      <Commission />
      <FounderNote />
      <ServiceArea />
      <Faq />
      <CtaBand />
    </>
  );
}
