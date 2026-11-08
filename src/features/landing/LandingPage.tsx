import { HeroSection } from './sections/HeroSection';
import { IASection } from './sections/IASection';
import { ShowcaseSection } from './sections/ShowcaseSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { BlogCTASection } from './sections/BlogCTASection';
import { FinalCTASection } from './sections/FinalCTASection';

export const LandingPage = () => (
  <>
    <HeroSection />
    <IASection />
    <ShowcaseSection />
    <FeaturesSection />
    <TestimonialsSection />
    <BlogCTASection />
    <FinalCTASection />
  </>
);