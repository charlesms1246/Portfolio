import React, { useState } from 'react'
import { Box, Container, Heading, Text, useColorModeValue, VStack, FormControl, FormLabel, Input, Textarea, Button, Flex, Icon, useToast, Grid, Link, Badge } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt, FaPhone, FaInstagram } from 'react-icons/fa'
import { useForm } from 'react-hook-form'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>()
  
  const color = useColorModeValue('gray.800', 'white')
  const bg = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('gray.50', 'gray.700')

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: 'Message sent!',
        description: 'Thank you for reaching out. I will get back to you soon.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      reset()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'charles.27csa@licet.ac.in',
      link: 'mailto:charles.27csa@licet.ac.in'
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+91 7305959816',
      link: 'tel:+917305959816'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Chennai, TN',
      link: 'https://maps.app.goo.gl/tdaQFcXnb7arxfud6'
    }
  ]

  return (
    <Box id="contact" pt={20} pb={20}>
      <Container maxW="1200px">
        <VStack spacing={12}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heading
              as="h1"
              size="2xl"
              mb={4}
              textAlign="center"
              bgGradient="linear(to-r, blue.400, purple.600)"
              bgClip="text"
            >
              Contact Me
            </Heading>
            <Text textAlign="center" fontSize="xl" color={color}>
              Let's work together on your next project
            </Text>
          </MotionBox>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
            w="100%"
          >
            {/* Contact Form */}
            <MotionBox
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box
                p={8}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack spacing={6}>
                    <FormControl isInvalid={!!errors.name}>
                      <FormLabel>Name</FormLabel>
                      <Input
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Your name"
                      />
                    </FormControl>

                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        placeholder="your.email@example.com"
                      />
                    </FormControl>

                    <FormControl isInvalid={!!errors.subject}>
                      <FormLabel>Subject</FormLabel>
                      <Input
                        {...register('subject', { required: 'Subject is required' })}
                        placeholder="What's this about?"
                      />
                    </FormControl>

                    <FormControl isInvalid={!!errors.message}>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        {...register('message', { required: 'Message is required' })}
                        placeholder="Your message"
                        rows={6}
                      />
                    </FormControl>

                    <Button
                      type="submit"
                      colorScheme="blue"
                      size="lg"
                      w="100%"
                      isLoading={isSubmitting}
                      loadingText="Sending..."
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
              </Box>
            </MotionBox>

            {/* Contact Information */}
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <VStack spacing={8} align="stretch">
                <Box
                  p={8}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <VStack spacing={6} align="stretch">
                    {contactInfo.map((info, index) => (
                      <Flex key={index} align="center">
                        <Icon as={info.icon} fontSize="2xl" color="blue.500" mr={4} />
                        <Box>
                          <Text fontWeight="bold" color={color}>
                            {info.label}
                          </Text>
                          <Link
                            href={info.link}
                            color="blue.500"
                            _hover={{ textDecoration: 'underline' }}
                          >
                            {info.value}
                          </Link>
                        </Box>
                      </Flex>
                    ))}
                  </VStack>
                </Box>

                <Box
                  p={8}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <VStack spacing={6} align="stretch">
                    <Text fontWeight="bold" color={color}>
                      Connect with me
                    </Text>
                    <Flex gap={4}>
                      <MotionBox whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          as="a"
                          href="https://github.com/charlesms1246"
                          target="_blank"
                          variant="ghost"
                          color={color}
                          _hover={{ bg: 'transparent' }}
                        >
                          <FaGithub size={24} />
                        </Button>
                      </MotionBox>
                      <MotionBox whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          as="a"
                          href="https://linkedin.com/in/charles-m-s-161804290"
                          target="_blank"
                          variant="ghost"
                          color={color}
                          _hover={{ bg: 'transparent' }}
                        >
                          <FaLinkedin size={24} />
                        </Button>
                      </MotionBox>
                      <MotionBox whileHover={{ y: -5 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          as="a"
                          href="https://www.instagram.com/who_me_charlie?igsh=MXBmbHBqZm4zc3NvcQ=="
                          target="_blank"
                          variant="ghost"
                          color={color}
                          _hover={{ bg: 'transparent' }}
                        >
                          <FaInstagram size={24} />
                        </Button>
                      </MotionBox>
                    </Flex>
                  </VStack>
                </Box>

                <Box
                  p={8}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                >
                  <VStack spacing={4} align="stretch">
                    <Text fontWeight="bold" color={color}>
                      Availability
                    </Text>
                    <Flex wrap="wrap" gap={2}>
                      <Badge colorScheme="green" fontSize="sm" p={2}>
                        Available for freelance
                      </Badge>
                      <Badge colorScheme="blue" fontSize="sm" p={2}>
                        Open to full-time opportunities
                      </Badge>
                    </Flex>
                    <Text color={color} fontSize="sm">
                      I'm currently available for new projects and opportunities. Feel free to reach out!
                    </Text>
                  </VStack>
                </Box>
              </VStack>
            </MotionBox>
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}

export default Contact 