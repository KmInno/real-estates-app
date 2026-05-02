import { HomeNavbar } from "../components/home/HomeNavbar";
import HomeHero from "../components/home/HomeHero";
import { SearchProperty } from "../components/home/SearchProperty";
import { FeaturedCategories } from "../components/home/FeaturedProperties";
import { WhyChooseUs } from "../components/home/WhyChooseUs";
import { WhatWeOffer } from "../components/home/WhatWeOffer";
import { HomeContact } from "../components/home/HomeContact";
import { HomeFooter } from "../components/home/HomeFooter";

export function Home() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <HomeNavbar />
      <HomeHero />
      <SearchProperty />
      <FeaturedCategories />
      <WhyChooseUs />
      <WhatWeOffer />
      <HomeContact />
      <HomeFooter />
    </div>
  );
}
