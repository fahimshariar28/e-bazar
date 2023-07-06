import { useLocation, useNavigate } from "react-router-dom";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Checkout = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const location = useLocation();
  const product = location.state;
  console.log(product);
  const onSubmit = (data) => {
    const orderDetails = {
      ...product,
      ...data,
      orderTime: new Date(),
    };
    console.log(orderDetails);
    axiosSecure.post("/checkout", orderDetails).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Order placed successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/orders");
      }
    });
  };

  return (
    <div>
      <SectionTitle title="Checkout" />
      <div className="flex flex-col lg:flex-row justify-evenly">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
            <div className="mb-4 w-full flex">
              <div>
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email*
                </label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Your email"
                  defaultValue={product.email}
                  className="input  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="ml-2 ">
                <label htmlFor="phone" className="block mb-1 font-medium">
                  Phone*
                </label>
                <input
                  type="text"
                  {...register("phone", { required: true })}
                  className="input  px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 font-medium">
                Name*
              </label>
              <input
                defaultValue={product.userName}
                {...register("name", { required: true })}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="street" className="block mb-1 font-medium">
                Street Address*
              </label>
              <input
                type="text"
                {...register("street", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="apartment" className="block mb-1 font-medium">
                Apartment
              </label>
              <input
                type="text"
                {...register("apartment")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block mb-1 font-medium">
                City*
              </label>
              <input
                type="text"
                {...register("city", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="zip-code" className="block mb-1 font-medium">
                Zip Code*
              </label>
              <input
                type="text"
                {...register("zipCode", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              value="Place Order"
              type="submit"
              className="w-full my-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            />
          </form>
        </div>
        <div className="bg-slate-500 h-fit p-4 rounded-md mt-4">
          <h3 className="text-2xl font-bold text-blue-500">Order Summary</h3>
          <div>
            <img className="my-2 rounded" src={product.image} alt="" />
            <p className="text-xl">Product Name: {product.name}</p>
            <p className="text-xl">Price: ${product.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
