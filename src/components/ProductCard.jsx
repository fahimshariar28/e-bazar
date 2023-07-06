import { Rating } from "@smastrom/react-rating";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ProductCard = ({ product }) => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const { name, price, image, rating, _id } = product;
  const handleAddToCart = (product) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to login first!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const cartItem = {
        productId: product._id,
        image: product.image,
        name: product.name,
        price: product.price,
        email: user.email,
        userName: user.displayName,
      };
      console.log(cartItem);
      axiosSecure.post("/addtocart", cartItem).then((res) => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product added to cart!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <div className="flex justify-between">
          <p>Price: ${price}</p>
          <p>
            <Rating value={rating} readOnly style={{ maxWidth: 150 }} />
          </p>
        </div>
        <div className="card-actions justify-between items-center">
          <Link to={`/product/${_id}`}>
            <button className="btn btn-warning">View Details</button>
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
