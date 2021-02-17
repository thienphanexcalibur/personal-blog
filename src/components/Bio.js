import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { Flex, Text, Box, Icon, Link } from '@chakra-ui/react'
import {
  FaFacebook as FacebookIcon,
  FaGithub as GithubIcon,
} from 'react-icons/fa'

function Bio() {
  return (
    <Box mb={10}>
      <StaticQuery
        query={bioQuery}
        render={data => {
          const { author, social } = data.site.siteMetadata
          const { name, description } = author
          return (
            <Flex alignItems="center" flexWrap="wrap">
              <Box display={{ sm: 'block' }}>
                <Image
                  fixed={data.avatar.childImageSharp.fixed}
                  alt={name}
                  style={{
                    marginRight: '1.5rem',
                    marginBottom: 0,
                    minWidth: 60,
                    minHeight: 60,
                    borderRadius: `100%`,
                  }}
                />
              </Box>
              <Flex flexDirection="column">
                <Text fontWeight="700" colorScheme="blackAlpha">
                  {name}
                </Text>

                <Text fontSize="sm" fontWeight="600" colorScheme="gray">
                  {description}
                </Text>
                <Flex flexDirection="row" mt={1}>
                  <Link href={social.facebook} mr={2}>
                    <FacebookIcon size="1.5em" />
                  </Link>
                  <Link textDecoration="none" href={social.github}>
                    <GithubIcon size="1.5em" />
                  </Link>
                </Flex>
              </Flex>
            </Flex>
          )
        }}
      />
    </Box>
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
          description
        }
        social {
          github
          facebook
        }
      }
    }
  }
`

export default Bio
