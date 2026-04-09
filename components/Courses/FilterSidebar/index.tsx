"use client";

import { ReactNode } from "react";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";
import { Category } from "@/types";
import { useState } from "react";

export interface FilterValues {
  top10: boolean;
  popular: boolean;
  bestRated: boolean;
  newRelease: boolean;
  flashSale: boolean;
  preLaunch: boolean;
  area: string;
  programType: string;
  modality: string;
  category: string;
  priceMax: number;
  hoursMax: number;
  discountMin: number;
}

interface Props {
  categories: Category[];
  filters: FilterValues;           
  onFilterChange: (filters: FilterValues) => void;
  onReset: () => void;
}

interface FilterSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

interface BadgeProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  unit: string;
}

export default function FiltersSidebar({ categories, filters, onFilterChange, onReset }: Props) {
  const [openSections, setOpenSections] = useState({
    destacados: true,
    area: true,
    programType: true,
    modality: true,
    price: false,
    hours: false,
    discount: false,
    category: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateFilter = <K extends keyof FilterValues>(key: K, value: FilterValues[K]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div
      className="w-80 bg-white/80 backdrop-blur-xl sticky top-24 rounded-[32px] border border-gray-200/60 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.03)] flex-shrink-0 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-none"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-[22px] text-[#1D1D1F] tracking-tight">Filtros</h2>
        <button
          onClick={onReset}
          className="text-[13px] font-bold text-[#4B3CFB] hover:opacity-60 transition-opacity flex items-center gap-1.5"
        >
          <FaTimes className="w-2.5 h-2.5" />
          Borrar filtros
        </button>
      </div>

      <div className="space-y-1">
        <FilterSection title="Destacados" isOpen={openSections.destacados} onToggle={() => toggleSection("destacados")}>
          <div className="flex flex-wrap gap-2 pb-2">
            <Badge label="Top 10 semanal"       active={filters.top10}      onClick={() => updateFilter("top10", !filters.top10)} />
            <Badge label="Más Populares"         active={filters.popular}    onClick={() => updateFilter("popular", !filters.popular)} />
            <Badge label="Mejores Valorados"     active={filters.bestRated}  onClick={() => updateFilter("bestRated", !filters.bestRated)} />
            <Badge label="Nuevos Lanzamientos"   active={filters.newRelease} onClick={() => updateFilter("newRelease", !filters.newRelease)} />
            <Badge label="Ofertas Flash"         active={filters.flashSale}  onClick={() => updateFilter("flashSale", !filters.flashSale)} />
            <Badge label="Pre Lanzamiento"       active={filters.preLaunch}  onClick={() => updateFilter("preLaunch", !filters.preLaunch)} />
          </div>
        </FilterSection>

        <FilterSection title="Área Temática" isOpen={openSections.area} onToggle={() => toggleSection("area")}>
          <Select
            value={filters.area}
            onChange={(val) => updateFilter("area", val)}
            options={[
              { value: "", label: "Todas las áreas" },
              { value: "clinica", label: "Psicología Clínica" },
              { value: "neuro", label: "Neurociencias" },
              { value: "organizacional", label: "Organizacional" },
              { value: "educativa", label: "Educativa" },
              { value: "forense", label: "Forense" },
            ]}
          />
        </FilterSection>

        <FilterSection title="Tipo de programa" isOpen={openSections.programType} onToggle={() => toggleSection("programType")}>
          <Select
            value={filters.programType}
            onChange={(val) => updateFilter("programType", val)}
            options={[
              { value: "", label: "Todos" },
              { value: "Curso", label: "Curso" },
              { value: "Diplomado", label: "Diplomado" },
              { value: "Taller", label: "Taller" },
              { value: "Seminario", label: "Seminario" },
            ]}
          />
        </FilterSection>

        <FilterSection title="Modalidad" isOpen={openSections.modality} onToggle={() => toggleSection("modality")}>
          <Select
            value={filters.modality}
            onChange={(val) => updateFilter("modality", val)}
            options={[
              { value: "", label: "Todas" },
              { value: "Online", label: "Online" },
              { value: "En Vivo", label: "En Vivo" },
              { value: "Presencial", label: "Presencial" },
            ]}
          />
        </FilterSection>

        <FilterSection title="Rango de Precio" isOpen={openSections.price} onToggle={() => toggleSection("price")}>
          <RangeSlider
            label="Precio máximo"
            min={0} max={500}
            value={filters.priceMax}
            onChange={(val) => updateFilter("priceMax", val)}
            unit="$"
          />
        </FilterSection>

        <FilterSection title="Rango de Horas" isOpen={openSections.hours} onToggle={() => toggleSection("hours")}>
          <RangeSlider
            label="Horas máximas"
            min={0} max={200}
            value={filters.hoursMax}
            onChange={(val) => updateFilter("hoursMax", val)}
            unit="hrs"
          />
        </FilterSection>

        <FilterSection title="Descuento mínimo" isOpen={openSections.discount} onToggle={() => toggleSection("discount")}>
          <RangeSlider
            label="Descuento mínimo"
            min={0} max={100}
            value={filters.discountMin}
            onChange={(val) => updateFilter("discountMin", val)}
            unit="%"
          />
        </FilterSection>

        <FilterSection title="Categoría" isOpen={openSections.category} onToggle={() => toggleSection("category")}>
          <Select
            value={filters.category}
            onChange={(val) => updateFilter("category", val)}
            options={[
              { value: "", label: "Todas" },
              ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
            ]}
          />
        </FilterSection>
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

function FilterSection({ title, isOpen, onToggle, children }: FilterSectionProps) {
  return (
    <div className="border-b border-gray-100/50 last:border-none py-1">
      <button onClick={onToggle} className="flex items-center justify-between w-full py-4 group">
        <span className={`text-[14px] font-bold tracking-tight transition-colors ${isOpen ? "text-[#1D1D1F]" : "text-[#86868B] group-hover:text-[#1D1D1F]"}`}>
          {title}
        </span>
        {isOpen
          ? <FaChevronUp className="w-3 h-3 text-[#4B3CFB]" />
          : <FaChevronDown className="w-3 h-3 text-[#86868B]" />
        }
      </button>
      {isOpen && (
        <div className="pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {children}
        </div>
      )}
    </div>
  );
}

function Badge({ label, active, onClick }: BadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 text-[12px] font-bold rounded-full transition-all duration-300 border ${
        active
          ? "bg-[#4B3CFB] border-[#4B3CFB] text-white shadow-[0_4px_12px_rgba(75,60,251,0.25)]"
          : "bg-[#F5F5F7] border-transparent text-[#1D1D1F] hover:bg-[#E8E8ED]"
      }`}
    >
      {label}
    </button>
  );
}

function Select({ value, onChange, options }: SelectProps) {
  return (
    <div className="relative group">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#F5F5F7] border border-transparent rounded-2xl px-4 py-3.5 text-[13px] font-bold text-[#1D1D1F] appearance-none focus:bg-white focus:border-[#4B3CFB]/20 focus:ring-4 focus:ring-[#4B3CFB]/5 outline-none transition-all cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-[#86868B] pointer-events-none transition-transform group-focus-within:rotate-180" />
    </div>
  );
}

function RangeSlider({ label, min, max, value, onChange, unit }: RangeSliderProps) {
  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-extrabold text-[#86868B] uppercase tracking-wider">{label}</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={min} max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-16 bg-[#F5F5F7] border-none rounded-lg px-2 py-1 text-[13px] font-bold text-[#4B3CFB] focus:ring-2 focus:ring-[#4B3CFB]/20 outline-none"
          />
          <span className="text-[12px] font-bold text-[#86868B]">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min} max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-[5px] bg-[#F5F5F7] rounded-full appearance-none cursor-pointer accent-[#4B3CFB]"
      />
    </div>
  );
}