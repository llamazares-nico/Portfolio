import React, {useState, useRef} from 'react'
import emailjs from '@emailjs/browser'
import {motion} from 'framer-motion'
import {useLanguage} from '../../hooks/LanguageContext'
import SectionHeading from '../common/SectionHeading'
import toast from 'react-hot-toast'
import {MapPin, Phone, Mail, Send, LoaderCircle} from 'lucide-react'
import {
  stagger,
  fadeInUp,
  slideFromLeft,
  slideFromRight,
  scaleFade,
} from '../../animations/variants'

// Corte diagonal de la caja en píxeles: el tamaño no depende del alto de la caja
const BOX_CUT =
  'polygon(0 0, calc(100% - var(--box-cut)) 0, 100% var(--box-cut), 100% 100%, var(--box-cut) 100%, 0 calc(100% - var(--box-cut)))'

const FIELD_CLASS =
  'w-full bg-[#000]/40 text-white text-[16px] px-4 py-3 border-0 border-b-2 border-[#262626] outline-none transition-colors hover:border-[#3a3a3a] focus:border-accent placeholder:text-[#666]'

interface FieldProps {
  id: string
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  autoComplete?: string
  multiline?: boolean
}

/** Campo del formulario con etiqueta visible arriba y foco en el color de acento */
const Field: React.FC<FieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  multiline = false,
}) => (
  <div className='flex flex-col gap-1.5 w-full'>
    <label
      htmlFor={id}
      className='oswald-regular uppercase text-[12px] tracking-[1.5px] text-[#9a9a9a]'
    >
      {label} <span className='text-accent'>*</span>
    </label>
    {multiline ? (
      <textarea
        id={id}
        name={name}
        required
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${FIELD_CLASS} resize-y min-h-32`}
      />
    ) : (
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={FIELD_CLASS}
      />
    )}
  </div>
)

const ContactSection: React.FC = () => {
  const {t} = useLanguage()
  const [nameInputValue, setNameInputValue] = useState('')
  const [emailInputValue, setEmailInputValue] = useState('')
  const [messageInputValue, setMessageInputValue] = useState('')
  const [sending, setSending] = useState(false)
  const form = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.current) return

    setSending(true)
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          // Resetear el formulario después de enviar
          setNameInputValue('')
          setEmailInputValue('')
          setMessageInputValue('')
          toast.success(t('contact.message.success'))
          setSending(false)
        },
        (error) => {
          console.log(error.text)
          toast.error(t('contact.message.error'))
          setSending(false)
        }
      )
  }

  return (
    <div
      id='contact'
      className='lg:min-h-[80vh] items-center justify-center flex mt-16 lg:mt-25 mb-10 lg:mb-0 mx-4 sm:mx-6 lg:mx-0'
    >
      <div className='h-fit w-full'>
        <div
          className='bg-[#000]/60 w-full h-full p-1 [--box-cut:28px] lg:[--box-cut:80px]'
          style={{
            clipPath: BOX_CUT,
          }}
        >
          <div
            className='bg-[#0C0C0C] h-full w-full px-6 py-10 sm:p-12 md:px-14 lg:p-16 lg:pt-14 flex flex-col gap-8 lg:gap-12'
            style={{
              clipPath: BOX_CUT,
            }}
          >
            <motion.div
              className='flex flex-col'
              variants={stagger}
              initial='hidden'
              whileInView='visible'
              viewport={{once: true, amount: 0.3}}
            >
              <motion.div variants={fadeInUp}>
                <SectionHeading align='center'>
                  {t('contact.title')}
                </SectionHeading>
              </motion.div>

              <motion.p
                className='mt-5 max-w-[52ch] mx-auto text-[#c8c8c8]'
                variants={fadeInUp}
              >
                {t('contact.p2')}
              </motion.p>
            </motion.div>
            <motion.div
              variants={stagger}
              initial='hidden'
              whileInView='visible'
              viewport={{once: true, amount: 0.3}}
              className='flex flex-col lg:flex-row gap-8 h-fit lg:px-4'
            >
              <motion.div
                variants={slideFromLeft}
                className='grow-1 text-start lg:max-w-3/8 lg:-mt-4 flex flex-col gap-3'
              >
                <div className='flex flex-col gap-2 lg:gap-4 lg:py-3'>
                  <motion.div
                    variants={scaleFade}
                    className='flex flex-row items-center gap-4 min-h-12 py-1'
                  >
                    <div className='cut [--cut:10px] w-12 h-12 shrink-0 flex items-center justify-center bg-[#000]/40 text-accent'>
                      <MapPin size={24} />
                    </div>
                    <div className='flex flex-col gap-0'>
                      <p className='uppercase oswald-regular'>
                        {t('contact.info.location')}
                      </p>
                      <p className='font-light'>
                        {t('contact.info.location.p1')}
                      </p>
                    </div>
                  </motion.div>
                  <motion.a
                    variants={scaleFade}
                    href='mailto:llamazares.nico@gmail.com'
                    className='group cut [--cut:12px] flex flex-row items-center gap-4 min-h-12 -mx-2 px-2 py-1 hover:bg-[#000]/30 focus-visible:bg-[#000]/30 outline-none transition-colors'
                  >
                    <span className='cut [--cut:10px] w-12 h-12 shrink-0 flex items-center justify-center bg-[#000]/40 group-hover:bg-accent/15 text-accent transition-colors'>
                      <Mail size={24} />
                    </span>
                    <span className='flex flex-col gap-0 min-w-0'>
                      <span className='uppercase oswald-regular'>
                        {t('contact.info.email')}
                      </span>
                      <span className='font-light break-words'>
                        {t('contact.info.email.p1')}
                      </span>
                    </span>
                  </motion.a>
                  <motion.a
                    variants={scaleFade}
                    href='https://wa.me/5492216325117'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group cut [--cut:12px] flex flex-row items-center gap-4 min-h-12 -mx-2 px-2 py-1 hover:bg-[#000]/30 focus-visible:bg-[#000]/30 outline-none transition-colors'
                  >
                    <span className='cut [--cut:10px] w-12 h-12 shrink-0 flex items-center justify-center bg-[#000]/40 group-hover:bg-accent/15 text-accent transition-colors'>
                      <Phone size={24} />
                    </span>
                    <span className='flex flex-col gap-0 min-w-0'>
                      <span className='uppercase oswald-regular'>
                        {t('contact.info.phone')}
                      </span>
                      <span className='font-light break-words'>
                        {t('contact.info.phone.p1')}
                      </span>
                    </span>
                  </motion.a>
                </div>
              </motion.div>
              <motion.form
                method='POST'
                data-netlify='true'
                name='contact'
                ref={form}
                onSubmit={handleSubmit}
                variants={slideFromRight}
                className='grow-3 text-start flex flex-col gap-3'
              >
                <div className='w-full flex flex-col gap-4 pt-3'>
                  <div className='flex flex-col sm:flex-row gap-4'>
                    <Field
                      id='contact-name'
                      name='name'
                      type='text'
                      autoComplete='name'
                      label={t('contact.message.name')}
                      value={nameInputValue}
                      onChange={setNameInputValue}
                    />
                    <Field
                      id='contact-email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      label={t('contact.message.email')}
                      value={emailInputValue}
                      onChange={setEmailInputValue}
                    />
                  </div>
                  <Field
                    id='contact-message'
                    name='message'
                    multiline
                    label={t('contact.message.message')}
                    value={messageInputValue}
                    onChange={setMessageInputValue}
                  />
                </div>
                <button
                  type='submit'
                  className='cursor-pointer w-fit select-none p-0.5 self-end'
                  disabled={sending}
                >
                  <div
                    className='w-full h-auto object-cover bg-[#222] hover:bg-accent transition-colors object-center p-[1px]'
                    style={{
                      clipPath:
                        'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                    }}
                  >
                    <div
                      className='w-full flex flex-row gap-3 items-center justify-center h-10 bg-[#090909] hover:bg-[#050505] transition-colors object-center px-4 pe-5'
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                      }}
                    >
                      {sending ? (
                        <>
                          <LoaderCircle
                            size={20}
                            color='#0fa'
                            className='animate-spin'
                          />
                          {t('contact.message.sending')}
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          {t('contact.message.send')}
                        </>
                      )}
                    </div>
                  </div>
                </button>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSection
