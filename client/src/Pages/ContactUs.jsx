import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle your form submission logic here (e.g., API call)
    console.log("Form Submitted:", formData);
    alert("Thanks for reaching out,  We'll get back to you soon.");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white text-black py-16 sm:py-24">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-gray-500">
            Have questions about your custom syllabus or need technical help? <br />Drop us a message.
          </p>
        </div>

        {/* MAIN SPLIT GRID */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: CONTACT DETAILS INFO */}
<div className="lg:col-span-5 space-y-8">

  <div>
    <h2 className="text-xl sm:text-2xl font-bold mb-4">
      Contact Information
    </h2>

    <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
      Fill out the form and our support team will respond within 24 hours. You can also reach us via our direct channels.
    </p>
  </div>

  <div className="space-y-6">

    {/* EMAIL */}
    <div className="flex items-center gap-4">
      <span className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </span>

      <div>
        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
          Email Us
        </span>
        <a
          href="mailto:support@zestai.com"
          className="text-sm sm:text-base font-medium text-gray-900 hover:underline"
        >
          support@zestai.com
        </a>
      </div>
    </div>

    {/* LOCATION */}
    <div className="flex items-center gap-4">
      <span className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </span>

      <div>
        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
          Our HQ
        </span>
        <p className="text-sm sm:text-base font-medium text-gray-900">
          Lahore, Punjab, Pakistan
        </p>
      </div>
    </div>

    {/* LINKEDIN */}
    <div className="flex items-center gap-4">
      <span className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full shrink-0">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.48v6.27zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 01-.01 4.12zM6.92 20.45H3.75V9h3.17v11.45z" />
        </svg>
      </span>

      <div>
        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
          LinkedIn
        </span>
        <a
          href="https://www.linkedin.com/in/salmankhalid13?utm_source=share_via&utm_content=profile&utm_medium=member_android"
          target="_blank"
          className="text-sm sm:text-base font-medium text-gray-900 hover:underline"
        >
          Connect with me
        </a>
      </div>
    </div>

    {/* GITHUB */}
    <div className="flex items-center gap-4">
      <span className="flex items-center justify-center w-10 h-10 bg-gray-100 text-gray-600 rounded-full shrink-0">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.1 3.29 9.43 7.85 10.96.57.1.78-.25.78-.55v-2.1c-3.19.7-3.86-1.37-3.86-1.37-.52-1.33-1.27-1.68-1.27-1.68-1.04-.72.08-.71.08-.71 1.15.08 1.75 1.18 1.75 1.18 1.02 1.74 2.67 1.24 3.32.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.27-5.23-5.65 0-1.25.45-2.27 1.17-3.07-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.14 1.17.91-.25 1.88-.38 2.85-.38.97 0 1.94.13 2.85.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.6.23 2.78.11 3.07.72.8 1.17 1.82 1.17 3.07 0 4.39-2.69 5.36-5.25 5.64.41.35.77 1.04.77 2.1v3.11c0 .3.21.65.79.54 4.55-1.53 7.84-5.86 7.84-10.96C23.25 5.48 18.27.5 12 .5z" />
        </svg>
      </span>

      <div>
        <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">
          GitHub
        </span>
        <a
          href="https://github.com/salmankhalid7/Zest-Ai"
          target="_blank"
          className="text-sm sm:text-base font-medium text-gray-900 hover:underline"
        >
          Contribute to the code 
        </a>
      </div>
    </div>

  </div>
</div>

          {/* RIGHT: INTERACTIVE BOX FORM */}
          <div className="lg:col-span-7 bg-gray-50/50 border border-gray-100 rounded-2xl p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase text-gray-600 tracking-wide">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase text-gray-600 tracking-wide">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Your@example.com"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
              </div>

              {/* Subject field */}
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase text-gray-600 tracking-wide">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                />
              </div>

              {/* Message field */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase text-gray-600 tracking-wide">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black resize-none transition"
                ></textarea>
              </div>

              {/* Form Submission Button */}
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-black text-white rounded-full text-sm font-medium hover:opacity-90 transition shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
      <br />
        <Footer/>
    </div>
  );
}

export default Contact;