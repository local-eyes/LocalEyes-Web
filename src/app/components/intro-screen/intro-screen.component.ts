import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-intro-screen',
  templateUrl: './intro-screen.component.html',
  styleUrls: ['./intro-screen.component.css']
})
export class IntroScreenComponent implements OnInit {
  data = [
    {
      step: 1,
      title: "Ask & Answer Questions",
      description: "Ask questions in your locality and get true insights from people living there",
      img: "../../../assets/imgs/intro.svg"
    },
    {
      step: 2,
      title: "Make Announcement",
      description: "Share experiences with people about your locality and tell them things they might not know",
      img: "../../../assets/imgs/intro.svg"
    },
    {
      step: 3,
      title: "A Look Around You",
      description: "Get a locally curated feed of your neighborhood and city",
      img: "../../../assets/imgs/intro.svg"
    },
    {
      step: 1,
      title: "Every question matters",
      description: "Look at all the unanswered questions around you and share your opinions about them",
      img: "../../../assets/imgs/intro.svg"
    }
  ]
  step: number = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  increaseStep() {
    this.step += 1;
  }
  close() {
    this.dialog.closeAll()
  }
  back() {
    this.step -= 1;
  }


}
