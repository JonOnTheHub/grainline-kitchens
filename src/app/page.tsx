import Navbar          from "@/components/nav/Navbar";
import Hero            from "@/components/home/Hero";
import HeroImage       from "@/components/home/HeroImage";
import StatsBand       from "@/components/home/StatsBand";
import CatalogueGrid   from "@/components/home/CatalogueGrid";
import Testimonial     from "@/components/home/Testimonial";
import ContactSection  from "@/components/home/ContactSection";
import Footer          from "@/components/ui/Footer";
import { createClient } from "@/lib/supabase/server";
import { KitchenModel } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: models } = await supabase
    .from("kitchen_models")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroImage />
        <StatsBand />
        <CatalogueGrid models={(models as KitchenModel[]) ?? []} />
        <Testimonial />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}