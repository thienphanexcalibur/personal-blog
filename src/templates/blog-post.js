import React, { useEffect } from 'react'
import { Link, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Heading, Text, Badge, useColorMode, Box } from '@chakra-ui/react'
import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/seo'
require('github-markdown-css')

const BlogPostTemplate = props => {
  const post = props.data.mdx
  const siteTitle = props.data.site.siteMetadata.title
  const { previous, next } = props.pageContext
  const { colorMode } = useColorMode()

  const appendUtterances = () => {
    const script = document.createElement('scripts')
    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: 'thienphanexcalibur/personal-blog',
      ['issue-term']: 'title',
      theme: 'github-light',
      crossorigin: 'anonymous',
    }
    for (const [key, value] of Object.entries(attributes)) {
      script.setAttribute(key, value)
    }

    document.head.append(script)
  }
  // useEffect(() => {
  //   appendUtterances();
  // }, [])

  return (
    <Layout location={props.location} title={siteTitle}>
      <SEO title={post.frontmatter.title} description={post.excerpt} />
      <Heading maxW="100%">{post.frontmatter.title}</Heading>
      <Badge colorScheme="cyan" mt={5}>
        <Text colorScheme="whiteAlpha" fontSize="xs" fontWeight="600">
          {post.frontmatter.date}
        </Text>
      </Badge>
      <Text
        className="markdown-body"
        color={colorMode === 'dark' ? 'whiteAlpha.900' : 'gray.800'}
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
      <script
        enabled="true"
        src="https://utteranc.es/client.js"
        repo="thienphanexcalibur/personal-blog"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async
      ></script>
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
