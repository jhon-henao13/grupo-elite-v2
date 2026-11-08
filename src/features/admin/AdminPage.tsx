import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { deletePost } from '@/features/blog/blogApi';
import {
  BsPeople, BsCashCoin, BsFilePdf, BsListCheck, BsPlusCircle,
  BsPencilSquare, BsTrash, BsArrowClockwise, BsJournalText, BsShieldLock,
} from 'react-icons/bs';
import { toast } from 'sonner';
import {
  fetchAdminData, deleteMaterial, deleteSimulacro,
  eliminarUsuarioCompleto, renovarSuscripcion, quitarPremium, restarDias,
  type AdminKPIs, type MaterialAdmin, type SimulacroAdmin,
  type SuscripcionAdmin, type BlogPostAdmin,
} from './adminApi';

type Tab = 'material' | 'simulacros' | 'suscripciones' | 'blog';

export const AdminPage = () => {
  const [kpis, setKpis] = useState<AdminKPIs | null>(null);
  const [materiales, setMateriales] = useState<MaterialAdmin[]>([]);
  const [simulacros, setSimulacros] = useState<SimulacroAdmin[]>([]);
  const [suscripciones, setSuscripciones] = useState<SuscripcionAdmin[]>([]);
  const [posts, setPosts] = useState<BlogPostAdmin[]>([]);
  const [tab, setTab] = useState<Tab>('material');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const d = await fetchAdminData();
      setKpis(d.kpis);
      setMateriales(d.materiales);
      setSimulacros(d.simulacros);
      setSuscripciones(d.suscripciones);
      setPosts(d.posts);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error cargando');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDeleteMaterial = async (id: number) => {
    if (!confirm('¿Eliminar este material?')) return;
    setBusy(true);
    try {
      await deleteMaterial(id);
      toast.success('Material eliminado');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteSimulacro = async (id: number) => {
    if (!confirm('¿Eliminar este simulacro y todas sus preguntas?')) return;
    setBusy(true);
    try {
      await deleteSimulacro(id);
      toast.success('Simulacro eliminado');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  const handleEliminarUsuario = async (usuarioId: number, nombre: string) => {
    if (!confirm(`¿Eliminar COMPLETAMENTE a ${nombre}? Esto borra su auth, suscripciones y resultados.`)) return;
    setBusy(true);
    try {
      await eliminarUsuarioCompleto(usuarioId);
      toast.success('Usuario eliminado');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  const handleRenovar = async (usuarioId: number) => {
    setBusy(true);
    try {
      await renovarSuscripcion(usuarioId);
      toast.success('Suscripción renovada +30 días');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  const handleQuitarPremium = async (usuarioId: number) => {
    if (!confirm('¿Quitar premium y cancelar suscripción?')) return;
    setBusy(true);
    try {
      await quitarPremium(usuarioId);
      toast.success('Premium removido');
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  const handleRestarDias = async (usuarioId: number) => {
    const input = prompt('¿Cuántos días restar?', '7');
    if (!input) return;
    const dias = parseInt(input, 10);
    if (isNaN(dias) || dias <= 0) { toast.error('Días inválidos'); return; }
    setBusy(true);
    try {
      await restarDias(usuarioId, dias);
      toast.success(`${dias} días restados`);
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error');
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse-glow text-gold">Cargando panel admin…</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-black flex items-center gap-2">
            <BsShieldLock className="text-gold" /> Panel de Administrador
          </h1>
          <p className="text-gray-400 text-sm mt-1">Gestiona materiales, simulacros y suscripciones</p>
        </div>
        <button onClick={load} disabled={busy} className="btn-outline-gold text-sm inline-flex items-center gap-2 disabled:opacity-50">
          <BsArrowClockwise /> Refrescar
        </button>
      </motion.div>

      {/* KPIs */}
      {kpis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <BsPeople />, value: kpis.total_usuarios, label: 'Usuarios', color: 'text-accent-cyan' },
            { icon: <BsCashCoin />, value: kpis.total_pagos, label: 'Pagos aprobados', color: 'text-gold' },
            { icon: <BsFilePdf />, value: kpis.total_material, label: 'Material ICFES', color: 'text-red-400' },
            { icon: <BsListCheck />, value: kpis.total_simulacros, label: 'Simulacros', color: 'text-green-400' },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card-glass text-center"
            >
              <div className={`text-3xl mb-2 flex justify-center ${k.color}`}>{k.icon}</div>
              <p className="text-3xl font-black text-gradient-gold">{k.value}</p>
              <p className="text-xs text-gray-400 mt-1">{k.label}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10">
        {[
          { id: 'material', label: 'Material', icon: <BsFilePdf /> },
          { id: 'simulacros', label: 'Simulacros', icon: <BsListCheck /> },
          { id: 'suscripciones', label: 'Suscripciones', icon: <BsPeople /> },
          { id: 'blog', label: 'Blog', icon: <BsJournalText /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id as Tab)}
            className={`relative px-4 py-3 text-sm font-bold flex items-center gap-2 transition-colors ${
              tab === t.id ? 'text-gold' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t.icon} {t.label}
            {tab === t.id && (
              <motion.div
                layoutId="adminTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-gold rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'material' && (
            <MaterialTab
              materiales={materiales}
              onDelete={handleDeleteMaterial}
              busy={busy}
            />
          )}
          {tab === 'simulacros' && (
            <SimulacrosTab
              simulacros={simulacros}
              onDelete={handleDeleteSimulacro}
              busy={busy}
            />
          )}
          {tab === 'suscripciones' && (
            <SuscripcionesTab
              suscripciones={suscripciones}
              onRenovar={handleRenovar}
              onQuitarPremium={handleQuitarPremium}
              onRestarDias={handleRestarDias}
              onEliminar={handleEliminarUsuario}
              busy={busy}
            />
          )}

          {tab === 'blog' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Artículos del Blog ({posts.length})</h3>
                <Link to="/admin/post/nuevo" className="btn-gold text-sm inline-flex items-center gap-2">
                  <BsPlusCircle /> Nuevo Post
                </Link>
              </div>
              <div className="card-glass overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase text-gray-400 border-b border-white/10">
                    <tr>
                      <th className="text-left p-3">Título</th>
                      <th className="p-3">Vistas</th>
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((p) => (
                      <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-3"><strong className="text-white">{p.titulo}</strong></td>
                        <td className="p-3 text-center"><span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-xs">{p.vistas}</span></td>
                        <td className="p-3 text-center text-gray-400 text-xs">
                          {new Date(p.fecha_creacion).toLocaleDateString('es-CO')}
                        </td>
                        <td className="p-3 text-center space-x-1 whitespace-nowrap">
                          <Link to={`/admin/post/editar/${p.id}`} className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded hover:bg-blue-500/30">
                            <BsPencilSquare /> Editar
                          </Link>
                          <button
                            onClick={async () => {
                              if (!confirm('¿Eliminar este post?')) return;
                              try {
                                await deletePost(p.id);
                                toast.success('Post eliminado');
                                load();
                              } catch (e) {
                                toast.error(e instanceof Error ? e.message : 'Error');
                              }
                            }}
                            className="inline-flex items-center gap-1 text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded hover:bg-red-500/30"
                          >
                            <BsTrash /> Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {posts.length === 0 && (
                      <tr><td colSpan={4} className="p-6 text-center text-gray-500">Sin posts aún</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}



        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// ============ SUB-TABS ============

const MaterialTab = ({ materiales, onDelete, busy }: {
  materiales: MaterialAdmin[];
  onDelete: (id: number) => void;
  busy: boolean;
}) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">Material ICFES ({materiales.length})</h3>
      <Link to="/admin/material/nuevo" className="btn-gold text-sm inline-flex items-center gap-2">
        <BsPlusCircle /> Agregar
      </Link>
    </div>
    <div className="card-glass overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-xs uppercase text-gray-400 border-b border-white/10">
          <tr>
            <th className="text-left p-3">Título</th>
            <th className="p-3">Año</th>
            <th className="p-3">PDF</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materiales.map((m) => (
            <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="p-3">
                <strong className="text-white">{m.titulo}</strong>
                <p className="text-xs text-gray-500 truncate max-w-xs">{m.descripcion}</p>
              </td>
              <td className="p-3 text-center"><span className="bg-white/10 px-2 py-0.5 rounded text-xs">{m.anio}</span></td>
              <td className="p-3 text-center">
                <a href={m.pdf_url} target="_blank" rel="noopener" className="text-gold text-xs hover:underline">
                  {m.pdf_url.startsWith('https://') ? 'Ver Drive' : 'Descargar'}
                </a>
              </td>
              <td className="p-3 text-center space-x-1 whitespace-nowrap">
                <Link
                  to={`/admin/material/editar/${m.id}`}
                  className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded hover:bg-blue-500/30"
                >
                  <BsPencilSquare /> Editar
                </Link>
                <button
                  onClick={() => onDelete(m.id)}
                  disabled={busy}
                  className="inline-flex items-center gap-1 text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded hover:bg-red-500/30 disabled:opacity-50"
                >
                  <BsTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))}
          {materiales.length === 0 && (
            <tr><td colSpan={4} className="p-6 text-center text-gray-500">Sin material aún</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const SimulacrosTab = ({ simulacros, onDelete, busy }: {
  simulacros: SimulacroAdmin[];
  onDelete: (id: number) => void;
  busy: boolean;
}) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">Simulacros ({simulacros.length})</h3>
      <Link to="/admin/simulacro/nuevo" className="btn-gold text-sm inline-flex items-center gap-2">
        <BsPlusCircle /> Crear
      </Link>
    </div>
    <div className="card-glass overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-xs uppercase text-gray-400 border-b border-white/10">
          <tr>
            <th className="text-left p-3">Título</th>
            <th className="p-3">Preguntas</th>
            <th className="p-3">Duración</th>
            <th className="p-3">Plan</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {simulacros.map((s) => (
            <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="p-3"><strong className="text-white">{s.titulo}</strong></td>
              <td className="p-3 text-center">
                <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-xs">
                  {s.total_preguntas_reales}/{s.total_preguntas}
                </span>
              </td>
              <td className="p-3 text-center text-gray-300">{s.duracion_minutos}min</td>
              <td className="p-3 text-center">
                <span className="bg-gold/20 text-gold px-2 py-0.5 rounded text-xs">P{s.plan_minimo}</span>
              </td>
              <td className="p-3 text-center space-x-1 whitespace-nowrap">
                <Link
                  to={`/admin/simulacro/${s.id}/preguntas`}
                  className="inline-flex items-center gap-1 text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded hover:bg-blue-500/30"
                >
                  <BsPencilSquare /> Preguntas
                </Link>
                <button
                  onClick={() => onDelete(s.id)}
                  disabled={busy}
                  className="inline-flex items-center gap-1 text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded hover:bg-red-500/30 disabled:opacity-50"
                >
                  <BsTrash /> Eliminar
                </button>
              </td>
            </tr>
          ))}
          {simulacros.length === 0 && (
            <tr><td colSpan={5} className="p-6 text-center text-gray-500">Sin simulacros</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const SuscripcionesTab = ({ suscripciones, onRenovar, onQuitarPremium, onRestarDias, onEliminar, busy }: {
  suscripciones: SuscripcionAdmin[];
  onRenovar: (id: number) => void;
  onQuitarPremium: (id: number) => void;
  onRestarDias: (id: number) => void;
  onEliminar: (id: number, nombre: string) => void;
  busy: boolean;
}) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">Suscripciones Activas ({suscripciones.length})</h3>
      <Link to="/admin/suscripcion/nueva" className="btn-gold text-sm inline-flex items-center gap-2">
        <BsPlusCircle /> Crear Manual
      </Link>
    </div>
    <div className="card-glass overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-xs uppercase text-gray-400 border-b border-white/10">
          <tr>
            <th className="text-left p-3">Usuario</th>
            <th className="p-3">Plan</th>
            <th className="p-3">Vence</th>
            <th className="p-3">Días</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscripciones.map((s) => (
            <tr key={s.suscripcion_id} className="border-b border-white/5 hover:bg-white/5">
              <td className="p-3">
                <strong className="text-white">{s.nombre}</strong>
                <p className="text-xs text-gray-500">{s.email}</p>
              </td>
              <td className="p-3 text-center">
                <span className="bg-gradient-gold text-elite-dark px-2 py-0.5 rounded text-xs font-bold">
                  {s.plan}
                </span>
              </td>
              <td className="p-3 text-center text-gray-300 text-xs">
                {new Date(s.fecha_fin).toLocaleDateString('es-CO')}
              </td>
              <td className="p-3 text-center">
                <span className={`px-2 py-0.5 rounded text-xs ${
                  s.dias_restantes > 7 ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {s.dias_restantes}
                </span>
              </td>
              <td className="p-3 text-center space-y-1">
                <div className="flex flex-wrap gap-1 justify-center">
                  <Link to={`/admin/usuario/${s.usuario_id}/plan`} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded hover:bg-blue-500/30">
                    Plan
                  </Link>
                  <button onClick={() => onRenovar(s.usuario_id)} disabled={busy} className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded hover:bg-green-500/30 disabled:opacity-50">
                    Renovar
                  </button>
                  <button onClick={() => onRestarDias(s.usuario_id)} disabled={busy} className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded hover:bg-yellow-500/30 disabled:opacity-50">
                    −Días
                  </button>
                  <button onClick={() => onQuitarPremium(s.usuario_id)} disabled={busy} className="text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded hover:bg-orange-500/30 disabled:opacity-50">
                    Quitar
                  </button>
                  <button onClick={() => onEliminar(s.usuario_id, s.nombre)} disabled={busy} className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded hover:bg-red-500/30 disabled:opacity-50">
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {suscripciones.length === 0 && (
            <tr><td colSpan={5} className="p-6 text-center text-gray-500">Sin suscripciones activas</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);