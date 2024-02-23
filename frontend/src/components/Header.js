import logo from '../assets/images/wsscs-logo.png';
import { useContext } from 'react';
import Context from './Context';
import { Link } from 'react-router-dom';

export default function Header() {
    const userData = useContext(Context);

    return (
        <nav className="navbar navbar-expand-lg  navbar-dark bg-primary">
            <Link className="navbar-brand" to="/"><img src={logo} alt="logo" height="80" /></Link>
            <span className="h4 text-white ">Water & Sanitation Services Company</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end mx-3" id="navbarNav" >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <h4><Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link></h4>
                    </li>
                    <li className="nav-item">
                        <h4><Link className="nav-link" to="/contact-us">Contact Us</Link></h4>
                    </li>
                    <li className="nav-item">
                        <h4><Link className="nav-link" to="/about-us">About Us</Link></h4>
                    </li>
                    {/* <li className="nav-item">Hello {userData.name}</li> */}
                    {/* <li className="nav-item">Cart: {userData.cartItems}</li> */}
                </ul>
            </div>
        </nav>
    );
}
