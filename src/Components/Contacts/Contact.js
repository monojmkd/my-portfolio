import React, { useState } from "react";
import "./Contact.css";
import whatsappLogo from "../assests/whatsapp.png";
import linkedinLogo from "../assests/linkedin.png";
import callLogo from "../assests/call.png";

const ARROW = (
  <svg className="channel-arrow" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CHANNELS = [
  {
    icon: whatsappLogo,
    bg: "#e7fdf0",
    label: "Chat on WhatsApp",
    href: "https://wa.me/919707741308?text=Hello!%20Excited%20to%20connect%20with%20you!%20Looking%20forward%20to%20engaging%20conversations%20and%20meaningful%20interactions%20on%20WhatsApp",
  },
  {
    icon: linkedinLogo,
    bg: "#e8f0fe",
    label: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/monoj-kumar-das-019340a9/",
  },
  {
    icon: callLogo,
    bg: "#eff6ff",
    label: "Call Me",
    href: "tel:919707741308",
  },
];

const Contact = () => {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    e.target.reset();
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          {/* Left */}
          <div className="contact-left">
            <div className="section-label rv">Contact</div>
            <h2 className="rv d1">
              Let's work
              <br />
              together
            </h2>
            <p className="contact-tagline rv d2">
              Have a project in mind or just want to say hello? Drop a message
              and I'll get back to you promptly.
            </p>

            <div className="contact-channels rv d3">
              {CHANNELS.map(({ icon, bg, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="channel-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={icon}
                    className="channel-icon"
                    alt="icon"
                    style={{ background: bg }}
                  />
                  <span>{label}</span>
                  {ARROW}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form-wrap rv d2">
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              action="https://formspree.io/f/xqkvnpwq"
              method="POST"
            >
              <div className="form-field">
                <label>Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-field">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className="form-field">
                <label>Message</label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                />
              </div>
              <button type="submit" className="btn-submit">
                Send Message →
              </button>
            </form>

            <div className={`form-toast${sent ? " show" : ""}`}>
              ✓ Message sent! I'll be in touch soon.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
