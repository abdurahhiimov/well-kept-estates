/**
 * Well Kept Estates — site content & business config.
 *
 * Everything a non-developer might want to change lives here: contact details,
 * commission numbers, the service area, process steps, and the sample
 * settlement report. Edit this file, not the components.
 *
 * Phone and email are live and real — the settlement report and the referral
 * pitch both promise one person answers, so these have to reach him.
 *
 * ⚠️  PLACEHOLDER — still to replace:
 *   - founder.name       (blank; the note signs "The founder" until set)
 */

export const business = {
  name: "Well Kept Estates",
  tagline: "Estate sales in the San Fernando Valley.",
  /** Footer line — the two-meaning name, said once, not explained. */
  motto: "What was well kept deserves to be well handled.",
  /** The five-step chain, for the footer. */
  processChain: "Sorting · Pricing · Staging · Selling · Settlement",
};

export const contact = {
  // Google Voice line — one person answers, so we don't promise 24/7.
  phone: "(424) 395-7965",
  phoneHref: "tel:+14243957965",
  email: "wellkeptestates@gmail.com",
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
    a: "Most estate sale companies in Los Angeles charge between 30% and 50% of gross sales. I charge 30% of gross with a $1,500 minimum. There is no setup fee and you pay nothing up front — my commission comes out of what the sale brings in, and if the sale brings in nothing, you owe nothing beyond the minimum we agreed to in writing.",
  },
  {
    q: "How long does an estate sale take from start to finish?",
    a: "Two to three weeks in most homes. Day one is a free walkthrough. The first week covers the agreement and the start of sorting and pricing. The second week is research and staging. The sale runs over a weekend, and I hand you your settlement report and your proceeds the day it closes. If the house is larger or more tangled than usual, I'll tell you that up front rather than after we've started.",
  },
  {
    q: "Do I have to be there during the estate sale?",
    a: "No. Most families choose not to be, and that's usually the easier choice — it's hard to watch strangers handle a parent's belongings. You're welcome to be there if you'd rather. Either way you get the same written record of what sold.",
  },
  {
    q: "How do I know what actually sold and for how much?",
    a: "You get a settlement report when the sale closes. I list notable pieces line by line with what they brought and the time they sold, total everyday goods by the lot, and back every donation with a receipt. The total on the report is the total I count out to you, so the two always reconcile.",
  },
  {
    q: "What happens to whatever doesn't sell?",
    a: "Nothing gets thrown out without you knowing. We decide together on the next step: donation through a partner charity, with receipts you can use on the estate's return, or haul-away — whichever you prefer, on your timeline. I arrange the pickup and the hauler bills you directly at their price. I never mark it up and I take no commission on it.",
  },
  {
    q: "Do you do the cleanout too?",
    a: "No, and that's deliberate. I run the sale — pricing, staging, sale days, and the settlement report. Cleanout is a different job done well by different people, so I arrange it for you and they bill you separately, rather than bundling it into a rate that hides what you're paying for.",
  },
  {
    q: "What is the difference between an estate sale and an estate liquidation?",
    a: "In practice the terms are used interchangeably. Where people do draw a line: an estate sale is usually run in the home over a weekend and open to the public, while a liquidation can also mean a buyout, an auction, or a consignment arrangement. I run sales in the home.",
  },
  {
    q: "Will you buy the contents of the house outright?",
    a: "No. A buyout is a single price paid before anyone knows what the contents are worth, and the buyer keeps the upside. I work on consignment instead, which means the only way my fee grows is if your proceeds grow first.",
  },
  {
    q: "Do I need to clean or sort anything before you come?",
    a: "No — please don't. Don't throw anything away and don't tidy up. Full drawers and untouched closets are where the value usually hides, and plenty of valuable pieces have gone out in a donation bag before anyone priced them. Let me see the house as it is. Sorting is the job, not the preparation for it.",
  },
  {
    q: "What if some things are staying in the family?",
    a: "That's completely fine. Point those things out during the walkthrough and I'll record them before pricing starts, so nothing depends on anyone's memory later. Anything set aside for family gets held, not sold.",
  },
  {
    q: "When do I get paid after an estate sale?",
    a: "The same day the sale closes. I total the sale, hand over the settlement report, and count out your proceeds before the house is locked up. Nothing sits in someone else's account waiting on a check to clear.",
  },
  {
    q: "How much will my estate sale bring in?",
    a: "I can't answer that honestly without walking the house first, and anyone who quotes you a number over the phone is guessing. The walkthrough is free, takes about an hour, and ends with a straight answer about whether a sale is worth running at all.",
  },
  {
    q: "Is my house too small for an estate sale?",
    a: "Possibly, and I'll tell you so plainly. The $1,500 minimum exists because a sale below roughly $5,000 in gross doesn't leave enough for the family to be worth the work. If the walkthrough shows a sale isn't the right answer, I'll name the better options — a donation pickup, a consignment shop, a single-lot buyer — at no charge.",
  },
  {
    q: "Do you work with probate attorneys and professional fiduciaries?",
    a: "Yes, and I built the reporting for it. When there's a duty to account for a decedent's personal property, an itemized and timestamped record with donation receipts is the difference between an accounting that stands and one that gets questioned. Attorneys and licensed fiduciaries can refer a matter to me directly.",
  },
  {
    q: "Which areas do you cover?",
    a: "The San Fernando Valley — Encino, Sherman Oaks, Studio City, Woodland Hills and Tarzana as the core area, with Calabasas, Agoura Hills and Thousand Oaks also served. Staying local is the point: I can get to the house quickly and be there myself on sale day rather than sending a crew. If you're nearby but don't see your city listed, ask anyway.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "No. The agreement is a short written document covering dates, what's included, and the 30% / $1,500-minimum fee in plain language. Nothing starts until you've signed it, and the walkthrough before it carries no obligation.",
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
