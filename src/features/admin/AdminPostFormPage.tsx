import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsCheckCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { createPost, updatePost } from '@/features/blog/blogApi';

export const AdminPostFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [titulo, setTitulo] = useState('');
  const [resumen, setResumen] = useState('');
  const [contenido, setContenido] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isEdit || !id) return;
    supabase.from('blog_posts').select('*').eq('id', Number(id)).single()
      .then(({ data }) => {
        if (data) {
          setTitulo(data.titulo ?? '');
          setResumen(data.resumen ?? '');
          setContenido(data.contenido ?? '');
          setImagenUrl(data.imagen_url ?? '');
          setMetaKeywords(data.meta_keywords ?? '');
        }
        setLoading(false);
      });
  }, [id, isEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (isEdit) {
        await updatePost(Number(id), { titulo, resumen, contenido, imagen_url: imagenUrl, meta_keywords: metaKeywords });
        toast.success('✅ Post actualizado');
      } else {
        await createPost({ titulo, resumen, contenido, imagen_url: imagenUrl, meta_keywords: metaKeywords });
        toast.success('✅ Post publicado');
      }
      navigate('/admin');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <div className="text-center py-24 text-gold animate-pulse-glow">Cargando post…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-4 text-sm">
        <BsArrowLeft /> Volver al panel
      </Link>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass">
        <h1 className="text-2xl font-black mb-6">
          {isEdit ? '✏️ Editar Post' : '📝 Nuevo Post'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Título (H1) *</label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required className="input-modern" disabled={busy} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Imagen URL</label>
              <input type="url" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} className="input-modern" disabled={busy} />
            </div>
            <div>
              <label className="form-label">Keywords (separadas por coma)</label>
              <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} className="input-modern" disabled={busy} />
            </div>
          </div>
          <div>
            <label className="form-label">Meta Descripción (para SEO) *</label>
            <textarea value={resumen} onChange={(e) => setResumen(e.target.value)} rows={2} maxLength={160} required className="input-modern" disabled={busy} />
          </div>
          <div>
            <label className="form-label">Contenido (Markdown/HTML) *</label>
            <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} rows={12} required className="input-modern" disabled={busy} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={busy} className="btn-gold flex-1 inline-flex items-center justify-center gap-2 disabled:opacity-50">
              <BsCheckCircle /> {busy ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Publicar post'}
            </button>
            <Link to="/admin" className="btn-outline-gold text-center">Cancelar</Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};