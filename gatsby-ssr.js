import React from 'react'
import { wrapRootElement as wrap } from './wrap-root-element.js'
import { ColorModeScript } from '@chakra-ui/react'
import theme from './src/@chakra-ui/gatsby-plugin/theme'
export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <ColorModeScript
      initialColorMode={theme.config.initialColorMode}
      key="chakra-ui-no-flash"
    />,
  ])
}
export const wrapRootElement = wrap
