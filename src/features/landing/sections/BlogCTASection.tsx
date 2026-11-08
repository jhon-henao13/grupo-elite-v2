import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';

export const BlogCTASection = () => (
  <section className="py-16 px-4 bg-elite-dark-3">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
          Domina la técnica del examen
        </h2>
        <p className="text-gray-400">
          Explora artículos sobre Lectura Crítica, análisis de gráficas y estrategias de estudio.
        </p>
      </div>
      <Link to="/blog" className="btn-outline-gold whitespace-nowrap">
        Ir al Blog Elite <BsArrowRight className="inline ml-2" />
      </Link>
    </div>
  </section>
);