import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from 'firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: Firestore, private router: Router) { }

  ngOnInit(): void {
  }


  //new game will created in firestore, button start game
  newGame() {
    this
    .firestore
    .collection('games')
    .add(game.toJson());
    .then( (gameInfo: any) => {

    this.router.navigateByUrl('/game/', gameInfo.id);
    });

  }



}
