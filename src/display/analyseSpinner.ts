import ora, { Ora } from 'ora';
import { printInfo } from './print';

export class AnalyseSpinner {
  private spinner: Ora;
  private numberOfFilesDone = 0;
  constructor(private numberOfFiles: number) {
    printInfo(`Analysing ${numberOfFiles} files...`);
    this.spinner = ora(this.getText()).start();
  }
  public tick(): void {
    this.numberOfFilesDone += 1;
    this.spinner.text = this.getText();
  }

  public stop(): void {
    this.spinner.stop();
  }

  private getText(): string {
    return `${this.numberOfFilesDone}/${this.numberOfFiles}`;
  }
}
