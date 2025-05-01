import React from 'react'
import { Box, Container, Heading, Button, Text, useColorModeValue, VStack, Grid, Icon, Flex, Progress, Tooltip, Divider } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaDownload, FaGraduationCap, FaBriefcase, FaCode, FaServer, FaDatabase, FaTools } from 'react-icons/fa'

const MotionBox = motion(Box)
const MotionGrid = motion(Grid)

const Resume: React.FC = () => {
  const color = useColorModeValue('gray.800', 'white')
  const bg = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('gray.50', 'gray.700')

  const skills = [
    { category: 'Frontend', items: [
      { name: 'React', level: 80 },
      { name: 'TypeScript', level: 60 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'Next.js', level: 50 }
    ], icon: FaCode },
    { category: 'Backend', items: [
      { name: 'Node.js', level: 65 },
      { name: 'Python', level: 85 },
      { name: 'SQL', level: 85 },
      { name: 'REST APIs', level: 70 }
    ], icon: FaServer },
    { category: 'Database', items: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Firebase', level: 70 },
      { name: 'MySQL', level: 85 }
    ], icon: FaDatabase },
    { category: 'Tools', items: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 50 },
      { name: 'AWS', level: 70 },
      { name: 'CI/CD', level: 60 }
    ], icon: FaTools }
  ]

  const experience = [
    {
      title: 'Content Designer',
      company: 'Loyola-ICAM College of Engineering & Technology',
      period: '2024 - Present',
      description: 'Designed posters and banners for college events',
      achievements: [
        'Lead a team to organize events for freshman during induction program',
        'Organized an event for freshmen, as an introductory to poster-making and app-designing',
        'Designed multiple posters and banners for club events with the media team'
      ]
    }
  ]

  const education = [
    {
      degree: 'Bachelor of Engineering',
      school: 'Loyola-ICAM College of Engineering & Technology',
      year: '2027',
      details:  'Major in Computer Science and Engineering',
      details2: 'CGPA: 8.21'
    },
    {
      degree: 'Higher Secondary School',
      school: 'Zion Matriculation Higher Secondary School',
      year: '2023',
      details: '93.5%'
    }
  ]

  return (
    <Box id="resume" pt={20} pb={20}>
      <Container maxW="1200px">
        <VStack spacing={12} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
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
              Resume
            </Heading>
            <Text textAlign="center" color={color} fontSize="lg" mb={8}>
              My professional journey and skills
            </Text>
            <Box textAlign="center">
              <Button
                as="a"
                href="src\pages\Resume.pdf"
                download
                colorScheme="blue"
                size="lg"
                leftIcon={<FaDownload />}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Download Resume
              </Button>
            </Box>
          </MotionBox>

          <MotionGrid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
            gap={8}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {skills.map((skillSet, index) => (
              <MotionBox
                key={skillSet.category}
                p={6}
                bg={cardBg}
                borderRadius="lg"
                boxShadow="md"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Flex align="center" mb={4}>
                  <Icon as={skillSet.icon} fontSize="2xl" color="blue.500" mr={2} />
                  <Heading size="md" color={color}>
                    {skillSet.category}
                  </Heading>
                </Flex>
                <VStack spacing={4} align="stretch">
                  {skillSet.items.map((skill) => (
                    <Box key={skill.name}>
                      <Flex justify="space-between" mb={1}>
                        <Text color={color}>{skill.name}</Text>
                        <Text color="gray.500">{skill.level}%</Text>
                      </Flex>
                      <Tooltip label={`${skill.level}% proficiency`}>
                        <Progress
                          value={skill.level}
                          colorScheme="blue"
                          size="sm"
                          borderRadius="full"
                        />
                      </Tooltip>
                    </Box>
                  ))}
                </VStack>
              </MotionBox>
            ))}
          </MotionGrid>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Flex align="center" mb={6}>
              <Icon as={FaBriefcase} fontSize="2xl" color="blue.500" mr={2} />
              <Heading as="h2" size="xl" color={color}>
                Experience
              </Heading>
            </Flex>
            <VStack spacing={6} align="stretch">
              {experience.map((exp, index) => (
                <MotionBox
                  key={index}
                  p={6}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Heading size="md" color={color} mb={2}>
                    {exp.title}
                  </Heading>
                  <Text color="blue.500" mb={2}>
                    {exp.company} | {exp.period}
                  </Text>
                  <Text color={color} mb={4}>{exp.description}</Text>
                  <VStack align="stretch" spacing={2}>
                    {exp.achievements.map((achievement, i) => (
                      <Flex key={i} align="center">
                        <Box
                          w="8px"
                          h="8px"
                          bg="blue.500"
                          borderRadius="full"
                          mr={3}
                        />
                        <Text color={color}>{achievement}</Text>
                      </Flex>
                    ))}
                  </VStack>
                </MotionBox>
              ))}
            </VStack>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Flex align="center" mb={6}>
              <Icon as={FaGraduationCap} fontSize="2xl" color="blue.500" mr={2} />
              <Heading as="h2" size="xl" color={color}>
                Education
              </Heading>
            </Flex>
            <VStack spacing={6} align="stretch">
              {education.map((edu, index) => (
                <MotionBox
                  key={index}
                  p={6}
                  bg={cardBg}
                  borderRadius="lg"
                  boxShadow="md"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Heading size="md" color={color} mb={2}>
                    {edu.degree}
                  </Heading>
                  <Text color="blue.500" mb={2}>
                    {edu.school} | {edu.year}
                  </Text>
                  <Text color={color}>{edu.details}</Text>
                  <Text color={color}>{edu.details2}</Text>
                </MotionBox>
              ))}
            </VStack>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  )
}

export default Resume 