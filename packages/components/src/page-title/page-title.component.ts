import {Component, Input, OnInit, Optional} from '@angular/core'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'lhs-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css'],
})
export class PageTitleComponent implements OnInit {
  constructor(@Optional() private activatedRoute: ActivatedRoute) {}

  @Input()
  text?: string

  ngOnInit() {
    if (!this.text) {
      this.text = this.activatedRoute?.snapshot.data.title
    }
  }
}
