import React from 'react'
import AvatarImage from '../../assets/images/AvatarLaptopBackground.webp'
import {ArrowDown, Download} from 'lucide-react'
import {downloadCV} from '../../utils/downloadCV'
import {motion} from 'framer-motion'
import {useLanguage} from '../../hooks/LanguageContext'

// Ease-out exponencial: arranca rápido y frena suave
const EASE = [0.16, 1, 0.3, 1] as const

// Corte diagonal del sitio; --c define el tamaño del corte
const CUT =
  'polygon(0 0, calc(100% - var(--c)) 0, 100% var(--c), 100% 100%, var(--c) 100%, 0 calc(100% - var(--c)))'

const rise = (delay: number) => ({
  initial: {opacity: 0, y: 16},
  animate: {opacity: 1, y: 0},
  transition: {duration: 0.8, ease: EASE, delay},
})

const HeroSection: React.FC = () => {
  const {t, language} = useLanguage()

  const scrollToProjects = () =>
    document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})

  return (
    <section
      id='home'
      className='min-h-[100svh] flex items-start md:items-center justify-center text-start px-6 md:px-12 pt-36 md:pt-32 pb-16'
    >
      <div className='w-full max-w-[1040px] grid grid-cols-1 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-7 md:gap-16 items-center'>
        {/* Avatar: arriba en celular, a la derecha en escritorio */}
        <motion.div
          className='order-first md:order-last w-32 md:w-full md:max-w-[380px] md:justify-self-end aspect-square bg-[#2a2a2a] p-[2px] [--c:14px] md:[--c:26px]'
          style={{clipPath: CUT}}
          initial={{opacity: 0, scale: 0.96}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.9, ease: EASE, delay: 0.1}}
        >
          <img
            src={AvatarImage}
            alt=''
            className='block w-full h-full object-cover'
            style={{clipPath: CUT}}
          />
        </motion.div>

        <div className='flex flex-col gap-5 md:gap-6'>
          <motion.h1
            className='oswald-regular uppercase m-0 text-[#e6e6e6]'
            style={{
              fontSize: 'clamp(3.25rem, 2.2rem + 3.4vw, 5.25rem)',
              lineHeight: 0.95,
              fontWeight: 500,
            }}
            {...rise(0)}
          >
            Nicolas
            <br />
            Llamazares
          </motion.h1>

          <motion.div
            aria-hidden='true'
            className='h-1 w-18 bg-[#0fa] origin-left'
            style={{
              clipPath: 'polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%)',
            }}
            initial={{scaleX: 0}}
            animate={{scaleX: 1}}
            transition={{duration: 0.8, ease: EASE, delay: 0.25}}
          />

          <motion.p
            className='m-0 max-w-[40ch] text-[17px] md:text-[19px] leading-[1.5] text-[#c8c8c8] text-pretty'
            {...rise(0.15)}
          >
            {t('home.tagline')}
          </motion.p>

          <motion.div className='flex flex-row flex-wrap gap-3' {...rise(0.25)}>
            <button
              type='button'
              onClick={scrollToProjects}
              className='group h-11 inline-flex items-center gap-2.5 ps-6 pe-[18px] bg-white text-black shadow-[inset_6px_0_0_#0d9] hover:shadow-[inset_6px_0_0_#0fa] focus-visible:shadow-[inset_6px_0_0_#0fa] outline-none transition-shadow uppercase text-[13px] tracking-[1.5px] oswald-regular cursor-pointer [--c:9px]'
              style={{clipPath: CUT}}
            >
              <ArrowDown
                size={15}
                className='transition-transform duration-300 ease-out group-hover:translate-y-0.5'
              />
              {t('home.viewProjects')}
            </button>
            <button
              type='button'
              onClick={() => downloadCV(language)}
              className='group h-11 p-px bg-[#2a2a2a] hover:bg-[#0fa] focus-visible:bg-[#0fa] outline-none transition-colors cursor-pointer [--c:9px]'
              style={{clipPath: CUT}}
            >
              <span
                className='h-full inline-flex items-center gap-2.5 px-[18px] bg-[#111] text-[#c8c8c8] group-hover:text-white transition-colors uppercase text-[13px] tracking-[1.5px] oswald-regular'
                style={{clipPath: CUT}}
              >
                <Download size={15} />
                {t('home.resume')}
              </span>
            </button>
          </motion.div>

          <motion.p className='m-0 text-[14px] text-[#9a9a9a]' {...rise(0.35)}>
            {t('home.university')} ·{' '}
            <a
              className='text-[#c8c8c8] underline decoration-[#0fa]/50 underline-offset-4 hover:decoration-[#0fa] transition-colors'
              target='_blank'
              rel='noopener noreferrer'
              href='https://unlp.edu.ar/'
            >
              {t('home.university.short')}
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
