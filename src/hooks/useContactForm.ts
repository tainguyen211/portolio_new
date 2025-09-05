import { useState, useCallback } from 'react';
import { validateForm, sanitizeInput } from '../utils/validation';
import type { FormData, FormErrors } from '../types';

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mailto link as fallback
      const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      window.open(`mailto:tainguyencongkhanh@gmail.com?subject=${subject}&body=${body}`);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
    resetForm
  };
};