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


  newGame() {
    //start game
    let game = new Game();

    this
    .firestore
    .collection('games')
    .add(this.game.toJson());
    .then( (gameInfo: any) => {
      console.log(gameInfo);
    });

    this.router.navigateByUrl('/game');
  }



}
