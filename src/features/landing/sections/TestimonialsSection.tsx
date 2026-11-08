import { motion } from 'framer-motion';
import { BsStarFill, BsPersonFill } from 'react-icons/bs';

const testimonials = [
  {
    name: 'María González',
    score: '450/500',
    quote:
      'La plataforma me ayudó a organizar mi estudio y entender cómo enfrentar el examen. Los simulacros y el análisis de desempeño marcaron la diferencia.',
  },
  {
    name: 'Carlos Rodríguez',
    score: '465/500',
    quote:
      'Los simulacros son exactamente como el examen real. Me sentí súper preparado y confiado el día del ICFES.',
  },
  {
    name: 'Ana Martínez',
    score: '480/500',
    quote:
      'El dashboard me ayudó a identificar mis debilidades. Incrementé mi puntaje en matemáticas de 60 a 95 puntos.',
  },
];

export const TestimonialsSection = () => (
  <section className="py-20 px-4 bg-gradient-dark">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-3">
          Historias de <span className="text-gradient-gold">Éxito</span>
        </h2>
        <p className="text-gray-400">Conoce a nuestros estudiantes que lograron el top 1%</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-glass text-center"
          >
            <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-primary shadow-[0_0_20px_rgba(251,191,36,0.4),0_0_30px_rgba(37,99,235,0.25)]">
              <BsPersonFill className="text-white text-3xl" />
            </div>
            <h3 className="font-bold text-white text-lg">{t.name}</h3>
            <p className="text-gray-400 mb-3">Puntaje: {t.score}</p>
            <p className="italic text-gray-300 text-sm">{t.quote}</p>
            <div className="flex justify-center gap-1 mt-4 text-gold">
              {[...Array(5)].map((_, j) => (
                <BsStarFill key={j} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);