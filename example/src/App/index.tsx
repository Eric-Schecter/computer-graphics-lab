// import styles from './index.module.scss';
import { Page } from '../Page';

export const App = () => {
  return <Page >
    <sphere
      position={{ x: 0, y: 1, z: 0 }}
      radius={1.0}
      color={{ x: .5, y: .3, z: .6 }}
      diffuse={1}
      specular={0.01}
    />
    <sphere
      position={{ x: -1.5, y: 1, z: 0 }}
      radius={0.1}
      color={{ x: .5, y: .3, z: .6 }}
      diffuse={1}
      specular={0.01}
    />
  </Page>
}