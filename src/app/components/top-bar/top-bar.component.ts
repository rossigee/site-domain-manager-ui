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
    this.agents = ['waf', 'dns', 'hosting'];
  }

  get isAgent(): boolean {
    const reg: RegExp = /([^/]+)/;
    const match = reg.exec(this.route.url);
    if (!match || !match[1]) {
      return false;
    }
    return this.agents.includes(match[1]);
  }

  ngOnInit() {}
}
