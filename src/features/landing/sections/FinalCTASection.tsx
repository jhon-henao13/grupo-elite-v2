import { Link } from 'react-router-dom';
import { BsRocketTakeoff } from 'react-icons/bs';
import { motion } from 'framer-motion';

export const FinalCTASection = () => (
  <section className="py-20 px-4">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto card-glass text-center border-gold/30"
    >
      <h2 className="text-3xl md:text-5xl font-black mb-3">
        ¿Listo para ser parte del <span className="text-gradient-gold">Top 1%</span>?
      </h2>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Accede a una plataforma exclusiva creada para estudiantes ambiciosos que buscan
        competir en los niveles más altos del ICFES.
      </p>
      <Link to="/suscripcion" className="btn-gold inline-flex items-center gap-2 text-lg">
        <BsRocketTakeoff /> Únete ahora
      </Link>
    </motion.div>
  </section>
);