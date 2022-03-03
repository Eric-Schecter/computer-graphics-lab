import Page, { Camera } from '@youyouzone/react-sdf';

const Table = () => {
  const rawData = [
    { bottom: [0, -100, 15], top: [0, -5, 15], radius: 5, color: [0.5, 0.3, 0.1] },
    { bottom: [0, -100, -55], top: [0, -5, -55], radius: 5, color: [0.5, 0.3, 0.1] },
    { bottom: [160, -100, 15], top: [160, -5, 15], radius: 5, color: [0.5, 0.3, 0.1] },
    { bottom: [160, -100, -55], top: [160, -5, -55], radius: 5, color: [0.5, 0.3, 0.1] },
  ]
  return <group
    position={[0, 0, 0]}
  >
    <box
      position={[80, 0, -20]}
      size={[100, 5, 50]}
      color={[0.5, 0.3, 0.1]}
    />
    {rawData.map(({ top, bottom, radius, color }, i) =>
      <cylinder
        key={i}
        top={top}
        bottom={bottom}
        radius={radius}
        color={color}
      />
    )}
  </group>
}

const LampCover = () => {
  const rawData = [
    { position: [0, 145, 0], size: [120, 1, 45], color: [0.5, 0.49, 0.5] },
    { position: [0, 165, -40], size: [120, 20, 1], color: [0.5, 0.49, 0.5] },
    { position: [0, 165, 40], size: [120, 20, 1], color: [0.5, 0.49, 0.5] },
    { position: [120, 165, 0], size: [1, 20, 45], color: [0.5, 0.49, 0.5] },
    { position: [-120, 165, 0], size: [1, 20, 45], color: [0.5, 0.49, 0.5] },
  ]
  return <group
    position={[0, 0, 0]}
  >
    {rawData.map(({ position, size, color }, i) =>
      <box
        key={i}
        position={position}
        size={size}
        color={color}
      />
    )}
  </group>
}

const Room = () => {
  const rawData = [
    { position: [0, 180, 0], size: [100, 0.01, 25], color: [1., 1., 1.], emissive: [10, 10, 10] },
    { position: [0, 201, 0], size: [200, 1, 100], color: [0.5, 0.49, 0.5] },
    { position: [-200, 50, 0], size: [1, 150, 100], color: [0.5, 0.49, 0.5] },
    { position: [200, 50, 0], size: [1, 150, 100], color: [0.5, 0.49, 0.5] },
    { position: [0, 0, -100], size: [200, 200, 1], color: [0.5, 0.49, 0.5] },
    { position: [0, -100, 0], size: [200, 1, 100], color: [0.5, 0.49, 0.5] },
  ]
  return <>
    {rawData.map(({ position, size, color, emissive }, i) =>
      <box
        key={i}
        position={position}
        size={size}
        color={color}
        emissive={emissive}
      />
    )}
  </>
}

export const App = () => {

  return <Page
    style={{ width: '100%', height: '100vh' }}
    bidirection
  >
    <Camera
      position={[0, 50, 250]}
      lookat={[0, 50, 0]}
    />
    <Room />
    <LampCover />
    <Table />
  </Page>
}