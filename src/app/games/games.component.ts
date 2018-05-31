import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from './game';
import {MyUser} from './MyUser';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  protected users: MyUser[];
  protected newGame: Game;
  protected name: string;
  protected summary: string;
  protected personalRating: number;
  protected coverUrl: string;
  protected ownerId: number;

  constructor(private httpClient: HttpClient) {

  }

  getUsersWithGames() {
    this.httpClient.get('http://193.191.177.8:10098/games/rest/getUsersWithGames.htm')
      .subscribe(
        (data: any[]) => {
          this.users = data;
        }
      );
  }

  deleteGame(id) {
    this.httpClient.delete('http://193.191.177.8:10098/games/rest/deleteGame_' + id + '.htm')
      .subscribe(
        (data: any) => {
          this.getUsersWithGames();
        }
      );
  }

  addGame() {
    this.newGame = new Game();
    this.newGame.name = this.name;
    this.newGame.coverUrl = this.coverUrl;
    this.newGame.summary = this.summary;
    this.newGame.personalRating = this.personalRating;
    this.newGame.ownerId = this.ownerId;

    console.log(this.newGame);

    this.httpClient.post('http://193.191.177.8:10098/games/rest/addGame.htm', this.newGame).subscribe(
      (data: any) => {
        this.getUsersWithGames();
      }
    );
  }

  // poll() {
  //   this.getUsersWithGames();
  //   const secondsCounter = interval(5000);
  //   secondsCounter.subscribe(n => this.getUsersWithGames());
  // }

  ngOnInit() {
    this.getUsersWithGames();
  }

  onNameKeyUp(event: any) {
    this.name = event.target.value;
  }

  onSummaryKeyUp(event: any) {
    this.summary = event.target.value;
  }

  onCoverUrlKeyUp(event: any) {
    this.coverUrl = event.target.value;
  }

  onPersonalRatingKeyUp(event: any) {
    this.personalRating = event.target.value;
  }

  onOwnerIdKeyUp(event: any) {
    this.ownerId = event.target.value;
  }
}
