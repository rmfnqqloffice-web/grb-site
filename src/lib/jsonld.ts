import content from "@/content/content.json";

const BASE_URL = "https://grb-mkt.com";

export function buildOrganizationLD() {
  const c = content.company;
  const services = content.services.items.map((s) => s.name);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: c.name_ko,
    alternateName: [c.name_en, c.brand_abbr],
    url: BASE_URL,
    logo: `${BASE_URL}/icon`,
    description: c.description,
    slogan: c.tagline,
    email: c.email,
    telephone: `+82-${c.phone.replace(/^010/, "10").replace(/-/g, "-")}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
    },
    sameAs: [`https://${c.domain}`],
    knowsAbout: services,
  };
}
