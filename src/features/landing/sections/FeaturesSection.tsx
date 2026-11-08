import { motion } from 'framer-motion';
import {
  BsJournalRichtext,
  BsLightbulb,
  BsAward,
  BsGraphUpArrow,
  BsPeople,
  BsHeadset,
} from 'react-icons/bs';
import type { ReactNode } from 'react';

const features: { icon: ReactNode; title: string; body: string; badge: string }[] = [
  {
    icon: <BsJournalRichtext />,
    title: 'Material Exclusivo por Años',
    body: 'No estudies al azar. Accede a cuadernillos y preguntas organizadas cronológicamente.',
    badge: 'Premium',
  },
  {
    icon: <BsLightbulb />,
    title: 'Metodología Inteligente',
    body: 'Desarrolla habilidades cognitivas con estrategias probadas de los estudiantes top del país.',
    badge: 'Innovador',
  },
  {
    icon: <BsAward />,
    title: 'Entrenamiento de Alto Rendimiento',
    body: 'Diseñado para competir en los percentiles más altos del ICFES con enfoque estratégico.',
    badge: 'Elite Focus',
  },
  {
    icon: <BsGraphUpArrow />,
    title: 'Seguimiento Personalizado',
    body: 'Dashboard inteligente que identifica fortalezas, debilidades y áreas prioritarias.',
    badge: 'IA Powered',
  },
  {
    icon: <BsPeople />,
    title: 'Comunidad Elite',
    body: 'Acceso a una comunidad privada de estudiantes comprometidos.',
    badge: 'Exclusivo',
  },
  {
    icon: <BsHeadset />,
    title: 'Soporte 24/7',
    body: 'Tutores expertos disponibles para resolver tus dudas en cualquier momento.',
    badge: 'Siempre',
  },
];

export const FeaturesSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black mb-3">
          ¿Por qué elegir <span className="text-gradient-gold">Grupo Elite</span>?
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Recursos seleccionados, simulacros tipo ICFES y guías estratégicas alineadas
          con los estándares actuales de la prueba.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="card-glass text-center"
          >
            <div className="text-5xl text-gold mb-4 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)] animate-float">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{f.body}</p>
            <span className="inline-block bg-gradient-primary text-elite-dark text-xs font-black px-3 py-1 rounded-full">
              {f.badge}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);