import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTruck, faUserCircle, faUserShield } from '@fortawesome/free-solid-svg-icons';

// Importing all images
import aboutUsImage from  '../assets/images/wsscs-logo.png';
import aboutUsImage1 from '../assets/images/photo0.jpg';
import aboutUsImage2 from '../assets/images/photo1.jpg';
import aboutUsImage3 from '../assets/images/photo2.jpg';


export default function Home() {
    // Slick settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="container">
         <div className="row mt-5">
                <div className="d-flex flex-wrap justify-content-end  " >
                        
                        <Link to="/driverlogin">
                            <button className="btn btn-warning mb-2 mx-2">
                                <FontAwesomeIcon icon={faTruck} /> Driver Login
                            </button>
                        </Link>
                        <Link to="/userlogin">
                            <button className="btn btn-info mb-2 mx-2">
                                <FontAwesomeIcon icon={faUserCircle} /> User Login
                            </button>
                        </Link>
                        <Link to="/adminlogin">
                            <button className="btn btn-danger mb-2 mx-2">
                                <FontAwesomeIcon icon={faUserShield} /> Admin Login
                            </button>
                            <Link to="/registration">
                            <button className="btn btn-success mb-2 mx-2">
                            <FontAwesomeIcon icon={faUser} /> Register
                            </button>
                        </Link>
                        </Link>
                </div>
        </div>

            {/* Slider */}
            <div className="row">
                <div className="col-md-12"  >
                    <Slider {...sliderSettings} >
                        <div>
                            <img src={aboutUsImage1}  alt='SliderImage1' className="d-block w-100" />
                        </div>
                        <div>
                            <img src={aboutUsImage2}  alt='SliderImage2' className="d-block w-100" />
                        </div>
                        <div>
                            <img src={aboutUsImage3}  alt='SliderImage3' className="d-block w-100" />
                        </div>
                    </Slider>
                </div>
            </div>

            
            <div className="row">
            <div className="col-md-8">
                <div className="rounded p-4 mt-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}>
                    <h1 className='text-dark'>Welcome to Our Website</h1>
                    <p className='text-dark'>Water & Sanitation Services Company Mingora Swat is a public sector company established by The Government of KhybarPakhtoonkha u/s 42 of The Companies Act. 2017. The company mandated for the provision of potable water supply services in the urban neighborhood councils and sanitation services in both urban and rural neighborhood councils of the entire tehsil Babuzai, a population of more than 0.600 million

                    The Company is a consumer-oriented organization responsible for production, transmission and distribution of potable water to citizens, managing solid waste, sewerage system to ensure hygienic environment, development of scheme to cover short falls in services and collection of revenue for sustained economic viability.</p>
                    <Link to="/about-us" className="btn btn-primary">Learn More</Link>
                </div>
            </div>


            <div className="col-md-4 mt-5" >
                 <img src={aboutUsImage} alt="About Us" className="img-fluid custom-image" />
            </div>

            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <h2>Our Aim</h2>
                    <hr/>
                </div>
                <div className="col-md-4">
                    <div className="aim-item text-left">
                        <i className="fas fa-bullseye fa-2x"></i><span className='h3'> Mission</span>
                        <p>Our mission is to provide water supply, solid waste management, wastewater disposal, and water resources management with unwavering dedication to safety, reliability, environmental stewardship, and financial responsibility, contributing significantly to public health and environmental preservation.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="aim-item text-left">
                        <i className="fas fa-eye fa-2x"></i><span className='h3'> Vission</span>
                        <p className=''>As pioneers in water-sanitation services, we envision a future with safe, affordable, and sustainable solutions. Through best practices, we empower individuals and communities, fostering a holistic approach to societal well-being, embracing innovation, and promoting environmental consciousness.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="aim-item text-left">
                        <i className="fas fa-heart fa-2x"> </i><span className='h3'> Value</span>
                        <p>  <ul>
                    <li>Customer Focused </li>
                    <li>Health Commitment Contribution</li>
                    <li>Quality Pledge Service</li>
                    <li>Transparency and accountability </li>
                    <li>Innovation Culture for evolving challenges</li>
                </ul></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
