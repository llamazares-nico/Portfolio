import React, {useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import {stagger, fadeInUp} from '../../animations/variants'
import {useLanguage} from '../../hooks/LanguageContext'
import ProjectCard from './ProjectCard'
import SectionHeading from '../common/SectionHeading'
import {useWindowSize} from 'react-use'
import Modal from '../common/Modal'
import {GalleryImage, projectsData} from '../../data/projects'
import {ArrowRight, ChevronLeft, ChevronRight} from 'lucide-react'

interface Project {
  id: number
  category: string
  icon: React.ReactNode
  image: string
  imageAlt: string
  title: string
  description: string
  longDescription?: string
  technologies?: string[]
  links?: Array<{
    icon: React.ReactNode
    url?: string
    onClick?: (e: React.MouseEvent) => void
    label?: string
  }>
  imgStyle?: React.CSSProperties
  gallery?: GalleryImage[]
  cover?: string
}

const preloadImage = (src: string) => {
  const img = new Image()
  img.src = src
}

const preloadVideo = (src: string) => {
  const video = document.createElement('video')
  video.src = src
  video.load()
}

const ProjectsSection: React.FC = () => {
  const {t} = useLanguage()
  const {width} = useWindowSize()
  const [selectedProject, setSelectedProject] = React.useState<number | null>(
    null
  )
  const [selectedProjectImage, setSelectedProjectImage] =
    React.useState<GalleryImage | null>(null)
  const isMobile = width <= 768

  const projects: Project[] = projectsData.map((p) => ({
    ...p,
    category: t(p.categoryKey),
    title: t(p.titleKey),
    description: t(p.descriptionKey),
    longDescription: p.longDescriptionKey
      ? t(p.longDescriptionKey)
      : t(p.descriptionKey),
    // Primera captura (no video) de la galería: imagen principal de la tarjeta
    cover: p.cover ?? p.gallery?.find((img) => !img.src.endsWith('.mp4'))?.src,
    links: p.links?.map((link) => ({
      ...link,
      icon: link.icon || <></>,
      label: link.label || '',
      onClick:
        link.onClick ||
        ((e: React.MouseEvent) => {
          e.stopPropagation() // Evita que el clic se propague al contenedor
          if (link.url) {
            window.open(link.url, '_blank')
          }
        }),
    })),
  }))

  // Encontrar el proyecto seleccionado
  const selectedProjectData =
    selectedProject !== null
      ? projects.find((project) => project.id === selectedProject)
      : null

  useEffect(() => {
    if (selectedProject !== null && selectedProjectData) {
      if (
        !selectedProjectImage ||
        !selectedProjectData.gallery?.some(
          (img) => img === selectedProjectImage
        )
      ) {
        const firstImage = selectedProjectData.gallery?.[0]
        if (firstImage) {
          setSelectedProjectImage(firstImage)
        }
      }
    }
  }, [selectedProject, selectedProjectData, selectedProjectImage])

  useEffect(() => {
    // Precargar todas las imágenes de los proyectos
    projects.forEach((project) => {
      // Precargar imagen principal
      preloadImage(project.image)

      // Precargar imágenes de la galería
      if (project.gallery) {
        project.gallery.forEach((galleryImage) => {
          if (galleryImage.src.endsWith('.mp4')) {
            preloadVideo(galleryImage.src)
          } else {
            preloadImage(galleryImage.src)
          }
        })
      }
    })
  }, [projects])

  // Modal con detalles del proyecto y lista de otros proyectos (mobile y escritorio)
  const modal =
    selectedProject !== null && selectedProjectData ? (
      <Modal onClose={() => setSelectedProject(null)}>
        <div className='p-0 h-[100dvh]'>
          <div className='h-full flex flex-col justify-between'>
            {/* Header: Título e imagen del proyecto seleccionado */}
            <div className='bg-[#121212] px-2 pb-2'>
              <div className='flex flex-row items-center gap-5 bg-[#0C0C0C]'>
                <img
                  src={selectedProjectData.image}
                  alt={selectedProjectData.imageAlt}
                  className='w-26 h-26 p-3 object-cover border-r-2 border-[#121212] bg-[#000]/35'
                />
                <div className='flex flex-col grow'>
                  <h2 className='text-3xl oswald-regular uppercase'>
                    {selectedProjectData.title}
                  </h2>
                  <div className='flex items-center gap-2'>
                    <span className='text-accent text-sm'>
                      {selectedProjectData.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center w-full h-full min-h-0 overflow-hidden mx-auto'>
              {selectedProjectData.gallery &&
                selectedProjectData.gallery.length > 0 && (
                  <div className='h-[45%] w-full md:h-full md:w-[70%] shrink-0 bg-[#0A0A0A] md:border-l-10 border-[#0C0C0C]'>
                    <div
                      className='w-full relative'
                      style={{
                        height:
                          selectedProjectData.gallery &&
                          selectedProjectData.gallery.length > 1
                            ? '85%'
                            : '100%',
                      }}
                    >
                      <AnimatePresence mode='wait'>
                        {selectedProjectImage?.src.endsWith('.mp4') ? (
                          <motion.video
                            key={selectedProjectImage.src} // Importante para que Framer Motion detecte el cambio
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.3}}
                            src={selectedProjectImage.src}
                            controls
                            autoPlay
                            loop
                            muted
                            style={{
                              objectFit: 'scale-down',
                              ...(selectedProjectImage?.style || {}),
                            }}
                            className='w-full h-full py-10'
                          ></motion.video>
                        ) : (
                          <motion.img
                            key={
                              selectedProjectImage
                                ? selectedProjectImage.src
                                : selectedProjectData.image
                            } // Importante para que Framer Motion detecte el cambio
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.3}}
                            src={
                              selectedProjectImage
                                ? selectedProjectImage.src
                                : selectedProjectData.image
                            }
                            alt={
                              selectedProjectImage
                                ? selectedProjectImage.alt
                                : selectedProjectData.imageAlt
                            }
                            style={{
                              objectFit: 'scale-down',
                              ...(selectedProjectImage?.style || {}),
                            }}
                            className='w-full h-full'
                          />
                        )}
                      </AnimatePresence>
                      {selectedProjectImage?.descriptionKey ? (
                        <div
                          className='absolute bottom-0 right-0 -bg-linear-240 from-[#111]/90 from-10% via-[#111]/95 via-30% to-[#111] to-90% p-2 ps-5 pe-3'
                          style={{
                            clipPath:
                              'polygon(13px 0, 100% 0%, 100% 100%, 0 100%)',
                          }}
                        >
                          <p className='text-[#aaa] text-sm'>
                            {t(selectedProjectImage.descriptionKey)}
                          </p>
                        </div>
                      ) : null}
                    </div>
                    {selectedProjectData.gallery &&
                      selectedProjectData.gallery.length > 1 && (
                        <div className='h-[15%] w-full flex flex-row justify-between bg-[#070707]'>
                          <div
                            className='h-full bg px-2 cursor-pointer bg-[#050505] hover:bg-[#090909] transition-all flex justify-center items-center'
                            onClick={() => {
                              const galleryContainer =
                                document.querySelector('.gallery-container')
                              if (galleryContainer) {
                                galleryContainer.scrollLeft -= 400 // Ajusta este valor según necesites
                              }
                            }}
                          >
                            <ChevronLeft />
                          </div>
                          <div
                            className='py-6 px-5 overflow-hidden flex flex-row gap-3 h-full items-center justify-start gallery-container bg-[#070707]'
                            style={{
                              scrollBehavior: 'smooth',
                              scrollSnapAlign: 'start',
                              scrollSnapType: 'x mandatory',
                              scrollSnapStop: 'always',
                            }}
                          >
                            {selectedProjectData.gallery &&
                              selectedProjectData.gallery.map((x, index) =>
                                x.src.endsWith('.mp4') ? (
                                  <div
                                    onClick={() => setSelectedProjectImage(x)}
                                    key={index}
                                    className={`w-22 h-14 cursor-pointer border-1 relative ${
                                      selectedProjectImage &&
                                      selectedProjectImage.src === x.src
                                        ? 'border-accent opacity-100'
                                        : 'border-[#252525] hover:border-[#aaa] opacity-40 hover:opacity-75'
                                    } transition-all`}
                                  >
                                    {/* Imagen de previsualización para videos */}
                                    <img
                                      src={x.thumbnailSrc || ''}
                                      alt={x.alt}
                                      className='w-full h-full object-cover'
                                    />
                                    {/* Indicador de video */}
                                    <div className='absolute inset-0 flex items-center justify-center'>
                                      <div className='w-5 h-5 bg-black/50 rounded-full flex items-center justify-center'>
                                        <div className='w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5'></div>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    onClick={() => setSelectedProjectImage(x)}
                                    key={index}
                                    src={x.src}
                                    alt={x.alt}
                                    className={`w-22 h-14 cursor-pointer border-1 ${
                                      selectedProjectImage &&
                                      selectedProjectImage.src === x.src
                                        ? 'border-accent opacity-100'
                                        : 'border-[#252525] hover:border-[#aaa] opacity-40 hover:opacity-75'
                                    } transition-all object-cover`}
                                  />
                                )
                              )}
                          </div>
                          <div
                            className='h-full bg px-2 cursor-pointer bg-[#050505] hover:bg-[#090909] transition-all flex justify-center items-center'
                            onClick={() => {
                              const galleryContainer =
                                document.querySelector('.gallery-container')
                              if (galleryContainer) {
                                galleryContainer.scrollLeft += 400 // Ajusta este valor según necesites
                              }
                            }}
                          >
                            <ChevronRight />
                          </div>
                        </div>
                      )}
                  </div>
                )}
              <div
                className={`h-full ${
                  selectedProjectData.gallery &&
                  selectedProjectData.gallery.length > 0
                    ? 'w-full md:w-[30%]'
                    : 'w-full'
                } min-h-0 flex-1 md:flex-none bg-[#070707] backdrop-blur-2xl overflow-y-auto p-5 md:shadow-[inset_6px_0_0_#0C0C0C]`}
              >
                <div className='mb-6'>
                  <h3 className='text-xl oswald-regular uppercase mb-2'>
                    {t('projects.description')}
                  </h3>
                  <p
                    className='leading-6'
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedProjectData.longDescription ||
                        selectedProjectData.description,
                    }}
                  />
                </div>
                {selectedProjectData.technologies && (
                  <div className='mb-6'>
                    <h3 className='text-xl oswald-regular uppercase mb-3'>
                      {t('projects.technologies')}
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {selectedProjectData.technologies.map((tech, index) => (
                        <div
                          key={index}
                          className='cut [--cut:6px] bg-[#000]/40 px-3 py-1 text-sm text-[#d4d4d4]'
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedProjectData.links &&
                  selectedProjectData.links.length > 0 && (
                    <div className='mb-6'>
                      <h3 className='text-xl oswald-regular uppercase mb-3'>
                        {t('projects.links')}
                      </h3>
                      <div className='flex gap-4'>
                        {selectedProjectData.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='cut [--cut:8px] bg-[#151515] flex items-center gap-2 px-3 py-1.5 text-sm text-[#c8c8c8] hover:bg-accent/15 hover:text-white focus-visible:bg-accent/15 outline-none transition-colors'
                          >
                            {link.icon}
                            {link.label && <span>{link.label}</span>}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Columna derecha: Lista de otros proyectos */}
            <div className='bg-[#121212] px-2 pt-2'>
              <div className='bg-[#0C0C0C] p-2 px-5'>
                <h3 className='oswald-regular uppercase mt-1 mb-1 text-[22px]'>
                  {t('projects.allOfMyProjects')}
                </h3>
                <div className='flex flex-row gap-3 overflow-x-scroll py-2'>
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className={`flex items-center gap-4 p-0.5 cursor-pointer select-none transition-colors ${
                        selectedProject === project.id
                          ? 'bg-accent/75'
                          : 'bg-[#070707] hover:bg-[#777]'
                      }`}
                      onClick={() => setSelectedProject(project.id)}
                      style={{
                        clipPath:
                          'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                      }}
                    >
                      <div
                        className='flex flex-row w-50 items-center gap-2 bg-[#121212]'
                        style={{
                          clipPath:
                            'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                        }}
                      >
                        <div className='w-12 h-12 overflow-hidden'>
                          <img
                            src={project.image}
                            alt={project.imageAlt}
                            style={project.imgStyle || {}}
                            className='w-12 h-12 object-cover border-[#070707] border-r-1'
                          />
                        </div>
                        <div className='max-w-34'>
                          <h5 className='font-bold text-[16px] -mt-0.5 truncate uppercase'>
                            {project.title}
                          </h5>
                          <p className='text-[10px] text-accent -mt-0.5'>
                            {project.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    ) : null

  const cardVariants = {
    hidden: {opacity: 0, y: 60},
    visible: {
      opacity: 1,
      y: 0,
      transition: {duration: 0.7, ease: 'easeOut'},
    },
  } as const

  const featured = projects.slice(0, 4)
  const rest = projects.slice(4)

  const renderCard = (project: Project) => (
    <ProjectCard
      number={`#${project.id.toString().padStart(2, '0')}`}
      category={project.category}
      icon={project.icon}
      image={project.image}
      imageAlt={project.imageAlt}
      cover={project.cover}
      title={project.title}
      description={project.description}
      links={project.links}
      imgStyle={project.imgStyle}
    />
  )

  // Resto de los proyectos, siempre visible debajo de los destacados
  const moreProjects = (
    <motion.section
      aria-labelledby='more-projects-title'
      className='mt-16 mx-6 lg:mx-2'
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.15}}
      transition={{duration: 0.6, ease: 'easeOut'}}
    >
      <div className='flex flex-row items-baseline justify-between gap-4 mb-5'>
        <h2
          id='more-projects-title'
          className='oswald-regular uppercase text-[28px] leading-none'
        >
          {t('projects.allOfMyProjects')}
        </h2>
        <span className='oswald-regular text-sm text-[#888] tracking-wide'>
          {rest.length} {t('projects.moreCount')}
        </span>
      </div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
        {rest.map((project) => (
          <li key={project.id}>
            <button
              type='button'
              onClick={() => setSelectedProject(project.id)}
              className='group w-full p-[2px] bg-[#070707] hover:bg-accent/75 focus-visible:bg-accent outline-none transition-colors cursor-pointer text-start'
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
              }}
            >
              <span
                className='flex flex-row items-center gap-3 bg-[#121212] pe-3'
                style={{
                  clipPath:
                    'polygon(0 0, calc(100% - 9px) 0, 100% 9px, 100% 100%, 9px 100%, 0 calc(100% - 9px))',
                }}
              >
                <span className='w-14 h-14 shrink-0 overflow-hidden bg-[#0a0a0a] border-r border-[#070707]'>
                  <img
                    src={project.image}
                    alt=''
                    loading='lazy'
                    style={project.imgStyle || {}}
                    className='w-14 h-14 object-cover'
                  />
                </span>
                <span className='flex flex-col min-w-0 grow'>
                  <span className='oswald-regular uppercase text-[16px] truncate'>
                    {project.title}
                  </span>
                  <span className='oswald-regular text-[11px] text-accent truncate'>
                    {project.category}
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className='shrink-0 text-[#666] group-hover:text-white group-hover:translate-x-0.5 transition-all'
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.section>
  )

  // Renderizar para móviles
  if (isMobile) {
    return (
      <section id='projects' className='pt-25 pb-15'>
        <motion.div
          className='flex flex-col gap-6'
          variants={stagger}
          initial='hidden'
          whileInView='visible'
          viewport={{once: true, amount: 0.1}}
        >
          <motion.div
            className='flex justify-end pe-6 pb-2'
            variants={{
              hidden: {opacity: 0, x: 75},
              visible: {
                opacity: 1,
                x: 0,
                transition: {duration: 0.5, ease: 'easeOut'},
              },
            }}
          >
            <SectionHeading align='end'>{t('projects.title')}</SectionHeading>
          </motion.div>

          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              className='relative'
              variants={index === 0 ? fadeInUp : cardVariants}
              onClick={() => setSelectedProject(project.id)}
            >
              {renderCard(project)}
            </motion.div>
          ))}
        </motion.div>
        {moreProjects}
        {modal}
      </section>
    )
  }

  // Escritorio: tarjetas escalonadas en la grilla
  const desktopAreas = [
    '1 / 1 / 10 / 2',
    '2 / 2 / 10 / 3',
    '3 / 3 / 10 / 4',
    '3 / 4 / 10 / 5',
  ]

  return (
    <section id='projects' className='pt-25 pb-15'>
      <motion.div
        className='min-h-[640px] grid grid-cols-4 grid-rows-9 gap-x-5 px-2 -me-5'
        variants={stagger}
        initial='hidden'
        whileInView='visible'
        viewport={{once: true, amount: 0.3}}
      >
        <motion.div
          style={{gridArea: '1 / 3 / 3 / 6'}}
          className='flex items-start justify-end pt-3 pe-5 w-full h-full'
          variants={{
            hidden: {opacity: 0, x: 75},
            visible: {
              opacity: 1,
              x: 0,
              transition: {duration: 0.5, ease: 'easeOut'},
            },
          }}
        >
          <SectionHeading align='end'>{t('projects.title')}</SectionHeading>
        </motion.div>
        {featured.map((project, index) => (
          <motion.div
            key={project.id}
            className='relative'
            style={{gridArea: desktopAreas[index]}}
            onClick={() => setSelectedProject(project.id)}
            variants={index === 0 ? fadeInUp : cardVariants}
          >
            {renderCard(project)}
          </motion.div>
        ))}
      </motion.div>
      {moreProjects}
      {modal}
    </section>
  )
}

export default ProjectsSection
