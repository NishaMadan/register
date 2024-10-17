import React from 'react';
import './About.css';
const AboutPage = () => {
  return (
<div class="fullscreen-container">
    <div className="about-page">
      <section className="company-info">
        <h2>About GA Morgan Dynamics Pvt. Ltd</h2>
        <p>
          GA Morgan is a subsidiary of Morgan Tecnica Spa, Italy, incorporated in 2008 as an independent, self-operated Indian Private Limited Company. 
          Specializing in Apparel Technology solutions, process automation, material optimization, data management, and business management, GA Morgan is 
          a market leader in the industry with over 45+ professionals and multiple direct service centers.
        </p>
        <p>
          The main focus of the business is to promote, install, train, implement, and service Morgan Tecnica products, while also manufacturing allied 
          equipment and material handling systems under the brand ‘Essentials’ for the Indian market.
        </p>
      </section>

      <section className="management-team">
        <h2>Management Team</h2>
        <div className="team-member">
          {/* <img src="path-to-image" alt="Anandakumar Duraisamy" /> */}
          <h3>Anandakumar Duraisamy - Managing Director</h3>
          <p>20+ years of experience in Apparel Technology solutions, process automation, material optimization, data management, and business management.</p>
        </div>
        <div className="team-member">
          {/* <img src="path-to-image" alt="FABRIZIO GIACHETTI" /> */}
          <h3>FABRIZIO GIACHETTI - Board Director</h3>
          <p>
            Founder and Board Director of GA Morgan and CEO of Morgan Tecnica Spa, with extensive experience since 1972 in cutting room machinery 
            manufacturing and software development.
          </p>
        </div>
 
      </section>

      <section className="footer">
        <div className="footer-contact">
          <h3>Contact Information</h3>
          <p>
            GA Morgan Dynamics Pvt. Ltd<br />
            1421, B-Block, 13th Main, Sahakar Nagar<br />
            Bangalore 560092, India<br />
            Email: <a href="mailto:info@gamorgan.in">info@gamorgan.in</a><br />
            Website: <a href="http://www.gamorgan.in" target="_blank" rel="noopener noreferrer">www.gamorgan.in</a>
          </p>
          <p>
            Morgan Tecnica<br />
            Via San Pancrazio, 11/B, 25030 Adro (Brescia), Italy<br />
            Tel: +39 030 7704446<br />
            Fax: +39 030 7705120<br />
            Website: <a href="http://www.morgantecnica.com" target="_blank" rel="noopener noreferrer">www.morgantecnica.com</a>
          </p>
        </div>

        <div className="footer-social">
          <h3>Social Network</h3>
          {/* Add social media links */}
        </div>
      </section>
    </div>
    </div>
  );
};

export default AboutPage;
