import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

// EmailJS Configuration - Replace these with your actual values
const EMAILJS_SERVICE_ID = 'your_service_id_here';
const EMAILJS_TEMPLATE_ID = 'your_template_id_here';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    privacyPolicy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  // Check if EmailJS is configured
  const isConfigured = EMAILJS_SERVICE_ID !== 'your_service_id_here' && 
                      EMAILJS_TEMPLATE_ID !== 'your_template_id_here' && 
                      EMAILJS_PUBLIC_KEY !== 'your_public_key_here';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConfigured) {
      alert('EmailJS is not configured yet. Please check the setup instructions.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: 'caricaco007@hotmail.com'
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        privacyPolicy: false
      });

    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-4xl font-light mb-8">{t('contact.form.title')}</h2>
      
      {/* Configuration Warning */}
      {!isConfigured && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">EmailJS Configuration Required</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Please configure EmailJS to enable the contact form. Check the console for setup instructions.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                {i18n.language === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  {i18n.language === 'es' 
                    ? 'Gracias por contactarnos. Responderemos pronto.' 
                    : 'Thank you for contacting us. We will respond soon.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {i18n.language === 'es' ? 'Error al enviar' : 'Sending failed'}
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  {i18n.language === 'es' 
                    ? 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.' 
                    : 'There was a problem sending the message. Please try again.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
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
              disabled={isSubmitting}
              className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={isSubmitting}
              className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            rows="5"
            className="w-full px-4 py-3 border-2 border-gray-200 focus:border-black transition-colors duration-300 outline-none rounded-lg resize-none disabled:opacity-50 disabled:cursor-not-allowed"
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
            disabled={isSubmitting}
            className="mt-1 h-4 w-4 text-black focus:ring-black border-gray-300 rounded disabled:opacity-50"
          />
          <label htmlFor="privacyPolicy" className="ml-3 text-sm text-gray-600">
            {t('contact.form.fields.privacy')}
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isConfigured}
          className="w-full bg-[#0c0c0c] text-white py-4 px-8 rounded-lg hover:bg-black/80 transition-colors duration-300 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {i18n.language === 'es' ? 'Enviando...' : 'Sending...'}
            </>
          ) : (
            t('contact.form.submit')
          )}
        </button>
      </form>
    </div>
  );
}