import Page, { Camera } from '@youyouzone/react-sdf';

const Table = () => {
  const rawData = [
    { position: [0, 0, -10], size: [10, 5, 50], color: [0.5, 0.3, 0.1] },

    { position: [130, 20, -10], size: [10, 5, 10], color: [0.5, 0.3, 0.1] },

    { position: [-130, 20, -10], size: [10, 5, 10], color: [0.5, 0.3, 0.1] },
    // { position: [0, -50, 0], size: [10, 50, 10], color: [0.5, 0.3, 0.1] },
    // { position: [200, 50, 0], size: [1, 150, 100], color: [0.5, 0.3, 0.1] },
    // { position: [0, 0, -100], size: [200, 200, 1], color: [0.5, 0.3, 0.1] },
    // { position: [0, -100, 0], size: [200, 1, 100], color: [0.5, 0.3, 0.1] },
  ]
  return <>
    {rawData.map(({ position, size, color }, i) =>
      <box
        key={i}
        position={position}
        size={size}
        color={color}
      />
    )}
  </>
}

const Room = () => {
  const rawData = [
    { position: [0, 180, 0], size: [100, 0.01, 25], color: [1.0, 1., 1.], emissive: [10, 10, 10] },
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
  >
    <Camera
      position={[0, 50, 250]}
      lookat={[0, 50, 0]}
      rotation={0}
      fov={50 / 180 * Math.PI}
    />
    <Room />
    <sphere
      position={[50, -45, 0]}
      radius={50}
      color={[1, 1, 1]}
      roughness={0}
      specTrans={1}
      specular={0.02}
    />
    <Table />
  </Page>
}