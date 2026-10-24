import photo1 from "../assets/photo1.jpeg";
import photo2 from "../assets/photo2.jpeg";
import photo3 from "../assets/photo3.jpeg";

const photos = [
  { src: photo1, alt: "Mountains" },
  { src: photo2, alt: "Night match" },
  { src: photo3, alt: "Sunset between buildings" },
];

function Photos() {
  return (
    <section className="photos">
      <h2>My Photos</h2>
      <div className="photo-grid">
        {photos.map((p) => (
          <img key={p.alt} src={p.src} alt={p.alt} />
        ))}
      </div>
    </section>
  );
}

export default Photos;
