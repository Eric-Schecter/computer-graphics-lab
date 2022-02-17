import { useCallback } from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { GUIHelper } from "../gui";

export const Sphere = ({ gui }: { gui: GUIHelper | null }) => {
  const [state, setState] = useState<{ [key: string]: any }>({
    color: [255, 255, 255],
    radius: 50,
    roughness: 1,
    metallic: 0,
    specTrans: 0,
    clearcoat: 0,
    clearcoatGloss: 0,
    specular: 0,
    specColor: [255, 255, 255],
    emissive: [0,0,0],
  });
  const ref = useRef(false);
  const init = useCallback(() => {
    if (ref.current || !gui) { return }
    ref.current = true;
    gui.init(state, setState);
  }, [gui, state]);
  useEffect(() => {
    init();
  }, [init])

  const normalizeColor = (color: number[]) => color.map(c => c / 255);

  const { color, radius, roughness, metallic, specTrans, specular, clearcoat, clearcoatGloss, specColor, emissive } = state;
  return <sphere
    radius={radius}
    color={normalizeColor(color)}
    roughness={roughness}
    metallic={metallic}
    specTrans={specTrans}
    specular={specular}
    clearcoat={clearcoat}
    clearcoatGloss={clearcoatGloss}
    specColor={normalizeColor(specColor)}
    emissive={normalizeColor(emissive)}
  />
}