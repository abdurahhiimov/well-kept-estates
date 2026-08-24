/**
 * Well Kept Estates — site content & business config.
 *
 * Everything a non-developer might want to change lives here: contact details,
 * commission numbers, the service area, process steps, and the sample
 * settlement report. Edit this file, not the components.
 *
 * ⚠️  PLACEHOLDERS — replace before launch:
 *   - founder.name       (currently blank; the note reads fine without it)
 *   - contact.phone      (fictional 555 number)
 *   - contact.email      (domain not confirmed)
 */

export const business = {
  name: "Well Kept Estates",
  tagline: "Estate sales in the San Fernando Valley.",
};

export const contact = {
  // Google Voice line — one person answers, so we don't promise 24/7.
  phone: "(818) 555-0143",
  phoneHref: "tel:+18185550143",
  email: "hello@wellkeptestates.space",
  hours: "One person reads every message. You'll hear back within one business day.",
};

export const founder = {
  // Leave `name` blank to sign the note "— The founder"; fill it in to sign by name.
  name: "",
  role: "Founder",
};

/** Commission: 30% of gross sales, $1,500 minimum. Stated plainly everywhere. */
export const commission = {
  rate: 0.3,
  rateLabel: "30%",
  minimum: 1500,
  minimumLabel: "$1,500",
  summary: "30% of gross sales, $1,500 minimum. No setup fees, no surprises.",
};

/** Cities we cover — intentionally local, not "all of SoCal". */
export const serviceArea = {
  core: ["Encino", "Sherman Oaks", "Studio City", "Woodland Hills", "Tarzana"],
  extended: ["Calabasas", "Agoura Hills", "Thousand Oaks"],
};

/** How it works — first walkthrough to settlement, ~2–3 weeks. */
export const processSteps = [
  {
    week: "Day one",
    title: "A free walkthrough",
    body: "We meet at the house and walk the rooms together. You show me what's staying and what's going. No pressure, no fee, and no obligation to hire me at the end of it.",
  },
  {
    week: "Week one",
    title: "The plan and the paperwork",
    body: "You get a simple written agreement — dates, what's included, and the 30% / $1,500-minimum fee in plain language. Nothing starts until you've signed off.",
  },
  {
    week: "Weeks one–two",
    title: "Sorting, research, and staging",
    body: "I go through the home room by room — pricing the everyday, researching what might be worth more, and setting the house up to shop well. Anything set aside for family gets held, not sold.",
  },
  {
    week: "The weekend",
    title: "Sale day",
    body: "The doors open. Prices are marked and I log the sale as it runs — the notable pieces line by line, everyday goods by the lot. You're welcome to be there or to stay away entirely.",
  },
  {
    week: "Week two–three",
    title: "Settlement, same day",
    body: "I total the sale, hand you the settlement report, and count out your proceeds before I leave. Whatever didn't sell, I line up a donation pickup or a hauler on your timeline — arranged for you, billed separately, never marked up.",
  },
];

/**
 * Sample settlement report — clearly labelled "sample" so it never reads as a
 * real past client (there are none yet). Numbers are illustrative.
 */
export const sampleLedger = {
  estateLabel: "Sample estate · Sherman Oaks",
  dayLabel: "Saturday — sale day",
  rows: [
    { item: "Mid-century walnut credenza", category: "Furniture", price: 420, time: "10:14 AM" },
    { item: "Noritake china, service for 12", category: "Kitchen", price: 185, time: "10:31 AM" },
    { item: "Craftsman cabinet table saw", category: "Garage", price: 260, time: "11:02 AM" },
    { item: "Leather wingback chair", category: "Furniture", price: 140, time: "11:20 AM" },
    { item: "Kitchenware, 3 lots", category: "Lot", price: 95, time: "11:47 AM" },
    { item: "Signed landscape oil painting", category: "Art", price: 310, time: "12:05 PM" },
    { item: "Persian wool rug, 6×9", category: "Rugs", price: 540, time: "12:38 PM" },
    { item: "Clothing & linens, 11 bags", category: "Donation", price: 0, time: "3:10 PM", receipt: "#4471" },
    { item: "Household goods, 4 boxes", category: "Donation", price: 0, time: "3:24 PM", receipt: "#4472" },
  ],
  // Full-sale totals summarised in the footer (one estate, not a company stat).
  totals: {
    gross: 18940,
    itemsSold: 214,
    donations: 37,
    commission: 5682, // gross * 0.30
    net: 13258, // gross - commission
  },
};

/**
 * FAQ — the questions people actually type, answered in the shortest honest
 * form. Kept short on purpose: an assistant lifts a paragraph, not an essay,
 * and a hedged answer gets skipped in favour of one that commits.
 *
 * Every answer here has to stay true to the model — 30% / $1,500 minimum, no
 * cleanout, same-day settlement, one person doing the work. If the business
 * changes, these change first.
 */
export const faqs = [
  {
    q: "What does an estate sale company charge?",
    a: "Most estate sale companies in Los Angeles charge between 30% and 50% of gross sales. Well Kept Estates charges 30% of gross with a $1,500 minimum. There is no setup fee and nothing is paid up front — the commission comes out of what the sale brings in, and if the sale brings in nothing, you owe nothing beyond the minimum agreed in writing.",
  },
  {
    q: "How long does an estate sale take from start to finish?",
    a: "Two to three weeks in most homes. Day one is a free walkthrough. The first week covers the agreement and the start of sorting and pricing. The second week is research and staging. The sale itself runs over a weekend, and you get your settlement report and your proceeds the day it closes.",
  },
  {
    q: "Do I have to be there during the estate sale?",
    a: "No. Most families choose not to be, and that is usually the easier choice — it is hard to watch strangers handle a parent's belongings. You are welcome to be there if you would rather. Either way you get the same written record of what sold.",
  },
  {
    q: "How do I know what actually sold and for how much?",
    a: "You get a settlement report at the close of the sale. Notable pieces are listed line by line with what they brought and the time they sold; everyday goods are totalled by the lot; every donation is backed by a receipt. The total on the report is the total that gets counted out to you, so the two always reconcile.",
  },
  {
    q: "What happens to whatever doesn't sell?",
    a: "Nothing gets thrown out without you knowing. What is left over is donated through a partner charity, with receipts you can use on the estate's return, or hauled away — whichever you prefer, on your timeline. That pickup is arranged for you and billed by the hauler at their price. It is never marked up and no commission is taken on it.",
  },
  {
    q: "Do you do the cleanout too?",
    a: "No, and that is deliberate. Well Kept Estates runs the sale — pricing, staging, sale days, and the settlement report. Cleanout is a different job done well by different people, so it gets arranged for you and billed separately rather than bundled into a rate that hides what you are paying for.",
  },
  {
    q: "What is the difference between an estate sale and an estate liquidation?",
    a: "In practice the terms are used interchangeably. Where people do draw a line: an estate sale is usually run in the home over a weekend and open to the public, while a liquidation can also mean a buyout, an auction, or a consignment arrangement. Well Kept Estates runs sales in the home.",
  },
  {
    q: "Will you buy the contents of the house outright?",
    a: "No. A buyout is a single price paid before anyone knows what the contents are worth, and the buyer keeps the upside. Working on commission means the only way the fee grows is if your proceeds grow first.",
  },
  {
    q: "Do I need to clean or sort anything before you come?",
    a: "No. Do not throw anything away and do not tidy up — full drawers and untouched closets are where the value usually hides, and more than one valuable piece has gone out in a bag before the sale was ever priced. Sorting is the job, not the preparation for it.",
  },
  {
    q: "What if some things are staying in the family?",
    a: "Anything set aside for family gets held, not sold. The walkthrough on day one is where you point those things out, and they are recorded before pricing starts so nothing depends on anyone's memory later.",
  },
  {
    q: "When do I get paid after an estate sale?",
    a: "The same day the sale closes. The sale is totalled, the settlement report is handed over, and your proceeds are counted out before the house is locked up. Nothing sits in someone else's account waiting on a check to clear.",
  },
  {
    q: "How much will my estate sale bring in?",
    a: "Nobody can answer that honestly without walking the house first, and anyone who quotes a number over the phone is guessing. The walkthrough is free, takes about an hour, and ends with a straight answer about whether a sale is worth running at all.",
  },
  {
    q: "Is my house too small for an estate sale?",
    a: "Possibly, and you will be told so plainly. The $1,500 minimum exists because a sale below roughly $5,000 in gross does not leave enough for the family to be worth the work. If a walkthrough shows a sale is not the right answer, the better options — a donation pickup, a consignment shop, a single-lot buyer — get named at no charge.",
  },
  {
    q: "Do you work with probate attorneys and professional fiduciaries?",
    a: "Yes, and the reporting is built for it. When there is a duty to account for a decedent's personal property, an itemized and timestamped record with donation receipts is the difference between an accounting that stands and one that gets questioned. Attorneys and licensed fiduciaries can refer a matter directly.",
  },
  {
    q: "Which areas do you cover?",
    a: "The San Fernando Valley — Encino, Sherman Oaks, Studio City, Woodland Hills and Tarzana as the core area, with Calabasas, Agoura Hills and Thousand Oaks also served. Staying local is the point: it means being at the house quickly and being there on sale day rather than sending a crew.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "No. The agreement is a short written document covering dates, what is included, and the 30% / $1,500-minimum fee in plain language. Nothing starts until you have signed it, and the walkthrough before it carries no obligation.",
  },
];

export const nav = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "The record", href: "/the-record" },
  { label: "Pricing", href: "/#pricing" },
  { label: "For attorneys", href: "/for-attorneys" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export const cta = {
  label: "Book a free walkthrough",
  href: "/contact",
};
