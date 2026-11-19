import React from 'react'
import {motion} from 'framer-motion'
import {useLanguage} from '../../hooks/LanguageContext'
import SectionHeading from '../common/SectionHeading'
import {richText} from '../../utils/richText'

const STACK = [
  {
    key: 'about.stack.frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    key: 'about.stack.backend',
    items: ['C#', '.NET', 'ASP.NET Core', 'Entity Framework', 'Node.js'],
  },
  {
    key: 'about.stack.data',
    items: ['PostgreSQL', 'Oracle', 'Supabase', 'Docker', 'Vercel', 'Render'],
  },
]

const AboutSection: React.FC = () => {
  const {t} = useLanguage()

  return (
    <div
      id='about'
      className='min-h-[75vh] w-full flex flex-col items-center justify-center pt-25 pb-15'
    >
      <div className='bg-[#0a0a0a] absolute m-0 p-0 h-[2px] w-[99.2vw] left-0 -z-10 flex flex-col align-center justify-between'></div>
      <motion.div
        variants={{
          hidden: {y: 50},
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              ease: 'easeOut',
              when: 'beforeChildren',
              staggerChildren: 0.2,
            },
          },
        }}
        initial='hidden'
        whileInView='visible'
        className='space-y-10 mx-auto relative w-full bg-[#0c0c0c] border-2 border-[#000]/60 px-8 py-12 md:p-16 md:shadow-xl shadow-black/30'
      >
        <motion.div
          className='flex flex-row items-center justify-between'
          variants={{
            hidden: {opacity: 0},
            visible: {
              opacity: 1,
              transition: {
                duration: 0.4,
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div
            variants={{
              hidden: {opacity: 0, x: -30},
              visible: {
                opacity: 1,
                x: 0,
                transition: {duration: 0.5, ease: 'easeOut'},
              },
            }}
          >
            <SectionHeading>{t('about.title')}</SectionHeading>
          </motion.div>
        </motion.div>
        <div className='grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] gap-10 lg:gap-16 items-start'>
          <motion.div
            className='flex flex-col gap-5 max-w-[68ch]'
            variants={{
              hidden: {opacity: 0, y: 20},
              visible: {
                opacity: 1,
                y: 0,
                transition: {duration: 0.7, ease: 'easeOut', delay: 0.2},
              },
            }}
          >
            {['about.p1', 'about.p2', 'about.p3'].map((key) => (
              <p
                key={key}
                className='m-0 text-start text-[17px] md:text-[18px] leading-[1.7] text-[#c8c8c8]'
              >
                {richText(t(key))}
              </p>
            ))}
          </motion.div>

          {/* Stack agrupado: se lee en 5 segundos */}
          <motion.aside
            aria-label={t('about.stack.title')}
            className='flex flex-col gap-6 text-start'
            variants={{
              hidden: {opacity: 0, x: 20},
              visible: {
                opacity: 1,
                x: 0,
                transition: {duration: 0.7, ease: 'easeOut', delay: 0.35},
              },
            }}
          >
            {STACK.map((group) => (
              <div key={group.key} className='flex flex-col gap-2.5'>
                <h3 className='m-0 oswald-regular uppercase text-[13px] tracking-[2px] text-accent'>
                  {t(group.key)}
                </h3>
                <ul className='m-0 p-0 list-none flex flex-wrap gap-2'>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className='cut [--cut:6px] bg-[#000]/40 px-3 py-1 text-[14px] text-[#d4d4d4]'
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.aside>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutSection
