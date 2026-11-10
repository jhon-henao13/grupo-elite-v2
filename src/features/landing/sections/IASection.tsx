import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot, BarChart3, Compass, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const slides = [
  {
    img: '/img/mentorIA-design.png',
    badge: 'Mentor 24/7',
    title: 'Acompañamiento Inteligente',
    quote: '"He notado que tu desempeño en Lectura Crítica bajó un 10%. Vamos a reforzar hoy."',
    icon: <Bot className="w-4 h-4 text-gold" />,
  },
  {
    img: '/img/analisisIA-design.png',
    badge: 'Métricas en Vivo',
    title: 'Análisis Predictivo',
    quote: 'Visualiza tus debilidades por área y conviértelas en fortalezas con datos reales.',
    icon: <BarChart3 className="w-4 h-4 text-gold" />,
  },
  {
    img: '/img/estrategiaIA-design.png',
    badge: 'Ruta de Éxito',
    title: 'Plan Adaptativo',
    quote: 'Un plan de estudio que se adapta en tiempo real a tu ritmo y capacidad de aprendizaje.',
    icon: <Compass className="w-4 h-4 text-gold" />,
  },
];

export const IASection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const nextSlide = () => setIndex((i) => (i + 1) % slides.length);
  const prevSlide = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-elite-dark-3 overflow-hidden">
      {/* 🌟 Glows y efectos de fondo para evitar plano */}
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ✨ Partículas flotantes de constelación IA */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2.5 h-2.5 bg-gold rounded-full shadow-[0_0_15px_#fbbf24] animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-accent-neon rounded-full shadow-[0_0_12px_#3bbcff] animate-pulse" />
        <div className="absolute top-1/3 right-1/6 w-2 h-2 bg-gold/80 rounded-full shadow-[0_0_12px_#fbbf24]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        
        {/* Columna Izquierda (Texto y características interactivas) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6"
        >
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-3.5 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(251,191,36,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Modelo IA Potente y Adaptativo
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 !leading-[1.3]">
            Tu Mentor Personal <br className="hidden sm:inline" />
            <span className="text-gradient-gold">disponible 24/7</span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">
            Nuestro <strong className="text-white font-semibold">Mentor IA</strong> no solo responde preguntas: analiza tus simulacros, detecta tus puntos ciegos y diseña una estrategia milimétrica para asegurar tu puntaje ICFES.
          </p>

          {/* Lista interactiva sincronizada con las diapositivas */}
          <div className="space-y-4">
            {[
              {
                title: 'Estrategia basada en datos:',
                body: '¿Fallas en física o matemáticas? La IA prioriza automáticamente ese contenido.',
              },
              {
                title: 'Análisis de contexto:',
                body: 'Sabe exactamente quién eres, tus simulacros previos y cómo vas progresando.',
              },
              {
                title: 'Feedback instantáneo:',
                body: 'Explicaciones profundas paso a paso de cada respuesta errónea.',
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                onClick={() => setIndex(idx)}
                className={`group cursor-pointer flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 border backdrop-blur-md ${
                  index === idx
                    ? 'bg-gold/10 border-gold/40 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                    : 'bg-white/5 border-white/10 hover:border-gold/30 hover:bg-white/[0.07]'
                }`}
              >
                <div className={`p-2 rounded-xl mt-0.5 transition-colors ${index === idx ? 'bg-gold text-elite-dark' : 'bg-gold/10 text-gold'}`}>
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm sm:text-base mb-1 flex items-center gap-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Columna Derecha (Contenedor Vertical / Mockup con efectos premium) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 relative flex flex-col items-center"
        >
          {/* Contenedor vertical optimizado para capturas de pantalla verticales */}
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] sm:aspect-[9/16] rounded-3xl overflow-hidden border-2 border-gold/30 shadow-[0_0_40px_rgba(251,191,36,0.2)] bg-elite-dark group">
            
            {/* Controles de navegación laterales flotantes */}
            <button
              onClick={prevSlide}
              aria-label="Anterior slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-elite-dark/80 border border-gold/40 text-gold flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Siguiente slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-elite-dark/80 border border-gold/40 text-gold flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Carrusel de imágenes verticales */}
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col"
              >
                <img
                  src={slides[index].img}
                  alt={slides[index].badge}
                  className="w-full h-full object-cover object-top"
                />

                {/* Overlay inferior con gradiente y tipografía */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-elite-dark via-elite-dark/90 to-transparent pt-16">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-gold text-elite-dark text-xs font-black px-3 py-1 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.4)]">
                      {slides[index].icon}
                      {slides[index].badge}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-1">{slides[index].title}</h3>
                  <p className="text-gray-200 italic text-xs sm:text-sm leading-relaxed">
                    {slides[index].quote}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicadores de paginación inferiores (dots) */}
          <div className="flex justify-center gap-2.5 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir a slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'w-10 bg-gold shadow-[0_0_10px_#fbbf24]' : 'w-3 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};