import { Star } from "lucide-react";

// one card used for both articles and tutorials
function ItemCard({ item }) {
  return (
    <div className="item-card">
      <img src={item.image} alt={item.title} />
      <h4>{item.title}</h4>
      <p className="item-desc">{item.description}</p>
      <div className="item-meta">
        <span className="rating">
          <Star size={16} fill="#f5b301" color="#f5b301" /> {item.rating}
        </span>
        <span className="author">{item.author}</span>
      </div>
    </div>
  );
}

export default ItemCard;
