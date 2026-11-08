import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsCalendar3, BsArrowRight } from 'react-icons/bs';
import { fetchPosts, type BlogPost } from './blogApi';

export const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-glow text-gold">Cargando artículos…</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black mb-3">
          Blog de Preparación <span className="text-gradient-gold">ICFES</span>
        </h1>
        <p className="text-gray-400">Tips, estrategias y guías para alcanzar tu mejor puntaje.</p>
      </motion.div>

      {posts.length === 0 ? (
        <div className="card-glass text-center py-16">
          <p className="text-gray-400">Aún no hay artículos publicados. Vuelve pronto.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card-glass flex flex-col group"
            >
              {post.imagen_url && (
                <div className="overflow-hidden rounded-xl mb-4 h-48">
                  <img
                    src={post.imagen_url}
                    alt={post.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                {post.titulo}
              </h2>
              <p className="text-sm text-gray-400 flex-grow mb-4 line-clamp-3">
                {post.resumen}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <BsCalendar3 /> {new Date(post.fecha_creacion).toLocaleDateString('es-CO')}
                </span>
                <span>👁 {post.vistas}</span>
              </div>
              <Link
                to={`/blog/${post.slug}`}
                className="btn-outline-gold text-sm text-center inline-flex items-center justify-center gap-2"
              >
                Leer más <BsArrowRight />
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};