import { Product, Testimonial } from "./types";

export const JEWELLERY_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Kootenay Shore Sapphire Ring",
    category: "Rings",
    price: 1850,
    description: "Features a deep teal-blue Australian sapphire, hand-set in a heavy textured 14k yellow gold band. The texture mimics the gentle waves hitting the stone shores of Kootenay Lake.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    materials: ["14k Recycled Yellow Gold", "1.2ct Teal Blue Sapphire"],
    dimensions: "Size 7 (resizable within 1 size)",
    isPopular: true
  },
  {
    id: "prod-2",
    name: "Nelson Forest Fern Pendant",
    category: "Necklaces",
    price: 420,
    description: "An elegant, oxidised sterling silver pendant crafted from a detailed direct cast of a wild fern frond found deep in the Nelson pine forests. Hangs on a sturdy 18-inch wheat chain.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    materials: ["925 Sterling Silver", "Oxidised finish"],
    dimensions: "Pendant: 35mm x 12mm; Chain: 18 inches",
    isPopular: true
  },
  {
    id: "prod-3",
    name: "Kokanee Peak Quartz Earrings",
    category: "Earrings",
    price: 380,
    description: "Dangling sterling silver drops ending in raw, hand-wrapped double-terminated Nelson mountain quartz crystals. Captures the icy clarity of the alpine glaciers.",
    image: "/src/assets/images/quartz_earrings_1781730029011.jpg",
    materials: ["925 Sterling Silver", "Local Double-Terminated Quartz"],
    dimensions: "Drop depth: 42mm",
    isPopular: false
  },
  {
    id: "prod-4",
    name: "Slocan Slate cuff",
    category: "Bracelets",
    price: 780,
    description: "A wide, brutalist sterling silver cuff with a hand-carved geological texture resembling the stratified Slocan Valley slate cliffs. Bold yet exceptionally comfortable.",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    materials: ["925 Sterling Silver", "Brushed Texture"],
    dimensions: "Width: 15mm; Inside circumference: 6.5 inches (adjustable)",
    isPopular: true
  },
  {
    id: "prod-5",
    name: "Valhalla Emerald Drops",
    category: "Earrings",
    price: 1240,
    description: "Stately 18k yellow gold drops featuring vibrant pear-cut emeralds, suspended from dainty golden pine sprigs. Inspired by the evergreen canopies of Valhalla Provincial Park.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    materials: ["18k Yellow Gold", "Two 0.65ct Pear Emeralds"],
    dimensions: "Total length: 28mm",
    isPopular: false
  },
  {
    id: "prod-6",
    name: "Glacier Stream Aquamarine Ring",
    category: "Rings",
    price: 2100,
    description: "A stunning, sparkling ice-blue aquamarine stone embraced by a flowing, liquid-metal style silver and gold band. Captures the essence of fresh glacial streams in Nelson's highlands.",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800",
    materials: ["925 Sterling Silver", "14k Rose Gold Accent", "1.5ct Hexagonal Aquamarine"],
    dimensions: "Size 6.5 (resizable)",
    isPopular: true
  },
  {
    id: "prod-7",
    name: "Moss Agate Bespoke Band",
    category: "Custom Pieces",
    price: 1950,
    description: "A gorgeous modern bezel-set forest green moss agate with internal dendritic structures that appear like actual forest moss. Custom requested band with hand-carved leaves.",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800",
    materials: ["14k Palladium White Gold", "Rose-cut Moss Agate"],
    dimensions: "Bespoke commission",
    isPopular: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Sarah Jenkins",
    location: "Nelson, BC",
    text: "Alexandra created the most beautiful custom engagement ring for us. She took my chaotic ideas and spun them into a piece of wearable art that represents our love for the Kootenays so perfectly. I cannot recommend her craftsmanship enough!",
    rating: 5
  },
  {
    id: "t-2",
    name: "Michael Chen",
    location: "Vancouver, BC",
    text: "I purchased the Slocan Slate Cuff as an anniversary gift for my wife, and she was speechless. The raw, organic texture of the silver is even more stunning in person than online. It has this solid, comforting weight to it.",
    rating: 5
  },
  {
    id: "t-3",
    name: "Elena Rostova",
    location: "Calgary, AB",
    text: "So incredibly happy with my Nelson Forest Fern Pendant! It arrived beautifully packaged in a handmade cedar keepsake box. The level of detail from the actual needle outline of the fern is breathtaking.",
    rating: 5
  }
];

export const CUSTOM_PROCESS_STEPS = [
  {
    step: "01",
    title: "The Consultation",
    description: "Whether in our quiet Nelson heritage studio or via a virtual call, we discuss your vision, inspiration, style preferences, and stone selections. We help outline a path that honors your budget and expectations."
  },
  {
    step: "02",
    title: "Sketches & Wax Carving",
    description: "Alexandra hand-renders scaled sketches showing multiple view profiles. For complex sculptural works, she hand-carves a 1:1 scale replica in jewelers' wax so you can visualize the exact profile and dimensionality."
  },
  {
    step: "03",
    title: "Gemstone Sourcing",
    description: "We work with small-scale ethical lapidaries to source exquisite, uniquely cut gemstones. Whether you seek brilliant cut teal sapphires, raw forest moss agates, or conflict-free Canadian diamonds."
  },
  {
    step: "04",
    title: "Handcrafting & Finishing",
    description: "Using traditional goldsmithing techniques (alloying, forging, soldering, and stone-setting), Alexandra builds your piece from scratch. Nothing is mass-produced. Each strike of the hammer is deliberate."
  }
];

export const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800",
    caption: "The textured sterling silver pendant catching the late afternoon Nelson sun.",
    category: "lifestyle"
  },
  {
    url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    caption: "Artisan gemstone setting session using magnifying loops and micro-chisels.",
    category: "behind-the-scenes"
  },
  {
    url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    caption: "The completed Shore Aquamarine Ring before final cedar boxing.",
    category: "product"
  },
  {
    url: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800",
    caption: "Handcrafted rings being detailed using classic wooden benchpin clamps.",
    category: "behind-the-scenes"
  },
  {
    url: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    caption: "Minimalist styling showcasing stacked silver and brass cuffs.",
    category: "lifestyle"
  },
  {
    url: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=800",
    caption: "Double terminated quartz crystals hand-selected for alpine earrings.",
    category: "behind-the-scenes"
  }
];
