import { useColorMode } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

const Comment = () => {
  const { colorMode } = useColorMode()

  const commentRef = useRef(null)

  const appendUterrances = node => {
    const script = document.createElement('script')
    if (node && colorMode) {
      const theme = `github-${colorMode}`
      const attributes = {
        src: `https://utteranc.es/client.js?v=${Math.round(Math.random() * 1000)}`,
        repo: 'thienphanexcalibur/personal-blog',
        ['issue-term']: 'title',
        theme,
        crossorigin: 'anonymous',
        async: true,
      }
      for (const [key, value] of Object.entries(attributes)) {
        script.setAttribute(key, value)
      }
      node.appendChild(script)
    }
  }

  useEffect(() => {
    appendUterrances(commentRef.current);
  }, [colorMode]);

  return <div ref={commentRef} />
}

export default Comment
