import React from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <main className="home-main">
      <section className="home-section">
        <h1 className="home-heading">Grow your skills, define your future</h1>
        <p className="home-sub-heading">
          Presenting Academy. the tech school of the future. We teach you the
          right skills to be prepared for tomorrow.
        </p>
        <div className="btn-section">
          <button className="btn explore-btn" >
            <NavLink to="/course" className="explore" >EXPLORE COURSES</NavLink>
          </button>
          <button className="btn learn-btn">
            <NavLink to="/about" className="learn">LEARN MORE</NavLink>
          </button>
        </div>
      </section>
      <section>
        <img src="./homeimage.avif" alt="image" width={"400px"} />
      </section>
    </main>
  );
};

export default Home;
