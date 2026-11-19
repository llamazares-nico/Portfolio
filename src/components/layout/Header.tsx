import React, {useState, useEffect} from 'react'
import {Github, Linkedin, Mail} from 'lucide-react'
import LanguageSwitcher from '../common/LanguageSwitcher'
import {useLanguage} from '../../hooks/LanguageContext'
import {useWindowSize} from 'react-use'
import {motion, AnimatePresence} from 'framer-motion'

function Header(): React.ReactElement {
  const {t, language, setLanguage} = useLanguage()
  const {width} = useWindowSize()
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'projects', 'contact']
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 150 && rect.bottom >= 150
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLElement>,
    targetId: string
  ) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth',
      })
    }
  }

  const handleScrollToId = (id: string) => {
    // Cerramos el menú primero
    setOpen(false)

    // Esperamos a que el DOM se repinte (dos frames)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 25
          window.scrollTo({top: y, behavior: 'smooth'})
        }
      })
    })
  }

  const [open, setOpen] = useState(false)

  if (width > 1024) {
    return (
      <header
        className={`fixed select-none border-[#000]/50 w-full z-10 bg-[#121212]/95 backdrop-blur-sm transition-all duration-700 ease-in-out left-0 ${
          isScrolled ? 'top-0 shadow-lg' : 'top-10'
        }`}
      >
        <div
          style={{
            width: isScrolled ? '100%' : '80%',
            maxWidth: isScrolled ? '100vw' : '1200px',
            transition: 'all 300ms ease-in-out',
          }}
          className='mx-auto'
        >
          <nav
            className={`transition-all duration-500 ease-in-out h-22 flex flex-row items-center justify-between overflow-hidden ring-3 ring-[#000]/25 uppercase min-w-[320px] ${'rounded-none'}`}
          >
            <div className='flex flex-row items-center justify-center overflow-hidden h-22 min-w-[200px] flex-shrink-0'>
              <a
                href='#home'
                aria-label='Nicolas Llamazares'
                onClick={(e) => handleSmoothScroll(e, 'home')}
                className='flex flex-row items-center h-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset'
              >
                <div
                  aria-hidden='true'
                  className='anton-regular p-4 pb-5 w-12 h-full flex flex-row items-center bg-white/85 text-neutral-900 text-xl'
                >
                  ;
                </div>
                <div
                  aria-hidden='true'
                  className='anton-regular relative h-min -left-[16px] bg-neutral-900 text-white rounded leading-none text-center m-0 p-2 font-bold text-3xl z-5'
                >
                  NL
                </div>
                <div
                  aria-hidden='true'
                  className='relative flex border-y border-y-white border-l-[#111] border-l-0 items-center -left-[44px] p-4 ps-9 pe-10 text-start uppercase h-full bg-white text-neutral-900 font-bold leading-4 text-[10px] tracking-[4px]'
                >
                  Nicolas
                  <br />
                  Llamazares
                </div>
              </a>
              {width > 1024 && (
                <ul className='m-0 p-0 list-none flex flex-row h-full font-bold text-[14px] relative -left-[15px] flex-shrink-0 overflow-visible'>
                  <li
                    className={`h-full flex items-center hover:bg-neutral-900 transition-all cursor-pointer ${
                      activeSection === 'about'
                        ? 'border-b-2 border-accent'
                        : ''
                    }`}
                  >
                    <a
                      href='#about'
                      aria-current={
                        activeSection === 'about' ? 'true' : undefined
                      }
                      className={`flex items-center px-8 h-full whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
                        activeSection === 'about' ? 'text-accent' : ''
                      }`}
                      onClick={(e) => handleSmoothScroll(e, 'about')}
                    >
                      {t('nav.about')}
                    </a>
                  </li>
                  <li
                    className={`h-full flex items-center hover:bg-neutral-900 transition-all cursor-pointer ${
                      activeSection === 'projects'
                        ? 'border-b-2 border-accent'
                        : ''
                    }`}
                  >
                    <a
                      href='#projects'
                      aria-current={
                        activeSection === 'projects' ? 'true' : undefined
                      }
                      className={`flex items-center px-8 h-full whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
                        activeSection === 'projects' ? 'text-accent' : ''
                      }`}
                      onClick={(e) => handleSmoothScroll(e, 'projects')}
                    >
                      {t('nav.projects')}
                    </a>
                  </li>
                  <li
                    className={`h-full flex items-center hover:bg-neutral-900 transition-all cursor-pointer ${
                      activeSection === 'contact'
                        ? 'border-b-2 border-accent'
                        : ''
                    }`}
                  >
                    <a
                      href='#contact'
                      aria-current={
                        activeSection === 'contact' ? 'true' : undefined
                      }
                      className={`flex items-center px-8 h-full whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset ${
                        activeSection === 'contact' ? 'text-accent' : ''
                      }`}
                      onClick={(e) => handleSmoothScroll(e, 'contact')}
                    >
                      {t('nav.contact')}
                    </a>
                  </li>
                </ul>
              )}
            </div>

            <div className='flex flex-row gap-3 items-center h-full px-4 pe-8 flex-shrink-0'>
              <>
                <a
                  href='https://github.com/Webyven/'
                  target='_blank'
                  className='cut [--cut:7px] p-2.5 bg-[#000]/30 text-gray-400 hover:text-white hover:bg-accent/15 focus-visible:text-white focus-visible:bg-accent/15 outline-none transition-colors duration-300'
                  rel='noopener noreferrer'
                  aria-label='GitHub'
                >
                  <Github size={16} fill='inherit' />
                </a>
                <a
                  href='https://www.linkedin.com/in/llamazares-nicolas/'
                  target='_blank'
                  className='cut [--cut:7px] p-2.5 bg-[#000]/30 text-gray-400 hover:text-white hover:bg-accent/15 focus-visible:text-white focus-visible:bg-accent/15 outline-none transition-colors duration-300'
                  rel='noopener noreferrer'
                  aria-label='LinkedIn'
                >
                  <Linkedin size={16} fill='inherit' />
                </a>
                <a
                  href='mailto:llamazares.nico@gmail.com'
                  target='_blank'
                  className='cut [--cut:7px] p-2.5 bg-[#000]/30 text-gray-400 hover:text-white hover:bg-accent/15 focus-visible:text-white focus-visible:bg-accent/15 outline-none transition-colors duration-300'
                  rel='noopener noreferrer'
                  aria-label='Email'
                >
                  <Mail size={16} fill='inherit' />
                </a>
              </>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </header>
    )
  } else {
    return (
      <>
        <motion.header
          className={
            'fixed select-none w-full z-10 backdrop-blur-sm transition-all duration-700 ease-in-out left-0 top-0'
          }
          animate={{
            background: open ? '#101010' : '#101010fa',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '100vw',
              transition: 'all 300ms ease-in-out',
            }}
            className='mx-auto'
          >
            <motion.nav
              className={
                'transition-all duration-500 ease-in-out h-22 flex flex-row items-center justify-between uppercase min-w-[320px] rounded-none'
              }
              style={{borderBottom: '1px solid #fff'}}
            >
              <div className='flex flex-row items-center justify-center overflow-visible h-22 min-w-[200px] flex-shrink-0'>
                <div className='absolute w-0 border-l-1 h-full bg-transparent left-12'></div>
                <a
                  href='#home'
                  aria-label='Nicolas Llamazares'
                  onClick={(e) => handleSmoothScroll(e, 'home')}
                  className='flex flex-row items-center h-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset'
                >
                  <div
                    aria-hidden='true'
                    className='anton-regular p-4 pb-5 w-12 h-full flex flex-row items-center text-white text-xl'
                  >
                    ;
                  </div>
                  <div
                    aria-hidden='true'
                    className='anton-regular relative h-min -left-[16px] bg-[#111] border-1 border-white text-white rounded leading-none text-center m-0 p-2 font-bold text-3xl z-5'
                  >
                    NL
                  </div>
                  <div
                    aria-hidden='true'
                    className='relative flex border-l-[#111] border-l-0 items-center sm:-left-[40px] -left-[35px] p-4 ps-9 pe-7 text-start uppercase h-full text-[#fff] font-bold leading-4 text-[10px] tracking-[4px]'
                  >
                    Nicolas
                    <br />
                    Llamazares
                  </div>
                </a>
              </div>
              <div className='pr-4 overflow-visible'>
                <button
                  type='button'
                  onClick={() => setOpen(!open)}
                  aria-label={t('nav.menu')}
                  aria-expanded={open}
                  aria-controls='mobile-menu'
                  className='w-10 h-10 flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-accent'
                >
                  <motion.svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                  >
                    <motion.line
                      x1='3'
                      y1='6'
                      x2='21'
                      y2='6'
                      animate={{
                        x1: open ? 4 : 3,
                        y1: open ? 4 : 6,
                        x2: open ? 20 : 21,
                        y2: open ? 20 : 6,
                      }}
                      transition={{duration: 0.3}}
                    />
                    <motion.line
                      x1='3'
                      y1='12'
                      x2='21'
                      y2='12'
                      animate={{opacity: open ? 0 : 1}}
                      transition={{duration: 0.2}}
                    />
                    <motion.line
                      x1='3'
                      y1='18'
                      x2='21'
                      y2='18'
                      animate={{
                        x1: open ? 4 : 3,
                        y1: open ? 20 : 18,
                        x2: open ? 20 : 21,
                        y2: open ? 4 : 18,
                      }}
                      transition={{duration: 0.3}}
                    />
                  </motion.svg>
                </button>
              </div>
            </motion.nav>
          </div>
        </motion.header>
        {/* Menú fullscreen bajo el navbar */}
        <AnimatePresence>
          {open && (
            <motion.div
              key='fullscreen-menu'
              id='mobile-menu'
              initial={{height: 0}}
              animate={{height: '100%'}}
              exit={{height: 0}}
              transition={{duration: 0.4}}
              className='fixed top-0 left-0 w-full h-full bg-[#101010]/90 backdrop-blur-2xl text-white z-5 gap-8 origin-top overflow-hidden'
            >
              <div className='absolute w-0 border-l-1 h-full bg-transparent left-12'></div>
              <div className='w-full h-full text-2xl flex flex-col ps-22 pb-12 pe-12 pt-32 font-bold items-start justify-between uppercase'>
                <div></div>
                <nav
                  aria-label={t('nav.menu')}
                  className='flex flex-col gap-8 items-start'
                >
                  <a
                    href='#home'
                    className='outline-none focus-visible:text-accent hover:text-accent transition-colors'
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollToId('home')
                    }}
                  >
                    {t('nav.home')}
                  </a>
                  <a
                    href='#about'
                    className='outline-none focus-visible:text-accent hover:text-accent transition-colors'
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollToId('about')
                    }}
                  >
                    {t('nav.about')}
                  </a>
                  <a
                    href='#projects'
                    className='outline-none focus-visible:text-accent hover:text-accent transition-colors'
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollToId('projects')
                    }}
                  >
                    {t('nav.projects')}
                  </a>
                  <a
                    href='#contact'
                    className='outline-none focus-visible:text-accent hover:text-accent transition-colors'
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollToId('contact')
                    }}
                  >
                    {t('nav.contact')}
                  </a>
                </nav>
                <button
                  type='button'
                  className='cursor-pointer w-full text-end text-[20px] text-[#aaa] uppercase font-bold outline-none focus-visible:text-accent hover:text-white transition-colors'
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                >
                  {t('nav.languageChange')}&nbsp;&gt;
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }
}

export default Header
