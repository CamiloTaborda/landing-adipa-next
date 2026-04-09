import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaLinkedinIn, FaYoutube, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Explorar",
      links: ["Cursos", "Diplomados", "Categorías", "Seminarios", "Certificados"],
    },
    {
      title: "Soporte",
      links: ["Contacto", "Preguntas Frecuentes", "Mi Cuenta", "Ayuda"],
    },
    {
      title: "Legal",
      links: ["Privacidad", "Términos", "Cookies", "Avisos Legales"],
    },
  ];

  return (
    <footer className="w-full bg-[#b6b4b4] text-[#1D1D1F] pt-16 pb-10 mt-28 border-t border-gray-200 selection:bg-[#4B3CFB]/10">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10">
        
        {/* Sección Principal de Navegación Estilo Site Map */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          
          <div className="col-span-2 md:col-span-2 pr-6">
            <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
              <Image 
                src="/logo-adipa.png" 
                alt="ADIPA - Formación Profesional" 
                width={160} 
                height={50}  
                className="object-contain"
                priority
              />
            </Link>
            <p className="text-[12px] md:text-[13px] text-[#5d5d5e] leading-relaxed font-medium max-w-sm tracking-tight">
              Líderes en formación profesional especializada. Elevando el estándar de la salud mental a través de la educación digital de alta calidad.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-[12px] font-bold text-[#1D1D1F] mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link 
                      href={`/${link.toLowerCase()}`} 
                      className="text-[12px] md:text-[13px] text-[#424245] font-medium hover:text-[#1D1D1F] hover:underline transition-all duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <h3 className="text-[12px] md:text-[13px] font-bold text-[#1D1D1F] tracking-tight">Conecta con nuestra comunidad académica</h3>
            <div className="flex gap-4">
              {[FaInstagram, FaLinkedinIn, FaYoutube, FaFacebookF].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center text-[#1D1D1F] hover:bg-[#1D1D1F] hover:text-white hover:border-[#1D1D1F] hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-[12px] text-[#5d5d5e] font-medium">
                Copyright © {currentYear} ADIPA S.A.
              </span>
              <span className="text-[12px] text-[#5d5d5e] font-medium">
                Todos los derechos reservados.
              </span>
            </div>

            <div className="text-[12px] text-[#86868B] font-medium bg-gray-100 px-3 py-1 rounded-full border border-gray-200/50">
              Presencia en: Chile · Colombia · México · Argentina
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}