import Navbar from "../_components/Navbar";
import Footer from "../_components/Footer";
import FaqAccordion from "./_components/FaqAccordion";
import styles from "./page.module.css";

const categories = [
  {
    label: "The Festival",
    items: [
      {
        question: "What is Thingyan?",
        answer:
          "Thingyan is the traditional Burmese New Year water festival, typically celebrated in April. In Rakhine culture, it marks the end of the old year and the beginning of the new — water is poured and splashed to wash away misfortune and welcome renewal. [Placeholder — fill in with real copy.]",
      },
      {
        question: "What should I wear?",
        answer:
          "Come dressed in clothes you don't mind getting wet. Light, casual, and colorful attire is encouraged. Many attendees wear traditional Rakhine or Myanmar dress for the opening ceremony. Water shoes or sandals are recommended. [Placeholder — fill in with real copy.]",
      },
      {
        question: "Is the festival free to attend?",
        answer:
          "Yes — the festival is free and open to everyone. Some food stalls and activities may have a small cost. Donations to the Rakhine Community of Iowa are always welcome and go directly toward making the event possible. [Placeholder — fill in with real copy.]",
      },
      {
        question: "Can I bring children?",
        answer:
          "Absolutely. The festival is a family-friendly event with activities for all ages. Children are especially welcome at the water area — just bring extra clothes and sunscreen. [Placeholder — fill in with real copy.]",
      },
    ],
  },
  {
    label: "Location & Parking",
    items: [
      {
        question: "Where is the festival held?",
        answer:
          "The festival is held in Des Moines, Iowa. The exact venue for 2026 will be announced soon — check back here or follow us on social media for updates. [Placeholder — fill in with real copy.]",
      },
      {
        question: "Is parking available on-site?",
        answer:
          "Parking details will be confirmed once the venue is announced. We'll share information on nearby lots, street parking, and accessible spaces closer to the event. [Placeholder — fill in with real copy.]",
      },
      {
        question: "Can I get there by public transit?",
        answer:
          "Des Moines Metro operates bus routes throughout the city. Once the venue is confirmed, we'll share the nearest stop and route information here. [Placeholder — fill in with real copy.]",
      },
    ],
  },
  {
    label: "Get Involved",
    items: [
      {
        question: "How do I volunteer?",
        answer:
          "We welcome volunteers of all experience levels. Fill out the contact form on our Contact page with 'volunteer' in your message and our committee will be in touch with more details. [Placeholder — fill in with real copy.]",
      },
      {
        question: "How can I become a sponsor?",
        answer:
          "Sponsorship packages are available for local businesses and organizations of all sizes. Reach out via the Contact page and mention you're interested in sponsoring — we'll send our sponsorship packet. [Placeholder — fill in with real copy.]",
      },
      {
        question: "Can I make a donation?",
        answer:
          "Yes — the Rakhine Community of Iowa is a nonprofit and all donations go directly toward organizing the festival. Please contact us for donation details. [Placeholder — fill in with real copy.]",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className={styles.page}>
      <Navbar activePage="faq" />

      <section className={styles.hero}>
        <span className={styles.ghostText} aria-hidden="true">
          FAQ
        </span>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Questions &amp; Answers</p>
          <h1 className={styles.title}>Everything you need&nbsp;to know</h1>
          <p className={styles.lead}>
            Find answers to the most common questions about the festival,
            location, and how to get involved. Still have questions?{" "}
            <a href="/contact" className={styles.leadLink}>
              Reach out directly.
            </a>
          </p>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.categories}>
          {categories.map((cat) => (
            <div key={cat.label} className={styles.category}>
              <p className={styles.categoryLabel}>{cat.label}</p>
              <FaqAccordion items={cat.items} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
