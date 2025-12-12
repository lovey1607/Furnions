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
            NIOS
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

function DayNightSection() {
  const [isNight, setIsNight] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40%" });

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setIsNight((prev) => !prev);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: isNight ? "#1A1A18" : "#F2F0E9" }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                className="font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-1000"
                style={{ color: isNight ? "#9B9890" : "#6B6963" }}
              >
                The Silhouette Collection
              </motion.span>
              <h2
                className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] transition-colors duration-1000"
                style={{ color: isNight ? "#F2F0E9" : "#1A1A18" }}
              >
                Day<br />& Night
              </h2>
            </div>

            <p
              className="font-mono text-sm leading-relaxed max-w-md transition-colors duration-1000"
              style={{ color: isNight ? "#9B9890" : "#6B6963" }}
            >
              Our menu holder adapts to every ambiance. Crafted from sustainably 
              sourced walnut, each piece transforms with the light—bold at dawn, 
              intimate at dusk.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsNight(false)}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-500 ${
                  !isNight
                    ? "border-[#CC5500] text-[#CC5500]"
                    : "border-[#6B6963] text-[#6B6963] hover:border-[#F2F0E9] hover:text-[#F2F0E9]"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setIsNight(true)}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-500 ${
                  isNight
                    ? "border-[#CC5500] text-[#CC5500]"
                    : "border-[#6B6963] text-[#6B6963] hover:border-[#1A1A18] hover:text-[#1A1A18]"
                }`}
              >
                Night
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-lg mx-auto overflow-hidden rounded-t-[100px]">
              <motion.div
                animate={{ scale: isNight ? 1.05 : 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=1000&fit=crop"
                  alt="Menu holder on table"
                  fill
                  className="object-cover transition-all duration-1000"
                  style={{ filter: isNight ? "brightness(0.4)" : "brightness(1)" }}
                />
              </motion.div>

              <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  background: isNight
                    ? "radial-gradient(ellipse at 50% 30%, rgba(255,180,100,0.15) 0%, transparent 60%)"
                    : "none",
                  opacity: isNight ? 1 : 0,
                }}
              />
            </div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px mt-8 transition-colors duration-1000"
              style={{ backgroundColor: isNight ? "#3A3A38" : "#D4D1C7" }}
            />

            <p
              className="font-mono text-[10px] tracking-[0.2em] uppercase mt-4 transition-colors duration-1000"
              style={{ color: isNight ? "#6B6963" : "#9B9890" }}
            >
              Menu Holder — Walnut Edition
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&h=800&fit=crop",
    title: "QR Stand",
    material: "Laser Cut Oak",
    position: "top",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=700&h=500&fit=crop",
    title: "Serving Tray",
    material: "Walnut",
    position: "bottom",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&h=700&fit=crop",
    title: "Espresso Cup",
    material: "Ceramic & Cork",
    position: "middle",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    title: "Lounge Chair",
    material: "Leather & Ash",
    position: "top",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=900&fit=crop",
    title: "Side Table",
    material: "Travertine",
    position: "bottom",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=700&h=700&fit=crop",
    title: "Floor Lamp",
    material: "Brass & Linen",
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
              <h3 className="font-serif italic text-3xl text-[#F2F0E9]">FURNIOS</h3>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#6B6963]">
                Quiet Luxury Since 2024
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
            © 2024 FURNIOS. All rights reserved. Crafted with intention.
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
      <DayNightSection />
      <GallerySection />
      <FooterSection />
    </main>
  );
}"use client";

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
            NIOS
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

function DayNightSection() {
  const [isNight, setIsNight] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40%" });

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setIsNight((prev) => !prev);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: isNight ? "#1A1A18" : "#F2F0E9" }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                className="font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-1000"
                style={{ color: isNight ? "#9B9890" : "#6B6963" }}
              >
                The Silhouette Collection
              </motion.span>
              <h2
                className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] transition-colors duration-1000"
                style={{ color: isNight ? "#F2F0E9" : "#1A1A18" }}
              >
                Day<br />& Night
              </h2>
            </div>

            <p
              className="font-mono text-sm leading-relaxed max-w-md transition-colors duration-1000"
              style={{ color: isNight ? "#9B9890" : "#6B6963" }}
            >
              Our menu holder adapts to every ambiance. Crafted from sustainably 
              sourced walnut, each piece transforms with the light—bold at dawn, 
              intimate at dusk.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsNight(false)}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-500 ${
                  !isNight
                    ? "border-[#CC5500] text-[#CC5500]"
                    : "border-[#6B6963] text-[#6B6963] hover:border-[#F2F0E9] hover:text-[#F2F0E9]"
                }`}
              >
                Day
              </button>
              <button
                onClick={() => setIsNight(true)}
                className={`font-mono text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-500 ${
                  isNight
                    ? "border-[#CC5500] text-[#CC5500]"
                    : "border-[#6B6963] text-[#6B6963] hover:border-[#1A1A18] hover:text-[#1A1A18]"
                }`}
              >
                Night
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-lg mx-auto overflow-hidden rounded-t-[100px]">
              <motion.div
                animate={{ scale: isNight ? 1.05 : 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=1000&fit=crop"
                  alt="Menu holder on table"
                  fill
                  className="object-cover transition-all duration-1000"
                  style={{ filter: isNight ? "brightness(0.4)" : "brightness(1)" }}
                />
              </motion.div>

              <div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{
                  background: isNight
                    ? "radial-gradient(ellipse at 50% 30%, rgba(255,180,100,0.15) 0%, transparent 60%)"
                    : "none",
                  opacity: isNight ? 1 : 0,
                }}
              />
            </div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-px mt-8 transition-colors duration-1000"
              style={{ backgroundColor: isNight ? "#3A3A38" : "#D4D1C7" }}
            />

            <p
              className="font-mono text-[10px] tracking-[0.2em] uppercase mt-4 transition-colors duration-1000"
              style={{ color: isNight ? "#6B6963" : "#9B9890" }}
            >
              Menu Holder — Walnut Edition
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const galleryItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&h=800&fit=crop",
    title: "QR Stand",
    material: "Laser Cut Oak",
    position: "top",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=700&h=500&fit=crop",
    title: "Serving Tray",
    material: "Walnut",
    position: "bottom",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=500&h=700&fit=crop",
    title: "Espresso Cup",
    material: "Ceramic & Cork",
    position: "middle",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    title: "Lounge Chair",
    material: "Leather & Ash",
    position: "top",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=900&fit=crop",
    title: "Side Table",
    material: "Travertine",
    position: "bottom",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=700&h=700&fit=crop",
    title: "Floor Lamp",
    material: "Brass & Linen",
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
              <h3 className="font-serif italic text-3xl text-[#F2F0E9]">FURNIOS</h3>
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
            © 2025-2026 FURNIOS. All rights reserved. Crafted with intention.
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
      <DayNightSection />
      <GallerySection />
      <FooterSection />
    </main>
  );
}