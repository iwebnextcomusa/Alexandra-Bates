import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Sparkles,
  Filter,
  ArrowUp,
  ChevronRight,
  Menu,
  X,
  Search,
  ShoppingBag,
  Instagram,
  Clock,
  ArrowUpRight,
  Heart,
  ChevronUp,
  Send,
  SlidersHorizontal,
  Bookmark
} from "lucide-react";
import { JEWELLERY_PRODUCTS, TESTIMONIALS, CUSTOM_PROCESS_STEPS, GALLERY_IMAGES } from "./data";
import { Product } from "./types";
import ThreeDSection from "./components/ThreeDSection";
import Chatbot from "./components/Chatbot";
import CustomInquiryForm from "./components/CustomInquiryForm";

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<"home" | "collections" | "custom" | "gallery" | "about" | "contact">("home");
  
  // Mobile menu control
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Collections filters
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Gallery category filter
  const [galleryFilter, setGalleryFilter] = useState("all");

  // Selected item modal details
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Quick favorites state (saved item persistence simulation)
  const [favorites, setFavorites] = useState<string[]>([]);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Tracking scroll for sticking Header & active Scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInquireProduct = (product: Product) => {
    setSelectedProduct(null);
    setActiveTab("custom");
    // Scroll smoothly to start custom journey
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // Filter products
  const categoriesList = ["All", "Rings", "Necklaces", "Earrings", "Bracelets", "Custom Pieces"];
  const filteredProducts = JEWELLERY_PRODUCTS.filter((prod) => {
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSubmitted(true);
      setContactForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gold-50/50 selection:bg-gold-200 selection:text-[#1a1a1a] overflow-x-hidden">
      
      {/* 1. HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-gold-50/85 backdrop-blur-md border-b border-forest-900/10" id="site-header">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-between">
          
          {/* Logo & Brand Details */}
          <button 
            onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-4 group text-left focus:outline-hidden cursor-pointer"
            id="brand-logo-btn"
          >
            <div className="w-11 h-11 rounded-full border border-gold-450 flex items-center justify-center bg-forest-900 shadow-xs relative overflow-hidden shrink-0">
              <span className="text-gold-200 font-serif text-sm font-light tracking-[0.1em] relative z-10">AB</span>
              <div className="absolute inset-0 bg-[#5a5a40] scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-light tracking-[0.25em] uppercase text-forest-900 transition-colors">
                Alexandra Bates
              </h1>
              <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#a68d7a] block mt-0.5">
                Nelson, British Columbia
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-[11px] font-normal uppercase tracking-[0.2em] text-[#1a1a1a]/80">
            <button
              onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0 }); }}
              className={`hover:text-gold-450 pb-1 cursor-pointer transition-all border-b ${
                activeTab === "home" ? "border-forest-900 text-forest-900 font-medium" : "border-transparent opacity-70"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => { setActiveTab("collections"); window.scrollTo({ top: 0 }); }}
              className={`hover:text-gold-450 pb-1 cursor-pointer transition-all border-b ${
                activeTab === "collections" ? "border-forest-900 text-forest-900 font-medium" : "border-transparent opacity-70"
              }`}
            >
              Collections
            </button>
            <button
              onClick={() => { setActiveTab("custom"); window.scrollTo({ top: 0 }); }}
              className={`hover:text-gold-450 pb-1 cursor-pointer transition-all border-b ${
                activeTab === "custom" ? "border-forest-900 text-forest-900 font-medium" : "border-transparent opacity-70"
              }`}
            >
              Custom
            </button>
            <button
              onClick={() => { setActiveTab("gallery"); window.scrollTo({ top: 0 }); }}
              className={`hover:text-gold-450 pb-1 cursor-pointer transition-all border-b ${
                activeTab === "gallery" ? "border-forest-900 text-forest-900 font-medium" : "border-transparent opacity-70"
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => { setActiveTab("about"); window.scrollTo({ top: 0 }); }}
              className={`hover:text-gold-450 pb-1 cursor-pointer transition-all border-b ${
                activeTab === "about" ? "border-forest-900 text-forest-900 font-medium" : "border-transparent opacity-70"
              }`}
            >
              About
            </button>
            <button
              onClick={() => { setActiveTab("contact"); window.scrollTo({ top: 0 }); }}
              className={`hover:text-gold-450 pb-1 cursor-pointer transition-all border-b ${
                activeTab === "contact" ? "border-forest-900 text-forest-900 font-medium" : "border-transparent opacity-70"
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Favorites Count & Action Button */}
          <div className="hidden md:flex items-center gap-5">
            <div className="relative">
              <Heart className="w-4.5 h-4.5 text-[#a68d7a]" />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-forest-900 border border-gold-100 text-[8px] text-gold-200 font-sans w-3.5 h-3.5 rounded-full flex items-center justify-center animate-bounce">
                  {favorites.length}
                </span>
              )}
            </div>
            <button
              onClick={() => { setActiveTab("custom"); window.scrollTo({ top: 0 }); }}
              className="text-[10px] font-sans tracking-[0.2em] uppercase border border-forest-900/10 hover:border-forest-900 bg-transparent text-forest-900 px-5 py-2.5 rounded-none hover:bg-forest-900 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Custom Inquire
            </button>
          </div>

          {/* Mobile Menu Button Hook */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-forest-900 p-1.5 border border-gold-300/40 rounded-full hover:bg-gold-100/30 transition-all cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gold-300/15 bg-gold-50 px-4 py-5 flex flex-col space-y-4 shadow-inner" id="mobile-navigation-drawer">
            <button
              onClick={() => { setActiveTab("home"); setMobileMenuOpen(false); }}
              className={`text-left text-xs font-serif font-black uppercase tracking-wider ${activeTab === "home" ? "text-gold-600" : "text-forest-900"}`}
            >
              Home View
            </button>
            <button
              onClick={() => { setActiveTab("collections"); setMobileMenuOpen(false); }}
              className={`text-left text-xs font-serif font-black uppercase tracking-wider ${activeTab === "collections" ? "text-gold-600" : "text-forest-900"}`}
            >
              Collections
            </button>
            <button
              onClick={() => { setActiveTab("custom"); setMobileMenuOpen(false); }}
              className={`text-left text-xs font-serif font-black uppercase tracking-wider ${activeTab === "custom" ? "text-gold-600" : "text-forest-900"}`}
            >
              Bespoke Custom
            </button>
            <button
              onClick={() => { setActiveTab("gallery"); setMobileMenuOpen(false); }}
              className={`text-left text-xs font-serif font-black uppercase tracking-wider ${activeTab === "gallery" ? "text-gold-600" : "text-forest-900"}`}
            >
              Artistry Gallery
            </button>
            <button
              onClick={() => { setActiveTab("about"); setMobileMenuOpen(false); }}
              className={`text-left text-xs font-serif font-black uppercase tracking-wider ${activeTab === "about" ? "text-gold-600" : "text-forest-900"}`}
            >
              About Artist
            </button>
            <button
              onClick={() => { setActiveTab("contact"); setMobileMenuOpen(false); }}
              className={`text-left text-xs font-serif font-black uppercase tracking-wider ${activeTab === "contact" ? "text-gold-600" : "text-forest-900"}`}
            >
              Contact Local
            </button>

            <div className="h-[1px] bg-gold-200/40 my-3" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-gold-500" />
                <span className="text-xs font-serif text-forest-900">Your Loved Items</span>
              </div>
              <span className="font-mono text-xs bg-forest-900 text-gold-200 px-2 py-0.5 rounded-full">{favorites.length}</span>
            </div>
          </div>
        )}
      </header>

      {/* 2. DYNAMIC TAB CONTAINER */}
      <main className="flex-1 w-full relative">
        
        {/* ================= HOME VIEW ================= */}
        {activeTab === "home" && (
          <div className="animate-in fade-in duration-500" id="home-view-container">
            {/* Elegant Hero Screen */}
            <section className="relative min-h-[85vh] bg-gold-50 border-b border-forest-900/10 overflow-hidden" id="hero-section">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Vertical Coordinate Label */}
                <div className="hidden lg:col-span-1 lg:flex border-r border-forest-900/10 items-center justify-center py-10">
                  <span className="rotate-180 [writing-mode:vertical-rl] text-[10px] tracking-[0.4em] uppercase opacity-45 text-forest-900 font-sans">
                    Handcrafted Artistry — 49.4928° N, 117.2948° W
                  </span>
                </div>

                {/* Hero Content Area */}
                <div className="col-span-11 grid grid-cols-1 md:grid-cols-12 gap-8 items-center px-6 sm:px-10 py-16 lg:py-24">
                  
                  {/* Hero Text */}
                  <div className="md:col-span-7 space-y-8 flex flex-col justify-center">
                    <div>
                      <span className="text-[11px] font-sans uppercase tracking-[0.5em] text-[#a68d7a] mb-6 block font-medium">
                        Alexandra Bates Jewellery • Boutique Forest Studio
                      </span>
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light font-serif tracking-tight text-forest-900 leading-[1.1] mb-8">
                        Handcrafted <br />
                        <span className="italic">Jewellery</span> Inspired <br />
                        by the Mountains.
                      </h1>
                      <p className="font-sans font-light text-sm leading-relaxed text-forest-900/65 max-w-md">
                        Forged slowly in our boutique forest studio in Nelson, BC. Every piece is a unique celebration of craftsmanship, capturing the raw elegance of the Slocan Valley in recycled gold, sterling silver, and ethically sourced stones.
                      </p>
                    </div>

                    {/* Call-to-actions */}
                    <div className="flex flex-wrap items-center gap-6 pt-4">
                      <button
                        onClick={() => setActiveTab("collections")}
                        className="px-10 py-4 bg-[#5a5a40] text-white font-sans text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-[#494932] cursor-pointer"
                      >
                        Explore Collections
                      </button>
                      <button
                        onClick={() => setActiveTab("custom")}
                        className="text-[11px] font-sans uppercase tracking-[0.2em] border-b border-[#1a1a1a]/30 pb-1 cursor-pointer hover:border-[#1a1a1a] transition-all"
                      >
                        Inquire About Custom
                      </button>
                    </div>

                    {/* Quick features summary */}
                    <div className="grid grid-cols-3 gap-6 pt-10 border-t border-forest-900/10 max-w-md">
                      <div>
                        <span className="font-serif text-lg text-[#a68d7a] block font-light">100%</span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-forest-900/40">Hand-finished</span>
                      </div>
                      <div>
                        <span className="font-serif text-lg text-[#a68d7a] block font-light">Local</span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-forest-900/40">Nelson, BC</span>
                      </div>
                      <div>
                        <span className="font-serif text-lg text-[#a68d7a] block font-light">Ethical</span>
                        <span className="text-[9px] font-mono uppercase tracking-wider text-forest-900/40">Canadian Sourced</span>
                      </div>
                    </div>
                  </div>

                  {/* Hero Pendant Representation Side */}
                  <div className="md:col-span-5 p-2 lg:p-6 flex justify-center">
                    <div className="w-full max-w-[340px] aspect-[4/5] bg-gold-100 rounded-t-full relative overflow-hidden flex items-center justify-center border border-forest-900/5 shadow-xs group">
                      {/* Real Generated Premium Image */}
                      <img 
                        src="/src/assets/images/luna_pendant_1781730139196.jpg" 
                        alt="The Luna Pendant - Featured masterwork by Alexandra Bates"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gold-50/20 to-transparent pointer-events-none"></div>
                      
                      {/* Interactive Floating Badge Overlays */}
                      <div className="absolute top-4 right-4 text-[9px] font-sans uppercase tracking-[0.2em] italic text-forest-900 bg-gold-50/90 backdrop-blur-xs border border-forest-900/5 px-2.5 py-1 rounded-full text-center">
                        "The Luna Pendant"
                      </div>
                      {/* Interactive float badge */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-forest-900 text-gold-100 text-[8px] font-sans uppercase tracking-[0.2em] px-3 py-1.5 shadow-sm">
                        Featured masterwork
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Featured Bar from the Luxury Theme Spec */}
            <section className="bg-gold-50 border-b border-forest-900/10">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
                <button 
                  onClick={() => { setActiveTab("collections"); setSelectedCategory("Necklaces"); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                  className="border-b md:border-b-0 md:border-r border-forest-900/10 p-10 flex flex-col justify-between h-44 text-left hover:bg-gold-100/40 transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#a68d7a]">01 / Necklaces</span>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-light font-serif italic text-forest-900 group-hover:translate-x-1 transition-transform">The Ethereal Chains</span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.15em] opacity-65 group-hover:text-gold-450 transition-colors">View All</span>
                  </div>
                </button>
                <button 
                  onClick={() => { setActiveTab("collections"); setSelectedCategory("Rings"); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                  className="border-b md:border-b-0 md:border-r border-forest-900/10 p-10 flex flex-col justify-between h-44 text-left hover:bg-gold-100/40 transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#a68d7a]">02 / Rings</span>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-light font-serif italic text-forest-900 group-hover:translate-x-1 transition-transform">Glacier Bands</span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.15em] opacity-65 group-hover:text-gold-450 transition-colors">View All</span>
                  </div>
                </button>
                <button 
                  onClick={() => { setActiveTab("collections"); setSelectedCategory("Earrings"); window.scrollTo({ top: 300, behavior: "smooth" }); }}
                  className="p-10 flex flex-col justify-between h-44 text-left hover:bg-gold-100/40 bg-gold-100/25 transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#a68d7a]">03 / Earrings</span>
                  <div className="flex justify-between items-end">
                    <span className="text-2xl font-light font-serif italic text-forest-900 group-hover:translate-x-1 transition-transform">Cascade Drops</span>
                    <span className="text-[10px] font-sans uppercase tracking-[0.15em] opacity-65 group-hover:text-gold-450 transition-colors">View All</span>
                  </div>
                </button>
              </div>
            </section>

            {/* Features section: local Nelson values */}
            <section className="bg-white py-20 px-6 sm:px-8 border-b border-forest-900/10" id="features-section">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">Slow Crafted Values</span>
                  <h2 className="text-3xl font-serif text-forest-900 tracking-tight">An Ethos of Integrity & Artistry</h2>
                  <div className="w-12 h-[1px] bg-gold-450 mx-auto" />
                  <p className="text-sm text-forest-900/65 font-sans">
                    Every ring, necklace, and bracelet is shaped by hand in Nelson, British Columbia, using reclaimed gold, silver, and fair-miner minerals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {/* Feature 1 */}
                  <div className="bg-gold-50/20 border border-gold-200/20 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 border border-gold-300/25 flex items-center justify-center text-gold-600">
                      <Sparkles className="w-5 h-5 text-gold-500" />
                    </div>
                    <h3 className="text-serif font-serif font-black text-forest-900 tracking-wide">Direct Castings</h3>
                    <p className="text-xs text-forest-900/60 font-sans leading-relaxed">
                      We gather natural organic elements like wild pine fern sprigs, cedar, and cedar roots from the Slocan Valley, casting them directly into glowing custom sterling silver profiles.
                    </p>
                  </div>
                  {/* Feature 2 */}
                  <div className="bg-gold-50/20 border border-gold-200/20 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 border border-gold-300/25 flex items-center justify-center text-gold-600">
                      <MapPin className="w-5 h-5 text-gold-500" />
                    </div>
                    <h3 className="text-serif font-serif font-black text-forest-900 tracking-wide">Geological Textures</h3>
                    <p className="text-xs text-forest-900/60 font-sans leading-relaxed">
                      Taking inspiration from Slocan lake cliffs and local quartz formations, we use traditional hammers and heat treatment techniques to forge bold, organic rock ridges upon silver cuffs.
                    </p>
                  </div>
                  {/* Feature 3 */}
                  <div className="bg-gold-50/20 border border-gold-200/20 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 border border-gold-300/25 flex items-center justify-center text-gold-600">
                      <Heart className="w-5 h-5 text-gold-500" />
                    </div>
                    <h3 className="text-serif font-serif font-black text-forest-900 tracking-wide">Bespoke Heirlooms</h3>
                    <p className="text-xs text-forest-900/60 font-sans leading-relaxed">
                      Instead of standard cookie-cutter settings, Alexandra sculpts individual claw mounts tailored for each unique mineral shape, making every customer ring entirely one-of-a-kind.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3D Interactive Gemstone Section (Three.js integration) */}
            <ThreeDSection />

            {/* Featured collections row */}
            <section className="py-24 px-4 bg-gold-100/10">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">Featured Treasures</span>
                    <h2 className="text-3xl font-serif text-forest-900">Alexandra's Masterworks</h2>
                    <p className="text-sm text-forest-900/60 font-sans">Handpicked pieces from the current custom collection.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("collections")}
                    className="text-xs font-serif font-black tracking-widest uppercase text-gold-600 hover:text-gold-700 flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    <span>View all collections</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {JEWELLERY_PRODUCTS.slice(0, 3).map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white rounded-2xl overflow-hidden border border-gold-300/20 hover:border-gold-450/40 group transition-all duration-300 hover:-translate-y-1.5 shadow-xs cursor-pointer relative"
                    >
                      {/* Image container */}
                      <div className="aspect-square w-full relative overflow-hidden bg-gold-50">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Favorite button absolute over */}
                        <button
                          onClick={(e) => handleToggleFavorite(product.id, e)}
                          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/75 backdrop-blur-xs border border-gold-300/15 flex items-center justify-center hover:bg-white text-rose-500 scale-95 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                          aria-label="Add to favourites"
                        >
                          <Heart className={`w-4.5 h-4.5 ${favorites.includes(product.id) ? "fill-rose-500 text-rose-500" : "text-gray-500"}`} />
                        </button>
                        {product.isPopular && (
                          <div className="absolute top-4 left-4 bg-forest-900 text-gold-200 text-[9px] font-mono uppercase py-1 px-2.5 rounded-full tracking-widest shadow-sm">
                            Best Selling
                          </div>
                        )}
                      </div>

                      {/* Details row */}
                      <div className="p-5 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-gold-600 block">{product.category}</span>
                        <h3 className="text-sm font-serif font-bold text-forest-900 group-hover:text-gold-650 transition-colors uppercase tracking-wide">
                          {product.name}
                        </h3>
                        <p className="text-xs text-forest-900/60 line-clamp-2 leading-relaxed font-sans">{product.description}</p>
                        <div className="flex justify-between items-center pt-3 border-t border-gold-500/10">
                          <span className="text-xs font-mono font-semibold text-forest-900">${product.price.toLocaleString()} cad</span>
                          <span className="text-[10px] font-mono text-gold-600 uppercase tracking-widest flex items-center gap-1 bg-gold-100/40 px-2 py-0.5 rounded-md">
                            Details <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* About Preview Section */}
            <section className="bg-white py-24 px-4 border-t border-gold-300/10">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-6 relative">
                  {/* Overlap grid layouts */}
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-gold-300/25 p-2">
                    <img 
                      src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=900" 
                      alt="Alexandra modeling in Nelson workshop"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  {/* Absolute organic leaf details badge overlay */}
                  <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-forest-900 text-gold-100 p-4 border border-gold-450/40 rounded-2xl shadow-xl max-w-xs">
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-300/30 flex items-center justify-center text-gold-300 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-serif text-gold-200">100% Recycled Precious Metals</p>
                      <p className="text-[10px] font-mono text-gold-300/60 font-medium">Nelson Conservation Ethical Partner</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-6">
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">MEET THE ARTIST</span>
                  <h2 className="text-3xl font-serif text-forest-900 tracking-tight leading-tight">Alexandra Bates</h2>
                  <div className="w-12 h-[1px] bg-gold-450" />
                  
                  <p className="text-xs md:text-sm text-forest-900/70 font-sans leading-relaxed space-y-4">
                    "I believe jewelry should hold a memory, a story, and a grain of geological soul. 
                    Living in Nelson surrounded by mountain trails, pristine waters, and centuries-old stones, I handcraft every component directly at my workbench. 
                    I don't use factory casting centers; my hands hammer the silver, pour the molten gold, and set the rough raw gems. 
                    It is Slow Craftsmanship, created to be worn through generations."
                  </p>

                  <p className="text-xs font-mono text-gold-600">
                    — Alexandra Bates, Founder & Goldsmith
                  </p>

                  <button
                    onClick={() => setActiveTab("about")}
                    className="text-xs font-serif font-black tracking-widest uppercase border border-gold-450 bg-transparent text-forest-900 hover:bg-forest-900 hover:text-gold-200 px-6 py-3 rounded-full transition-all cursor-pointer inline-flex items-center gap-1 shadow-xs"
                  >
                    <span>Read Alexandra's Story</span>
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gold-50/30 py-24 px-4 border-t border-b border-gold-300/15">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">Testimonials</span>
                  <h2 className="text-3xl font-serif text-forest-900 tracking-tight">Kootenay Whispers of Joy</h2>
                  <div className="w-12 h-[1px] bg-gold-450 mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((testimonial) => (
                    <div 
                      key={testimonial.id}
                      className="bg-white border border-gold-300/15 p-6 md:p-8 rounded-2xl shadow-xs flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Sparkles key={i} className="w-4 h-4 text-gold-450 fill-gold-450" />
                          ))}
                        </div>
                        <p className="text-xs md:text-sm text-forest-900/75 leading-relaxed font-sans italic">
                          "{testimonial.text}"
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gold-100/40 flex items-center justify-between text-xs">
                        <span className="font-serif font-black uppercase text-forest-900 tracking-wider">{testimonial.name}</span>
                        <span className="font-mono text-gold-600 text-[10px]">{testimonial.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Call to action: Custom bespoke */}
            <section className="bg-forest-900 text-white py-20 px-4 text-center relative overflow-hidden" id="custom-cta">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-950/20 via-forest-900 to-forest-950 -z-10" />
              <div className="max-w-3xl mx-auto space-y-6">
                <span className="text-xs font-mono uppercase text-gold-300 tracking-widest font-semibold">CUSTOM COLLABORATIONS</span>
                <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white">Create a Custom Heirloom</h2>
                <div className="w-12 h-[1px] bg-gold-300 mx-auto" />
                <p className="text-sm text-gold-100/80 leading-relaxed font-sans max-w-xl mx-auto">
                  Seeking a bespoke wedding band, a customized birthstone pendant, or a cast representation of your favorite British Columbia landmark? Let's mold it together.
                </p>
                <button
                  onClick={() => setActiveTab("custom")}
                  className="text-xs font-serif font-black tracking-widest uppercase bg-gold-300 hover:bg-gold-200 text-forest-900 px-8 py-4 rounded-full transition-all shadow-md cursor-pointer"
                >
                  Schedule Your Consultation
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ================= COLLECTIONS VIEW ================= */}
        {activeTab === "collections" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500" id="collections-tab-view">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gold-300/25 pb-8 mb-10 gap-6">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">Explore Collections</span>
                <h2 className="text-3xl md:text-4xl font-serif text-forest-900">Fine Wearable Alchemy</h2>
                <p className="text-xs md:text-sm text-forest-900/60 font-sans max-w-xl">
                  Filter by category or query specific organic stones. Each product is custom polished and boxed in cedar upon checkout.
                </p>
              </div>

              {/* Search input field */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-forest-900/40" />
                <input
                  type="text"
                  placeholder="Search rings, ferns, gold..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white text-xs pl-10 pr-4 py-3 rounded-full border border-gold-300/50 focus:outline-hidden focus:border-gold-450 focus:bg-white text-forest-900 placeholder:text-forest-900/40 transition-all font-sans"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-3 text-[10px] font-mono text-gold-605">Clear</button>
                )}
              </div>
            </div>

            {/* Custom Category selection pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <div className="flex items-center gap-1.5 text-xs text-forest-900/40 font-mono uppercase tracking-wider mr-2">
                <Filter className="w-3.5 h-3.5 text-gold-500" />
                <span>Filters:</span>
              </div>
              {categoriesList.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs font-serif font-black uppercase tracking-widest px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    selectedCategory === category
                      ? "bg-forest-900 text-gold-200 border-forest-900"
                      : "bg-white text-forest-900/80 border-gold-300/35 hover:border-gold-450/40 hover:bg-gold-50/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Product count indicator */}
            <div className="text-xs font-mono text-forest-900/40 mb-6 flex justify-between items-center">
              <span>Showing {filteredProducts.length} handcrafted works</span>
              {selectedCategory !== "All" && (
                <button onClick={() => setSelectedCategory("All")} className="text-[10px] uppercase font-bold text-gold-700 underline">Reset category</button>
              )}
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white rounded-2xl overflow-hidden border border-gold-300/20 hover:border-gold-450/40 group transition-all duration-300 hover:-translate-y-1.5 shadow-xs cursor-pointer relative"
                  >
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => handleToggleFavorite(product.id, e)}
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/75 backdrop-blur-xs border border-gold-300/15 flex items-center justify-center hover:bg-white text-rose-500 scale-95 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
                      aria-label="Add to favourites"
                    >
                      <Heart className={`w-4.5 h-4.5 ${favorites.includes(product.id) ? "fill-rose-500 text-rose-500" : "text-gray-500"}`} />
                    </button>

                    {/* Image container */}
                    <div className="aspect-square w-full relative overflow-hidden bg-gold-50">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Details row */}
                    <div className="p-5 space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-gold-600">
                        <span>{product.category}</span>
                        {product.isPopular && <span className="bg-gold-100 text-gold-700 font-bold px-1.5 py-0.5 rounded-sm">Featured</span>}
                      </div>
                      <h3 className="text-sm font-serif font-black text-forest-900 group-hover:text-gold-650 transition-colors uppercase tracking-wide">
                        {product.name}
                      </h3>
                      <p className="text-xs text-forest-900/60 font-sans line-clamp-2 leading-relaxed">{product.description}</p>
                      
                      <div className="flex flex-wrap gap-1 pt-2">
                        {product.materials.map((m, i) => (
                          <span key={i} className="text-[9px] font-mono text-forest-900/50 bg-gold-50 px-2 py-0.5 rounded-sm">
                            {m}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-3 mt-1 border-t border-gold-500/10">
                        <span className="text-xs font-mono font-semibold text-forest-900">${product.price.toLocaleString()} cad</span>
                        <span className="text-[10px] font-mono text-gold-600 uppercase tracking-widest flex items-center gap-1 bg-gold-100/30 px-2 py-0.5 rounded-md">
                          Review details <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-gold-300/15 rounded-2xl max-w-xl mx-auto space-y-4">
                <Search className="w-10 h-10 text-gold-350 mx-auto" />
                <h3 className="text-lg font-serif text-forest-900">No Treasures Matched Your Query</h3>
                <p className="text-xs text-forest-900/60 max-w-sm mx-auto font-sans leading-relaxed">
                  We don't currently have active stock for that specific query, but Alexandra Bates specializes in customized creations!
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="text-xs font-mono text-gold-650 uppercase font-black underline cursor-pointer"
                >
                  Clear search parameters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= CUSTOM/BESPOKE VIEW ================= */}
        {activeTab === "custom" && (
          <div className="animate-in fade-in duration-500" id="custom-tab-view">
            {/* Header banner */}
            <section className="bg-forest-900 text-white py-16 text-center border-b border-gold-300/20">
              <div className="max-w-4xl mx-auto px-4 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-300 font-semibold">Custom Design Services</span>
                <h2 className="text-3xl md:text-4xl font-serif text-gold-100 tracking-tight">Co-Create Your Heirloom</h2>
                <div className="w-12 h-[1px] bg-gold-300 mx-auto" />
                <p className="text-xs md:text-sm text-gold-100/80 leading-relaxed font-sans max-w-xl mx-auto">
                  Alexandra’s custom jewelry service translates your stories, vows, or milestones into solid gold and sterling representations, custom forged in Nelson, BC.
                </p>
              </div>
            </section>

            {/* Step Timeline Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">The bespoke process</span>
                <h2 className="text-2xl font-serif text-forest-900">How We Forge Precious Visions</h2>
                <div className="w-12 h-[1px] bg-gold-450 mx-auto" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {CUSTOM_PROCESS_STEPS.map((p, idx) => (
                  <div key={idx} className="relative space-y-4">
                    <div className="text-4xl font-serif text-gold-300/40 font-black">{p.step}</div>
                    <h3 className="text-sm font-serif font-black text-forest-900 uppercase tracking-wider">{p.title}</h3>
                    <p className="text-xs text-forest-900/60 font-sans leading-relaxed">{p.description}</p>
                    {idx < 3 && (
                      <div className="hidden md:absolute md:top-6 md:-right-4 md:w-8 md:h-[1px] md:bg-gold-300/40" />
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Design Inquiry Form Wrap */}
            <section className="bg-gold-100/10 py-16 px-4 border-t border-gold-300/15">
              <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                  <h2 className="text-2xl font-serif text-forest-900">Custom Jewellery Inquiry</h2>
                  <p className="text-xs md:text-sm text-forest-900/60 font-sans">
                    Share your vision below, and we will contact you to organize a coffee date or a virtual studio consult.
                  </p>
                </div>
                
                <CustomInquiryForm />
              </div>
            </section>
          </div>
        )}

        {/* ================= GALLERY VIEW ================= */}
        {activeTab === "gallery" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500" id="gallery-tab-view">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">Artisan visual portfolio</span>
              <h2 className="text-3xl md:text-4xl font-serif text-forest-900 tracking-tight">The Nelson Studio Chronicles</h2>
              <div className="w-12 h-[1px] bg-gold-450 mx-auto" />
              <p className="text-xs md:text-sm text-forest-900/65 font-sans leading-relaxed">
                Take a look around Alexandra Bates' workspace. Explore raw mineral layouts, anvil hammer sessions, custom settings, and completed bespoke commissions.
              </p>
            </div>

            {/* Category selection */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
              <button
                onClick={() => setGalleryFilter("all")}
                className={`text-xs font-serif font-black uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  galleryFilter === "all" ? "bg-forest-900 text-gold-200 border-forest-900" : "bg-white text-forest-900/80 border-gold-300/30"
                }`}
              >
                All Moments
              </button>
              <button
                onClick={() => setGalleryFilter("lifestyle")}
                className={`text-xs font-serif font-black uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  galleryFilter === "lifestyle" ? "bg-forest-900 text-gold-200 border-forest-900" : "bg-white text-forest-900/80 border-gold-300/30"
                }`}
              >
                Lifestyle Imagery
              </button>
              <button
                onClick={() => setGalleryFilter("product")}
                className={`text-xs font-serif font-black uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  galleryFilter === "product" ? "bg-forest-900 text-gold-200 border-forest-900" : "bg-white text-forest-900/80 border-gold-300/30"
                }`}
              >
                Finished Work
              </button>
              <button
                onClick={() => setGalleryFilter("behind-the-scenes")}
                className={`text-xs font-serif font-black uppercase tracking-wider px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  galleryFilter === "behind-the-scenes" ? "bg-forest-900 text-gold-200 border-forest-900" : "bg-white text-forest-900/80 border-gold-300/30"
                }`}
              >
                At The Workbench
              </button>
            </div>

            {/* Masonry Responsive Gallery Grid */}
            <div className="masonry-grid" id="masonry-gallery-container">
              {GALLERY_IMAGES.filter((img) => galleryFilter === "all" || img.category === galleryFilter).map((img, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl overflow-hidden border border-gold-300/15 p-2 shadow-xs group relative hover:shadow-md transition-all break-inside-avoid mb-5"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-gold-50">
                    <img 
                      src={img.url} 
                      alt={img.caption} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] text-forest-900/75 leading-relaxed font-sans">{img.caption}</p>
                    <span className="text-[9px] font-mono text-gold-600 uppercase tracking-widest mt-1 block font-semibold">{img.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ABOUT ARTIST VIEW ================= */}
        {activeTab === "about" && (
          <div className="animate-in fade-in duration-500" id="about-tab-view">
            {/* Header image banner */}
            <div className="relative h-96 bg-forest-950 flex items-center justify-center text-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1600" 
                alt="Studio setup with goldsmithing tools"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-forest-950/20 via-forest-950 to-forest-950" />
              <div className="relative z-10 space-y-3 max-w-2xl px-4 text-white">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-300 font-semibold">Artist & Metalsmith</span>
                <h2 className="text-4xl font-serif text-gold-100 italic">Alexandra Bates</h2>
                <div className="w-12 h-[1px] bg-gold-300 mx-auto" />
                <p className="text-xs md:text-sm text-gold-100/80 font-sans leading-relaxed">
                  Dedicated to capturing the wild, ancient geometry of the British Columbia wilderness.
                </p>
              </div>
            </div>

            {/* Biography details */}
            <section className="max-w-4xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-8 space-y-6">
                <h3 className="text-2xl font-serif text-forest-900 leading-snug">
                  "The rivers, valleys, and stratas of Nelson teach me the language of metal casting."
                </h3>
                
                <p className="text-xs md:text-sm text-forest-900/75 font-sans leading-relaxed space-y-4">
                  Alexandra’s artistic career began deep in the woods of British Columbia. Compelled by raw geology, quartz crystal caves, and local copper mining history, she trained with traditional master jewelers in traditional metallurgy.
                </p>

                <p className="text-xs md:text-sm text-forest-900/75 font-sans leading-relaxed">
                  In 2018, she established her private studio in Nelson, BC. Alexandra rejects computerized automated printing and industrial casting centers. At her private anvil, she experiments with unique sand-casting (pouring molten silver and gold directly into natural forest soils) and organic casting (burning hollow channels into wax replicas using real pine cones and ferns).
                </p>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gold-300/20">
                  <div>
                    <h4 className="text-xs font-serif font-black uppercase text-gold-700 tracking-wider mb-1">Ethical Metals</h4>
                    <p className="text-xs text-forest-900/60 font-sans leading-relaxed">We source 100% recycled gold and sterling silver, casting them within highly energy efficient closed workshops.</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-serif font-black uppercase text-gold-700 tracking-wider mb-1">Honored Minerals</h4>
                    <p className="text-xs text-forest-900/60 font-sans leading-relaxed">We favor ethically mined, fair-source Canadian and Australian gemstones over commercial mass diamonds.</p>
                  </div>
                </div>
              </div>

              {/* Sidebar stats/coordinates */}
              <div className="md:col-span-4 bg-white border border-gold-450/20 p-6 rounded-2xl relative shadow-xs shrink-0 self-start">
                <h4 className="text-xs font-serif font-black uppercase text-gold-700 tracking-widest border-b border-gold-300/20 pb-3 mb-4">
                  Study details
                </h4>
                <div className="space-y-4 text-xs font-sans text-forest-900/80">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Nelson, BC</p>
                      <p className="text-forest-900/60 text-[11px]">British Columbia, Canada</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Showroom Hours</p>
                      <p className="text-forest-900/60 text-[11px]">Thursday - Saturday</p>
                      <p className="text-forest-905 text-[10px]">11:00 AM — 5:00 PM PST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Bookmark className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Affiliations</p>
                      <p className="text-forest-900/60 text-[11px]">BC Jewellers Guild Member</p>
                      <p className="text-forest-900/60 text-[11px]">Co-op Artisan Ally</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= CONTACT VIEW ================= */}
        {activeTab === "contact" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in duration-500" id="contact-tab-view">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-600 font-semibold">Contact Our Nelson Studio</span>
              <h2 className="text-3xl md:text-4xl font-serif text-forest-900 tracking-tight">Connect With Alexandra</h2>
              <div className="w-12 h-[1px] bg-gold-450 mx-auto" />
              <p className="text-sm text-forest-900/60 font-sans">
                Book a consultation, inquire about resizing services, or simply say hello.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Contact Information & Map */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Contact options list */}
                <div className="bg-white rounded-2xl border border-gold-300/15 p-6 md:p-8 shadow-xs space-y-6">
                  <h3 className="text-lg font-serif text-forest-900 uppercase tracking-wide border-b border-gold-100/40 pb-3">Studio Coordinates</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 text-xs font-sans">
                      <div className="w-9 h-9 rounded-full bg-gold-50 border border-gold-300/20 flex items-center justify-center text-gold-600 shrink-0">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Direct Telephone</p>
                        <a href="tel:4036294300" className="font-bold text-forest-900 hover:text-gold-600 transition-colors">403-629-4300</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-xs font-sans">
                      <div className="w-9 h-9 rounded-full bg-gold-50 border border-gold-300/20 flex items-center justify-center text-gold-600 shrink-0">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Direct Email Inbox</p>
                        <a href="mailto:atbates4@gmail.com" className="font-bold text-forest-950 hover:text-gold-600 transition-colors break-all">atbates4@gmail.com</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 text-xs font-sans">
                      <div className="w-9 h-9 rounded-full bg-gold-50 border border-gold-300/20 flex items-center justify-center text-gold-600 shrink-0">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <p className="text-gray-400 font-mono text-[9px] uppercase tracking-wider">Fine Art Workshop</p>
                        <p className="font-bold text-forest-900">Nelson, British Columbia, Canada</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Embedded Responsive Google Map of Nelson, BC */}
                <div className="bg-white rounded-2xl border border-gold-300/15 p-2 shadow-xs relative overflow-hidden h-72 w-full">
                  <iframe 
                    title="Alexandra Bates Jewellery - Nelson, BC Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10291.54228943543!2d-117.29961601736173!3d49.49216091217039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537bbf4fc911b327%3A0xda7e8d7f7be9f874!2sNelson%2C%20BC%20V1L%205P4!5e0!3m2!1sen!2sca!4v1705623000000!5m2!1sen!2sca" 
                    className="w-full h-full rounded-xl border-0"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </div>

              {/* Contact Message Form */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-gold-300/15 p-6 md:p-8 shadow-xs">
                {contactSubmitted ? (
                  <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-200">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto text-gold-600">
                      <Send className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-serif text-forest-900">Message Dispatched</h3>
                    <p className="text-xs text-forest-900/60 max-w-sm mx-auto font-sans">
                      Thank you for connecting. Your general inquiry has been routed directly to Alexandra's desk in Nelson, BC. We will respond shortly!
                    </p>
                    <button
                      onClick={() => setContactSubmitted(false)}
                      className="text-[10px] font-mono text-gold-700 bg-gold-50 hover:bg-gold-100 px-4 py-2 rounded-full border border-gold-300/30 transition-colors uppercase font-black tracking-widest cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <h3 className="text-lg font-serif text-forest-900 uppercase tracking-wide border-b border-gold-100/40 pb-3">Transmit a note</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="c-name" className="text-xs font-serif font-black uppercase text-gold-700 tracking-wider">Your Name</label>
                        <input
                          type="text"
                          id="c-name"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          placeholder="Elena Rostova"
                          className="bg-gold-50/10 text-xs px-4 py-3 rounded-lg border border-gold-300/50 focus:outline-hidden focus:border-gold-450 text-forest-900 placeholder:text-forest-900/30 font-sans"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label htmlFor="c-email" className="text-xs font-serif font-black uppercase text-gold-700 tracking-wider">Your Email</label>
                        <input
                          type="email"
                          id="c-email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="elena@example.com"
                          className="bg-gold-50/10 text-xs px-4 py-3 rounded-lg border border-gold-300/50 focus:outline-hidden focus:border-gold-450 text-forest-900 placeholder:text-forest-900/30"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="c-subject" className="text-xs font-serif font-black uppercase text-gold-700 tracking-wider">Subject Message</label>
                      <input
                        type="text"
                        id="c-subject"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="Inquiry about Slocan cuff sizes"
                        className="bg-gold-50/10 text-xs px-4 py-3 rounded-lg border border-gold-300/50 focus:outline-hidden focus:border-gold-450 text-forest-900 placeholder:text-forest-900/30"
                      />
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label htmlFor="c-msg" className="text-xs font-serif font-black uppercase text-gold-700 tracking-wider">Message Description</label>
                      <textarea
                        id="c-msg"
                        required
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        placeholder="How can Alexandra help you with your jewellery parameters?"
                        className="bg-gold-50/10 text-xs px-4 py-3 rounded-lg border border-gold-300/50 focus:outline-hidden focus:border-gold-450 text-forest-900 placeholder:text-forest-900/30 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="text-xs font-serif tracking-widest uppercase bg-forest-900 text-gold-300 hover:text-gold-100 px-6 py-3.5 rounded-full border border-gold-300/25 flex items-center justify-center gap-2 hover:bg-forest-950 transition-colors cursor-pointer"
                    >
                      {contactSubmitting ? (
                        <>
                          <div className="w-4 h-4 border border-gold-300 border-t-transparent rounded-full animate-spin shrink-0" />
                          <span>Dispatching code pack...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-gold-300" />
                          <span>Submit Contact Note</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 3. MODAL COMPONENT (Individual product overlay card details) */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 bg-forest-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          id="product-detail-modal"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gold-450/30 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-forest-900 text-gold-300 flex items-center justify-center hover:bg-forest-950 transition-colors cursor-pointer border border-gold-300/10"
              aria-label="Close details"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {/* Split row: Image and details */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-square bg-gold-50">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-600 block">{selectedProduct.category}</span>
                    <h3 className="text-xl font-serif text-forest-900 tracking-wide mt-1 uppercase font-black">{selectedProduct.name}</h3>
                  </div>

                  <p className="text-xs text-forest-900/65 font-sans leading-relaxed">{selectedProduct.description}</p>

                  <div className="space-y-2 border-t border-gold-100/60 pt-4 text-xs font-sans">
                    <p className="text-forest-900/80"><strong>Craft Materials:</strong></p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.materials.map((m, i) => (
                        <span key={i} className="text-[10px] font-mono text-gold-700 bg-gold-100/35 px-2 py-0.5 rounded-sm">{m}</span>
                      ))}
                    </div>
                    <p className="text-forest-900/80 pt-1.5"><strong>Dimensions & Size:</strong> {selectedProduct.dimensions}</p>
                    <p className="text-[10px] text-gray-400 italic">Every gold/silver ingot is individually hammered; dimensions may present organic deviation.</p>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-gold-100/60">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-mono text-gray-500 uppercase">Artisan Quote</span>
                    <span className="text-lg font-serif font-black text-forest-900">${selectedProduct.price.toLocaleString()} cad</span>
                  </div>

                  <button
                    onClick={() => handleInquireProduct(selectedProduct)}
                    className="w-full text-xs font-serif tracking-widest uppercase bg-forest-900 hover:bg-forest-950 text-gold-200 px-4 py-3.5 rounded-full text-center border border-gold-300/20 shadow-xs transition-colors cursor-pointer"
                  >
                    Request Custom Adaptation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. NEWSLETTER FOOTER REGISTRY */}
      <section className="bg-forest-950 text-white py-16 px-4 border-t border-gold-300/20" id="newsletter-signup">
        <div className="max-w-md mx-auto text-center space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-300">STUDIO NEWSLETTER</span>
          <h3 className="text-lg font-serif text-gold-105 tracking-wide">Join The Slow Craft Guild</h3>
          <p className="text-xs text-gold-100/65 font-sans leading-relaxed">
            Receive exclusive updates on Alexandra's private gemstone hunts, custom casting arrivals, and advance showroom events in Nelson.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto pt-2">
            <input 
              type="email" 
              placeholder="artisan@example.com" 
              className="flex-1 bg-white/10 text-white placeholder:text-white/40 text-xs px-4 py-3 rounded-full border border-gold-300/15 focus:outline-hidden focus:border-gold-300 font-sans"
            />
            <button 
              onClick={() => alert("Thank you! You have joined Alexandra's selective mailing guild.")}
              className="bg-gold-500 hover:bg-gold-600 text-white text-xs font-serif uppercase tracking-widest px-5 py-3 rounded-full hover:scale-101 active:scale-99 transition-all cursor-pointer"
            >
              Join
            </button>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-forest-950 text-gold-100/70 py-10 px-6 sm:px-12 border-t border-white/10 font-sans text-[10px] uppercase tracking-[0.2em]" id="site-footer">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
          <div className="flex gap-6 sm:gap-12 flex-wrap justify-center">
            <span>T: 403-629-4300</span>
            <span>E: atbates4@gmail.com</span>
          </div>
          <div className="opacity-80">
            © {new Date().getFullYear()} Alexandra Bates Jewellery — Nelson, British Columbia
          </div>
          <div className="flex gap-8 justify-center">
            <span className="hover:text-gold-300 transition-colors cursor-pointer">Instagram</span>
            <span className="hover:text-gold-300 transition-colors cursor-pointer">Pinterest</span>
          </div>
        </div>
        
        {/* Centered Developer Link as per design and user requests */}
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-[10px] text-white/30 tracking-[0.25em]">
          Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-gold-450 hover:text-white pb-0.5 border-b border-transparent hover:border-white transition-all">iWebNext</a>
        </div>
      </footer>

      {/* 6. IMMERSIVE CHATBOT FLOATER */}
      <Chatbot />

      {/* 7. SCROLL TO TOP FLOATER */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 bg-white border border-gold-450 text-forest-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:translate-y-[-2px] hover:bg-gold-50 transition-all duration-300 cursor-pointer text-gold-500 hover:text-gold-600 group"
          aria-label="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

    </div>
  );
}
