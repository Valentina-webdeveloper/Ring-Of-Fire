import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  game: Game;

  constructor(private firestore: AngularFirestore, private router: Router) { }

  /**
   * 1. Creates a new instance of the Game object
   * 2. Adds the new object to the Firestore
   * 3. With .then() the ID of the document in the Firestore is assigned to the variable gameID
   * 4. Navigates to a new game with the unique gameID as URL
   */
  startNewGame() {
    this.game = new Game;
    this.firestore
      .collection('games')
      .add(this.game.toJSON())
      .then((gameInfo) => {
        let gameID = gameInfo.id;
        this.game.documentID = gameID;

        // console.log('Game ID: ', gameID);

        this.router.navigateByUrl('/game/' + gameID);
        this.updateFirestore(gameID);
      });
  }

  /**
   * CRUD => CREATE
   * Adds data to the Firestore
   * @param collection The collection of the Firestore
   * @param element The element in the collection
   */
  addToFirestore(collection: string, element: object) {
    this.firestore.collection(collection).add({ 'game': element });
  }

  /**
   * CRUD => READ
   * Fetches the data from the Firestore
   * @param gameID The document id from firestore
   */
  getDataFromFirestore(gameID) {
    this.firestore
      .collection('games')
      .doc(gameID)
      .valueChanges()
      .subscribe((game) => {
        // console.log('Firestore update: ', game);
        this.updateLocalData(game);
      })
  }

  /**
   * CRUD => UPDATE
   * Updates the firestore data
   * @param gameID The document id from firestore
   */
  updateFirestore(gameID) {
    this.firestore
      .collection('games')
      .doc(gameID)
      .update(this.game.toJSON());
  }

  /**
   * CRUD => DELETE
   * Deletes the passed document
   * @param gameID The document id from firestore
   */
  deleteFromFirestore(gameID) {
    this.firestore.collection('games').doc(gameID).delete();
  }

  /**
   * Updates the local variables
   * @param game The game object from Firestore
   */
  updateLocalData(game: any) {
    this.game.currentPlayer = game.currentPlayer;
    this.game.playedCards = game.playedCards;
    this.game.players = game.players;
    this.game.playerImages = game.playerImages;
    this.game.stack = game.stack;
    this.game.currentCard = game.currentCard;
    this.game.drawCardAnimation = game.drawCardAnimation;
    this.game.maxPlayerLimitReached = game.maxPlayerLimitReached;
    this.game.gameOver = game.gameOver;
    this.game.backgroundImage = game.backgroundImage;
    this.game.documentID = game.documentID;
    this.game.timestamp = game.timestamp;

    // console.log('Local update: ', this.game);
  }

}
