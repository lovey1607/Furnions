'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaInstagram, FaPinterest, FaFacebook } from 'react-icons/fa';

interface NewsletterFormData {
  email: string;
}

const Footer: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<NewsletterFormData>({ email: '' });

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About Us', href: '/about' },
    { label: 'Why Furnions', href: '/why-furnions' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { 
      icon: FaInstagram, 
      href: '#', 
      label: 'Instagram',
      hoverColor: 'hover:text-pink-500'
    },
    { 
      icon: FaPinterest, 
      href: '#', 
      label: 'Pinterest',
      hoverColor: 'hover:text-red-500'
    },
    { 
      icon: FaFacebook, 
      href: '#', 
      label: 'Facebook',
      hoverColor: 'hover:text-blue-500'
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ email: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold text-primary font-serif mb-4">
                Furnions
              </h3>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Discover timeless furniture crafted with care for those who appreciate 
              the art of understated luxury.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`p-2 rounded-full bg-muted text-muted-foreground ${social.hoverColor} transition-colors duration-200`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4 font-serif">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4 font-serif">
              Stay Updated
            </h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest collections and exclusive offers.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting || !formData.email}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting || !formData.email
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95'
                }`}
                whileHover={!isSubmitting && formData.email ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && formData.email ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
              
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-600"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
              
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-destructive"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Furnions. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;