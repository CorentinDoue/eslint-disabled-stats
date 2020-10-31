// @ts-ignore
import { legacyFunction } from './legacy/legacy-file';

const main: Function = () => {
  // FIXME
  // eslint-disable-next-line prefer-const
  let legacyOutput = legacyFunction();
  // eslint-disable-next-line eqeqeq, curly
  if (legacyOutput == 0) console.log('the legacy function is operational');
};
