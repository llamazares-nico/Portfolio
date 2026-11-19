import React from 'react'
import {useWindowSize} from 'react-use'
import {ArrowRight} from 'lucide-react'
import {useLanguage} from '../../hooks/LanguageContext'

interface ProjectCardLink {
  icon: React.ReactNode
  url?: string
  label?: string
  onClick?: (e: React.MouseEvent) => void
}

interface ProjectCardProps {
  number: string
  category: React.ReactNode
  icon: React.ReactNode
  image: string
  imageAlt: string
  imgStyle?: React.CSSProperties
  /** Captura del proyecto: es la imagen principal de la tarjeta */
  cover?: string
  title: React.ReactNode
  description: React.ReactNode
  links?: ProjectCardLink[]
  /** Tecnologías destacadas; solo se muestran en la tarjeta de escritorio */
  highlights?: string[]
}

const CUT_OUTER = 'polygon(0 0, 92% 0, 100% 12%, 100% 100%, 8% 100%, 0 88%)'
const CUT_INNER =
  'polygon(0 0, 91.6% 0, 100% 11.5%, 100% 100%, 8.4% 100%, 0 88.5%)'
const CUT_SMALL =
  'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'

/** Captura recortada con el logo del proyecto como sello en la esquina */
const Cover: React.FC<{
  cover?: string
  image: string
  imageAlt: string
  imgStyle?: React.CSSProperties
  title: React.ReactNode
  aspect: string
}> = ({cover, image, imageAlt, imgStyle, title, aspect}) => (
  <div className='relative'>
    <div className='bg-[#070707] p-1.5' style={{clipPath: CUT_OUTER}}>
      <div
        className={`${aspect} overflow-hidden bg-[#0a0a0a] isolate [transform:translateZ(0)]`}
        style={{clipPath: CUT_INNER}}
      >
        {cover ? (
          <img
            src={cover}
            alt={typeof title === 'string' ? `${title} - Captura` : ''}
            loading='lazy'
            className='w-full h-full object-cover object-left-top will-change-transform transition-transform duration-500 ease-out group-hover:scale-[1.04]'
          />
        ) : (
          <img
            src={image}
            alt={imageAlt}
            loading='lazy'
            className='w-full h-full object-contain p-6'
            style={imgStyle}
          />
        )}
      </div>
    </div>
    {cover && (
      <div
        className='absolute -bottom-4 left-4 w-13 h-13 bg-[#121212] p-[2px]'
        style={{clipPath: CUT_SMALL}}
      >
        <div
          className='w-full h-full bg-[#0a0a0a] overflow-hidden'
          style={{clipPath: CUT_SMALL}}
        >
          <img
            src={image}
            alt={imageAlt}
            className='w-full h-full object-cover'
            style={imgStyle}
          />
        </div>
      </div>
    )}
  </div>
)

const LinkButtons: React.FC<{links: ProjectCardLink[]}> = ({links}) => (
  <div className='flex flex-row gap-2'>
    {links.map((link, idx) => (
      <a
        key={idx}
        href={link.url}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={link.label}
        title={link.label}
        onClick={(e) => e.stopPropagation()}
        className='group/link block p-[2px] bg-[#070707] hover:bg-accent focus-visible:bg-accent outline-none transition-colors'
        style={{clipPath: CUT_SMALL}}
      >
        <span
          className='flex items-center justify-center w-9 h-9 bg-[#0e0e0e] text-[#ccc] group-hover/link:text-white transition-colors'
          style={{clipPath: CUT_SMALL}}
        >
          {link.icon}
        </span>
      </a>
    ))}
  </div>
)

const ViewProject: React.FC<{label: string}> = ({label}) => (
  <button
    type='button'
    className='oswald-regular uppercase tracking-[2px] text-sm text-accent flex items-center gap-2 cursor-pointer outline-none focus-visible:underline underline-offset-4'
  >
    {label}
    <ArrowRight
      size={16}
      className='transition-transform duration-300 ease-out group-hover:translate-x-1'
    />
  </button>
)

const ProjectCard: React.FC<ProjectCardProps> = ({
  number,
  category,
  icon,
  image,
  imageAlt,
  cover,
  title,
  description,
  links = [],
  imgStyle = {},
  highlights = [],
}) => {
  const {width} = useWindowSize()
  const {t} = useLanguage()
  const isMobile = width <= 768

  if (isMobile) {
    return (
      <div className='group mx-6 bg-[#000]/25 border-2 border-[#000]/35 text-start p-4 cursor-pointer'>
        <Cover
          cover={cover}
          image={image}
          imageAlt={imageAlt}
          imgStyle={imgStyle}
          title={title}
          aspect='aspect-[16/9]'
        />
        <div className={`flex flex-col gap-1 ${cover ? 'mt-7' : 'mt-4'}`}>
          <h3 className='oswald-regular text-2xl uppercase leading-tight'>
            {title}
          </h3>
          <p className='oswald-regular text-accent text-xs tracking-wide'>
            {category}
          </p>
        </div>
        <p className='mt-3 text-[15px] leading-6 text-[#c8c8c8]'>
          {description}
        </p>
        <div className='mt-5 flex flex-row items-center justify-between'>
          <ViewProject label={t('projects.viewProject')} />
          {links.length > 0 && <LinkButtons links={links} />}
        </div>
      </div>
    )
  }

  return (
    <div className='group relative h-full flex flex-col bg-[#000]/25 border-2 border-[#000]/35 hover:ring-2 has-[:focus-visible]:ring-2 ring-accent transition-all duration-400 text-start py-6 select-none cursor-pointer'>
      <div className='px-7 flex flex-col grow'>
        <div className='flex flex-row w-full justify-between items-center'>
          <div className='flex flex-col oswald-regular'>
            <span className='text-2xl'>{number}</span>
            <span className='text-accent text-xs font-[500]'>{category}</span>
          </div>
          <div className='cut [--cut:10px] bg-[#121212] w-12 h-12 flex justify-center items-center text-[#ccc]'>
            {icon}
          </div>
        </div>
        <div className='mt-6'>
          <Cover
            cover={cover}
            image={image}
            imageAlt={imageAlt}
            imgStyle={imgStyle}
            title={title}
            aspect='aspect-[4/3]'
          />
        </div>
        <h3
          className={`oswald-regular text-xl uppercase leading-tight ${cover ? 'mt-8' : 'mt-6'}`}
        >
          {title}
        </h3>
        <p className='mt-2 text-[15px] leading-6 text-[#c8c8c8]'>
          {description}
        </p>
        {highlights.length > 0 && (
          <ul className='m-0 mt-4 p-0 list-none flex flex-wrap gap-1.5'>
            {highlights.map((tech) => (
              <li
                key={tech}
                className='cut [--cut:5px] bg-[#000]/40 px-2.5 py-0.5 text-[13px] text-[#c8c8c8]'
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
        <div className='mt-auto pt-5'>
          <ViewProject label={t('projects.viewProject')} />
        </div>
      </div>
      {links.length > 0 && (
        <div className='absolute -bottom-5 end-4'>
          <LinkButtons links={links} />
        </div>
      )}
    </div>
  )
}

export default ProjectCard
