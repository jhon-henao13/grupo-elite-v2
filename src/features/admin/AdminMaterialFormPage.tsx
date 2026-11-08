import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsCheckCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { createMaterial, updateMaterial } from './adminApi';

export const AdminMaterialFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [anio, setAnio] = useState<number | ''>('');
  const [driveLink, setDriveLink] = useState('');
  const [loading, setLoading] = useState(isEdit);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isEdit || !id) return;
    supabase.from('material_educativo').select('*').eq('id', Number(id)).single()
      .then(({ data }) => {
        if (data) {
          setTitulo(data.titulo ?? '');
          setDescripcion(data.descripcion ?? '');
          setAnio(data.anio ?? '');
          setDriveLink(data.pdf_url?.startsWith('https://') ? data.pdf_url : '');
        }
        setLoading(false);
      });
  }, [id, isEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isEdit && !driveLink) {
      toast.error('Debes proporcionar un enlace de Google Drive');
      return;
    }
    if (driveLink && !driveLink.startsWith('https://drive.google.com/')) {
      toast.error('El enlace debe ser de Google Drive');
      return;
    }
    setBusy(true);
    try {
      if (isEdit) {
        const payload: Record<string, unknown> = { titulo, descripcion };
        if (driveLink) payload.pdf_url = driveLink;
        await updateMaterial(Number(id), payload);
        toast.success('✅ Material actualizado');
      } else {
        await createMaterial({
          titulo,
          descripcion,
          pdf_url: driveLink,
          anio: Number(anio),
        });
        toast.success('✅ Material agregado');
      }
      navigate('/admin');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return <div className="text-center py-24 text-gold animate-pulse-glow">Cargando material…</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-4 text-sm">
        <BsArrowLeft /> Volver al panel
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass">
        <h1 className="text-2xl font-black mb-6 flex items-center gap-2">
          {isEdit ? '✏️ Editar Material ICFES' : '➕ Agregar Material ICFES'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">📋 Título *</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              placeholder="Ej: Matemáticas - Álgebra Básica"
              className="input-modern"
              disabled={busy}
            />
          </div>

          <div>
            <label className="form-label">📝 Descripción</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={3}
              placeholder="Describe brevemente el contenido…"
              className="input-modern"
              disabled={busy}
            />
          </div>

          <div>
            <label className="form-label">📅 Año *</label>
            <input
              type="number"
              value={anio}
              onChange={(e) => setAnio(e.target.value ? Number(e.target.value) : '')}
              required
              placeholder="Ej: 2025"
              min={2000}
              max={2100}
              className="input-modern"
              disabled={busy}
            />
          </div>

          <div>
            <label className="form-label">🔗 Enlace Google Drive {!isEdit && '*'}</label>
            <input
              type="url"
              value={driveLink}
              onChange={(e) => setDriveLink(e.target.value)}
              placeholder="https://drive.google.com/file/d/…"
              className="input-modern"
              disabled={busy}
            />
            {isEdit && (
              <small className="text-xs text-gray-500 mt-1 block">
                Deja vacío para mantener el enlace actual
              </small>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={busy}
              className="btn-gold flex-1 inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <BsCheckCircle />
              {busy ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Agregar material'}
            </button>
            <Link to="/admin" className="btn-outline-gold text-center">Cancelar</Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};