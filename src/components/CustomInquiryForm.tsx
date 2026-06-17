import React, { useState } from "react";
import { Send, Sparkles, Check } from "lucide-react";
import { CustomInquiry } from "../types";

export default function CustomInquiryForm() {
  const [formData, setFormData] = useState<CustomInquiry>({
    name: "",
    email: "",
    phone: "",
    pieceType: "Ring",
    materialPreference: "Sterling Silver",
    budget: "$1,000 - $2,500",
    description: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending commission inquiry to Nelson workspace
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setRefId(`ABB-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-gold-450/40 p-8 rounded-2xl shadow-md text-center max-w-xl mx-auto my-12 animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-300/30">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif text-forest-900 mb-3">Vision Received</h3>
        <p className="text-sm text-forest-900/70 leading-relaxed mb-6 font-sans">
          Thank you, <span className="font-semibold text-forest-900">{formData.name}</span>. Alexandra will personally review your inspiration and reach out to you within 2 business days to schedule your initial consultation.
        </p>
        
        <div className="bg-gold-50/50 border border-gold-200/30 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
          <div className="flex justify-between items-center text-xs font-mono text-gold-700/80 mb-2">
            <span>Reference Code:</span>
            <span className="font-semibold text-gold-600">{refId}</span>
          </div>
          <div className="text-xs text-forest-900/60 font-sans space-y-1">
            <p><strong>Design Category:</strong> {formData.pieceType}</p>
            <p><strong>Selected Metal:</strong> {formData.materialPreference}</p>
            <p><strong>Estimated Budget:</strong> {formData.budget}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              pieceType: "Ring",
              materialPreference: "Sterling Silver",
              budget: "$1,000 - $2,500",
              description: ""
            });
          }}
          className="text-xs font-serif tracking-widest uppercase bg-forest-900 text-gold-200 px-6 py-3 rounded-full border border-gold-300/30 hover:bg-forest-950 transition-colors shadow-sm cursor-pointer"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white/70 backdrop-blur-md rounded-2xl border border-gold-450/20 p-6 md:p-8 shadow-sm max-w-3xl mx-auto"
      id="custom-inquiry-form"
    >
      <div className="flex items-center gap-2.5 mb-6">
        <Sparkles className="w-5 h-5 text-gold-400" />
        <span className="text-xs font-mono tracking-widest text-gold-600 uppercase font-semibold">Start your custom journey</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Full Name */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="name" className="text-[11px] font-sans font-medium uppercase text-gold-450 tracking-[0.16em]">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Alexandra Bates"
            className="bg-gold-100/30 text-xs px-4 py-3.5 rounded-lg border border-gold-300/30 focus:outline-hidden focus:border-gold-450 text-forest-900 placeholder:text-forest-900/30 font-sans transition-all"
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email" className="text-[11px] font-sans font-medium uppercase text-gold-450 tracking-[0.16em]">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="atbates4@gmail.com"
            className="bg-gold-100/30 text-xs px-4 py-3.5 rounded-lg border border-gold-300/30 focus:outline-hidden focus:border-gold-450 text-forest-900 placeholder:text-forest-900/30 font-sans transition-all"
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="phone" className="text-[11px] font-sans font-medium uppercase text-gold-450 tracking-[0.16em]">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="403-629-4300"
            className="bg-gold-100/30 text-xs px-4 py-3.5 rounded-lg border border-gold-300/30 focus:outline-hidden focus:border-gold-450 text-forest-900 placeholder:text-forest-900/30 font-sans transition-all"
          />
        </div>

        {/* Piece Type Selection */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="pieceType" className="text-[11px] font-sans font-medium uppercase text-gold-450 tracking-[0.16em]">
            Type of Piece
          </label>
          <select
            id="pieceType"
            name="pieceType"
            value={formData.pieceType}
            onChange={handleChange}
            className="bg-gold-100/30 text-xs px-4 py-3.5 rounded-lg border border-gold-300/30 focus:outline-hidden focus:border-gold-450 text-forest-900 font-sans transition-all"
          >
            <option value="Ring">Custom Ring</option>
            <option value="Necklace">Custom Necklace / Pendant</option>
            <option value="Earrings">Custom Earrings</option>
            <option value="Bracelet">Custom Bracelet / Cuff</option>
            <option value="Other">Bespoke Heirlooms</option>
          </select>
        </div>

        {/* Metal Preference */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="materialPreference" className="text-[11px] font-sans font-medium uppercase text-gold-450 tracking-[0.16em]">
            Metal Preference
          </label>
          <select
            id="materialPreference"
            name="materialPreference"
            value={formData.materialPreference}
            onChange={handleChange}
            className="bg-gold-100/30 text-xs px-4 py-3.5 rounded-lg border border-gold-300/30 focus:outline-hidden focus:border-gold-450 text-forest-900 font-sans transition-all"
          >
            <option value="Sterling Silver">925 Sterling Silver</option>
            <option value="14k Yellow Gold">14k Yellow Gold</option>
            <option value="18k Yellow Gold">18k Yellow Gold</option>
            <option value="14k Rose Gold">14k Rose Gold / Rose Gold accents</option>
            <option value="14k Palladium White Gold">Palladium White Gold</option>
          </select>
        </div>

        {/* Budget tier */}
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="budget" className="text-[11px] font-sans font-medium uppercase text-gold-450 tracking-[0.16em]">
            Estimated Budget (CAD)
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="bg-gold-100/30 text-xs px-4 py-3.5 rounded-lg border border-gold-300/30 focus:outline-hidden focus:border-gold-450 text-forest-900 font-sans transition-all"
          >
            <option value="Under $500">Under $500</option>
            <option value="$500 - $1,000">$500 - $1,000</option>
            <option value="$1,000 - $2,500">$1,000 - $2,500</option>
            <option value="$2,500 - $5,000">$2,500 - $5,000</option>
            <option value="$5,000+">$5,000+ (Premium commission)</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-1.5 mb-6">
        <label htmlFor="description" className="text-[11px] font-sans font-medium uppercase text-gold-450 tracking-[0.16em]">
          Tell us about your vision *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your design, stone preferences (e.g., local Kootenay mountain quartz, teal blue sapphires), sizing notes, and any personal milestones this piece celebrates."
          className="bg-gold-100/30 text-xs px-4 py-3.5 rounded-lg border border-gold-300/30 focus:outline-hidden focus:border-gold-450 text-forest-900 placeholder:text-forest-900/30 font-sans transition-all resize-none"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-xs font-serif tracking-widest uppercase bg-forest-900 text-gold-300 hover:text-gold-100 px-8 py-4 rounded-full border border-gold-300/25 flex items-center justify-center gap-2 shadow-md hover:bg-forest-950 hover:scale-101 active:scale-99 transition-all cursor-pointer w-full text-center"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border border-gold-300 border-t-transparent rounded-full animate-spin shrink-0" />
            <span>Submitting parameters...</span>
          </>
        ) : (
          <>
            <Send className="w-4.5 h-4.5" />
            <span>Send Custom Proposal</span>
          </>
        )}
      </button>

      <p className="text-[10px] text-center text-forest-900/40 font-mono mt-4">
        * Alexandra respects your data. By submitting, you agree to secure communications.
      </p>
    </form>
  );
}
