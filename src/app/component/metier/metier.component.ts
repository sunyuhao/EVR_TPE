import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { MetierService } from '../../service/metier.service';
import { SituationTravail } from '../../class/situation-travail'
import { CurrentMetier } from '../../class/current-metier';
import { SearchMetier } from '../../class/search-metier';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-metier',
  templateUrl: './metier.component.html',
  styleUrls: ['./metier.component.css'],
  providers: [MetierService]
})
export class MetierComponent implements OnInit, AfterViewInit {
  title = "TAM TAM";
  login = 'wunderadmin';
  pass = 'jgtRFkp35Pt';
  organizationId = 458543;
  fileId = "-1";
  mode = "STD"
  orgId: string = "-1"
  evaluationId = JSON.parse(localStorage.getItem('evaluationLS')).evaluationId;
  token = JSON.parse(localStorage.getItem('token')).token;
  fileName = JSON.parse(localStorage.getItem('evaluationLS')).fileName;
  situationTravailGroups: SituationTravail[];
  currentMetiers: CurrentMetier[];

  s: SearchMetier[];
  searchMetiers: Observable<SearchMetier[]>;
  private searchTerms = new Subject<string>();
  constructor(private router: Router, private metierService: MetierService, private el: ElementRef) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    this.getListSTByGroup();
    this.getCurrentMetier();
    this.searchCore();
  }//end ngOnInit


  ngAfterViewInit() {
    /* ---------------------- JQuery ----------------------*/
    // $('.working-situation-menu').mouseenter(function () {
    //   $(this).children('.expand').addClass('turn');
    // });

    // $('.working-situation-menu').mouseleave(function () {
    //   if ($(this).hasClass('open')) {
    //   } else {
    //     $(this).children('.expand').removeClass('turn');
    //   }
    // });
    $('.working-situation-menu').click(function () {
      var $this = $(this);
      if ($this.hasClass('open')) {
        $('.working-situation-menu').removeClass('open');
        $('.sub-menu').stop(true).slideUp("fast");
        $('.expand').removeClass('turn');
        $this.removeClass('open');
        $this.children('.expand').removeClass('turn');
        $this.next().stop(true).slideUp("fast");
      }
      else {
        $('.working-situation-menu').removeClass('open');
        $('.sub-menu').stop(true).slideUp("fast");
        $('.expand').removeClass('turn');

        $this.addClass('open');
        $this.children('.expand').addClass('turn');
        $this.next().stop(true).slideDown("fast");
      }
    });

    $(".checkAll").click(function () {
      $(this).closest("div").find("input:checkbox").prop('checked', this.checked);
    });

    $(".checkSituation").click(function () {
      if (!$(this).is(':checked')) {
        $(this).closest("div").find(".checkAll").prop('checked', this.checked);
      }
    });

    // $(".sub-menu").mCustomScrollbar({
    //   scrollInertia: 400,
    //   mouseWheel: { scrollAmount: 80 },
    //   theme: 'dark-3'
    // });
    /*---------------------- End JQuery ----------------------*/
  }


  getListSTByGroup() {
    this.metierService.getListSTByGroup(this.token, this.organizationId).then(response => {
      this.situationTravailGroups = response
    });
  }

  getCurrentMetier() {
    this.metierService.getCurrentMetier(this.token, this.evaluationId).then(response => {
      this.currentMetiers = [];
      response.forEach(element => {
        this.currentMetiers.push(element);
      });
    });
  }

  addMetier(metierId) {
    if (this.currentMetiers.length < 6) {
      this.metierService.addMetier(this.token, this.evaluationId, metierId).then(response => {
        this.s = response;
        this.getCurrentMetier();
        this.searchCore();
      });
    } else {
      this.searchCore();
    }

  }

  deleteMetier(metierId) {
    this.metierService.deleteMetier(this.token, this.evaluationId, metierId).then(response => {
      this.s = response;
      this.getCurrentMetier();
    });

  }

  searchCore() {
    this.searchMetiers = this.searchTerms
      .debounceTime(100)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.metierService.search(term, this.token)
        // or the observable of empty metier if there was no search term
        : Observable.of<SearchMetier[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<SearchMetier[]>([]);
      });
  }

  createCustomMetier(name) {
    var stArray = $("input:checkbox.checkSituation:checked").map(function () {
      return $(this).val();
    }).get();
    if(name){
      this.metierService.createCustomMetier(this.token, name, stArray, this.evaluationId).then(response => {
        this.s = response;
        this.getCurrentMetier();
        this.searchCore();
      });
    }else{
      alert("test")
    }

  }

  gotoAccueil(): void {
    this.router.navigate(['/accueil']);
  }

  dropDownList() {
    var $this = $(event.target);
    if ($this.hasClass('open')) {
      // $(".working-situation-menu").addClass("open")
      $this.removeClass('open');

      // $(".sub-menu").stop(true).slideDown("fast");
      $this.next(".sub-menu").stop(true).slideUp("fast");
    }
    else {
      // $(".working-situation-menu").removeClass("open")
      $this.addClass('open');

      // $(".sub-menu").stop(true).slideUp("fast");
      $this.next(".sub-menu").stop(true).slideDown("fast");
    }
  }


  checkAll() {
    var $this = $(event.target);
    var isChecked = $this.prop('checked');
    if (isChecked == true) {
      $this.prop('checked', false);
      $this.closest("div").find("input:checkbox").prop('checked', true);
    } else if (isChecked == false) {
      $this.prop('checked', true);
      $this.closest("div").find("input:checkbox").prop('checked', false);
    }

  }
}
