import React, { useState } from "react";
import "./Contact.css";
import whatsappLogo from "../assests/whatsapp.png";
import linkedinLogo from "../assests/linkedin.png";
import callLogo from "../assests/call.png";

const Contact = () => {
  const [showPopup, setShowPopup] = useState(false);
  //  const [state, handleSubmit] = useForm("xqkvnpwq")

  const handleSubmit = (e) => {
    // e.preventDefault();

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact_content">
          <div className="contact_title">
            <p>CONTACT ME</p>
            <h3>Drop a message ! </h3>
          </div>
          <div className="contact_details">
            <div className="contact_form">
              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/xqkvnpwq"
                method="POST"
              >
                <input
                  style={{ height: "4rem", width: "32rem", fontSize: "1.5rem" }}
                  autoComplete="off"
                  placeholder="name"
                  type="text"
                  name="username"
                  required
                />

                {/* <label htmlFor="email">Email Address</label> */}
                <input
                  style={{ height: "4rem", width: "32rem", fontSize: "1.5rem" }}
                  autoComplete="off"
                  placeholder="email"
                  id="email"
                  type="email"
                  name="email"
                />
                {/* <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                /> */}
                <textarea
                  id="message"
                  placeholder="message"
                  style={{
                    height: "12rem",
                    width: "32rem",
                    fontSize: "1.5rem",
                  }}
                  cols="30"
                  rows="6"
                  autoComplete="off"
                  name="message"
                  required
                />
                {/* <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                /> */}
                <button
                  className="btn btn-primary btn-lg"
                  style={{ width: "12rem" }}
                  type="submit"
                  // disabled={state.submitting}
                >
                  Submit
                </button>
              </form>
              {showPopup && (
                <div className="popup">
                  <h3>Message sent successfully!</h3>
                </div>
              )}
            </div>
            <div className="contact_icons">
              <div className="whatsapp">
                <a
                  aria-label="Chat on WhatsApp"
                  href="https://wa.me/919707741308?text=Hello!%20Excited%20to%20connect%20with%20you!%20Looking%20forward%20to%20engaging%20conversations%20and%20meaningful%20interactions%20on%20WhatsApp"
                >
                  {" "}
                  <img alt="Chat on WhatsApp" src={whatsappLogo} />
                  <h4>Chat on WhatsApp</h4>
                </a>
              </div>
              <div className="linkedin">
                <a
                  aria-label="Connect on Linkedin"
                  href="https://www.linkedin.com/in/monoj-kumar-das-019340a9/"
                >
                  {" "}
                  <img alt="Connect on Linkedin" src={linkedinLogo} />
                  <h4>Connect on Linkedin</h4>
                </a>
              </div>
              <div className="callcontact">
                <a aria-label="Call me" href="tel:919707741308">
                  {" "}
                  <img alt="Call me" src={callLogo} />
                  <h4>Call Me on Phone</h4>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
