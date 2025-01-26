import React from "react";
import "./About.css";
import { useAuthentication } from "../../store/Authentication";
import { NavLink } from "react-router-dom";

const About = () => {
  const { authorizedUser } = useAuthentication();

  return (
    <main className="about-main">
      <img src="rock.jpg" alt="about-background-image" className="rock-image" />
      <section className="about-text-section section1">
        <div>
          <p className="user-heading">
            Hi {authorizedUser ? authorizedUser.username : "User"},
          </p>
          <h1 className="about-heading">
            Grow your career today with the Education courses
          </h1>
          <p className="about-sub-heading">
            Lorem ipsum dolor sit amet, consectetur adipiscing eliti sed do
            eiusmod tempor incididunt.
          </p>
          <button className="btn learn-btn" style={{ marginTop: "1rem" }}>
            <NavLink to="/course" className="learn">EXPLORE COURSES</NavLink>
          </button>
        </div>
      </section>
      <section className="about-note">
        <div>
          <h2>9/10</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </div>
        <div>
          <h2>96%</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </div>
      </section>
      <section className="about-note">
        <div>
          <h2>10K+</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </div>
      </section>
    </main>
  );
};

export default About;
