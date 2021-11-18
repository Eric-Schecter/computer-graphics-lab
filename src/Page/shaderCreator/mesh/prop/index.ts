import { Instance } from '../../../types';
import { BoxParameters } from './box';
import { SphereParameters } from './sphere';

export { Parameters } from './parameters';

export class PropGenerator {
  public generate = ({ type,id }: Instance) => {
    switch (type) {
      case 'sphere': return new SphereParameters(id);
      case 'box': return new BoxParameters(id);
    }
  }
}