import React, { useState, useEffect } from 'react'
import { Box, Flex, Link, Button, useColorModeValue } from '@chakra-ui/react'
import { motion, useViewportScroll } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useViewportScroll()
  
  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('gray.800', 'white')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  useEffect(() => {
    return scrollY.onChange(() => setIsScrolled(scrollY.get() > 20))
  }, [scrollY])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <MotionBox
      as="nav"
      position="fixed"
      w="100%"
      top={0}
      zIndex={10}
      bg={bg}
      borderBottom={isScrolled ? '1px' : '0px'}
      borderColor={borderColor}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        boxShadow: isScrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <Flex
        maxW="1200px"
        mx="auto"
        px={6}
        py={4}
        align="center"
        justify="space-between"
      >
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            onClick={() => scrollToSection('home')}
            fontSize="xl"
            fontWeight="bold"
            color={color}
            _hover={{
              textDecoration: 'none',
              transform: 'scale(1.05)',
            }}
            style={{
              display: 'inline-block',
              transition: 'transform 0.2s',
            }}
          >
            My Portfolio
          </Link>
        </MotionBox>

        <MotionFlex
          gap={8}
          align="center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              color={color}
              fontWeight="medium"
              position="relative"
              _hover={{
                textDecoration: 'none',
                color: 'blue.500',
                _after: {
                  width: '100%',
                },
              }}
              _after={{
                content: '""',
                position: 'absolute',
                width: '0%',
                height: '2px',
                bottom: '-2px',
                left: '0',
                backgroundColor: 'blue.500',
                transition: 'width 0.3s ease',
              }}
            >
              {item.label}
            </Link>
          ))}
          <Flex gap={2}>
            <MotionBox whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                as="a"
                href="https://github.com/charlesms1246"
                target="_blank"
                variant="ghost"
                color={color}
                _hover={{ bg: 'transparent' }}
              >
                <FaGithub size={20} />
              </Button>
            </MotionBox>
            <MotionBox whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                as="a"
                href="https://linkedin.com/in/charles-m-s-161804290"
                target="_blank"
                variant="ghost"
                color={color}
                _hover={{ bg: 'transparent' }}
              >
                <FaLinkedin size={20} />
              </Button>
            </MotionBox>
          </Flex>
        </MotionFlex>
      </Flex>
    </MotionBox>
  )
}

export default Navbar 