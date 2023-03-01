import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
// import { TooltipPosition } from '@angular/material/tooltip';
// import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  // positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  // position = new FormControl(this.positionOptions[0]);

  game: Game;
  gameId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {}


  //first we need the firestore-id of the game, then we subscribe the game
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params.id;
      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
    });

  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.pickCardAnimation && this.game.players.length > 0) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1500);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {});

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


  //update game
  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson())
  }




}