import React, { useCallback, useEffect, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Heading, Text, Badge, useColorMode, Box } from '@chakra-ui/react'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import { Helmet } from 'react-helmet'
import Comment from './comment';
require('github-markdown-css')

const BlogPostTemplate = props => {
  const post = props.data.mdx
  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext
  const { colorMode } = useColorMode()

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Heading maxW="100%">{post.frontmatter.title}</Heading>
      <Badge colorScheme="cyan" mt={5}>
        <Text colorScheme="cyan" fontSize="xs" fontWeight="700">
          {post.frontmatter.date}
        </Text>
      </Badge>
      <Text
        className="markdown-body"
        my={5}
      >
        <MDXRenderer>{post.body}</MDXRenderer>
      </Text>
      <Bio />
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
      <Comment />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`
