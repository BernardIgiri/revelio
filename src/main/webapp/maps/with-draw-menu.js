import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import { menu, drawing } from 'geospatialdraw'
import { useTheme } from '../theme/theme-provider'

const Root = props => (
  <Box
    position="relative"
    display="flex"
    flexDirection="column"
    width="100%"
    height="100%"
    margin={0}
    padding={0}
    {...props}
  />
)
const MenuContainer = props => {
  const {
    palette: {
      background: {
        default: bgcolor
      }
    }
  } = useTheme()
  return (<Box bgcolor={bgcolor} {...props} />)
}
const Menu = menu.MaterialDrawMenu

const withDrawMenu = WorldMap => ({
  drawGeo,
  drawShape,
  onSetShape,
  onOk,
  onCancel,
  onUpdate,
  defaultGeoProperties,
  isDrawing,
  drawStyle,
  mapStyle,
  onMapLoaded = () => {},
  ...rest
}) => {
  const {
    palette: {
      text: {
        primary: iconColor
      }
    }
  } = useTheme()
  const [drawToolbox, setToolbox] = useState(null)
  const [map, setMap] = useState(null)
  const isActive = drawToolbox && isDrawing
  useEffect(
    () => {
      if (map && !drawToolbox) {
        setToolbox(
          new drawing.openlayers.DrawingToolbox({
            map,
            drawingStyle: drawStyle,
          })
        )
        onMapLoaded(map)
      }
    },
    [map, onMapLoaded, drawToolbox, drawStyle]
  )
  return (
    <Root>
      {drawToolbox === null ? null : (
        <MenuContainer>
          <Menu
            shape={drawShape}
            toolbox={drawToolbox}
            isActive={isActive}
            geometry={drawGeo}
            onCancel={onCancel}
            onOk={onOk}
            onSetShape={onSetShape}
            onUpdate={onUpdate}
            disabledShapes={['Point']}
            defaultGeoProperties={defaultGeoProperties}
            iconColor={iconColor}
          />
        </MenuContainer>
      )}
      <WorldMap style={mapStyle} onMapLoaded={setMap} {...rest} />
    </Root>
  )
}

export default withDrawMenu
