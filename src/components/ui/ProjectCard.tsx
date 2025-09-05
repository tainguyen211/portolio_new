@tailwind base;
@tailwind components;
@tailwind utilities;

/* Theme Variables */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --accent-primary: #3b82f6;
  --accent-secondary: #8b5cf6;
}

.dark {
  --bg-primary: #111827;
  --bg-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #9ca3af;
  --accent-primary: #3b82f6;
  --accent-secondary: #8b5cf6;
}

/* Enhanced global styles */
html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  overflow-x: hidden;
  font-family: 'Inter', sans-serif;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Remove duplicate animations and optimize existing ones */
/* Performance-optimized animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translate3d(-50px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translate3d(50px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale3d(0.9, 0.9, 1);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -10px, 0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* 3D Card animations */
@keyframes aurora-1 {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  33% {
    transform: translate3d(30px, -30px, 0) rotate(1deg);
  }
  66% {
    transform: translate3d(-20px, 20px, 0) rotate(-1deg);
  }
}

@keyframes aurora-2 {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(-30px, -20px, 0) rotate(2deg);
  }
}

@keyframes aurora-3 {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  25% {
    transform: translate3d(20px, -40px, 0) rotate(-1deg);
  }
  75% {
    transform: translate3d(-40px, 20px, 0) rotate(1deg);
  }
}

@keyframes idle-wobble {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0.5deg);
  }
  75% {
    transform: rotate(-0.5deg);
  }
}

/* Enhanced card effects with GPU acceleration */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  will-change: transform, box-shadow;
}

.card-hover:hover {
  transform: translate3d(0, -8px, 0) scale3d(1.02, 1.02, 1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.dark .card-hover:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* 3D Card utilities */
.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.preserve-3d {
  transform-style: preserve-3d;
}

/* Optimized button effects */
/* Enhanced button effects */
.btn-enhanced {
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translate3d(0, 0, 0);
  will-change: transform, box-shadow;
}

.btn-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-enhanced:hover::before {
  left: 100%;
}

.btn-enhanced:hover {
  transform: translate3d(0, -2px, 0);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn-enhanced:active {
  transform: translate3d(0, 0, 0);
}

/* Optimized navigation */
/* Navigation enhancements */
.nav-enhanced {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dark .nav-enhanced {
  background: rgba(17, 24, 39, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Optimized mobile menu */
/* Mobile menu */
.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 40;
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* Optimized skill tags */
/* Skill tag animations */
.skill-tag {
  transition: all 0.3s ease;
  cursor: default;
  will-change: transform, box-shadow;
}

.skill-tag:hover {
  transform: translate3d(0, -2px, 0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Simplified timeline */
/* Timeline enhancements */
.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  transform: translateX(-50%);
}

/* Optimized animations with better performance */
/* Animation classes with GPU acceleration */
.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
  will-change: opacity, transform;
}

.animate-slideInLeft {
  animation: slideInLeft 0.6s ease-out forwards;
  will-change: opacity, transform;
}

.animate-slideInRight {
  animation: slideInRight 0.6s ease-out forwards;
  will-change: opacity, transform;
}

.animate-scaleIn {
  animation: scaleIn 0.5s ease-out forwards;
  will-change: opacity, transform;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
  will-change: transform;
}

.animate-pulse-slow {
  animation: pulse 2s ease-in-out infinite;
  will-change: opacity;
}

.animate-idle-wobble {
  animation: idle-wobble 4s ease-in-out infinite;
  will-change: transform;
}

.animate-aurora-1 {
  animation: aurora-1 20s ease-in-out infinite;
  will-change: transform;
}

.animate-aurora-2 {
  animation: aurora-2 25s ease-in-out infinite;
  will-change: transform;
}

.animate-aurora-3 {
  animation: aurora-3 30s ease-in-out infinite;
  will-change: transform;
}

/* Stagger animations */
.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }

/* Optimized intersection observer animations */
/* Intersection observer animations */
.fade-in-section {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}

.fade-in-section.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* Optimized form styling */
/* Enhanced form styling */
input, textarea {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

input:focus, textarea:focus {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

input:hover, textarea:hover {
  border-color: #60a5fa;
}

/* Optimized scrollbar */
/* Custom scrollbar with gradient */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  opacity: 0.8;
}

/* Enhanced selection */
::selection {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3));
  color: var(--text-primary);
}

/* Mobile optimizations */
/* Responsive optimizations */
@media (max-width: 768px) {
  /* Optimize animations for mobile performance */
  * {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  
  /* Reduce animation complexity on mobile */
  .card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .card-hover:hover {
    transform: translate3d(0, -2px, 0);
  }
  
  .btn-enhanced {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .btn-enhanced:hover {
    transform: translate3d(0, -1px, 0);
  }
  
  /* Reduce animations on mobile for better performance */
  .animate-float {
    animation-duration: 4s;
  }
  
  /* Optimize backdrop blur for mobile */
  .backdrop-blur-xl {
    backdrop-filter: blur(8px);
  }
  
  /* Improve mobile menu performance */
  .mobile-menu-overlay {
    backdrop-filter: blur(3px);
  }

  /* Improve touch targets */
  button, a {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* Prevent zoom on input focus */
  input, textarea, select {
    font-size: 16px;
  }
  
  /* Optimize mobile navigation */
  .nav-enhanced {
    backdrop-filter: blur(10px);
  }
  
  /* Reduce particle count on mobile */
  .particle-background {
    display: none;
  }
  
  /* Disable 3D effects on mobile for performance */
  .preserve-3d {
    transform-style: flat;
  }
  
  .backface-hidden {
    backface-visibility: visible;
  }
  
  /* Simplify aurora on mobile */
  .animate-aurora-1,
  .animate-aurora-2,
  .animate-aurora-3 {
    animation: none;
  }

  /* Disable parallax on mobile */
  .parallax-container {
    transform: none !important;
  }

  /* Simplify card effects on mobile */
  .card-3d {
    transform: none !important;
    perspective: none !important;
  }

  /* Better spacing for mobile */
  .hero-section {
    padding-top: 6rem;
  }

  /* Optimize text sizes for mobile */
  .hero-title {
    font-size: 2.5rem;
    line-height: 1.1;
  }

  .hero-subtitle {
    font-size: 1.125rem;
    line-height: 1.4;
  }
}

/* Mobile device specific optimizations */
.mobile-device .animate-float,
.mobile-device .animate-pulse-slow {
  animation-duration: 2s;
}

.mobile-device .card-hover::before,
.mobile-device .btn-enhanced::before {
  display: none;
}

/* Low power mode optimizations */
.low-power-mode .animate-float,
.low-power-mode .animate-pulse-slow,
.low-power-mode .animate-idle-wobble,
.low-power-mode .animate-aurora-1,
.low-power-mode .animate-aurora-2,
.low-power-mode .animate-aurora-3 {
  animation: none !important;
}

.low-power-mode .particle-background,
.low-power-mode .aurora-background {
  display: none !important;
}

/* Reduced motion optimizations */
.reduce-motion * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

/* Accessibility improvements */
/* Enhanced focus indicators */
button:focus-visible,
a:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
  border-radius: 8px;
}

/* Form validation improvements */
/* Form validation styles */
.form-error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.form-success {
  border-color: #10b981 !important;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
}

/* Accessibility: Reduced motion support */
/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .animate-float,
  .animate-pulse-slow {
    animation: none !important;
  }
  
  .animate-idle-wobble,
  .animate-aurora-1,
  .animate-aurora-2,
  .animate-aurora-3 {
    animation: none !important;
  }
}

/* Accessibility: High contrast support */
/* High contrast mode */
@media (prefers-contrast: high) {
  .bg-gradient-to-r {
    background: var(--bg-primary) !important;
    color: var(--text-primary) !important;
  }
}

/* Print optimizations */
/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
  
  * {
    background: white !important;
    color: black !important;
    box-shadow: none !important;
  }
}

/* Global performance optimizations */
*,
*::before,
*::after {
  box-sizing: border-box;
}

img {
  max-width: 100%;
  height: auto;
}

/* Optimize transitions for better performance */
.transition-colors {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

/* Line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}