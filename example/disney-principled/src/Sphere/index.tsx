import { useEffect, useState } from "react";
import { GUIHelper } from "../gui";

export const Sphere = ({ gui }: { gui: GUIHelper | null }) => {
  const [state, setState] = useState<{ [key: string]: any }>({
    color: [1, 1, 1],
    radius: 50,
    roughness: 1,
    metallic: 0,
    specTrans: 0,
    clearcoat: 0,
    clearcoatGloss: 0,
    specular: 0,
  });

  useEffect(() => {
    if (!gui) {
      return;
    }
    gui.init(state, setState);
  }, [gui])

  const { radius, color, roughness, metallic, specTrans, specColor, clearcoat, clearcoatGloss, specular } = state;
  return <sphere
    radius={radius}
    color={[1,1,1]}
    roughness={roughness}
    metallic={metallic}
    specTrans={specTrans}
    // specColor={specColor}
    // clearcoat={clearcoat}
    // clearcoatGloss={clearcoatGloss}
    specular={specular}
  />
}