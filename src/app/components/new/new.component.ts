import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
title: string = "Create New Post";
postingIn:string = "local"
  constructor() { }

  ngOnInit(): void {
  }

}
