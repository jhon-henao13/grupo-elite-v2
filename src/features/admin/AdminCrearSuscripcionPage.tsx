import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsCheckCircle, BsShieldCheck, BsKey, BsLink45Deg } from 'react-icons/bs';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabaseClient';
import { crearSuscripcionManual } from './adminApi';

export const AdminCrearSuscripcionPage = () => {
  const [planes, setPlanes] = useState<{ id: number; nombre: string; precio: number }[]>([]);
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [planId, setPlanId] = useState<number | ''>('');
  const [monto, setMonto] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{
    usuarioId: number; nuevo: boolean;
    tempPassword: string | null; resetLink: string | null;
  } | null>(null);

  useEffect(() => {
    supabase.from('planes').select('id, nombre, precio').order('precio').then(({ data }) => {
      setPlanes(data ?? []);
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!planId) { toast.error('Selecciona un plan'); return; }
    setBusy(true);
    try {
      const res = await crearSuscripcionManual({
        email: email.trim(),
        nombre: nombre.trim() || undefined,
        plan_id: Number(planId),
        monto: monto ? Number(monto) : undefined,
      });
      setResult(res);
      toast.success('Suscripción creada');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-glass">
          <div className="text-center mb-6">
            <BsCheckCircle className="text-6xl text-green-400 mx-auto mb-3" />
            <h1 className="text-2xl font-black">¡Suscripción creada!</h1>
            <p className="text-gray-400 text-sm mt-1">
              Usuario ID #{result.usuarioId} · {result.nuevo ? 'Cuenta NUEVA' : 'Cuenta existente'}
            </p>
          </div>

          {result.nuevo && (result.tempPassword || result.resetLink) && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
              <p className="font-bold text-yellow-200 mb-2 flex items-center gap-2">
                <BsShieldCheck /> Credenciales (comparte por WhatsApp/Email)
              </p>
              {result.tempPassword && (
                <p className="text-sm mb-2 flex items-center gap-2">
                  <BsKey className="text-yellow-300" />
                  <span className="text-gray-300">Password temporal:</span>
                  <code className="bg-black/40 px-2 py-0.5 rounded text-yellow-300">{result.tempPassword}</code>
                </p>
              )}
              {result.resetLink && (
                <div className="mt-2">
                  <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <BsLink45Deg /> Link para definir contraseña (recomendado):
                  </p>
                  <a href={result.resetLink} target="_blank" rel="noopener"
                    className="text-xs text-gold underline break-all">
                    {result.resetLink.slice(0, 80)}...
                  </a>
                  <button
                    onClick={() => { navigator.clipboard.writeText(result.resetLink!); toast.success('Link copiado'); }}
                    className="block mt-2 text-xs bg-gold/20 text-gold px-3 py-1 rounded hover:bg-gold/30"
                  >
                    📋 Copiar link completo
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <button onClick={() => { setResult(null); setEmail(''); setNombre(''); setPlanId(''); setMonto(''); }}
              className="w-full btn-gold">Crear otra</button>
            <Link to="/admin" className="block text-center btn-outline-gold">Volver al panel</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-gold mb-4 text-sm">
        <BsArrowLeft /> Volver
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass">
        <h1 className="text-2xl font-black mb-2">Crear Suscripción Manual (Nequi)</h1>
        <p className="text-sm text-gray-400 mb-6">
          El usuario paga por Nequi → tú completas este formulario → su cuenta se crea y recibe credenciales.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">📧 Email *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              placeholder="usuario@example.com" className="input-modern" disabled={busy} />
          </div>
          <div>
            <label className="form-label">👤 Nombre (opcional)</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
              placeholder="Se autogenera del email" className="input-modern" disabled={busy} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">🎯 Plan *</label>
              <select value={planId} onChange={(e) => setPlanId(e.target.value ? Number(e.target.value) : '')}
                required className="input-modern" disabled={busy}>
                <option value="">Selecciona…</option>
                {planes.map((p) => (
                  <option key={p.id} value={p.id} className="bg-elite-dark">
                    {p.nombre} — ${p.precio.toLocaleString('es-CO')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">💰 Monto pagado</label>
              <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)}
                placeholder="Opcional" className="input-modern" disabled={busy} />
            </div>
          </div>
          <div>
            <label className="form-label">📱 Método</label>
            <input type="text" value="Nequi" readOnly className="input-modern opacity-60" />
          </div>
          <button type="submit" disabled={busy} className="btn-gold w-full inline-flex items-center justify-center gap-2 disabled:opacity-50">
            <BsCheckCircle /> {busy ? 'Creando…' : 'Crear y generar credenciales'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};