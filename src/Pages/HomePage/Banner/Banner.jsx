import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/dMCtNDG/pexels-photo-325153.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome To <br /> E-Bazar
          </h1>
          <p className="mb-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
            dignissimos praesentium nam perferendis, culpa accusamus ad sapiente
            velit earum temporibus.
          </p>
          <Link to="/register">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
