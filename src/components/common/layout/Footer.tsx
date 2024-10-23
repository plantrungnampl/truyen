"use client";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Manga Collection. All rights
          reserved.
        </p>
        <p>
          Follow us on{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Twitter
          </a>
          ,{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Instagram
          </a>
          , and{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Facebook
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
