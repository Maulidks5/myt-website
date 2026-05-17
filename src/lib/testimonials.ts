export type Testimonial = {
  name: string;
  company: string;
  service: string;
  rating: number;
  comment: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Asha Suleiman",
    company: "Zanzibar Coastal Tours",
    service: "Business Website",
    rating: 5,
    comment:
      "Mwambao helped us present our tours professionally online. The site is fast, clean, and customers can reach us much easier now.",
  },
  {
    name: "Hassan Ali",
    company: "Kariakoo Traders",
    service: "Custom System",
    rating: 5,
    comment:
      "The dashboard made our daily records simpler. We now track inquiries and customer information without depending on notebooks.",
  },
  {
    name: "Neema Juma",
    company: "Savora Restaurant",
    service: "Brand Identity",
    rating: 5,
    comment:
      "They understood the feeling we wanted for our brand and delivered visuals that look modern and consistent across every platform.",
  },
  {
    name: "Yusuf Abdalla",
    company: "Ocean Apparel",
    service: "E-commerce Website",
    rating: 5,
    comment:
      "Our products are easier to browse and customers ask better questions because the website explains everything clearly.",
  },
  {
    name: "Mariam Said",
    company: "Island Events",
    service: "Photography & Videography",
    rating: 5,
    comment:
      "The event coverage was sharp and delivered on time. We used the photos and short videos immediately for promotion.",
  },
  {
    name: "Khalid Omar",
    company: "Blue Wave Services",
    service: "Social Media Management",
    rating: 5,
    comment:
      "Their content planning gave our pages a more professional look and helped us stay consistent with posting.",
  },
];
