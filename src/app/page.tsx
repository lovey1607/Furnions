"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const objectY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const objectRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const textLeftX = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textRightX = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F2F0E9]"
    >
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }} />

      <motion.div style={{ opacity }} className="relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-16">
          <motion.h1
            style={{ x: textLeftX }}
            className="font-serif italic text-[#1A1A18] text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] font-normal tracking-tight leading-none"
          >
            FUR
          </motion.h1>

          <motion.div
            style={{ y: objectY, rotate: objectRotate }}
            className="relative w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-52 lg:w-56 lg:h-72"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=400&h=500&fit=crop"
              alt="Cafe furniture and menu holder"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
          </motion.div>

          <motion.h1
            style={{ x: textRightX }}
            className="font-serif italic text-[#1A1A18] text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] font-normal tracking-tight leading-none"
          >
            NICALLY
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 md:mt-20 font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#6B6963]"
        >
          Aesthetic Furniture
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-16 bg-gradient-to-b from-transparent via-[#1A1A18] to-transparent"
        />
      </motion.div>
    </section>
  );
}

function CatalogueSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20%" });
  const [activeIndex, setActiveIndex] = useState(0);

  const catalogueItems = [
    {
      id: 1,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-10-1765648710123.jpg",
      title: "Wall Wine Rack",
      material: "Reclaimed Wood",
    },
    {
      id: 2,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Handcrafted-Natural-Unique-Solid-Wood-Bottle-Wine-Rack-Tableware-Party-Decoration-Wholesale-From-Vietnam-Buy-Unique-Solid-Wood-Bottle-Wine-Rack-Unique-Solid-Wood-Bottle-Wine-Rack-Glass-Bottles-Unique-Solid-W-1765648709555.jpg",
      title: "Sculptural Wine Holder",
      material: "Solid Mango Wood",
    },
    {
      id: 3,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-9-1765648709813.jpg",
      title: "Nesting Tables",
      material: "Walnut & Carved Inlay",
    },
    {
      id: 4,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-8-1765648709896.jpg",
      title: "Cylindrical Side Table",
      material: "Sheesham Wood",
    },
    {
      id: 5,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Side-Tables-_-Living-Room-Side-Tables-1765648709459.jpg",
      title: "Bear Table Stand",
      material: "Hand-Carved Acacia",
    },
    {
      id: 6,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/These-would-be-great-designs_-1765648710031.jpg",
      title: "Leaf Coaster Set",
      material: "Engraved Oak",
    },
    {
      id: 7,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-7-1765648709681.jpg",
      title: "Monogram Cutting Board",
      material: "Hickory & Walnut",
    },
    {
      id: 8,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/10-DIY-Kitchen-Decoration-Ideas-That-Will-Transform-Your-Space-Right-Away-Don-t-Miss-3-1765648710000.jpg",
      title: "Striped Cutting Boards",
      material: "Multi-Wood Composition",
    },
    {
      id: 9,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Custom-Engraved-Wooden-Cutting-Board-Set-Kitchen-Boards-Set-3-Handmade-Decorative-Plates-Personalized-Grandma-s-Gift-Cut-Boards-Set-1765648709917.jpg",
      title: "Decorative Board Stands",
      material: "Carved & Freestanding",
    },
    {
      id: 10,
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-6-1765648710295.jpg",
      title: "Tiered Bamboo Organizers",
      material: "Natural Bamboo & Wire",
    },
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % catalogueItems.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInView, catalogueItems.length]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen py-20 bg-[#F2F0E9] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6B6963]">
            Wooden Craftsmanship
          </span>
          <h2 className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1A1A18] mt-4 leading-[0.9]">
            Our<br />Catalogue
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {catalogueItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative group overflow-hidden rounded-lg ${
                activeIndex === index ? "ring-2 ring-[#CC5500]" : ""
              }`}
            >
              <motion.div
                animate={{
                  scale: activeIndex === index ? 1.05 : 1,
                }}
                transition={{ duration: 0.6 }}
                className="relative aspect-square"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#1A1A18]/80 via-transparent to-transparent transition-opacity duration-500 ${
                    activeIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : 10,
                }}
                className="absolute bottom-0 left-0 right-0 p-3 text-white"
              >
                <h3 className="font-serif italic text-sm md:text-base">{item.title}</h3>
                <p className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] uppercase text-[#D4D1C7] mt-1">
                  {item.material}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <button className="group flex items-center gap-4 font-mono text-xs tracking-[0.2em] uppercase text-[#1A1A18] hover:text-[#CC5500] transition-colors border border-[#1A1A18] hover:border-[#CC5500] px-8 py-3">
            <span>Explore Full Collection</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-lg"
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

const galleryItems = [
  {
    id: 1,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-10-1765648710123.jpg",
    title: "Wall Wine Rack",
    material: "Reclaimed Wood & Brass",
    position: "top",
  },
  {
    id: 2,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Handcrafted-Natural-Unique-Solid-Wood-Bottle-Wine-Rack-Tableware-Party-Decoration-Wholesale-From-Vietnam-Buy-Unique-Solid-Wood-Bottle-Wine-Rack-Unique-Solid-Wood-Bottle-Wine-Rack-Glass-Bottles-Unique-Solid-W-1765648709555.jpg",
    title: "Sculptural Wine Holder",
    material: "Solid Mango Wood",
    position: "bottom",
  },
  {
    id: 3,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Side-Tables-_-Living-Room-Side-Tables-1765648709459.jpg",
    title: "Bear Table Stand",
    material: "Hand-Carved Acacia",
    position: "middle",
  },
  {
    id: 4,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-9-1765648709813.jpg",
    title: "Nesting Tables",
    material: "Walnut & Carved Inlay",
    position: "top",
  },
  {
    id: 5,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/10-DIY-Kitchen-Decoration-Ideas-That-Will-Transform-Your-Space-Right-Away-Don-t-Miss-3-1765648710000.jpg",
    title: "Striped Cutting Boards",
    material: "Multi-Wood Composition",
    position: "bottom",
  },
  {
    id: 6,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/download-6-1765648710295.jpg",
    title: "Tiered Organizers",
    material: "Natural Bamboo & Wire",
    position: "middle",
  },
];

function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#F2F0E9] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="px-6 md:px-12 lg:px-20 mb-16"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6B6963]">
          Gallery
        </span>
        <h2 className="font-serif italic text-5xl sm:text-6xl md:text-7xl text-[#1A1A18] mt-4">
          The Collection
        </h2>
      </motion.div>

      <div className="relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#D4D1C7] -translate-y-1/2 z-0" />

        <motion.div style={{ x }} className="flex gap-8 md:gap-12 px-6 md:px-12 lg:px-20">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex-shrink-0 group ${
                item.position === "top"
                  ? "self-start mt-0"
                  : item.position === "bottom"
                  ? "self-end mt-40"
                  : "self-center mt-20"
              }`}
            >
              <div
                className={`relative overflow-hidden ${
                  index % 2 === 0 ? "w-64 md:w-80" : "w-48 md:w-64"
                }`}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1A1A18] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="mt-4 space-y-1"
                >
                  <h3 className="font-serif italic text-xl text-[#1A1A18]">{item.title}</h3>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6B6963]">
                    {item.material}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-20"
      >
        <button className="group flex items-center gap-4 font-mono text-xs tracking-[0.2em] uppercase text-[#1A1A18] hover:text-[#CC5500] transition-colors">
          <span>View All Pieces</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-lg"
          >
            →
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
}

function FooterSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <footer className="relative min-h-screen bg-[#1A1A18] py-32 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6B6963]">
            Get In Touch
          </span>
          <h2 className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F2F0E9] mt-4 leading-[0.9]">
            Submit<br />Aesthetically
          </h2>
        </motion.div>

        <form onSubmit={handleSubmit} className="max-w-2xl">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6B6963] block mb-4">
                Your Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-[#3A3A38] py-4 font-mono text-sm text-[#F2F0E9] focus:outline-none focus:border-[#CC5500] transition-colors placeholder:text-[#4A4A48]"
                placeholder="Enter your name"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6B6963] block mb-4">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-[#3A3A38] py-4 font-mono text-sm text-[#F2F0E9] focus:outline-none focus:border-[#CC5500] transition-colors placeholder:text-[#4A4A48]"
                placeholder="your@email.com"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <label className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6B6963] block mb-4">
                Your Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-[#3A3A38] py-4 font-mono text-sm text-[#F2F0E9] focus:outline-none focus:border-[#CC5500] transition-colors resize-none placeholder:text-[#4A4A48]"
                placeholder="Tell us about your project..."
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <button
                type="submit"
                className="group flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-[#F2F0E9] hover:text-[#CC5500] transition-colors mt-8"
              >
                <span>Send Message</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-lg"
                >
                  →
                </motion.span>
              </button>
            </motion.div>
          </div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-32 pt-12 border-t border-[#3A3A38]"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-2">
              <h3 className="font-serif italic text-3xl text-[#F2F0E9]">FURNICALLY</h3>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6B6963]">
                Aesthetically Curated
              </p>
            </div>

            <div className="flex gap-8">
              {["Instagram", "Pinterest", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6B6963] hover:text-[#CC5500] transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <p className="font-mono text-[10px] tracking-[0.1em] text-[#4A4A48] mt-12">
            © 2025-2026 FURNICALLY. All rights reserved. Crafted with intention.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <CatalogueSection />
      <GallerySection />
      <FooterSection />
    </main>
  );
}