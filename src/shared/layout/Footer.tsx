export const Footer = () => (
  <footer className="border-t border-white/5 bg-elite-dark/80 backdrop-blur-md mt-20">
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Grupo Elite. Todos los derechos reservados.
      </p>
      <div className="flex items-center gap-4">
        <a href="https://tiktok.com/@grupoelite_05" target="_blank" rel="noopener" className="text-gold hover:text-gold-secondary transition-colors">
          TikTok
        </a>
        <a href="https://wa.me/573185168709" target="_blank" rel="noopener" className="text-gold hover:text-gold-secondary transition-colors">
          WhatsApp
        </a>
        <a href="https://github.com/jhon-henao13" target="_blank" rel="noopener" className="text-gold hover:text-gold-secondary transition-colors">
          GitHub
        </a>
      </div>
      <p className="text-xs text-gray-500 max-w-xs text-center md:text-right">
        Grupo Elite es una plataforma educativa. Los resultados dependen del compromiso del estudiante.
      </p>
    </div>
  </footer>
);