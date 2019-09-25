import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css'],
})
export class TopBarComponent implements OnInit {
  isCollapsed: boolean;
  agents: string[];

  constructor(private route: Router) {
    this.isCollapsed = true;
    this.agents = ['/waf', '/dns', '/hosting'];
  }

  get isAgent(): boolean {
    return this.agents.includes(this.route.url);
  }

  ngOnInit() {}
}
