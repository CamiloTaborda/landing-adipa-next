"use client";

import Image from "next/image";
import Link from "next/link";
import { Course } from "@/types";
import { FaStar, FaStarHalfAlt, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { categories } from "@/data/categories";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const [addedToCart, setAddedToCart] = useState(false);

  const today = new Date();
  const start = new Date(course.startDate);
  const isInProgress = start <= today;

  const categoryName = categories.find(cat => cat.id === course.categoryId)?.name || course.categoryId;

  const renderStars = (rating: number | undefined) => {
    const safeRating = typeof rating === "number" && !isNaN(rating) ? rating : 0;
    const fullStars = Math.floor(safeRating);
    const hasHalfStar = safeRating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} className="w-3 h-3 text-[#FFD166]" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="w-3 h-3 text-[#FFD166]" />}
        <span className="ml-1.5 text-[11px] font-bold text-[#6E6E73] tracking-tighter">
          {safeRating.toFixed(1)}
        </span>
      </div>
    );
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="group relative glass-card rounded-2xl overflow-hidden flex flex-col h-full hover:scale-[1.02] transition-all duration-500">
      
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Modality Badge: Glassmorphism */}
        <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md bg-white/20 border border-white/30 text-white rounded-full">
          {course.modality}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 bg-white">
        {/* Categoría y Rating */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#4B3CFB]">
            {categoryName}
          </span>
          {renderStars(course.rating)}
        </div>

        <h3 className="font-bold text-lg text-[#1D1D1F] leading-tight mb-2 tracking-tight line-clamp-2 group-hover:text-[#4B3CFB] transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-[#6E6E73] line-clamp-2 mb-4 leading-relaxed font-medium">
          {course.description}
        </p>

        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2">
             <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400">P</div>
             <p className="text-[12px] text-[#6E6E73] font-medium">Dictado por <span className="text-[#1D1D1F]">{course.instructor}</span></p>
          </div>
          <p className="text-[12px] text-[#6E6E73] font-medium">
             Inicio: {start.toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
        </div>

        <div className="mb-6">
          <span className={`inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${
            isInProgress 
              ? "bg-[#FFD166]/10 border-[#FFD166]/20 text-[#D9A300]" 
              : "bg-gray-50 border-gray-100 text-gray-500"
          }`}>
            {isInProgress ? "EN PROGRESO" : "PRÓXIMAMENTE"}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#6E6E73] line-through font-medium leading-none mb-1">
              ${course.price.toLocaleString()}
            </p>
            <p className="text-xl font-bold text-[#1D1D1F] tracking-tighter">
              ${course.discountPrice.toLocaleString()}
            </p>
          </div>
          
          <button
            onClick={handleAddToCart}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
              addedToCart
                ? "bg-[#16C784] text-white"
                : "bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#4B3CFB] hover:text-white"
            }`}
          >
            <FaShoppingCart className="w-4 h-4" />
          </button>
        </div>
        
        <Link
          href={`/cursos/${course.slug}`}
          className="mt-4 w-full bg-gradient-to-r from-[#4B3CFB] to-[#5B65FF] text-white py-3 rounded-xl font-bold text-sm text-center shadow-[0_10px_20px_-10px_#4B3CFB] hover:shadow-[0_15px_25px_-10px_#4B3CFB] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Ver curso
        </Link>
      </div>
    </div>
  );
}