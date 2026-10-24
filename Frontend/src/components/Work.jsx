import ProjectCard from "./ProjectCard";
import ragImg from "../assets/rag-chatbot.png";
import sentimentImg from "../assets/sentiment-bot.png";

const projects = [
  {
    id: 1,
    title: "Local RAG Chatbot (Ollama)",
    description:
      "A locally-hosted AI chatbot built with a LangFlow workflow, using Ollama for chat and embeddings to answer questions from uploaded PDF documents.",
    image: ragImg,
  },
  {
    id: 2,
    title: "Multi-Model Sentiment Analysis Bot",
    description:
      "An AI workflow using Google's Gemini models to detect review sentiment and automatically generate tailored customer support responses.",
    image: sentimentImg,
  },
];

function Work() {
  return (
    <section id="work" className="work">
      {projects.map((p) => (
        <ProjectCard key={p.id} image={p.image} title={p.title} description={p.description} />
      ))}
    </section>
  );
}

export default Work;
