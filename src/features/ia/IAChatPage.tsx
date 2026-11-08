import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BsSend, BsRobot, BsPersonCircle } from 'react-icons/bs';
import { toast } from 'sonner';
import { useIAContext } from './useIAContext';
import { callAI, guardarConversacion, fetchConversaciones, type Conversacion } from './iaApi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestions = [
  '¿Cómo mejorar en matemáticas?',
  'Técnicas para lectura crítica',
  'Consejos para el día del examen',
  'Estrategias para inglés',
  'Cómo manejar el tiempo',
  'Motivación y disciplina',
];

export const IAChatPage = () => {
  const { user, metricas, loading, error, isElite } = useIAContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user?.email) return;
    fetchConversaciones(user.email).then((rows) => {
      const ordered = [...rows].reverse();
      const hist: Message[] = [];
      ordered.forEach((c: Conversacion) => {
        hist.push({ role: 'user', content: c.mensaje_usuario });
        hist.push({ role: 'assistant', content: c.respuesta_ia });
      });
      setMessages(hist);
    });
  }, [user?.email]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || !metricas || !user?.email) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setSending(true);

    try {
      const result = await callAI('chat', { metrics: metricas, message: text, name: user.email });
      setMessages((m) => [...m, { role: 'assistant', content: result }]);
      await guardarConversacion(user.email, text, result);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Error al enviar');
      setMessages((m) => m.slice(0, -1));
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  if (loading) return <div className="text-center py-24 text-gold animate-pulse-glow">Cargando…</div>;
  if (error) return <div className="text-center py-24 text-red-400">{error}</div>;
  if (!isElite) return <div className="text-center py-24 text-gray-400">Requiere Plan ELITE 500.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col h-[calc(100vh-8rem)]">
      <div className="text-center mb-4">
        <BsRobot className="text-5xl text-gold mx-auto mb-2" />
        <h1 className="text-2xl md:text-3xl font-black">🤖 Tu Mentor IA</h1>
        <p className="text-sm text-gray-400">Pregúntame lo que quieras sobre tu preparación</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4 text-sm">Sugerencias para empezar:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs bg-white/5 hover:bg-gold/10 border border-white/10 hover:border-gold/30 px-3 py-2 rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-gold to-orange-500">
                {m.role === 'user' ? <BsPersonCircle className="text-elite-dark" /> : <BsRobot className="text-elite-dark" />}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  m.role === 'user'
                    ? 'bg-accent-blue/20 border border-accent-blue/30'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {m.role === 'user' ? (
                  <p className="text-sm text-white">{m.content}</p>
                ) : (
                  <article className="prose-elite text-sm">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
                  </article>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {sending && (
          <div className="flex gap-2">
            <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-gold to-orange-500">
              <BsRobot className="text-elite-dark" />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu pregunta…"
          disabled={sending}
          className="input-modern flex-1"
        />
        <button
          type="submit"
          disabled={!input.trim() || sending}
          className="btn-gold px-5 disabled:opacity-50 inline-flex items-center gap-2"
        >
          <BsSend />
        </button>
      </form>
    </div>
  );
};