import Page, { Camera } from '@youyouzone/react-sdf';

export const App = () => {
  const rawData = [
    { position: [0, 180, 0], size: [100, 0.01, 25], color: [1.0, 0.7, 0.38], emissive: [10, 10, 10] },
    { position: [0, 0, -100], size: [400, 200, 1], color: [0, 1, 1] },
    { position: [0, -50, 0], size: [400, 1, 200], color: [0.7, 0.7, 0.7] },
  ]

  return <Page
    style={{ width: '100%', height: '100vh' }}
  >
    <Camera
      position={[0, 15, 200]}
      lookat={[0, 15, 0]}
      rotation={0}
      fov={30 / 180 * Math.PI}
    />
    {rawData.map(({ position, size, color, emissive }, i) =>
      <box
        key={i}
        position={position}
        size={size}
        color={color}
        emissive={emissive}
      />
    )}
    <model
      src={'models/StanfordDragon.glb'}
      position={[0,-50,0]}
    />
  </Page>
}