import React from 'react'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Resume from './pages/Resume'
import Contact from './pages/Contact'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Box minH="100vh">
        <Navbar />
        <Box>
          <Home />
          <Projects />
          <Resume />
          <Contact />
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App 