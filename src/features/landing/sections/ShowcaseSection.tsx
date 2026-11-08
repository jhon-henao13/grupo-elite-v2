import { motion } from 'framer-motion';

export const ShowcaseSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto text-center mb-8">
      <h2 className="text-4xl md:text-5xl font-black mb-3">
        Tu progreso, <span className="text-gradient-gold">bajo control</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Visualiza métricas por área, progreso histórico, predicción de desempeño y
        recomendaciones generadas por inteligencia artificial.
      </p>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative max-w-4xl mx-auto"
    >
      <div className="absolute inset-0 -m-10 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,rgba(37,99,235,0.4),rgba(251,191,36,0.6),rgba(251,191,36,0.8),rgba(251,191,36,0.6),rgba(37,99,235,0.4))] blur-3xl opacity-70 animate-rotate-glow" />
      <div className="relative rounded-3xl p-1 bg-gradient-to-br from-gold/50 to-accent-blue/30 shadow-2xl">
        <img
          src="/img/mockup-dashboard2.png"
          alt="Panel de Grupo Elite"
          className="rounded-[1.4rem] w-full bg-elite-dark"
          loading="lazy"
        />
      </div>
    </motion.div>
  </section>
);