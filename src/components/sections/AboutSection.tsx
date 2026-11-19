import React from 'react'
import {motion} from 'framer-motion'
import {useLanguage} from '../../hooks/LanguageContext'
import SectionHeading from '../common/SectionHeading'

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
        <motion.div
          variants={{
            hidden: {opacity: 0},
            visible: {
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.3,
              },
            },
          }}
          className='max-w-[72ch]'
        >
          <motion.p
            className='text-start text-[18px] leading-[1.75]'
            variants={{
              hidden: {opacity: 0, y: 20},
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: 'easeOut',
                },
              },
            }}
            dangerouslySetInnerHTML={{
              __html:
                t('about.p1') +
                '<div class="my-4"></div>' +
                t('about.p2') +
                '<div class="my-4"></div>' +
                t('about.p3') +
                '<div class="my-4"></div>' +
                t('about.p4'),
            }}
          ></motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutSection
