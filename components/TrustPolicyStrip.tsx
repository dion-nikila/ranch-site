import { FineIcon } from "./icons";

const policies = [
  {
    title: "Weight & Age Requirements",
    icon: "scale",
    body: [
      "Riders must meet age and weight guidelines.",
      "Trail rides are typically recommended for ages 7+.",
      "Contact us for special accommodations.",
    ],
  },
  {
    title: "Cancellation Policy",
    icon: "calendar",
    body: [
      "Free rescheduling up to 24-48 hours before your experience.",
      "Weather-related changes are handled with care.",
      "No-shows may be subject to a fee.",
    ],
  },
  {
    title: "What to Wear",
    icon: "boot",
    body: [
      "Closed-toe shoes or boots required.",
      "Long pants recommended.",
      "Helmets provided where required.",
    ],
  },
];

export function TrustPolicyStrip() {
  return (
    <section id="resources" className="bg-[linear-gradient(180deg,#F3EFE7_0%,#F8F5EF_100%)] py-8">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {policies.map((policy) => (
            <article className="group border border-[var(--border)] bg-[rgba(255,253,248,0.58)] p-6 transition-colors hover:border-[var(--gold)]" key={policy.title}>
              <div className="flex items-center gap-4">
                <FineIcon name={policy.icon} className="h-9 w-9 shrink-0 text-[var(--muted)] transition-colors group-hover:text-[var(--gold)]" />
                <h3 className="font-serif text-2xl font-light text-[var(--text)]">{policy.title}</h3>
              </div>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-[var(--muted)]">
                {policy.body.map((line) => (
                  <li className="flex gap-2" key={line}>
                    <span className="mt-[0.65rem] h-px w-3 shrink-0 bg-[var(--gold)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
