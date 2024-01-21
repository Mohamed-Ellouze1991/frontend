import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/Team';
import {Response} from "../models/Response";
import { Player } from '../models/Player';
import { MatchDay } from '../models/MatchJour';
import { Season } from '../models/Season';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  // URL de votre API
  constructor(private http: HttpClient) { }
  
  getAllTeams():Observable<Response<Team[]>>{
    return this.http.get<Response<Team[]>>('http://localhost:9090/player-service/playerteam/team');
  }
  getTeamByName(teamName: string): Observable<Response<Team>> {
    return this.http.get<Response<Team>>(
      `http://localhost:9090/player-service/playerteam/team/nom/`+ teamName
    );
  }
  saveTeam(team: Team): Observable<Team> {
    return this.http.post<Team>('http://localhost:9090/player-service/playerteam/team',team);
  }
  updateTeam(team: Team, idTeam: number): Observable<void> {
    return this.http.put<void>(
      `http://localhost:9090/player-service/playerteam/team/`+idTeam, team
    );
}
getTeamById(idTeam: number): Observable<Response<Team>> {
  return this.http.get<Response<Team>>(
    `http://localhost:9090/player-service/playerteam/team/`+idTeam
  );
}
deleteTeam(idTeam: number): Observable<Response<void>> {
  return this.http.delete<Response<void>>(
    `http://localhost:9090/player-service/playerteam/team/`+idTeam
  );
}
getAllPlayers():Observable<Response<Player[]>>{
  return this.http.get<Response<Player[]>>('http://localhost:9090/player-service/playerteam/player');
}


savePlayer(player: Player): Observable<Player> {
  return this.http.post<Player>('http://localhost:9090/player-service/playerteam/player',player);
}



updatePlayer(player: Player, idPlayer: number): Observable<void> {
  return this.http.put<void>(
    `http://localhost:9090/player-service/playerteam/player/`+idPlayer, player
  );
}



deletePlayer(idPlayer: number): Observable<Response<void>> {
  return this.http.delete<Response<void>>(
    `http://localhost:9090/player-service/playerteam/player/`+idPlayer
  );
}



getPlayerById(idPlayer: number): Observable<Response<Player>> {
  return this.http.get<Response<Player>>(
    `http://localhost:9090/player-service/playerteam/player/`+idPlayer
  );
}




getAllMatchDays():Observable<Response<MatchDay[]>>{
  return this.http.get<Response<MatchDay[]>>('http://localhost:9090/season-service/seasonmatch/matchDay');
}


getMatchDayById( idMatchDay: number): Observable<Response<MatchDay>> {
  return this.http.get<Response<MatchDay>>(
    `http://localhost:9090/season-service/seasonmatch/matchDay/`+ idMatchDay
  );

  }

  saveMatchDay(matchday : MatchDay ): Observable<MatchDay> {
    return this.http.post<MatchDay>('http://localhost:9090/season-service/seasonmatch/matchDay',matchday);
  }



  updateMatchDay(matchday: MatchDay, idMatchDay: number): Observable<void> {
    return this.http.put<void>(
      `http://localhost:9090/season-service/seasonmatch/matchDay/`+idMatchDay, matchday
    );
  }


  deleteMatchDay(idMatchDay: number): Observable<Response<void>> {
    return this.http.delete<Response<void>>(
      `http://localhost:9090/season-service/seasonmatch/matchDay/`+idMatchDay
    );
  }



  getAllSeason():Observable<Response<Season[]>>{
    return this.http.get<Response<Season[]>>('http://localhost:9090/season-service/seasonmatch/season');
  
  }
  
  
  
  updateSaison(saison: Season, seasonId: number): Observable<void> {
    return this.http.put<void>(
      `http://localhost:9090/season-service/seasonmatch/season/`+seasonId, saison
    );
  }
  getSaisonById(seasonId: number): Observable<Response<Season>> {
    return this.http.get<Response<Season>>(
      `http://localhost:9090/player-service/seasonmatch/season/`+seasonId
    );
  }
  deleteSaison(seasonId: number): Observable<Response<void>> {
    return this.http.delete<Response<void>>(
      `http://localhost:9090/player-service/seasonmatch/season/`+seasonId
    );
  }
  saveSaison(season: Season): Observable<Season> {
    return this.http.post<Season>('http://localhost:9090/season-service/seasonmatch/season',season);
  }
  }
  


