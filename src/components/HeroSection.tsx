import React from 'react';
import { Mail, Download, Github, Phone, Globe, ChevronDown, User, Sparkles } from 'lucide-react';
import TypewriterText from './ui/TypewriterText';
import ParticleBackground from './ui/ParticleBackground';
import ParallaxContainer from './ui/ParallaxContainer';
import AnimatedAvatar from './ui/AnimatedAvatar';
import AuroraBackground from './ui/AuroraBackground';
import PowerAwareContainer from './ui/PowerAwareContainer';

interface HeroSectionProps {
  translations: any;
  personalData: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ translations, personalData }) => {
  const typewriterTexts = [
    'Software Engineer',
    'Backend Developer'
    
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-24 md:pt-20 relative overflow-hidden">
      <PowerAwareContainer
        fallback={<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20" />}
      >
        <ParticleBackground particleCount={30} />
        <AuroraBackground intensity="light" />
      </PowerAwareContainer>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 md:mb-12 animate-fadeInUp">
          <ParallaxContainer intensity={0.15} className="relative mb-6 md:mb-8">
            <AnimatedAvatar size="lg" className="mx-auto mb-6 md:mb-8 md:!w-40 md:!h-40" />
            <div className="absolute -top-2 -right-2 animate-float">
              <Sparkles className="text-yellow-500" size={24} />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-float" style={{ animationDelay: '1s' }}>
              <Sparkles className="text-pink-500" size={20} />
            </div>
          </ParallaxContainer>

          <ParallaxContainer intensity={0.08}>
            <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 animate-slideInLeft">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {translations.name}
              </span>
            </h1>
          </ParallaxContainer>

          <ParallaxContainer intensity={0.05} className="relative mb-6 md:mb-8 animate-slideInRight">
            <div className="text-lg md:text-3xl font-semibold mb-3 md:mb-4 h-10 md:h-12 flex items-center justify-center">
              <span className="bg-gradient-to-r from-gray-700 via-blue-600 to-purple-600 dark:from-gray-300 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                <TypewriterText texts={typewriterTexts} speed={150} deleteSpeed={100} pauseDuration={2000} />
              </span>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          </ParallaxContainer>

          <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed animate-fadeInUp stagger-3 px-4">
            {translations.subtitle}
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-8 md:mb-12 animate-fadeInUp stagger-4 px-4">
          {/* Get in touch */}
          <a
            href={`mailto:${personalData.email}`}
            className="group relative overflow-hidden flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-2xl font-semibold shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white btn-enhanced"
          >
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center gap-3">
              <Mail size={20} className="md:!w-6 md:!h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-base md:text-lg">{translations.buttons.getInTouch}</span>
            </div>
          </a>

          {/* Download CV */}
          <a
            href="https://drive.google.com/uc?export=download&id=14axVlvs48NAZqfOhWJbw095WqhmiPQZo"
            className="group flex items-center justify-center space-x-3 px-6 md:px-8 py-3 md:py-4 border-2 border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl btn-enhanced relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <Download size={20} className="md:!w-6 md:!h-6 group-hover:animate-bounce relative z-10" />
            <span className="text-base md:text-lg relative z-10">{translations.buttons.downloadCV}</span>
          </a>
        </div>

        {/* Social icons */}
        <ParallaxContainer intensity={0.03} className="flex justify-center space-x-4 md:space-x-6 animate-fadeInUp stagger-5 px-4">
          {[
            { href: personalData.github, icon: Github, color: 'from-gray-600 to-gray-800' },
            { href: `mailto:${personalData.email}`, icon: Mail, color: 'from-red-500 to-pink-600' },
            { href: `tel:${personalData.phone}`, icon: Phone, color: 'from-green-500 to-emerald-600' },
            { href: personalData.portfolio, icon: Globe, color: 'from-blue-500 to-cyan-600' }
          ].map(({ href, icon: Icon, color }, index) => (
            <a
              key={index}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group p-3 md:p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl btn-enhanced relative overflow-hidden animate-scaleIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
              <Icon
                size={24}
                className="text-gray-600 dark:text-gray-300 group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10"
              />
            </a>
          ))}
        </ParallaxContainer>

        <div className="mt-12 md:mt-16 animate-fadeInUp stagger-5">
          <ChevronDown
            size={32}
            className="mx-auto text-gray-400 hover:text-blue-600 cursor-pointer animate-bounce hover:animate-pulse transition-colors duration-300"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
