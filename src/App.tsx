import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/features/auth/AuthContext';
import { ProtectedRoute } from '@/features/auth/ProtectedRoute';
import { AppLayout } from '@/shared/layout/AppLayout';
import { LoginForm } from '@/features/auth/LoginForm';
import { Dashboard } from '@/features/dashboard/Dashboard';
import { LandingPage } from '@/features/landing/LandingPage';
import { SuscripcionPage } from '@/features/suscripcion/SuscripcionPage';
import { PagoExitosoPage } from '@/features/suscripcion/PagoExitosoPage';
import { SimulacrosPage } from '@/features/simulacros/SimulacrosPage';
import { SimulacroInfoPage } from '@/features/simulacros/SimulacroInfoPage';
import { SimulacroQuizPage } from '@/features/simulacros/SimulacroQuizPage';
import { SimulacroResultadoPage } from '@/features/simulacros/SimulacroResultadoPage';
import { IAPage } from '@/features/ia/IAPage';
import { IAAnalisisPage } from '@/features/ia/IAAnalisisPage';
import { IAEstrategiaPage } from '@/features/ia/IAEstrategiaPage';
import { IAChatPage } from '@/features/ia/IAChatPage';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/suscripcion" element={<SuscripcionPage />} />
            <Route path="/pago/exitoso" element={<PagoExitosoPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/simulacros" element={<SimulacrosPage />} />
              <Route path="/simulacro/:simulacroId/info" element={<SimulacroInfoPage />} />
              <Route path="/simulacro/:simulacroId/quiz" element={<SimulacroQuizPage />} />
              <Route path="/simulacro/:simulacroId/resultado" element={<SimulacroResultadoPage />} />

              <Route path="/ia" element={<IAPage />} />
              <Route path="/ia/analisis" element={<IAAnalisisPage />} />
              <Route path="/ia/estrategia" element={<IAEstrategiaPage />} />
              <Route path="/ia/chat" element={<IAChatPage />} />
              <Route path="/blog" element={<Placeholder title="Blog" />} />
              <Route path="/admin" element={<Placeholder title="Admin" />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const Placeholder = ({ title }: { title: string }) => (
  <div className="max-w-4xl mx-auto px-4 py-24 text-center">
    <h1 className="text-4xl font-black text-gradient-gold mb-4">{title}</h1>
    <p className="text-gray-400">Esta sección se migra en la siguiente fase.</p>
  </div>
);

export default App;