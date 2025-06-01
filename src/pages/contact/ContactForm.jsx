import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    privacyPolicy: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic will be implemented later
    console.log(formData);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-5xl lg:text-6xl font-cormorant font-bold mb-12 text-[0c0c0c]">
        {t('contact.title', 'Get in Touch')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label htmlFor="firstName" className="block text-base font-medium text-[0c0c0c] mb-2">
              {t('contact.firstName', 'First Name')}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-base font-medium text-[0c0c0c] mb-2">
              {t('contact.lastName', 'Last Name')}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-base font-medium text-[0c0c0c] mb-2">
            {t('contact.email', 'Email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-6 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-base font-medium text-[0c0c0c] mb-2">
            {t('contact.phone', 'Phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-6 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-2">
            {t('contact.message', 'Message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-6 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          ></textarea>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="privacyPolicy"
            name="privacyPolicy"
            checked={formData.privacyPolicy}
            onChange={handleChange}
            required
            className="mt-1.5 h-5 w-5 text-black focus:ring-black border-gray-300 rounded"
          />
          <label htmlFor="privacyPolicy" className="ml-3 block text-base text-gray-700">
            {t('contact.privacyPolicy', 'I agree to the privacy policy and terms of service')}
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0c0c0c] text-white py-4 px-8 rounded-md hover:bg-black/80 transition-colors duration-200 text-lg font-medium"
        >
          {t('contact.submit', 'Submit')}
        </button>
      </form>
    </div>
  );
}