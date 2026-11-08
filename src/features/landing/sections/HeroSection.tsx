import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
    {/* Glows laterales dorados */}
    <div className="absolute -left-32 top-1/4 w-96 h-96 rounded-full blur-[100px] bg-gold/20 pointer-events-none" />
    <div className="absolute -right-32 top-1/4 w-96 h-96 rounded-full blur-[100px] bg-gold/20 pointer-events-none" />

    {/* Grid overlay sutil */}
    <div
      className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
      }}
    />

    <div className="relative z-10 max-w-5xl text-center">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-black leading-[1.05] mb-6"
      >
        Asegura tu{' '}
        <span className="text-gradient-gold">Puntaje ICFES</span>{' '}
        con <span className="text-gradient-gold">Inteligencia Artificial</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10"
      >
        Accede a la plataforma EdTech ICFES IA más completa de Colombia:{' '}
        <strong className="text-white">material organizado por años</strong>, video-clases
        estratégicas, <strong className="text-white">simulacros interactivos</strong> y un
        Mentor IA que personaliza tu estudio.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
      >
        <Link to="/suscripcion" className="btn-gold text-lg">
          🚀 Iniciar Entrenamiento
        </Link>
        <Link to="/blog" className="btn-outline-gold text-lg">
          📖 Tips y Estrategias
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
      >
        {[
          { value: 'Top 1%', label: 'Enfoque de Alto Rendimiento' },
          { value: '100+', label: 'Preguntas por Años' },
          { value: '25+', label: 'Simulacros Interactivos' },
          { value: 'IA 24/7', label: 'Acompañamiento Estratégico' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <h3 className="text-3xl md:text-4xl font-black text-gradient-gold">{stat.value}</h3>
            <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);