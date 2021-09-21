import {Component} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  onUsuariosClick() {
    const urls = this.activatedRoute.snapshot.data.urls
    this.router.navigateByUrl(urls.usuarios)
  }
}
