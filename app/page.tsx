"use client";

import Hero from "@/components/Hero";
import CoursesPage from "@/components/Courses/CoursesPage";
import { useSearch } from "@/context/SearchContext";

export default function Home() {
  const { searchQuery, setSearchQuery } = useSearch();

  return (
    <>
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <section id="cursos" className="container mx-auto px-4 py-12">
        <CoursesPage
          searchOverride={searchQuery}
          onClearSearch={() => setSearchQuery("")}
        />
      </section>
    </>
  );
}