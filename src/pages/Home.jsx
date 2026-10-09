import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import SectionWrapper from '../components/SectionWrapper.jsx';

export default function Home({ data }) {
  return (
    <div className="home-page">
      <About profile={data.profile} education={data.education} />
      <Skills skills={data.skills} />
      {/* Experience section conditionally renders ONLY if array has items */}
      {data.experience && data.experience.length > 0 && (
         <SectionWrapper id="experience" title="Experience & Achievements">
            {/* Map over data.experience here if added later */}
         </SectionWrapper>
      )}
    </div>
  );
}
