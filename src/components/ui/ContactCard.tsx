import React from 'react';
import type { ContactInfo } from '../../types';

interface ContactCardProps {
  contact: ContactInfo;
  index: number;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, index }) => {
  const { icon: Icon, label, value, href, gradient } = contact;

  return (
    <div 
      className="group p-6 bg-white dark:bg-gray-700 rounded-2xl shadow-lg card-hover animate-fadeInUp relative overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient}/10 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700`}></div>
      <div className="flex items-center space-x-4 relative z-10">
        <div className={`p-4 rounded-2xl bg-gradient-to-r ${gradient} text-white group-hover:rotate-12 transition-transform duration-300`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            {label}
          </p>
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 break-all"
          >
            {value}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;