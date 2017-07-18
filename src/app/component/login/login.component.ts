import { Component, OnInit } from '@angular/core';
import { AccueilService } from '../../service/accueil.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = 'wunderadmin';
  pass = 'jgtRFkp35Pt';
  token:string;
  constructor(private router: Router,private accueilService: AccueilService) { }

  ngOnInit() {
  }
  getToken(): void {
    this.accueilService.getLoginToken(this.login, this.pass)
      .then(response => {
        this.token = response.token;
        localStorage.setItem('token', JSON.stringify({ token: this.token }));
        this.router.navigate(['/']);
      });
  }
}
