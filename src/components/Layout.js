import React from 'react'
import { Link } from 'gatsby'
import {
  Container,
  Heading,
  IconButton,
  Text,
  Flex,
  useColorMode,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

const Header = ({ title }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex alignItems="center" justifyContent="space-between" mb={5}>
      <Heading fontSize="sm">
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </Heading>
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
      />
    </Flex>
  )
}

class Layout extends React.Component {
  render() {
    const { title, children } = this.props

    return (
      <Container my={10} overflowX="hidden">
        <Header title={title} />
        {children}
        <footer style={{ marginTop: '1rem' }}>
          <Text textAlign="center" fontWeight="700" colorScheme="gray">
            © {new Date().getFullYear()}, Thien K. Phan
          </Text>
        </footer>
      </Container>
    )
  }
}

export default Layout
