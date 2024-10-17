import React, { useState } from "react";

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ideally, here you would send the email to a newsletter API
    setSubmitted(true);
  };

  return (
    <div className="bg-white p-6 shadow-md mt-12 rounded-md text-center">
      <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      {submitted ? (
        <p className="text-green-600">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full max-w-xs mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default NewsletterSubscription;
