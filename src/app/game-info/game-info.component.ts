import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    {title: 'Waterfall', description: 'Everyone has to drink'},
    {title: 'You', description: 'You decide sho drinks'},
    {title: 'Me', description: 'I have to drink'},
    {title: 'Category', description: 'Come up with a category (e.g. colors), each player has to choose one item from the category'},
    {title: 'Bust a jive', description: 'Player 1 dances a dance move, player 2 has to repeat and add a new move'},
    {title: 'Chicks', description: 'All girls drink'},
    {title: 'Heaven', description: 'Put your hands up. The last player drinks'},
    {title: 'Mate', description: 'Pick a mate, who always has to drink, when you drink and the other way around'},
    {title: 'Thumbmaster', description: 'I have to drink'},
    {title: 'Men', description: 'All men drink'},
    {title: 'Quizmaster', description: 'Aks a question'},
    {title: 'Never have I ever...', description: 'Say something you never did. Everyone who did it has to drink'},
    {title: 'Rule', description: 'Make a rule. Everyone has to drink when he breaks the rule'},
    ];

  title = '';
  description = '';
  @Input() card: string;
  
  constructor() { }

  ngOnInit(): void {
    console.log('current card:', this.card);
  }

  ngOnChanges(): void {
    //if card exists
    if(this.card) {
      console.log('current card string', this.card);
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title; // - 1, weil von Karten 0 bis 12, statt von 1 bis 13
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }

}
