import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Activity } from 'lucide-react';

export const ShowcaseSection = () => (
  <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-elite-dark overflow-hidden">
    {/* 🌟 Glows de fondo avanzados para evitar fondo plano */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/15 rounded-full blur-[150px] pointer-events-none" />
    <div className="absolute top-1/4 right-10 w-96 h-96 bg-gold/10 rounded-full blur-[130px] pointer-events-none" />

    {/* ✨ Partículas flotantes tecnológicas */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/5 w-2.5 h-2.5 bg-gold rounded-full shadow-[0_0_15px_#fbbf24] animate-ping" style={{ animationDuration: '3.5s' }} />
      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-accent-neon rounded-full shadow-[0_0_12px_#3bbcff] animate-pulse" />
      <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-gold/75 rounded-full shadow-[0_0_15px_#fbbf24]" />
      <div className="absolute top-1/5 right-1/3 w-2 h-2 bg-accent-cyan rounded-full shadow-[0_0_10px_#06b6d4] animate-ping" style={{ animationDuration: '4.5s' }} />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto text-center mb-12">
      {/* Badge de Sección */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 px-3.5 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
        <span className="text-xs font-bold uppercase tracking-widest text-gold">
          Panel de Control Inteligente
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-black mb-4 tracking-tight text-white"
      >
        Tu progreso, <span className="text-gradient-gold drop-shadow-[0_0_30px_rgba(251,191,36,0.25)]">bajo control</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
      >
        Visualiza métricas por área, progreso histórico, predicción de desempeño y recomendaciones automatizadas generadas por inteligencia artificial.
      </motion.p>
    </div>

    {/* 🖼️ Contenedor del Mockup con Efecto 3D y Glow Rotativo */}
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 1200 }}
      className="relative max-w-5xl mx-auto px-2"
    >
      {/* Fondo con Conic Gradient giratorio mejorado */}
      <div className="absolute inset-0 -m-6 rounded-3xl bg-[conic-gradient(from_180deg_at_50%_50%,rgba(37,99,235,0.3),rgba(251,191,36,0.5),rgba(6,182,212,0.4),rgba(251,191,36,0.5),rgba(37,99,235,0.3))] blur-3xl opacity-60 animate-rotate-glow pointer-events-none" />

      {/* Tarjeta flotante decorativa superior (UX touch) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute -top-5 left-8 sm:left-12 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-elite-dark-2/90 border border-gold/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="p-2 rounded-xl bg-gold/10 text-gold">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Simulador Adaptativo</p>
          <p className="text-xs font-bold text-white">+85% Precisión de IA</p>
        </div>
      </motion.div>

      {/* Tarjeta flotante decorativa inferior derecha */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute -bottom-5 right-8 sm:right-12 z-30 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-elite-dark-2/90 border border-accent-blue/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="p-2 rounded-xl bg-accent-blue/20 text-accent-neon">
          <Activity className="w-4 h-4" />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Análisis en Vivo</p>
          <p className="text-xs font-bold text-white">Reporte por Competencias</p>
        </div>
      </motion.div>

      {/* Contenedor principal con efecto 3D al hacer hover */}
      <motion.div
        whileHover={{ 
          scale: 1.02, 
          rotateX: 3, 
          rotateY: -2,
          transition: { duration: 0.3 }
        }}
        className="relative rounded-3xl p-1.5 bg-gradient-to-br from-gold/60 via-accent-blue/40 to-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative rounded-[1.3rem] overflow-hidden bg-elite-dark border border-white/10">
          <img
            src="/img/mockup-dashboard2.png"
            alt="Panel de Control Grupo Elite - Dashboard"
            className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay sutil de brillo en la imagen */}
          <div className="absolute inset-0 bg-gradient-to-t from-elite-dark/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  </section>
);