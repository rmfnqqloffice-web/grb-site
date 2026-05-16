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
    description:
      "그룹비(GROUPB)는 검색·바이럴·모바일·온라인·오프라인·언론·영상 등 7대 마케팅을 전 분야의 전문 마케터가 집행하는 퍼포먼스 마케팅 에이전시입니다.",
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
