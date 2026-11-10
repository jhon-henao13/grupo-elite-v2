import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsPlayCircleFill, BsPersonCircle, BsX } from 'react-icons/bs';

const videos = [
  { id: 'Ut2X-Nd5h-E', titulo: '100/100 en Matemáticas', categoria: 'Matemáticas', canal: 'Maye', duracion: '1:26:50' },
  { id: 'jjO21znJdiE', titulo: 'Guía Lectura Crítica', categoria: 'Lectura Crítica', canal: 'Sergio Perez', duracion: '13:29' },
  { id: 'tF_m2rv3MZ0', titulo: 'Estrategia para el Top 1%', categoria: 'Estrategia', canal: 'Luis Per', duracion: '11:47' },
  { id: 'D3lnXg8sU1s', titulo: 'Inglés: Ejercicios Pro', categoria: 'Inglés', canal: 'Patymatikas', duracion: '12:15' },
  { id: '4Vb7kXoK1Ag', titulo: 'Simulacro General 2025', categoria: 'Estrategia', canal: 'Juan', duracion: '1:47:18' },
  { id: '0QxuuygpJBU', titulo: 'ICFES 2026 · Pregunta 1 – Ecuaciones lineales', categoria: 'Matemáticas', canal: 'Juan', duracion: '02:57' },
  { id: 'CXTjdAJrFCw', titulo: 'ICFES 2026 · Pregunta 2 – Álgebra', categoria: 'Matemáticas', canal: 'Juan', duracion: '02:44' },
  { id: 'F0nTwIZDlsE', titulo: 'Aprende a responder preguntas ICFES 2026', categoria: 'Lectura Crítica', canal: 'Idea-Tec', duracion: '09:27' },
  { id: 'ksOldZB-RGE', titulo: 'Técnicas infalibles en Lectura Crítica', categoria: 'Lectura Crítica', canal: 'Idea-Tec', duracion: '1:09:57' },
  { id: 'keOQfNUlQiE', titulo: 'Qué hacer la última semana antes del ICFES 2026', categoria: 'Estrategia', canal: 'Idea-Tec', duracion: '46:00' },
  { id: 'ohwRXNFFU1w', titulo: 'Estrategia poderosa para abordar preguntas', categoria: 'Estrategia', canal: 'Idea-Tec', duracion: '53:26' },
  { id: '2reIk6ftN1Y', titulo: 'Así será Inglés para el ICFES 2026', categoria: 'Inglés', canal: 'Filadd', duracion: '1:05:01' },
  { id: 'B42zQyYjZPM', titulo: 'Resuelve preguntas de Inglés para el ICFES 2026', categoria: 'Inglés', canal: 'Forprun', duracion: '09:53' },
  { id: 'ZBnOE9rl4kY', titulo: 'Preguntas ICFES 2026 de Ciencias Naturales', categoria: 'Ciencias Naturales', canal: 'Juan', duracion: '24:50' },
  { id: '8dPg1iW8HnA', titulo: 'Química ICFES 2026', categoria: 'Ciencias Naturales', canal: 'Juan', duracion: '2:10' },
  { id: 'E0mgOSSuHpo', titulo: 'Simulacro Ciencias Naturales ICFES 2025-2026', categoria: 'Ciencias Naturales', canal: 'Juan', duracion: '1:06:49' },
];

const categorias = ['Todos', 'Matemáticas', 'Lectura Crítica', 'Inglés', 'Estrategia', 'Ciencias Naturales'];

export const VideoClassesSection = () => {
  const [filtro, setFiltro] = useState('Todos');
  const [videoActivo, setVideoActivo] = useState<string | null>(null);

  const filtrados = filtro === 'Todos' ? videos : videos.filter((v) => v.categoria === filtro);

  return (
    <section className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-black flex items-center gap-2">
            🎬 Tips y Clases Maestras
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Filtra por categoría y estudia con los mejores videos seleccionados para ti
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setFiltro(c)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              filtro === c
                ? 'bg-gradient-gold text-elite-dark shadow-glow-gold'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtrados.map((v, i) => (
          <motion.button
            key={v.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => setVideoActivo(v.id)}
            className="card-glass group cursor-pointer overflow-hidden text-left"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl mb-3">
              <img
                src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                alt={v.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <BsPlayCircleFill className="text-gold text-5xl drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-bold">
                {v.duracion}
              </span>
            </div>
            <span className="text-xs bg-accent-blue/20 text-accent-cyan px-2 py-0.5 rounded font-bold">
              {v.categoria}
            </span>
            <h3 className="font-bold text-white mt-2 line-clamp-2 text-sm group-hover:text-gold transition-colors">
              {v.titulo}
            </h3>
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <BsPersonCircle /> {v.canal}
            </p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {videoActivo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setVideoActivo(null)}
          >
            <button
              onClick={() => setVideoActivo(null)}
              className="absolute top-4 right-4 text-white hover:text-gold text-3xl z-10"
              aria-label="Cerrar"
            >
              <BsX />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoActivo}?autoplay=1&rel=0&modestbranding=1`}
                className="w-full h-full rounded-xl"
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};