"use client";

import { useState, useEffect, useMemo, startTransition  } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineAdjustmentsHorizontal, HiOutlineXMark } from "react-icons/hi2";
import { getCourses } from "@/services/courseService";
import CoursesGrid from "@/components/Courses/CoursesGrid";
import FiltersSidebar, { FilterValues } from "@/components/Courses/FilterSidebar";
import { Course } from "@/types";
import { categories } from "@/data/categories";

interface Props {
  searchOverride?: string;
  onClearSearch?: () => void;
}

const DEFAULT_FILTERS: FilterValues = {
  top10: false,
  popular: false,
  bestRated: false,
  newRelease: false,
  flashSale: false,
  preLaunch: false,
  area: "",
  programType: "",
  modality: "",
  category: "",
  priceMax: 500,
  hoursMax: 200,
  discountMin: 0,
};

export default function CoursesPage({ searchOverride, onClearSearch }: Props) {
  const searchParams = useSearchParams();
  const categoriaParam = searchParams.get("categoria") || "";

  const isHomeMode = searchOverride !== undefined;
  const searchQuery = isHomeMode
    ? searchOverride
    : (searchParams.get("search") ?? "");

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    ...DEFAULT_FILTERS,
    category: categoriaParam,
  });

useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      startTransition(() => {
        setIsMobileFiltersOpen(false);
      });
    }
  };
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

 useEffect(() => {
  if (categoriaParam) {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, category: categoriaParam }));
    });
  }
}, [categoriaParam]);

  useEffect(() => {
    getCourses()
      .then((data) => {
        setAllCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredCourses = useMemo(() => {
    let result = allCourses;

    const badgeActive =
      filters.top10 || filters.popular || filters.bestRated ||
      filters.newRelease || filters.flashSale || filters.preLaunch;

    if (badgeActive) {
      result = result.filter((course) => {
        let passes = false;
        if (filters.top10 && course.isTop10) passes = true;
        if (filters.popular && course.isPopular) passes = true;
        if (filters.bestRated && (course.rating ?? 0) >= 4.5) passes = true;
        if (filters.newRelease && course.isNewRelease) passes = true;
        if (filters.flashSale && course.isFlashSale) passes = true;
        if (filters.preLaunch && course.isPreLaunch) passes = true;
        return passes;
      });
    }

    if (filters.area) result = result.filter((c) => c.area === filters.area);
    if (filters.programType) result = result.filter((c) => c.programType === filters.programType);
    if (filters.modality) result = result.filter((c) => c.modality === filters.modality);
    if (filters.category) result = result.filter((c) => c.categoryId === filters.category);
    result = result.filter((c) => c.discountPrice <= filters.priceMax);
    result = result.filter((c) => c.hours <= filters.hoursMax);

    if (filters.discountMin > 0) {
      result = result.filter((c) => {
        const discount = c.price > 0 ? ((c.price - c.discountPrice) / c.price) * 100 : 0;
        return discount >= filters.discountMin;
      });
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.instructor.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allCourses, filters, searchQuery]);

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
    onClearSearch?.();
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
      <div className="w-8 h-8 border-[3px] border-[#4B3CFB]/10 border-t-[#4B3CFB] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <div className="max-w-[1300px] mx-auto px-6 md:px-10 py-10">

        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {searchQuery ? (
              <div>
                <p className="text-[13px] font-bold text-[#86868B] uppercase tracking-[0.15em] mb-1">
                  Resultados de búsqueda
                </p>
                <h1 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] tracking-tight leading-[1.1]">
                  {searchQuery}
                </h1>
              </div>
            ) : (
              <h1 className="text-[32px] md:text-[40px] font-bold text-[#1D1D1F] tracking-tight leading-[1.1]">
                Cursos que potencian tu carrera profesional.
              </h1>
            )}
          </div>

          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-white border border-gray-200 py-3 px-6 rounded-2xl shadow-sm active:scale-95 transition-all text-[#1D1D1F] font-bold text-sm"
          >
            <HiOutlineAdjustmentsHorizontal className="text-xl" />
            Filtros
          </button>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          <aside className="hidden lg:block w-72 sticky top-28">
            <FiltersSidebar
              categories={categories}
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleReset}
            />
          </aside>

          <main className="flex-1 w-full">
            <div className="flex items-center justify-between mb-8 border-b border-gray-200/60 pb-4">
              <span className="text-[13px] font-bold text-[#86868B] uppercase tracking-[0.15em]">
                {filteredCourses.length} Programas disponibles
              </span>
              {searchQuery && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-[#4B3CFB] hover:opacity-70 transition-opacity"
                >
                  <HiOutlineXMark className="text-base" />
                  Limpiar búsqueda
                </button>
              )}
            </div>

            {filteredCourses.length > 0 ? (
              <CoursesGrid courses={filteredCourses} />
            ) : (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[32px] border border-gray-200/50 text-center shadow-sm px-6">
                <p className="text-[#86868B] text-[17px] font-medium">
                  No encontramos cursos con esos criterios.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-4 text-[#4B3CFB] font-bold hover:underline underline-offset-4"
                >
                  Limpiar todos los filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-[#F5F5F7] z-[70] shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#1D1D1F]">Filtros</h2>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 bg-gray-200/50 rounded-full text-[#1D1D1F]"
                >
                  <HiOutlineXMark className="text-2xl" />
                </button>
              </div>

              <FiltersSidebar
                categories={categories}
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleReset}
              />

              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full bg-[#1D1D1F] text-white py-4 rounded-2xl font-bold mt-10"
              >
                Ver resultados
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}