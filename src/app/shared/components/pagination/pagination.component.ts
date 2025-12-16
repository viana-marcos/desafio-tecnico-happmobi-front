import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  
  @Input()
  pages: number = 0;
  atualPage = 0;
  @Output() pageEvent = new EventEmitter<any>();

  get pagesSequence (): number[]{
    return Array(this.pages)
  }

  changePage(page:number){
    this.atualPage = page;
    this.pageEvent.emit(page);
    return false;
  }
  
}
