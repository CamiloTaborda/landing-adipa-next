import CoursesPage from "@/components/Courses/CoursesPage";
import { courses } from "@/data/courses";

export default function CursosPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]/50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        <header className="max-w-[1300px] mx-auto px-8 py-12">
          <h1 className="text-[40px] md:text-[48px] font-bold text-[#1D1D1F] tracking-tight leading-[1.1]">
            Cursos
          </h1>
          <p className="text-[19px] md:text-[21px] text-[#6E6E73] mt-4 font-medium leading-relaxed tracking-tight">
            Diseñados para mentes inquietas. Explora nuestra selección de formación especializada.
          </p>
        </header>

        <main>
          <CoursesPage />
        </main>
        
        <footer className="mt-20 pt-8 border-t border-gray-200/50">
          <p className="text-[13px] text-[#86868B] font-medium">
            Mostrando {courses.length} programas disponibles
          </p>
        </footer>
      </div>
    </div>
  );
}