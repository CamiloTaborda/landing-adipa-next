"use client";

import { useRef, useEffect, useState, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronRight
} from "react-icons/fi";
import { useSearch } from "@/context/SearchContext";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { searchQuery, setSearchQuery } = useSearch();

  const isHome = pathname === "/";

  const secondaryLinks = [
    { label: "Cursos", href: "/cursos" },
    { label: "Diplomados", href: "/diplomados" },
    { label: "Seminarios", href: "/seminarios" },
    { label: "Congreso", href: "/congreso" },
    { label: "Especializaciones", href: "/especializaciones" },
    { label: "Acreditaciones", href: "/acreditaciones" },
    { label: "Sesiones Magistrales", href: "/sesiones-magistrales" },
    { label: "Recursos", href: "/recursos" },
    { label: "Contacto", href: "/contacto" },
  ];

  const handleChange = (value: string) => {
    setSearchQuery(value);
    if (isHome && value.trim()) {
      document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (isHome) {
      document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/cursos?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    startTransition(() => {
      setIsMobileMenuOpen(false);
    });
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50">

      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-14 md:h-16">

          <Link href="/" className="z-[110] flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/logo-adipa.png"
              alt="ADIPA"
              width={100}
              height={32}
              className="h-7 md:h-8 w-auto object-contain"
              priority
            />
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-12">
            <div className="relative w-full group">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar cursos..."
                value={searchQuery}
                onChange={(e) => handleChange(e.target.value)}
                className="w-full bg-[#F5F5F7] rounded-full px-10 py-2 text-sm transition-all outline-none focus:bg-white focus:ring-[2px] focus:ring-[#4B3CFB]/20 border border-transparent focus:border-[#4B3CFB]"
              />
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 group-focus-within:text-[#4B3CFB] transition-colors" />
            </div>
          </form>

          <div className="flex items-center gap-2 md:gap-4 z-[110]">
            <div className="hidden md:flex items-center gap-5">
              <Link href="/login" className="text-[13px] font-medium text-[#1D1D1F] hover:text-[#4B3CFB] transition-colors">
                Iniciar sesión
              </Link>
              <Link href="/registro" className="bg-[#4B3CFB] text-white text-[13px] font-semibold px-5 py-2 rounded-full hover:bg-[#3A2FD1] transition-all active:scale-95">
                Registrarse
              </Link>
            </div>

            <Link href="/carrito" className="relative p-2 text-[#1D1D1F] hover:opacity-60 transition-opacity">
              <FiShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-0.5 bg-[#4B3CFB] text-white text-[10px] font-bold rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
                0
              </span>
            </Link>

            <button
              className="md:hidden p-2 text-[#1D1D1F] rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <nav className="hidden md:block border-t border-gray-100/60">
        <div className="max-w-[1440px] mx-auto px-6">
          <ul className="flex items-center justify-center gap-8 py-3">
            {secondaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-[12px] font-medium tracking-tight transition-colors ${
                    pathname === link.href ? "text-[#4B3CFB]" : "text-[#6E6E73] hover:text-[#1D1D1F]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 w-full h-screen bg-white z-[200] overflow-y-auto pt-20 px-8 pb-10"
          >
            <button
              className="absolute top-4 right-4 p-2 text-[#1D1D1F] rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FiX size={22} />
            </button>

            <div className="mb-10">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="¿Qué quieres aprender?"
                  className="w-full bg-[#F5F5F7] rounded-2xl px-12 py-4 text-lg font-medium outline-none border-2 border-transparent focus:border-[#4B3CFB]/10 transition-all"
                  value={searchQuery}
                  onChange={(e) => handleChange(e.target.value)}
                />
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </form>
            </div>

            <nav className="space-y-1">
              {secondaryLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 text-xl font-semibold text-[#1D1D1F] border-b border-gray-50 active:text-[#4B3CFB]"
                  >
                    {link.label}
                    <FiChevronRight className="text-gray-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-12 space-y-4">
              <Link
                href="/login"
                className="flex items-center justify-center w-full py-4 rounded-2xl bg-[#F5F5F7] text-[#1D1D1F] font-bold active:scale-[0.98] transition-all"
              >
                Mi Cuenta
              </Link>
              <Link
                href="/registro"
                className="flex items-center justify-center w-full py-4 rounded-2xl bg-[#4B3CFB] text-white font-bold shadow-lg shadow-[#4B3CFB]/20 active:scale-[0.98] transition-all"
              >
                Comenzar ahora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}