import { useState } from 'react';
import { useRef, useEffect } from 'react';
import { Scene } from '../Scene';
import { Sphere } from '../Sphere';
import { GUIHelper } from '../gui';
import styles from './index.module.scss';

export const App = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [gui, setGUI] = useState<GUIHelper|null>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setGUI(new GUIHelper(ref.current));
  }, [ref])
  return <div
    ref={ref}
    className={styles.root}
  >
    <Scene >
      <Sphere gui={gui} />
    </Scene>
  </div>
}