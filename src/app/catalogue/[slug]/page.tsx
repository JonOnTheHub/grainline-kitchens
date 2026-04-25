import { notFound }      from "next/navigation";
import { createClient }  from "@/lib/supabase/server";
import { KitchenModel }  from "@/lib/types";
import Navbar            from "@/components/nav/Navbar";
import Footer            from "@/components/ui/Footer";
import ProductHero       from "@/components/catalogue/ProductHero";
import ProductGallery    from "@/components/catalogue/ProductGallery";
import ProductDetails    from "@/components/catalogue/ProductDetails";
import ConfigSelector    from "@/components/catalogue/ConfigSelector";
import SpecsTable        from "@/components/catalogue/SpecsTable";

// Fallback for dev — remove once DB is seeded
const FALLBACK: KitchenModel[] = [
  {
    id: "1", slug: "the-burford", name: "THE BURFORD", series: "001",
    finish: "oak",
    description: "Heavy-duty raw oak carcass with a distinctive warm grain. Built for high-traffic culinary environments that demand structural honesty.",
    philosophy: "Structural honesty and functional beauty. The BURFORD is an exercise in restraint — every joint is exposed, every line serves a structural purpose. Engineered for architectural permanence using solid-core timber and precision-milled hardware.",
    price_from: 14200, currency: "GBP",
    specs: [
      { component: "BASE MODULE",    dimension: "600W × 870H × 600D", material: "RAW OAK / PLY",    tolerance: "+0.5MM" },
      { component: "WORKTOP",        dimension: "3000W × 40T × 650D", material: "STAINLESS STEEL",  tolerance: "+0.1MM" },
      { component: "DRAWER RUNNERS", dimension: "450L / 550L",        material: "BLUM MOVENTO",     tolerance: "STRESS TESTED" },
      { component: "PLINTH",         dimension: "VARIES × 100H",      material: "ANODISED ALU",     tolerance: "+1.0MM" },
    ],
    images: [
      "https://picsum.photos/seed/burford-a/800/900",
      "https://picsum.photos/seed/burford-b/800/900",
      "https://picsum.photos/seed/burford-c/800/900",
    ],
    is_featured: true, created_at: "",
  },
  {
    id: "2", slug: "the-arden", name: "THE ARDEN", series: "002",
    finish: "walnut",
    description: "Natural textures meeting industrial rigidity. A tactile exploration of neutral tones and exposed joinery.",
    philosophy: "The ARDEN series draws from mid-century workshop culture — tools visible, process honest. Walnut carcasses are matched for grain direction across every door front. Nothing is hidden.",
    price_from: 12800, currency: "GBP",
    specs: [
      { component: "BASE MODULE",    dimension: "600W × 870H × 600D", material: "WALNUT / PLY",     tolerance: "+0.5MM" },
      { component: "WORKTOP",        dimension: "3000W × 38T × 650D", material: "SOLID WALNUT",     tolerance: "+0.2MM" },
      { component: "DRAWER RUNNERS", dimension: "450L / 550L",        material: "BLUM MOVENTO",     tolerance: "STRESS TESTED" },
      { component: "PLINTH",         dimension: "VARIES × 100H",      material: "OILED OAK",        tolerance: "+1.0MM" },
    ],
    images: [
      "https://picsum.photos/seed/arden-a/800/900",
      "https://picsum.photos/seed/arden-b/800/900",
      "https://picsum.photos/seed/arden-c/800/900",
    ],
    is_featured: false, created_at: "",
  },
  {
    id: "3", slug: "the-langford", name: "THE LANGFORD", series: "003",
    finish: "painted",
    description: "Earthy, resilient, unapologetically bold. High-density core with organic pigmentation across 14 custom colours.",
    philosophy: "The LANGFORD is our most specified collection. Deep pigment painted shaker fronts on a solid MDF core — available in 14 custom colours. The island unit is designed to anchor the room, not hide in it.",
    price_from: 15500, currency: "GBP",
    specs: [
      { component: "BASE MODULE",    dimension: "600W × 870H × 600D", material: "MDF / PLY",        tolerance: "+0.5MM" },
      { component: "WORKTOP",        dimension: "3000W × 40T × 650D", material: "HONED GRANITE",    tolerance: "+0.3MM" },
      { component: "DRAWER RUNNERS", dimension: "450L / 550L",        material: "BLUM MOVENTO",     tolerance: "STRESS TESTED" },
      { component: "PLINTH",         dimension: "VARIES × 100H",      material: "PAINTED MDF",      tolerance: "+1.0MM" },
    ],
    images: [
      "https://picsum.photos/seed/langford-a/800/900",
      "https://picsum.photos/seed/langford-b/800/900",
      "https://picsum.photos/seed/langford-c/800/900",
    ],
    is_featured: false, created_at: "",
  },
];

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const model = FALLBACK.find((m) => m.slug === params.slug);
  return {
    title: model ? `${model.name} — Grainline Kitchens` : "Kitchen Model",
    description: model?.description ?? "",
  };
}

export default async function ProductPage({ params }: Props) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("kitchen_models")
    .select("*")
    .eq("slug", params.slug)
    .single();

  const model = (data as KitchenModel) ?? FALLBACK.find((m) => m.slug === params.slug);

  if (!model) notFound();

  return (
    <>
      <Navbar />
      <main>
        <ProductHero    model={model} />
        <ProductGallery model={model} />
        <ProductDetails model={model} />
        <ConfigSelector model={model} />
        <SpecsTable     model={model} />
      </main>
      <Footer />
    </>
  );
}