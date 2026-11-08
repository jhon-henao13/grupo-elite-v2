import { Link } from 'react-router-dom';

export const PagoExitosoPage = () => (
  <div className="max-w-3xl mx-auto px-4 py-24 text-center">
    <div className="card-glass">
      <h1 className="text-4xl font-black text-gradient-gold mb-4">¡Pago recibido! 🎉</h1>
      <p className="text-gray-400 text-lg mb-8">
        Estamos validando tu transacción. Te daremos acceso total tan pronto se confirme
        (normalmente 3–10 segundos).
      </p>
      <Link to="/login" className="btn-gold">
        Ir a Iniciar Sesión
      </Link>
    </div>
  </div>
);