import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsCheckCircleFill } from 'react-icons/bs';

const slides = [
  {
    img: '/img/mentorIA-design.png',
    badge: 'Mentor 24/7',
    quote: '"He notado que tu desempeño en Lectura Crítica bajó un 10%. Vamos a reforzar hoy."',
  },
  {
    img: '/img/analisisIA-design.png',
    badge: 'Métricas en Vivo',
    quote: 'Visualiza tus debilidades por área y conviértelas en fortalezas con datos reales.',
  },
  {
    img: '/img/estrategiaIA-design.png',
    badge: 'Ruta de Éxito',
    quote: 'Un plan de estudio que se adapta a tu tiempo y capacidad de aprendizaje.',
  },
];

export const IASection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 px-4 bg-elite-dark-3">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-3 py-1 rounded-full mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Modelo IA Potente
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Tu Mentor Personal <span className="text-gradient-gold">disponible 24/7</span>
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Nuestro <strong className="text-white">Mentor IA</strong> no solo responde preguntas:
            te da recomendaciones personalizadas basadas en tu desempeño. Te dice qué estudiar
            cada día para mejorar tu rendimiento.
          </p>

          <ul className="space-y-3">
            {[
              {
                title: 'Estrategia basada en datos:',
                body: '¿Fallas en física? La IA prioriza ese contenido.',
              },
              {
                title: 'Análisis de contexto:',
                body: 'Sabe quién eres y cómo vas progresando.',
              },
              {
                title: 'Feedback instantáneo:',
                body: 'Explicaciones profundas de cada respuesta errónea.',
              },
            ].map((item) => (
              <li key={item.title} className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-xl p-4 hover:border-gold/20 hover:bg-gold/5 transition-colors">
                <BsCheckCircleFill className="text-gold mt-0.5 shrink-0" />
                <span className="text-gray-300">
                  <strong className="text-white">{item.title}</strong> {item.body}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden border-2 border-gold/20 shadow-2xl aspect-[4/3] bg-elite-dark">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <img
                  src={slides[index].img}
                  alt={slides[index].badge}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <span className="inline-block bg-gold text-elite-dark text-xs font-black px-2 py-1 rounded mb-2">
                    {slides[index].badge}
                  </span>
                  <p className="text-white italic text-sm">{slides[index].quote}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-gold' : 'w-4 bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};