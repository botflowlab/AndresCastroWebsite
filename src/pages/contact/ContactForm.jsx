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
    console.log(formData);
  };

  return (
    <div>
      <h2 className="text-4xl font-light mb-8">{t('contact.form.title')}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.fields.firstName.label')}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none"
              placeholder={t('contact.form.fields.firstName.placeholder')}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.fields.lastName.label')}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none"
              placeholder={t('contact.form.fields.lastName.placeholder')}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t('contact.form.fields.email.label')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none"
            placeholder={t('contact.form.fields.email.placeholder')}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            {t('contact.form.fields.phone.label')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none"
            placeholder={t('contact.form.fields.phone.placeholder')}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {t('contact.form.fields.message.label')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none rounded-lg resize-none"
            placeholder={t('contact.form.fields.message.placeholder')}
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
            className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
          />
          <label htmlFor="privacyPolicy" className="ml-3 text-sm text-gray-600">
            {t('contact.form.fields.privacy')}
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0c0c0c] text-white py-4 px-8 rounded-lg hover:bg-black/80 transition-colors duration-300 text-lg font-medium"
        >
          {t('contact.form.submit')}
        </button>
      </form>
    </div>
  );
}