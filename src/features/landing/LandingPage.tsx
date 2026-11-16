import { HeroSection } from './sections/HeroSection';
import { IASection } from './sections/IASection';
import { ShowcaseSection } from './sections/ShowcaseSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { BlogCTASection } from './sections/BlogCTASection';
import { FinalCTASection } from './sections/FinalCTASection';
import { SEO } from '@/shared/components/SEO';

export const LandingPage = () => (
  <>

    <SEO
      title="Simulacros ICFES 2026 y Preparación con IA"
      description="Prepárate para el ICFES 2026 con Grupo Elite. Mentor IA 24/7, simulacros interactivos, material por años y análisis de progreso personalizado."
      canonical="/"
      keywords="ICFES 2026, simulacros ICFES IA, preicfes online Colombia, mejor puntaje ICFES, preparación ICFES Cali"
    />

    <HeroSection />
    <IASection />
    <ShowcaseSection />
    <FeaturesSection />
    <TestimonialsSection />
    <BlogCTASection />
    <FinalCTASection />
  </>
);