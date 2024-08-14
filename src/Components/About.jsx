import React from "react";
import "../Components/About.css"

const About = () =>{
    return(<>
        {/* <div className="about-container">
        <h1>About</h1>
        <p>
        Our e-commerce platform is designed to provide a seamless shopping experience for automotive enthusiasts.
          Whether you're looking for bike accessories, car parts, or any other automotive product, our store offers 
          a wide selection to meet your needs.
        </p>
        <p>
          With a user-friendly interface and advanced features like wishlists, search functionality, and secure login, 
          we aim to make online shopping convenient and enjoyable. Our platform is built using the MERN stack, 
          ensuring a robust and scalable solution that caters to both users and administrators.
        </p>
      </div> */}

<section class="about-section">
  <div class="about">
    <h1>About Us</h1>
    <p>Welcome to Automotive E-commerce web-Application, your one-stop destination for all things related to bikes and car accessories. Established in [Year], we have grown from a small start-up into a trusted online store, providing a wide range of high-quality products at competitive prices.</p>

    <h2>Our Mission</h2>
    <p>At Automotive E-commerce web-Application, our mission is to enhance your driving and riding experience by offering the best products on the market. We believe in quality, affordability, and customer satisfaction, and we strive to bring you the latest innovations in automotive accessories.</p>

    <h2>Why Choose Us?</h2>
    <ul>
      <li>Wide Range of Products: From essential bike gear to the latest car accessories, we have everything you need to upgrade your vehicle.</li>
      <li>Quality Assurance: We source our products from reputable manufacturers, ensuring that every item meets our high standards of quality.</li>
      <li>Customer Support: Our dedicated support team is here to assist you with any queries, ensuring a smooth shopping experience.</li>
      <li>Fast Shipping: We offer quick and reliable shipping options, so you can receive your orders in no time.</li>
      <li>Easy Returns: Your satisfaction is our priority. If you're not happy with your purchase, our easy return policy has got you covered.</li>
    </ul>

    <h2>Our Values</h2>
    <p>We believe in transparency, integrity, and excellence. These values guide us in everything we do, from selecting products to serving our customers. We're committed to providing a seamless shopping experience and building long-lasting relationships with our customers.</p>

    <h2>Join Our Community</h2>
    <p>Become a part of the Automotive E-commerce web-Application community by following us on social media, subscribing to our newsletter, or reaching out to us directly. We're excited to share our passion for automotive accessories with you and help you find exactly what you're looking for.</p>

    <h2>Contact Us</h2>
    <p>Have questions? Need help with your order? Feel free to <a >contact us</a>. We're here to help!</p>
  </div>
</section>



<footer class="footer">
  <div class="social-icons">
    <a href="https://www.instagram.com/____.tamizh.____/#" target="_blank" class="social-icon"><i class="fab fa-instagram"></i></a>
    <a href="https://www.facebook.com" target="_blank" class="social-icon"><i class="fab fa-facebook-f"></i></a>
    <a href="mailto:tamilkumaran1494@gmail.com" class="social-icon"><i class="fas fa-envelope"></i></a>
  </div>
  <div class="footer-content">
    <p>&copy; 2024 Automotive E-commerce web-Application. All rights reserved.</p>
  </div>
  </footer>
      </>
    )
}

export default About;