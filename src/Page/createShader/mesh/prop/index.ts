import { Instance } from '../../../types';
import { BoxParameters } from './box';
import { SphereParameters } from './sphere';

export { Parameters } from './parameters';

export class BuilderGenerator {
  public generate = ({ type, props }: Instance) => {
    switch (type) {
      case 'sphere': return new SphereParameters(props);
      case 'box': return new BoxParameters(props);
    }
  }
}