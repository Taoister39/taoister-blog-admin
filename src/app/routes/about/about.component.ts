import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  handleSaveAbout() {}
  handleGetAbout() {}

  markdown = '';

  loadFileMd(inputRef: HTMLInputElement) {
    const file: File | undefined = inputRef?.files?.[0];

    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        this.markdown = reader.result as string;
      };
    }
  }
}
