import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  BsArrowLeft, BsCalendar3, BsPersonCircle, BsStopwatch,
  BsWhatsapp, BsTwitterX, BsLink45Deg, BsRocketTakeoff,
} from 'react-icons/bs';
import { toast } from 'sonner';
import { fetchPostBySlug, type BlogPost } from './blogApi';

export const PostDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchPostBySlug(slug)
      .then(setPost)
      .finally(() => setLoading(false));
  }, [slug]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Enlace copiado');
  };

  if (loading) {
    return <div className="text-center py-24 text-gold animate-pulse-glow">Cargando artículo…</div>;
  }

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-black mb-2">Artículo no encontrado</h1>
        <Link to="/blog" className="btn-gold inline-block mt-4">Volver al blog</Link>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-gold z-50 transition-all duration-100" style={{ width: '0%' }} />

      <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-6 text-sm">
        <BsArrowLeft /> Volver a artículos
      </Link>

      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4 text-balance">
          {post.titulo}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <BsCalendar3 className="text-gold" />
            {new Date(post.fecha_creacion).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5"><BsPersonCircle className="text-gold" /> Grupo Elite</span>
          <span className="flex items-center gap-1.5"><BsStopwatch className="text-gold" /> 5 min lectura</span>
        </div>
      </motion.header>

      {post.imagen_url && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl overflow-hidden mb-10 border border-white/10">
          <img src={post.imagen_url} alt={post.titulo} className="w-full max-h-[400px] object-cover" />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card-glass p-6 md:p-10 mb-10">
        <article className="prose-elite">
          <div className="border-l-4 border-gold pl-4 mb-8">
            <p className="text-lg text-gray-300 italic">{post.resumen}</p>
          </div>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.contenido}</ReactMarkdown>
        </article>
      </motion.div>

      {/* CTA */}
      <div className="card-glass text-center mb-10 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-gold/10 blur-3xl rounded-full" />
        <BsRocketTakeoff className="text-4xl text-gold mx-auto mb-3" />
        <h3 className="text-2xl font-bold mb-2">¿Listo para el siguiente nivel?</h3>
        <p className="text-gray-400 mb-6">Únete a cientos de estudiantes que ya entrenan con IA para el ICFES.</p>
        <Link to="/suscripcion" className="btn-gold inline-flex items-center gap-2">
          Empieza Gratis Hoy <BsRocketTakeoff />
        </Link>
      </div>

      {/* Share & back */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
        <Link to="/blog" className="text-gray-400 hover:text-white text-sm inline-flex items-center gap-2">
          <BsArrowLeft /> Volver a artículos
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 uppercase font-bold">Compartir</span>
          <a
            href={`https://api.whatsapp.com/send?text=Mira este artículo de Grupo Elite: ${post.titulo} - ${shareUrl}`}
            target="_blank"
            rel="noopener"
            className="share-btn-custom"
            title="Compartir en WhatsApp"
          >
            <BsWhatsapp />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${post.titulo}&url=${shareUrl}`}
            target="_blank"
            rel="noopener"
            className="share-btn-custom"
            title="Compartir en X"
          >
            <BsTwitterX />
          </a>
          <button onClick={copyLink} className="share-btn-custom" title="Copiar enlace">
            <BsLink45Deg />
          </button>
        </div>
      </div>
    </div>
  );
};