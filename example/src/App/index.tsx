import Page, { Camera } from '@youyouzone/react-sdf';

export const App = () => {
  const rawData = [
    { position: [0, 180, 0], size: [100, 0.01, 25], color: [1.0, 0.7, 0.38], emissive: [10, 10, 10], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearcoat: 0, clearcoatGloss: 0 },
    { position: [0, 201, 0], size: [200, 1, 100], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearcoat: 0, clearcoatGloss: 0 },
    { position: [-200, 50, 0], size: [1, 150, 100], color: [1, 0, 0], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearcoat: 0, clearcoatGloss: 0 },
    { position: [200, 50, 0], size: [1, 150, 100], color: [0, 1, 0], emissive: [0, 0, 0], roughness: 0.1, metallic: 1, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearcoat: 0, clearcoatGloss: 0 },
    { position: [0, 0, -100], size: [200, 200, 1], color: [0, 1, 1], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearcoat: 0, clearcoatGloss: 0 },
    { position: [0, -100, 0], size: [200, 1, 100], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearcoat: 0, clearcoatGloss: 0 },
    { position: [-50, -40, 0], size: [30, 60, 30], color: [0.5, 0.3, 0.6], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearcoat: 0, clearcoatGloss: 0 },
  ]

  return <Page
    style={{ width: '100%', height: '100vh' }}
  >
    <Camera
      position={[0, 50, 250]}
      lookat={[0, 50, 0]}
      rotation={0}
      fov={50 / 180 * Math.PI}
    />
    {rawData.map(({ position, size, color, emissive, roughness, metallic, specTrans, IoR, specColor, clearcoat,clearcoatGloss }, i) =>
      <box
        key={i}
        position={position}
        size={size}
        color={color}
        emissive={emissive}
        roughness={roughness}
        metallic={metallic}
        specTrans={specTrans}
        specColor={specColor}
        clearcoat={clearcoat}
        clearcoatGloss={clearcoatGloss}
        IoR={IoR}
      />
    )}
    <sphere
      position={[50, -45, 0]}
      radius={50}
      color={[1, 1, 1]}
      emissive={[0, 0, 0]}
      roughness={0}
      metallic={0}
      specTrans={1}
      specColor={[1, 1, 1]}
      clearcoat={0}
      clearcoatGloss={0}
      IoR={1.1}
    />
  </Page>
}