import { Rating } from "@smastrom/react-rating";
import { useLoaderData } from "react-router-dom";

const SingleProduct = () => {
  const product = useLoaderData();
  console.log(product);
  const { name, price, rating, description, image } = product;
  return (
    <div className="w-9/12 mx-auto my-10 bg-base-200">
      <div className="hero">
        <div className="hero-content flex-col justify-center gap-5 lg:flex-row">
          <img src={image} className="w-96 rounded-lg shadow-2xl" />
          <div>
            <h2 className="text-5xl font-bold text-primary">{name}</h2>
            <div className="flex justify-center items-center mt-5">
              <p>Rating: {rating} </p>
              <Rating value={rating} readOnly style={{ maxWidth: 150 }} />
            </div>
            <hr className="w-80 h-1 mx-auto my-4 bg-primary border-0 rounded" />
            <h1 className="text-4xl font-semibold textarea-accent">
              Price: ${price}
            </h1>
            <hr className="w-80 h-1 mx-auto my-4 bg-primary border-0 rounded" />
            <button className="btn btn-primary">Add to cart</button>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center">Description</h3>
        <p className="w-1/2 mx-auto text-base pb-5">{description}</p>
      </div>
    </div>
  );
};

export default SingleProduct;
