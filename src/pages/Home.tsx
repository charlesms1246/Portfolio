import React from 'react'
import { Box, Container, Heading, Text, Button, Flex, Image, useColorModeValue, Icon } from '@chakra-ui/react'
import { motion, useViewportScroll, useTransform } from 'framer-motion'
import { FaArrowRight, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)
const MotionImage = motion(Image)

const Home: React.FC = () => {
  const { scrollYProgress } = useViewportScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  
  const color = useColorModeValue('gray.800', 'white')
  const bg = useColorModeValue('white', 'gray.800')

  return (
    <Box id="home">
      {/* Hero Section */}
      <Box pt={20} pb={20} position="relative" overflow="hidden">
        <Container maxW="1200px">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            minH="calc(100vh - 80px)"
          >
            <MotionBox
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              flex={1}
              pr={{ base: 0, md: 10 }}
              style={{ opacity }}
            >
              <MotionBox whileHover={{ scale: 1.05 }}>
                <Heading
                  as="h1"
                  size="2xl"
                  mb={4}
                  bgGradient="linear(to-r, blue.400, purple.600)"
                  bgClip="text"
                >
                  CHARLES M S
                </Heading>
              </MotionBox>
              <Text fontSize="xl" mb={6} color={color}>
                I'm a passionate developer creating beautiful and functional web applications.
              </Text>
              <MotionFlex
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                gap={4}
                mb={8}
              >
                <Button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  colorScheme="blue"
                  size="lg"
                  rightIcon={<FaArrowRight />}
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  View My Work
                </Button>
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  size="lg"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Contact Me
                </Button>
              </MotionFlex>

              <MotionFlex gap={4} mb={8}>
                <MotionBox
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    as="a"
                    href="https://github.com/charlesms1246"
                    target="_blank"
                    variant="ghost"
                    size="lg"
                    leftIcon={<FaGithub />}
                  >
                    GitHub
                  </Button>
                </MotionBox>
                <MotionBox
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    as="a"
                    href="https://linkedin.com/in/charles-m-s-161804290"
                    target="_blank"
                    variant="ghost"
                    size="lg"
                    leftIcon={<FaLinkedin />}
                  >
                    LinkedIn
                  </Button>
                </MotionBox>
                <MotionBox
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    as="a"
                    href="https://www.instagram.com/who_me_charlie?igsh=MXBmbHBqZm4zc3NvcQ=="
                    target="_blank"
                    variant="ghost"
                    size="lg"
                    leftIcon={<FaInstagram />}
                  >
                    Instagram
                  </Button>
                </MotionBox>
              </MotionFlex>
            </MotionBox>

            <MotionBox
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              flex={1}
              mt={{ base: 10, md: 0 }}
              style={{ scale }}
            >
              <Box
                position="relative"
                w="100%"
                h="400px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="xl"
                transform="perspective(1000px) rotateY(-5deg)"
                transition="transform 0.3s ease"
                _hover={{
                  transform: "perspective(1000px) rotateY(0deg)"
                }}
              >
                <MotionImage
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Developer workspace"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </Box>
            </MotionBox>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Home 