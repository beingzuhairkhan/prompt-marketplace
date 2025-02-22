'use client'
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import { Divider } from "@nextui-org/react";

const Page = () => {
  const user = undefined; 
  const isSellerExists = false; 
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm('service_vmfu879', 'template_d5enc98', form.current as HTMLFormElement, 'mQQaS7Y8zQH67Di1P')
      .then(() => {
        form.current?.reset(); // Reset form only if it's not null
      })
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white ">
      <Header activeItem={3} user={user} isSellerExists={isSellerExists} />
      
      <div id="contact" className="flex flex-col items-center justify-center py-10 px-6">
        <div className="max-w-2xl w-full text-center">
          <h5 className="text-lg text-indigo-400 font-semibold">Get in Touch</h5>
          <h2 className="text-3xl font-bold mt-2 mb-6">Contact Me</h2>
          
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              
              {/* Name Input */}
              <div>
               
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder="Your Name" 
                  required 
                  className="w-full mt-1 p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email Input */}
              <div>
             
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Your Email" 
                  required
                  className="w-full mt-1 p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Message Input */}
              <div>
               
                <textarea 
                  name="message" 
                  id="message" 
                  placeholder="Your Message" 
                  required
                  className="w-full mt-1 p-3 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full bg-[#00BFFF]  text-white py-3 rounded-md font-medium transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <Divider className="bg-gray-700 mt-5" />
      <Footer />
    </div>
  );
};

export default Page;
