import Projects from '../components/Projects.jsx';
import { projectList } from '../data/portfolio.js';

function ProjectsPage() {
  return <Projects projects={projectList} />;
}

export default ProjectsPage;
