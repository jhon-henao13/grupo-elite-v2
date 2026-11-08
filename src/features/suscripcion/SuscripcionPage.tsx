import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BsCheckCircle,
  BsXCircle,
  BsShieldCheck,
  BsGraphUp,
  BsClock,
  BsHeadset,
} from 'react-icons/bs';
import { useAuth } from '@/features/auth/AuthContext';
import { fetchPlans, buildWhatsAppLink, type Plan } from './suscripcionApi';

const guaranteedBenefits = (planId: number): string[] => {
  const base = [
    'Acceso completo a la plataforma',
    'Material ICFES filtrado por años',
    'Videos cortos explicativos',
  ];
  if (planId >= 2) base.push('Simulacros ilimitados', 'Soporte 24/7');
  if (planId >= 3)
    base.push('Tutor IA personal 🤖', 'Análisis de progreso IA', 'Comunidad ELITE PRO');
  return base;
};

export const SuscripcionPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchPlans()
      .then(setPlans)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePagar = (plan: Plan) => {
    window.open(buildWhatsAppLink(plan, user?.email), '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <img src="/img/logo.png" alt="Grupo Elite" className="w-32 mx-auto mb-4 rounded-2xl shadow-glow-gold" />
        <h1 className="text-4xl md:text-5xl font-black">
          <span className="text-gradient-gold">Planes Premium</span>
        </h1>
        <p className="text-gray-400 mt-3">
          Elige el plan que mejor se adapte a tus objetivos académicos
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 animate-pulse-glow">Cargando planes…</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`pricing-card flex flex-col ${plan.id === 2 ? 'featured' : ''}`}
            >
              {plan.id === 2 && <div className="badge-featured">Más Popular</div>}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{plan.nombre}</h3>
                <div className="text-4xl font-black text-gradient-gold">
                  ${plan.precio.toLocaleString('es-CO')}
                </div>
                <p className="text-sm text-gray-400">
                  COP / {plan.duracion_meses} {plan.duracion_meses === 1 ? 'mes' : 'meses'}
                </p>
                <p className="text-sm text-gray-400 mt-3">{plan.descripcion}</p>
              </div>

              <ul className="flex-1 space-y-2 mb-6">
                {guaranteedBenefits(plan.id).map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-gray-300">
                    <BsCheckCircle className="text-green-500 shrink-0" />
                    {b}
                  </li>
                ))}
                {plan.id < 3 && (
                  <li className="flex items-center gap-2 text-sm text-gray-500">
                    <BsXCircle className="shrink-0" />
                    Tutor IA personal
                  </li>
                )}
              </ul>

              <button
                onClick={() => handlePagar(plan)}
                className={plan.id === 2 ? 'btn-gold w-full' : 'btn-outline-gold w-full'}
              >
                Suscribirme
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Garantías */}
      <div className="mt-16 card-glass text-center">
        <h3 className="text-2xl font-black mb-8 flex items-center justify-center gap-2">
          <BsShieldCheck className="text-gold" /> Garantías Grupo Elite
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <BsGraphUp />, title: 'Metodología Probada', body: 'Simulacros reales y análisis de desempeño.' },
            { icon: <BsClock />, title: 'Acceso Inmediato', body: 'Comienza a estudiar desde el primer día.' },
            { icon: <BsHeadset />, title: 'Soporte 24/7', body: 'Estamos aquí para ayudarte siempre.' },
          ].map((g) => (
            <div key={g.title}>
              <div className="text-4xl text-gradient-gold mb-3 flex justify-center">{g.icon}</div>
              <h4 className="font-bold mb-1">{g.title}</h4>
              <p className="text-sm text-gray-400">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};