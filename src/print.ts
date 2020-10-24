import { red, yellow, blue, green } from 'chalk';
import { textSync } from 'figlet';

export const printTitle = (title: string): void =>
  console.log(blue(textSync(title)));

export const printError = (error: Error): void => {
  console.error(red(`ERROR: ${error.message}`));
  process.exitCode = 1;
};

export const printWarning = (message: string): void => {
  console.warn(yellow(`WARNING: ${message}`));
};

export const printSuccess = (message: string): void => {
  console.info(green(`SUCCESS: ${message}`));
};
