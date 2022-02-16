import { useCallback } from "react";
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
  const init = useCallback(() => gui?.init(state, setState), [gui, state]);
  useEffect(() => {
    init();
  }, [init])

  const { radius, roughness, metallic, specTrans, specular } = state;
  return <sphere
    radius={radius}
    color={[1, 1, 1]}
    roughness={roughness}
    metallic={metallic}
    specTrans={specTrans}
    specular={specular}
  />
}