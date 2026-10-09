export const portfolioData = {
  profile: {
    name: "Renish Nathubhai Patel",
    displayName: "Renish",
    headline: "B.Tech AIML Student",
    location: "Navsari, Gujarat, India",
    bio: "Hello! I'm Renish, a 5th-semester B.Tech student in Artificial Intelligence and Machine Learning at CHARUSAT. I am passionate about building full-stack web applications and exploring modern technologies. With a strong foundation in Python, React, and Node.js, I love combining problem-solving with creative development to build impactful projects.",
    photo: "/profile.jpg", // IMPORTANT: Place a square profile.jpg in your public/ folder!
    resumeLink: "#" // Change this to a Google Drive PDF link when ready
  },
  education: {
    university: "CHARUSAT, CSPIT",
    degree: "B.Tech in Artificial Intelligence and Machine Learning",
    currentSem: "5th Semester",
    graduationYear: "2028"
  },
  skills: [
    { category: "Languages", items: ["Python", "JavaScript", "Java", "C++"] },
    { category: "Frameworks & Libraries", items: ["React", "Node.js", "Express", "Tailwind"] },
    { category: "Databases", items: ["MongoDB", "SQL", "Firebase"] },
    { category: "Tools", items: ["Git", "VS Code", "Postman", "Figma"] },
    { category: "Soft Skills", items: ["Problem Solving", "Teamwork", "Communication"] }
  ],
  projects: [
    {
      id: 1,
      title: "Full-Stack Task Manager",
      description: "A secure, high-performance task management API with a React frontend, featuring JWT authentication and in-memory caching.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
      role: "Solo Developer",
      github: "https://github.com/renish-44",
      liveDemo: null
    },
    {
      id: 2,
      title: "Personal Portfolio",
      description: "A dynamic, lazy-loaded portfolio showcasing my projects, skills, and academic journey.",
      techStack: ["React", "Vite"],
      role: "Solo Developer",
      github: "https://github.com/renish-44/student-portfolio",
      liveDemo: null
    }
  ],
  experience: [],
  contact: {
    emails: ["24aiml044@charusat.edu.in", "renishpatel122007@gmail.com"],
    github: "https://github.com/renish-44",
    linkedin: null
  },
  theme: {
    accentColor: "#10b981" // Emerald Green
  }
};
