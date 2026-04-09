import { courses } from "@/data/courses";
import Image from "next/image";
import { FaStar, FaRegClock, FaUserTie } from "react-icons/fa";
import ScrollToTop from "@/components/ScrollToTop";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <p className="text-[#1D1D1F] font-bold text-xl tracking-tight">Curso no encontrado</p>
      </div>
    );
  }

  const startDate = new Date(course.startDate).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#F5F5F7] selection:bg-[#4B3CFB]/10">
      <ScrollToTop />
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Visual Side */}
            <div className="w-full lg:w-3/5">
              <div className="relative aspect-video rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-white">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[32px]" />
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-2/5 flex flex-col h-full">
              <div className="inline-block px-3 py-1 rounded-full bg-[#4B3CFB]/5 text-[#4B3CFB] text-[11px] font-bold uppercase tracking-[0.2em] mb-6 w-fit">
                {course.modality}
              </div>
              
              <h1 className="text-[40px] md:text-[48px] font-bold text-[#1D1D1F] tracking-[-0.03em] leading-[1.1] mb-6">
                {course.title}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1 text-[#FFD166]">
                  <FaStar className="w-4 h-4 fill-current" />
                  <span className="text-[#1D1D1F] font-bold text-sm ml-1">{course.rating?.toFixed(1) || "5.0"}</span>
                </div>
                <div className="h-4 w-[1px] bg-gray-300" />
                <span className="text-[#6E6E73] text-sm font-medium tracking-tight">Opiniones certificadas</span>
              </div>

              {/* Pricing Card*/}
              <div className="p-8 rounded-[24px] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)] mb-8">
                <p className="text-[14px] text-[#6E6E73] font-medium mb-1">Inversión total</p>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-bold text-[#1D1D1F] tracking-tighter">
                    ${course.discountPrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-[#86868B] line-through font-medium">
                    ${course.price.toLocaleString()}
                  </span>
                </div>
                
                <button className="w-full bg-[#4B3CFB] text-white py-4 rounded-2xl font-bold text-[17px] hover:bg-[#3b30d1] transition-all duration-300 shadow-lg shadow-[#4B3CFB]/20 active:scale-[0.98]">
                  Inscribirme ahora
                </button>
              </div>

              {/* Specs rápidas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 border border-white">
                  <FaRegClock className="text-[#6E6E73]" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#86868B] tracking-widest leading-none mb-1">Inicio</p>
                    <p className="text-[13px] font-bold text-[#1D1D1F]">{startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 border border-white">
                  <FaUserTie className="text-[#6E6E73]" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#86868B] tracking-widest leading-none mb-1">Mentor</p>
                    <p className="text-[13px] font-bold text-[#1D1D1F]">{course.instructor}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Section */}
      <section className="bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[32px] font-bold text-[#1D1D1F] tracking-tight mb-8">Acerca de este curso</h2>
          <p className="text-[19px] text-[#6E6E73] leading-relaxed font-medium mb-12">
            {course.description}
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">¿Qué aprenderás?</h3>
              <ul className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex gap-3 text-[#6E6E73] text-[16px] font-medium tracking-tight">
                    <span className="text-[#4B3CFB] font-bold">✓</span>
                    Dominio avanzado de las herramientas y metodologías del sector.
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1D1D1F] mb-4">Requisitos</h3>
              <p className="text-[#6E6E73] text-[16px] font-medium leading-relaxed">
                No se requieren conocimientos previos profundos, solo una mentalidad orientada al crecimiento y pasión por el área.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}