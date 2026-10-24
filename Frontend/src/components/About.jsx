import profileImg from "../assets/gaurav-profile.jpeg";

function About() {
  return (
    <section id="about" className="about">
      <img className="profile-img" src={profileImg} alt="Gaurav" />
      <p>
        I am a Computer Science student at Deakin University interested in web
        development, software projects and technology.
      </p>
      <div className="divider"></div>
      <h2>Here's what I've done so far</h2>
    </section>
  );
}

export default About;
