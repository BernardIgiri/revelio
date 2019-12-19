import React from 'react'

import { storiesOf } from '../@storybook/react'

import Visualizations from './visualizations'
import { SelectionProvider } from '../react-hooks/use-selection-interface'
import { DrawProvider } from '../react-hooks/use-draw-interface'

const stories = storiesOf('Workspaces', module)

import genResults from '../gen-results'

stories.add('Visualizations', () => {
  const results = genResults()

  return (
    <DrawProvider>
      <SelectionProvider>
        <div style={{ height: '100vh' }}>
          <Visualizations results={results} />
        </div>
      </SelectionProvider>
    </DrawProvider>
  )
})
