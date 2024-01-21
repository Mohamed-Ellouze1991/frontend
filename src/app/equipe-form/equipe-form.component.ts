import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Team } from '../../models/Team';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from '../../service/data-service.service';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipe-form',
  templateUrl: './equipe-form.component.html',
  styleUrl: './equipe-form.component.scss'
})
export class EquipeFormComponent implements OnInit {
  form!:FormGroup;
  teams!: Team[];
  team!: Team;
  displayedColumns: string[] = ['idTeam','teamName', 'teamAbbreviation', 'teamCoach','teamCity','teamPoints','numberOfPlayer','actions'];
  dataSource!: MatTableDataSource<Team>;
  constructor(private teamService : DataServiceService , private router : Router , private locationStrategy : LocationStrategy){}
  
  initializeTab() {
    this.teamService.getAllTeams().subscribe((response) => {
      this.teams = response.data;
      this.dataSource.data = this.teams;
    });
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<Team>();
    this.initializeTab();
    this.initForm();
    console.log(this.dataSource.data);
  }
  initForm():void {
    this.form = new FormGroup({
      idTeam: new FormControl(null, [Validators.required,]),
      teamName: new FormControl(null, [Validators.required,]),
      teamAbbreviation: new FormControl(null, [Validators.required,]),
      teamCoach: new FormControl(null, [Validators.required,]),
      teamCity: new FormControl(null, [Validators.required,]),
      teamPoints: new FormControl(null, [Validators.required,]),
      numberOfPlayer: new FormControl(null, [Validators.required,]),
      teamNameEdit: new FormControl(null, [Validators.required,]),
      teamAbbreviationEdit: new FormControl(null, [Validators.required,]),
      teamCoachEdit: new FormControl(null, [Validators.required,]),
      teamCityEdit: new FormControl(null, [Validators.required,]),
      teamPointsEdit: new FormControl(null, [Validators.required,]),
      numberOfPlayersEdit: new FormControl(null, [Validators.required,])
    })
  }
  onsub(){
    const teamNameControl = this.form.get('teamName');
    const teamAbbreviationControl = this.form.get('teamAbbreviation');
    const teamCoachControl = this.form.get('teamCoach');
    const teamCityControl = this.form.get('teamCity');
    this.form.markAllAsTouched();
    if (teamNameControl && teamNameControl.valid && teamAbbreviationControl && teamAbbreviationControl.valid && teamCoachControl && teamCoachControl.valid && teamCityControl && teamCityControl.valid) {
      const teamName = this.form.value.teamName;
      this.teamService.getTeamByName(teamName).subscribe(response => {
        if (response.code == 200) {
          // Client exists, show SweetAlert
          Swal.fire({
            title: 'Team existe déjà',
            text: 'Team avec le nom spécifié existe déjà.',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
          this.form.controls['teamName'].reset();
          this.form.controls['teamAbbreviation'].reset();
          this.form.controls['teamCoach'].reset();
          this.form.controls['teamCity'].reset();
        }
        else {
          const data = {
            idTeam:this.form.value.idTeam,
            teamName: this.form.value.teamName,
            teamAbbreviation: this.form.value.teamAbbreviation,
            teamCoach: this.form.value.teamCoach,
            teamCity: this.form.value.teamCity,
             teamPoints:this.form.value.teamPoints,
              numberOfPlayer:this.form.value.numberOfPlayer,
          };
          this.teamService.saveTeam(data).subscribe(
            (x) => {
              this.locationStrategy.back();
              Swal.fire({
                  title: 'Team added successfully !',
                  icon: 'success',
                  timer: 4000,
                  showConfirmButton: false
                }
              );
              window.location.reload();
              this.form.reset();
            },
            (saveError) => {
              console.error('Error saving client:', saveError);
              this.form.controls['name'].reset();
            }
          );
        }
      });
    }else {
      Swal.fire({
        title: 'Empty Fields!',
        text: 'Fill all the blanks.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }

  }

  update() {

    const data = {
      idTeam: this.form.value.idTeam,
      teamName: this.form.value.teamNameEdit,
      teamAbbreviation: this.form.value.teamAbbreviationEdit,
      teamCoach: this.form.value.teamCoachEdit,
      teamCity: this.form.value.teamCityEdit,
      teamPoints: this.form.value.teamPointsEdit,
      numberOfPlayer: this.form.value.numberOfPlayersEdit
    };
    console.log(data.idTeam);
    this.teamService.updateTeam(data, data.idTeam).subscribe(
      () => {
        this.locationStrategy.back();
        window.location.reload();
      },
      (error) => {
        // Handle the error accordingly, you may want to show an error message or log the error.
        console.error('Error updating client:', error);
        this.form.reset();  // Reset the form if there is an error
      }
    );
  }

  open(idTeam : number){

    this.teamService.getTeamById(idTeam).subscribe(response => {
      this.team = response.data;
      this.form.controls['idTeam'].setValue(this.team.idTeam);
      this.form.controls['teamNameEdit'].setValue(this.team.teamName);
      this.form.controls['teamAbbreviationEdit'].setValue(this.team.teamAbbreviation);
      this.form.controls['teamCoachEdit'].setValue(this.team.teamCoach);
      this.form.controls['teamCityEdit'].setValue(this.team.teamCity);
    });
  }

  delete(id : number){
    this.teamService.deleteTeam(id).subscribe(()=>
    {
      this.locationStrategy.back();
      Swal.fire({
          title: 'Player deleted successfully !',
          icon: 'success',
          timer: 10000,
          showConfirmButton: false
        }
      );
      window.location.reload();
    });
  }
  
}