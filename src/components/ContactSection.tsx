import React, { useEffect, useRef } from 'react';
import { Mail, Phone, Github, Globe, Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { observeElements } from '../utils/animations';
import { useContactForm } from '../hooks/useContactForm';
import SectionHeader from './ui/SectionHeader';
import ContactCard from './ui/ContactCard';
import LoadingSpinner from './ui/LoadingSpinner';
import { GRADIENT_CLASSES } from '../constants';
import type { Translations, PersonalData, ContactInfo } from '../types';

interface ContactSectionProps {
  translations: Translations;
  personalData: PersonalData;
  language: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ 
  translations, 
  personalData, 
  language 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
  } = useContactForm();

  useEffect(() => {
    return observeElements(sectionRef.current);
  }, []);

  const contactInfo: ContactInfo[] = [
    { 
      icon: Mail, 
      label: 'Email', 
      value: personalData.email, 
      href: `mailto:${personalData.email}`,
      gradient: GRADIENT_CLASSES.ERROR
    },
    { 
      icon: Phone, 
      label: language === 'en' ? 'Phone' : 'Điện Thoại', 
      value: personalData.phone, 
      href: `tel:${personalData.phone}`,
      gradient: GRADIENT_CLASSES.SUCCESS
    },
    { 
      icon: Github, 
      label: 'GitHub', 
      value: personalData.github.replace('https://', ''), 
      href: personalData.github,
      gradient: GRADIENT_CLASSES.NEUTRAL
    },
    { 
      icon: Globe, 
      label: language === 'en' ? 'Portfolio' : 'Hồ Sơ', 
      value: personalData.portfolio.replace('https://', ''), 
      href: personalData.portfolio,
      gradient: GRADIENT_CLASSES.CYAN
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-800 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-green-400/10 to-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeader
          title={translations.contact.title}
          subtitle={translations.contact.subtitle}
          leftIcon={MessageCircle}
          rightIcon={MessageCircle}
          leftIconColor="text-green-500"
          rightIconColor="text-blue-500"
        />

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 fade-in-section stagger-1">
            <h3 className="text-3xl font-bold mb-8">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {translations.contact.info}
              </span>
            </h3>
            
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <ContactCard
                  key={index}
                  contact={contact}
                  index={index}
                />
              ))}
            </div>
          </div>

          <div className="fade-in-section stagger-2">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full -translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
              
              <h3 className="text-3xl font-bold mb-8 relative z-10">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {translations.contact.form.title}
                </span>
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {isSubmitted && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-fadeInUp">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-green-600 dark:text-green-400" size={24} />
                      <div>
                        <p className="font-semibold text-green-800 dark:text-green-200">
                          {language === 'en' ? 'Message sent successfully!' : 'Tin nhắn đã được gửi thành công!'}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-300">
                          {language === 'en' ? 'Thank you for reaching out. I\'ll get back to you soon!' : 'Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể!'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Form fields */}
                {[
                  { name: 'name', type: 'text', label: translations.contact.form.name, placeholder: translations.contact.form.placeholders.name },
                  { name: 'email', type: 'email', label: translations.contact.form.email, placeholder: translations.contact.form.placeholders.email }
                ].map(({ name, type, label, placeholder }, index) => (
                  <div key={name} className="animate-fadeInUp" style={{ animationDelay: `${(index + 1) * 0.1}s` }}>
                    <label htmlFor={name} className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                      {label}
                    </label>
                    <input
                      type={type}
                      id={name}
                      name={name}
                      value={formData[name as keyof typeof formData]}
                      onChange={(e) => handleInputChange(name as keyof typeof formData, e.target.value)}
                      className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 ${
                        errors[name as keyof typeof errors] ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-600'
                      }`}
                      placeholder={placeholder}
                      disabled={isSubmitting}
                    />
                    {errors[name as keyof typeof errors] && (
                      <div className="flex items-center space-x-2 mt-2 text-red-600 dark:text-red-400">
                        <AlertCircle size={16} />
                        <span className="text-sm">{errors[name as keyof typeof errors]}</span>
                      </div>
                    )}
                  </div>
                ))}

                <div className="animate-fadeInUp stagger-3">
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    {translations.contact.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className={`w-full px-6 py-4 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 ${
                      errors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder={translations.contact.form.placeholders.message}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <div className="flex items-center space-x-2 mt-2 text-red-600 dark:text-red-400">
                      <AlertCircle size={16} />
                      <span className="text-sm">{errors.message}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-8 rounded-xl font-bold btn-enhanced shadow-xl group animate-fadeInUp stagger-4 relative overflow-hidden transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-3 relative z-10">
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" />
                        <span className="text-lg">
                          {language === 'en' ? 'Sending...' : 'Đang gửi...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Send size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                        <span className="text-lg">{translations.contact.form.send}</span>
                      </>
                    )}
                  </div>
                  {!isSubmitting && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;