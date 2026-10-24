function ProjectCard({ image, title, description }) {
  return (
    <div className="card project-card">
      <img src={image} alt={title} />
      <div className="project-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default ProjectCard;
