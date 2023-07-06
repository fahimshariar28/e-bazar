import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { name, price, image, rating, _id } = product;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="flex justify-between">
          <p>Price: ${price}</p>
          <p>Rating: {rating}</p>
        </div>
        <div className="card-actions justify-between items-center">
          <Link to={`/product/${_id}`}>
            <button className="btn btn-warning">View Details</button>
          </Link>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
