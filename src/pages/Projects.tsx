import React, { useState, useEffect } from 'react'
import { Box, Container, Heading, SimpleGrid, Text, useColorModeValue, Icon, Flex, Tag, TagLabel, Select, Input, InputGroup, InputLeftElement, VStack, Badge } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { FaGithub, FaStar, FaCode, FaSearch, FaFilter } from 'react-icons/fa'

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  topics: string[]
  created_at: string
  updated_at: string
}

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('updated')
  const [filterLanguage, setFilterLanguage] = useState('all')
  const color = useColorModeValue('gray.800', 'white')
  const bg = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('gray.50', 'gray.700')

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/charlesms1246/repos')
        setRepos(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching repositories:', error)
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  const filteredRepos = repos
    .filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(repo => 
      filterLanguage === 'all' || repo.language === filterLanguage
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count
        case 'updated':
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        case 'created':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

  const languages = ['all', ...new Set(repos.map(repo => repo.language).filter(Boolean))]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <Box id="projects" pt={20} pb={20}>
      <Container maxW="1200px">
        <VStack spacing={12}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            mb={12}
          >
            <Heading
              as="h1"
              size="2xl"
              mb={8}
              textAlign="center"
              bgGradient="linear(to-r, blue.400, purple.600)"
              bgClip="text"
            >
              My Projects
            </Heading>
            <Text textAlign="center" fontSize="xl" color={color}>
              A collection of my work and open source contributions
            </Text>
          </MotionBox>

          {/* Filters */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={8}
            w="100%"
            mb={4}
          >
            <InputGroup maxW={{ base: '100%', md: '300px' }}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaSearch} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Flex gap={4}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                maxW="200px"
              >
                <option value="updated">Recently Updated</option>
                <option value="created">Recently Created</option>
                <option value="stars">Most Stars</option>
              </Select>
              <Select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                maxW="200px"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang === 'all' ? 'All Languages' : lang}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>

          {loading ? (
            <Flex justify="center" align="center" minH="400px">
              <MotionBox
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Icon as={FaCode} fontSize="6xl" color="blue.500" />
              </MotionBox>
            </Flex>
          ) : (
            <MotionBox
              variants={container}
              initial="hidden"
              animate="show"
            >
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                {filteredRepos.map((repo) => (
                  <MotionBox
                    key={repo.id}
                    variants={item}
                    whileHover={{ y: -10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box
                      p={6}
                      bg={cardBg}
                      borderRadius="lg"
                      boxShadow="lg"
                      height="100%"
                      transition="all 0.3s"
                      position="relative"
                      overflow="hidden"
                      _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(45deg, transparent 0%, transparent 50%, rgba(255,255,255,0.1) 50%, transparent 100%)',
                        transform: 'translateX(-100%)',
                        transition: 'transform 0.6s',
                      }}
                      _hover={{
                        _before: {
                          transform: 'translateX(100%)',
                        }
                      }}
                    >
                      <Flex justify="space-between" align="center" mb={4}>
                        <Heading as="h3" size="md" color={color}>
                          {repo.name}
                        </Heading>
                        <Badge colorScheme="blue" fontSize="sm">
                          {repo.language || 'Not specified'}
                        </Badge>
                      </Flex>
                      <Text color={color} mb={4} noOfLines={2}>
                        {repo.description || 'No description available'}
                      </Text>
                      
                      <Flex wrap="wrap" gap={2} mb={4}>
                        {repo.topics?.map((topic) => (
                          <Tag
                            key={topic}
                            size="sm"
                            colorScheme="blue"
                            borderRadius="full"
                            variant="subtle"
                          >
                            <TagLabel>{topic}</TagLabel>
                          </Tag>
                        ))}
                      </Flex>

                      <Flex justify="space-between" align="center">
                        <Flex align="center" color="gray.500">
                          <Icon as={FaStar} mr={1} />
                          <Text fontSize="sm">{repo.stargazers_count}</Text>
                        </Flex>
                        <Text fontSize="xs" color="gray.500">
                          Updated {new Date(repo.updated_at).toLocaleDateString()}
                        </Text>
                      </Flex>

                      <MotionBox
                        as="a"
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        display="inline-flex"
                        alignItems="center"
                        mt={4}
                        color="blue.500"
                        _hover={{ color: 'blue.600' }}
                        whileHover={{ x: 5 }}
                      >
                        <Icon as={FaGithub} mr={2} />
                        View on GitHub
                      </MotionBox>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </MotionBox>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

export default Projects 