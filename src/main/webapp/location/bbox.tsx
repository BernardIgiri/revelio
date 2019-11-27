import * as React from 'react'
import { geometry, coordinates as coordinateEditor } from 'geospatialdraw'
import { Filter, INTERSECTS, ANY_GEO, GEOMETRY } from './filter'
import { geoToWKT } from './geo-to-wkt'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Point from './point'
import Props from './geo-editor'
import SpacedLinearContainer from '../spaced-linear-container'

export const generateFilter = (geo: geometry.GeometryJSON): Filter => ({
  type: INTERSECTS,
  property: ANY_GEO,
  value: {
    type: GEOMETRY,
    value: geoToWKT(geo),
  },
  geojson: geo,
})

const BBox: React.SFC<Props> = ({ value, onChange, coordinateUnit }) => {
  const { id, bbox, properties } = coordinateEditor.geoToBBoxProps(value)
  const [lowerRight, upperLeft] = coordinateEditor.bboxToCoordinatePair(bbox)
  const containerDirection =
    coordinateUnit === coordinateEditor.UTM ? 'row' : 'column'
  const formControlStyle: any = {
    display: 'flex',
    flexDirection: containerDirection,
  }
  const formLabelStyle: any =
    coordinateUnit === coordinateEditor.UTM
      ? {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '0.5em',
        }
      : {}
  return (
    <SpacedLinearContainer direction={containerDirection} spacing={2}>
      <FormControl style={formControlStyle}>
        <FormLabel style={formLabelStyle}>Upper Left</FormLabel>
        <Point
          coordinateUnit={coordinateUnit}
          value={upperLeft}
          onChange={update =>
            onChange(
              coordinateEditor.bboxPropsToGeo({
                id,
                bbox: coordinateEditor.coordinatePairToBBox([
                  update,
                  lowerRight,
                ]),
                properties,
              })
            )
          }
        />
      </FormControl>
      <FormControl style={formControlStyle}>
        <FormLabel style={formLabelStyle}>Lower Right</FormLabel>
        <Point
          coordinateUnit={coordinateUnit}
          value={lowerRight}
          onChange={update =>
            onChange(
              coordinateEditor.bboxPropsToGeo({
                id,
                bbox: coordinateEditor.coordinatePairToBBox([
                  update,
                  upperLeft,
                ]),
                properties,
              })
            )
          }
        />
      </FormControl>
    </SpacedLinearContainer>
  )
}

export default BBox