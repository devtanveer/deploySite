import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faHome, faUpload, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Contact() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [selectData, setSelectData] = useState([]);
    const [selectValue, setSelectValue] = useState("");

    useEffect(() => {
        let processing = true;
        axiosFetchData(processing);
        return () => {
            processing = false;
        };
    }, []);

    const axiosFetchData = async (processing) => {
        await axios
            .get("http://localhost:4000/users")
            .then((res) => {
                if (processing) {
                    setSelectData(res.data);
                }
            })
            .catch((err) => console.log(err));
    };

    const axiosPostData = async () => {
        const postData = {
            name: name,
            phone: phone,
            email: email,
            address: address,
            website: selectValue,
            message: message,
        };

        await axios
            .post("http://localhost:4000/contact/send", postData)
            .then((res) => setError(<p className="success">{res.data}</p>))
            .catch((err) => setError(<p className="error">Error submitting the form. Please try again.</p>));
    };

    const SelectDropdown = () => {
        return (
            <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
                <option value="" key="none">
                    -- Select One --
                </option>
                <option value="social-media">Social Media</option>
                <option value="Television">Television</option>
                <option value="News Paper">News Paper</option>
                <option value="other">Other</option>
            </select>
        );
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!message) {
            setError(<p className="required">Message is empty. Please type a message.</p>);
        } else {
            setError("");
            axiosPostData();
        }
    };

    return (
        <div className="container mt-4">
            <div className="row mt-5">
               
               {/* Code for Our Office */}
               
               <div className="col-md-7">
                {/* Content and image for the left side */}
                
                <div className="content-right">
                    <h2>Our Office</h2>
                    <p> Street No 11, Qambar City, Swat Pakistan</p>
                    <p>Email: geekasad@gmail.com</p>
                    <p>Phone: +92946725334</p>

                    {/* Add your image source and styling */}
                    <img src="https://th.bing.com/th/id/OIP.98Tot-LL8Svu_9ExgXgq5wHaEK?w=311&h=180&c=7&r=0&o=5&pid=1.7" alt="Office" className="img-fluid custom-image rounded" />

                    
                    <div className="content-right">
                                        {/* WhatsApp direct call button */}
                            <button
                                className="btn btn-success mt-3"
                                onClick={() => {
                                    // Open the provided WhatsApp link in a new tab/window
                                    window.open('https://api.whatsapp.com/send?phone=+923083083113&text=I%27m%20interested%20to%20get%20in%20touch%20with%20you.', '_blank');
                                }}
                            >
                                <FontAwesomeIcon icon={faPhone} /> WhatsApp Call/Message Now
                            </button>
                        </div>

                </div>
            </div>
               
               
               {/* Code for the Contact Form */}
               
                <div className="col-md-5">
                <h2 >Contact Us / Register a Complaint</h2>
                <form className="contactForm"> 
                <div className="form-group">
                    <label htmlFor="name">
                        <FontAwesomeIcon icon={faEnvelope} /> Name
                    </label>
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">
                        <FontAwesomeIcon icon={faPhone} /> Phone
                    </label>
                    <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">
                        <FontAwesomeIcon icon={faEnvelope} /> Email
                    </label>
                    <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="address">
                        <FontAwesomeIcon icon={faHome} /> Address
                    </label>
                    <input type="text" id="address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="website">
                        <FontAwesomeIcon icon={faEnvelope} /> How Did You Hear About Us?
                    </label>
                    <SelectDropdown />
                </div>

                <div className="form-group">
                    <label htmlFor="message">
                        <FontAwesomeIcon icon={faEnvelope} /> Message
                    </label>
                    <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                </div>
                
                {error}

                <div className="form-group">
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                <FontAwesomeIcon icon={faPaperPlane} /> Send Message
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Contact;
