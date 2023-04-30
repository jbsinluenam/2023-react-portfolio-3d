import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'


const ServiceCard = ({ title, icon, index }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        options={{
          max: 45,
          scale: 1.05,
          speed: 400,
        }}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >


        <div
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] justify-evenly items-center flex-col'
        >
          <img src={icon} alt={title} />
          <h3
            className='text-white text-[20px] font-bold text-center'
          >{title}</h3>

        </div>

      </motion.div>

    </Tilt>
  )
}



const About = () => {
  return (
    <>
      <motion.div
        variants={textVariant()}
      >
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.2, 0.2, "easeInOut")}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >

        With 15 years of experience in marketing, I approach app development by combining my knowledge of development and design, focusing on the common goal of solving user problems. This synergy of skills allows me to create impactful solutions that cater to user needs and drive success.

      </motion.p>
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")