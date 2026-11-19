import React from 'react'
import {useLanguage} from '../../hooks/LanguageContext'

const LanguageSwitcher: React.FC = () => {
  const {language, setLanguage, t} = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  return (
    <button
      type='button'
      onClick={toggleLanguage}
      aria-label={t('nav.languageChange')}
      title={t('nav.languageChange')}
      className='cut [--cut:7px] w-9 h-9 bg-[#000]/30 lg:text-gray-400 text-[#222] lg:hover:text-white lg:hover:bg-accent/15 hover:text-[#000] transition-colors duration-300 cursor-pointer overflow-hidden relative outline-none focus-visible:text-white focus-visible:bg-accent/15'
      style={{padding: 0}}
    >
      <div
        className='flex w-[205%] tracking-wide oswald-regular text-sm bg-[#000]/10 items-center h-full absolute top-0 left-0 p-0 transition-all flex-row'
        style={{
          transform: language === 'en' ? 'translateX(0px)' : 'translateX(-50%)',
        }}
      >
        <div className='w-[50%] mb-0.5' aria-hidden='true'>
          <span>EN</span>
        </div>
        <div className='w-[50%] mb-0.5' aria-hidden='true'>
          <span>ES</span>
        </div>
      </div>
    </button>
  )
}

export default LanguageSwitcher
