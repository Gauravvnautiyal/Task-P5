import ItemCard from "./ItemCard";

// reusable section: heading + 3 cards + "See all" button
function FeaturedSection({ id, heading, items, buttonText }) {
  return (
    <section id={id} className="featured">
      <h2>{heading}</h2>
      <div className="featured-grid">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      <button className="see-all">{buttonText}</button>
    </section>
  );
}

export default FeaturedSection;
