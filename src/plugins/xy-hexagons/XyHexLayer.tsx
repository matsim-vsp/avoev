import React from 'react'
import { StaticMap } from 'react-map-gl'
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core'
import { HexagonLayer } from '@deck.gl/aggregation-layers'
import DeckGL from '@deck.gl/react'

const MAPBOX_TOKEN =
  'pk.eyJ1IjoidnNwLXR1LWJlcmxpbiIsImEiOiJjamNpemh1bmEzNmF0MndudHI5aGFmeXpoIn0.u9f04rjFo7ZbWiSceTTXyA'

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
})

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
})

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
})

const lightingEffect = new LightingEffect({ ambientLight, pointLight1, pointLight2 })

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
}

const INITIAL_VIEW_STATE = {
  zoom: 9,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40,
  bearing: 0,
}

export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
]

function getTooltip({ object }: any) {
  if (!object || !object.position || !object.position.length) {
    return null
  }

  const lat = object.position[1]
  const lng = object.position[0]
  const count = object.points.length

  return {
    text: `\
    ${count} Pickups
    latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
    longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}
    `,
  }
}

/* eslint-disable react/no-deprecated */
export default function App({
  data = [],
  mapStyle = 'mapbox://styles/mapbox/dark-v9', // 'mapbox://styles/vsp-tu-berlin/ckeetelh218ef19ob5nzw5vbh', // 'mapbox://styles/mapbox/light-v9', //
  radius = 100,
  upperPercentile = 100,
  coverage = 0.8,
  extrude = true,
  maxHeight = 500,
  center = [14.34, 52.3],
}) {
  const [lon, lat] = center
  const initialView = Object.assign(INITIAL_VIEW_STATE, { longitude: lon, latitude: lat })

  const layers = [
    new HexagonLayer({
      id: 'hexlayer',
      colorRange,
      coverage,
      data,
      autoHighlight: true,
      elevationRange: [0, maxHeight],
      elevationScale: data && data.length ? 50 : 0,
      extruded: extrude,
      getPosition: (d: any) => d,
      pickable: true,
      radius,
      upperPercentile,
      material,
      transitions: {
        elevationScale: { type: 'interpolation', duration: 1000 },
      },
    }),
  ]

  return (
    /*
    //@ts-ignore */
    <DeckGL
      layers={layers}
      effects={[lightingEffect]}
      initialViewState={initialView}
      controller={true}
      getTooltip={getTooltip}
    >
      {
        /*
        // @ts-ignore */
        <StaticMap
          reuseMaps
          mapStyle={mapStyle}
          preventStyleDiffing={true}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        />
      }
    </DeckGL>
  )
}
