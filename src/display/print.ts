import { blue, dim, green, red, yellow } from 'chalk';
import { textSync } from 'figlet';
import { Unicode } from '../unicode';

export const printTitle = (title: string): void =>
  console.log(blue(textSync(title)));

export const printError = (error: Error): void => {
  console.error(red(`${Unicode.RedCross} ${error.message}`));
  process.exitCode = 1;
};

export const printWarning = (message: string): void => {
  console.warn(yellow(`${Unicode.Warning} ${message}`));
};

export const printSuccess = (message: string): void => {
  console.info(green(`${Unicode.CheckMark} ${message}`));
};

export const printInfo = (message: string): void => {
  console.info(dim(`${Unicode.Information} ${message}`));
};
