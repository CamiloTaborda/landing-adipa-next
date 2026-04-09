"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  nombre: string;
  email: string;
  mensaje: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  mensaje?: string;
}

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es necesario";
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = "Email no válido";
    if (formData.mensaje.trim().length < 10) newErrors.mensaje = "Mensaje demasiado breve";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
      setFormData({ nombre: "", email: "", mensaje: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-20 px-6 selection:bg-[#4B3CFB]/10">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Lado Izquierdo: Copy Sutil */}
          <div className="lg:w-1/3">
            <h1 className="text-[40px] font-bold text-[#1D1D1F] tracking-tight leading-tight mb-6">
              Hablemos.
            </h1>
            <p className="text-[19px] text-[#6E6E73] font-medium leading-relaxed tracking-tight">
              Estamos aquí para ayudarte a potenciar tu carrera. Envíanos tus dudas y nos pondremos en contacto contigo.
            </p>
          </div>

          {/* Lado Derecho */}
          <div className="lg:w-2/3">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center border border-gray-100"
                >
                  <div className="w-16 h-16 bg-[#16C784]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-[#16C784] text-2xl">✓</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1D1D1F] mb-2">Mensaje enviado</h2>
                  <p className="text-[#6E6E73] font-medium mb-8">Te responderemos en menos de 24 horas.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-[#4B3CFB] font-bold text-sm hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="bg-white p-10 md:p-12 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
                >
                  <div className="space-y-6">
                    {[
                      { id: "nombre", label: "Nombre", type: "text", placeholder: "Camilo Taborda" },
                      { id: "email", label: "Correo electrónico", type: "email", placeholder: "nombre@ejemplo.com" }
                    ].map((field) => (
                      <div key={field.id} className="relative">
                        <label htmlFor={field.id} className="block text-[13px] font-bold text-[#1D1D1F] mb-2 ml-1">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={formData[field.id as keyof FormData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className={`w-full px-5 py-4 bg-[#F5F5F7] border-2 rounded-2xl transition-all duration-300 outline-none text-[#1D1D1F] font-medium placeholder:text-gray-400 ${
                            errors[field.id as keyof FormErrors] 
                            ? "border-red-100 focus:border-red-200" 
                            : "border-transparent focus:border-[#4B3CFB]/20 focus:bg-white"
                          }`}
                        />
                      </div>
                    ))}

                    <div className="relative">
                      <label htmlFor="mensaje" className="block text-[13px] font-bold text-[#1D1D1F] mb-2 ml-1">
                        Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        rows={5}
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder="¿En qué podemos ayudarte?"
                        className={`w-full px-5 py-4 bg-[#F5F5F7] border-2 rounded-2xl transition-all duration-300 outline-none text-[#1D1D1F] font-medium resize-none placeholder:text-gray-400 ${
                          errors.mensaje 
                          ? "border-red-100 focus:border-red-200" 
                          : "border-transparent focus:border-[#4B3CFB]/20 focus:bg-white"
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-10 w-full bg-[#1D1D1F] text-white py-5 rounded-2xl font-bold text-[17px] hover:bg-[#000000] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-black/5"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}