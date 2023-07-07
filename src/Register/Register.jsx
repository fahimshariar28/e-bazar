import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
    const name = data.name;
    const email = data.email;
    const photoUrl = data.photoUrl;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        console.log(result);
        updateUserProfile(name, photoUrl).then(() => {
          const savedUser = {
            name,
            email,
            image: photoUrl,
            role: "customer",
          };
          fetch("https://e-bazar-server-sigma.vercel.app/adduser", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(savedUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              navigate("/");
              Swal.fire({
                icon: "success",
                title: "Registration successful",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <div>
        <p className="text-xl text-center">
          To register as Admin{" "}
          <span className="text-primary">
            {" "}
            <Link to="/adminregister">Click Here</Link>{" "}
          </span>{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name")}
            type="text"
            placeholder="Your Name"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input
            {...register("photoUrl")}
            type="text"
            placeholder="Your Photo Url"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Your email"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            placeholder="********"
            className="input input-bordered"
          />
          <label className="label">
            {errors.exampleRequired && <span>This field is required</span>}
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
          </label>
        </div>
        <div className="form-control mt-6">
          <input type="submit" className="btn btn-primary" value="Register" />
        </div>
      </form>
      <p className="p-5 text-center">
        Already Have an Account?{" "}
        <span className="text-primary">
          <Link to="/login">Login</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
