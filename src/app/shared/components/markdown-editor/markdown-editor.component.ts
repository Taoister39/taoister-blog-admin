import { Component, Input, Output, EventEmitter } from '@angular/core';

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
        this.setContent(reader.result as string);
      };
    }
  }

  @Input() content!: string;
  @Output() contentChange = new EventEmitter<string>();

  @Input() isShowReadFileButton = false;

  setContent(content: string) {
    this.content = content;
    this.contentChange.emit(content);
  }
}
