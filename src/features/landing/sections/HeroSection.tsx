import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, BookOpen, Sparkles, TrendingUp, Award, Layers, Bot } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-14 pb-16 px-4 sm:px-6 lg:px-8">
      {/* 🌟 Glows laterales dorados y azules de fondo */}
      <div className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full blur-[130px] bg-gold/15 pointer-events-none animate-pulse-glow" />
      <div className="absolute -right-40 top-1/3 w-[500px] h-[500px] rounded-full blur-[130px] bg-accent-blue/15 pointer-events-none animate-pulse-glow" />

      {/* 🕸️ Grid overlay y red neuronal sutil de fondo */}
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* Partículas decorativas de constelación IA */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-gold rounded-full shadow-[0_0_12px_#fbbf24] animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-accent-neon rounded-full shadow-[0_0_10px_#3bbcff] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-gold/80 rounded-full shadow-[0_0_10px_#fbbf24]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center w-full">
        
        {/* 🚀 Badge Superior de Autoridad */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-gold/30 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
        >
          <Sparkles className="w-4 h-4 text-gold animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-gray-200">
            EdTech Líder en Preparación ICFES con IA en Colombia
          </span>
        </motion.div>

        {/* 📌 Título Principal Impactante */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight !leading-[1.2] mb-6"
        >
          Asegura tu{' '}
          <span className="text-gradient-gold drop-shadow-[0_0_35px_rgba(251,191,36,0.3)]">
            Puntaje ICFES
          </span>{' '}
          con <br className="hidden sm:inline" />
          <span className="text-gradient-gold">Inteligencia Artificial</span>
        </motion.h1>

        {/* 📝 Subtítulo Descriptivo */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 !leading-relaxed font-normal"
        >
          Accede a la plataforma EdTech ICFES IA más completa de Colombia:{' '}
          <strong className="text-white font-semibold">material organizado por años</strong>, video-clases estratégicas,{' '}
          <strong className="text-white font-semibold">simulacros interactivos</strong> y un Mentor IA que personaliza tu estudio según tus resultados.
        </motion.p>

        {/* 🎯 Botones de Acción (CTA) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12"
        >
          <Link
            to="/suscripcion"
            className="w-full sm:w-auto btn-gold text-base sm:text-lg flex items-center justify-center gap-3 group shadow-glow-gold-strong py-4 px-8"
          >
            <Rocket className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            <span>Iniciar Entrenamiento</span>
          </Link>

          <Link
            to="/blog"
            className="w-full sm:w-auto btn-outline-gold text-base sm:text-lg flex items-center justify-center gap-3 py-4 px-8"
          >
            <BookOpen className="w-5 h-5 text-gold" />
            <span>Tips y Estrategias ICFES (Blog)</span>
          </Link>
        </motion.div>

        {/* 📊 Tarjetas de Estadísticas (Glassmorphism Avanzado) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {[
            {
              value: 'Top 1%',
              label: 'Enfoque de Alto Rendimiento',
              icon: <TrendingUp className="w-5 h-5 text-gold mb-2 mx-auto" />,
            },
            {
              value: '100+',
              label: 'Preguntas por Años',
              icon: <Layers className="w-5 h-5 text-gold mb-2 mx-auto" />,
            },
            {
              value: '25+',
              label: 'Simulacros Interactivos Adaptativos',
              icon: <Award className="w-5 h-5 text-gold mb-2 mx-auto" />,
            },
            {
              value: 'IA 24/7',
              label: 'Acompañamiento Estratégico',
              icon: <Bot className="w-5 h-5 text-gold mb-2 mx-auto" />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="card-glass group text-center p-5 relative overflow-hidden flex flex-col items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
              <div className="p-2 rounded-xl bg-gold/10 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-gradient-gold tracking-tight mb-1">
                {stat.value}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 font-medium leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};