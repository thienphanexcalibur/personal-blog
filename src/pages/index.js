import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { Text, Box, List, ListItem, Badge } from '@chakra-ui/react'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <List>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <ListItem
                key={node.fields.slug}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={3}
                mb={5}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  <Text fontWeight="600" fontSize="lg" colorScheme="blackAlpha">
                    {title}
                  </Text>
                  <Text
                    fontSize="sm"
                    colorScheme="gray"
                    py={2}
                    dangerouslySetInnerHTML={{ __html: node.excerpt }}
                  />
                  <Badge colorScheme="cyan">
                    <Text
                      colorScheme="whiteAlpha"
                      fontSize="xs"
                      fontWeight="600"
                    >
                      {node.frontmatter.date}
                    </Text>
                  </Badge>
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
