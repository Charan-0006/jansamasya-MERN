import { useState } from "react";
import "./Contact.css";
import axios from "axios";

export default function Contact() {

  const [emailError, setEmailError] = useState("");

  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    category: "",
  });

  // =====================
  // HANDLE INPUT CHANGE
  // =====================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =====================
  // HANDLE SUBMIT
  // =====================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // VALIDATION

    if (
      !form.name ||
      !form.email ||
      !form.message ||
      !form.category
    ) {

      alert("Please fill all fields");

      return;
    }

    if (!form.email.includes("@")) {

      setEmailError(
        "Please enter correct email"
      );

      return;
    }

    try {

      // SEND TO BACKEND

      await axios.post(
        "http://localhost:5000/api/contact",
        {
          name: form.name,
          email: form.email,
          subject: form.category,
          message: form.message,
        }
      );

      // SUCCESS

      setSuccess(true);

      setTimeout(() => {

        setSuccess(false);

      }, 3000);

      // RESET FORM

      setForm({
        name: "",
        email: "",
        message: "",
        category: "",
      });

      setEmailError("");

    } catch (error) {

      console.log(error);

      alert("Failed to send message");
    }
  };

  return (

    <div className="contact-page">

      {/* HEADER */}

      <div className="contact-header">

        <h1>Contact Support</h1>

        <p>
          We’re here to help you 🚀
        </p>

      </div>

      {/* TOP INFO */}

      <div className="contact-top">

        <h3>Support</h3>

        <span>
          Usually responds within 24 hours
        </span>

      </div>

      <div className="contact-wrapper">

        {/* LEFT SIDE */}

        <div className="contact-left">

          {/* INFO */}

          <div className="card">

            <h3>Get in Touch</h3>

            <p>
              📧 support@jansamasya.com
            </p>

            <p>
              📞 +91 98765 43210
            </p>

            <p>
              📍 Amrita Vishwa Vidyapeetham
            </p>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="map-link"
            >

              Open in Maps →

            </a>

          </div>

          {/* MAP */}

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.6696127282535!2d76.48907237489746!3d9.09383119097014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0602e7b4a2049d%3A0x3af3246b5138db0f!2sAmrita%20Vishwa%20Vidyapeetham%2C%20Amritapuri!5e0!3m2!1sen!2sin!4v1777381967328!5m2!1sen!2sin"
            className="map"
            loading="lazy"
            allowFullScreen
          ></iframe>

          {/* SUPPORT BOX */}

          <div className="support-box">

            <h4>Need urgent help?</h4>

            <p>
              Email us directly:
              support@jansamasya.com
            </p>

          </div>

          {/* FAQ */}

          <div className="faq">

            <h3>FAQ</h3>

            <p>
              • How long does it take to resolve issues?
            </p>

            <p>
              • How can I track my complaint?
            </p>

            <p>
              • Where can I view updates?
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="contact-right">

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />

            {/* EMAIL */}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => {

                const value = e.target.value;

                setForm({
                  ...form,
                  email: value,
                });

                // EMAIL VALIDATION

                if (
                  value &&
                  !value.includes("@")
                ) {

                  setEmailError(
                    "Please enter correct email"
                  );

                } else {

                  setEmailError("");
                }
              }}
            />

            {/* ERROR */}

            {emailError && (

              <p className="email-error">

                {emailError}

              </p>

            )}

            {/* CATEGORY */}

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >

              <option value="">
                Select Issue Type
              </option>

              <option>
                Bug Report
              </option>

              <option>
                Feature Request
              </option>

              <option>
                Complaint
              </option>

              <option>
                General Query
              </option>

            </select>

            {/* MESSAGE */}

            <textarea
              name="message"
              placeholder="Type your message..."
              rows="5"
              value={form.message}
              onChange={handleChange}
            />

            {/* FILE */}

            <input type="file" />

            {/* BUTTON */}

            <button type="submit">

              Send Message

            </button>

          </form>

          {/* SUCCESS */}

          {success && (

            <div className="toast">

              Message sent successfully ✅

            </div>

          )}

        </div>

      </div>

    </div>
  );
}