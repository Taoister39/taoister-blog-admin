import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent {
  loadFileMd(inputRef: HTMLInputElement) {
    const file: File | undefined = inputRef?.files?.[0];

    if (file) {
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        this.content = reader.result as string;
      };
    }
  }
  
  @Input() content = '';

  @Input() isShowReadFileButton = false;
}
