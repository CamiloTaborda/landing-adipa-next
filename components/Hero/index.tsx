"use client";

import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { categories } from "@/data/categories";

interface Props {
  searchQuery?: string;
  onSearchChange?: (query: string) => void; 
  onSearch?: (query: string) => void;      
}

export default function Hero({ searchQuery = "", onSearchChange, onSearch }: Props) {
  const router = useRouter();
  const popularCategories = categories.slice(0, 7);

  const handleChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value); 
      if (value.trim()) {
        document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (onSearch) {
      onSearch(searchQuery.trim());
    } else if (!onSearchChange) {
      router.push(`/cursos?search=${encodeURIComponent(searchQuery.trim())}`);
    }
    document.getElementById("cursos")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/cursos?categoria=${encodeURIComponent(categoryId)}`);
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-[#4B3CFB] to-[#5B65FF] text-white py-20 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-black/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] mb-6 tracking-tighter drop-shadow-sm">
          Cursos de Psicología con Certificado en 2026
        </h1>
        <p className="text-lg opacity-90 mb-12 mx-auto font-medium leading-relaxed">
          Vive la mejor experiencia de aprendizaje y potencia tus conocimientos a
          través de nuestros cursos y diplomados.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-12">
          <div className="relative group p-1.5 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full shadow-2xl transition-all duration-500 hover:bg-white/15">
            <input
              type="text"
              placeholder="¿Qué quieres aprender hoy?"
              value={searchQuery}
              onChange={(e) => handleChange(e.target.value)} 
              className="w-full px-6 py-4 pl-14 pr-28 text-white bg-transparent outline-none text-base md:text-lg placeholder:text-white/60"
            />
            <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-[#4B3CFB] px-8 py-2.5 rounded-full font-bold hover:bg-[#FFD166] hover:text-[#1A1A1A] transition-all duration-300 shadow-lg active:scale-95 text-sm md:text-base"
            >
              Buscar
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-white/60 font-medium mr-1">Populares:</span>
          {popularCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-semibold hover:bg-white hover:text-[#4B3CFB] transition-all duration-300"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}