import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  currentPlayer = 0;
  playedCards = [];
  players = [];
  name: string = '';

  constructor(private router: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
  }

  //first we need the firestore-id of the game, then we subscribe the game
  ngOnInit(): void {
    this.newGame();
    this.router.params.subscribe((params) => {
      console.log(params.id);
    });

      this
      .firestore
      .collection('games')
      .valueChanges()
      .subscribe((game) => {
        console.log('Game update', game)
      });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log('new card: ' + this.currentCard);
      console.log('game is: ' + this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1500);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
}