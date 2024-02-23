import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
 
function About() {
    return (
        <>
            <div className="container mt-5">
                <h1 className="mb-4">About Us</h1>
                
                <div className="row">
                    <div className="col-md-6 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
                        <p>
                            Welcome to Water & Sanitation Services Company Mingora Swat, your dedicated partner in providing essential water and sanitation services. Our focus extends beyond clean water supply to efficient solid waste management, ensuring the health and well-being of our community.
                        </p>
                        <p>
                            At Water & Sanitation Services Company Mingora Swat, we understand the critical role of waste collection and management in maintaining a healthy and sustainable environment. Our team is committed to implementing innovative solutions for waste disposal, recycling, and minimizing the environmental impact.
                        </p>
                        <p>
                            Efficient solid waste management is a cornerstone of our operations. We employ modern techniques and technologies to collect, process, and dispose of waste responsibly. By promoting recycling and reducing landfill dependency, we contribute to a greener and cleaner future for Swat and its residents.
                        </p>
                        <p>
                            Our mission is not only to provide reliable and affordable services but also to create a sustainable and eco-friendly waste management system that aligns with environmental standards and regulations. We believe in transparency, accountability, and community engagement to ensure the success of our initiatives.
                        </p>
                    </div>
                    
                    <div className="col-md-6">
                        <img src="https://th.bing.com/th/id/OIP.98Tot-LL8Svu_9ExgXgq5wHaEK?w=311&h=180&c=7&r=0&o=5&pid=1.7" alt="About Us" className="img-fluid custom-image rounded"  />
                    </div>
                </div>

                <div className="row mt-5">
                <div className="col-md-3 mx-1 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
                        <h3>Our Location</h3>
                                               
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3277.5021515911485!2d72.32998457644153!3d34.76813187289587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dc2305c8996cf7%3A0x74397da8b046d1c5!2sWater%20Sanitation%20Service%20%26%20Company%20Swat%20KPK%20Pakistan!5e0!3m2!1sen!2sus!4v1702121601358!5m2!1sen!2sus" ></iframe>
                        <p>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> Street No 11, Qambar City, Swat Pakistan
                        </p>
                    </div>
                    <div className="col-md-3 mx-1 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
                        <h3>Contact Us</h3>
                        <p>
                            <FontAwesomeIcon icon={faPhone} /> +92 308 308 3113
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} /> geekasad@gmail.com
                        </p>
                        <Link to="/contact-us" className="btn btn-primary">Contact Us</Link>
                    </div>
                    <div className="col-md-3 mx-1 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
                        <h3>Connect With Us</h3>
                        <p>
                            <FontAwesomeIcon icon={faPhone} />{' '}
                            <a href="https://wa.me/+923083083113" target="_blank" rel="noopener noreferrer">
                                WhatsApp
                            </a>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} />{' '}
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                Facebook
                            </a>
                        </p>
                        <p>
                            <FontAwesomeIcon icon={faEnvelope} />{' '}
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                                Instagram
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
