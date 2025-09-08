interface Division {
    title: string;
    description: string;
    projectTitle: string;
    modules: string[];
}

export const divisionsContent: Division[] = [
    {
        title: "Software",
        projectTitle: "Smart AI To-Do List Web App",
        description:
            "In this project, you will build a task manager that understands human language, eliminating the need to fill out separate date and time fields. The application will be powered by AI to intelligently extract key details automatically, turning the tedious logging process into a quick and intuitive interaction.",
        modules: [
            "HTML, CSS & React",
            "Javascript & Data Structure",
            "Website Interactivity",
            "AI Integration",
        ],
    },
    {
        title: "Hardware",
        projectTitle: "Smart AI Home System",
        description:
            "The  project moves beyond manual switches and rigid, pre-programmed commands. In this project, you will build a simulated smart home that responds to natural language; no more separate buttons for every function. The system will be powered by an AI to intelligently interpret your text-based instructions, turning device control into a dynamic and conversational interaction.",
        modules: [
            "Electronics Fundamentals",
            "Programming for Microcontrollers",
            "IoT",
            "AI Integration",
        ],
    },
    {
        title: "UI/UX",
        projectTitle: "Campus Life Web App Design",
        description:
            "The project challenges the scattered and overwhelming way students access university opportunities. For this project, you will design an all-in-one digital hub that consolidates information on committees, scholarships, and competitions.",
        modules: [
            "UI/UX & Figma Fundamentals",
            "Flowchart & Wireframe",
            "UI, Color & Design",
            "Prototype",
        ],
    },
];
