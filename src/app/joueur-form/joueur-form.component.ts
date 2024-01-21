import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Player } from '../../models/Player';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from '../../service/data-service.service';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import Swal from 'sweetalert2';
import { Team } from '../../models/Team';

@Component({
  selector: 'app-joueur-form',
  templateUrl: './joueur-form.component.html',
  styleUrl: './joueur-form.component.scss'
})
export class JoueurFormComponent implements OnInit {
  form!:FormGroup;
  players!: Player[];
  teams!: Team[];
  player!: Player;
  displayedColumns: string[] = ['idPlayer', 'firstName', 'lastName', 'nationality', 'position', 'state', 'age', 'number', 'numberOfGoals', 'team','actions'];
  dataSource!: MatTableDataSource<Player>;
  constructor(private playerService : DataServiceService , private router : Router , private locationStrategy : LocationStrategy){}
  
  initializeTab() {
    this.playerService.getAllPlayers().subscribe((response) => {
      this.players = response.data;
      this.dataSource.data = this.players;
    });


    this.playerService.getAllTeams().subscribe((response) => {
      this.teams = response.data;
      
    });

  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<Player>();
    this.initializeTab();
    this.initForm();
    console.log(this.dataSource.data);
  }
  initForm():void {
    this.form = new FormGroup({
      idPlayer: new FormControl(null, [Validators.required,]),
      firstName: new FormControl(null, [Validators.required,]),
      lastName: new FormControl(null, [Validators.required,]),
      nationality: new FormControl(null, [Validators.required,]),
      position: new FormControl(null, [Validators.required,]),
      state: new FormControl(null, [Validators.required,]),
      age: new FormControl(null, [Validators.required,]),
      number: new FormControl(null, [Validators.required,]),
      numberOfGoals: new FormControl(null, [Validators.required,]),
      team: new FormControl(null, [Validators.required,]),
      firstNameEdit: new FormControl(null, [Validators.required,]),
      lastNameEdit: new FormControl(null, [Validators.required,]),
      nationalityEdit: new FormControl(null, [Validators.required,]),
      positionEdit: new FormControl(null, [Validators.required,]),
      stateEdit: new FormControl(null, [Validators.required,]),
      ageEdit: new FormControl(null, [Validators.required,]),
      numberEdit: new FormControl(null, [Validators.required,]),
      numberOfGoalsEdit: new FormControl(null, [Validators.required,]),
      teamEdit: new FormControl(null, [Validators.required,]),
    })
  }
  onsub(){
    const playerfirstNameControl = this.form.get('firstName');
    const playerlastNameControl = this.form.get('lastName');
    const playerNationalityControl = this.form.get('nationality');
    const playerAgeControl = this.form.get('age');
    this.form.markAllAsTouched();
    if (playerfirstNameControl && playerfirstNameControl.valid && playerlastNameControl && playerlastNameControl.valid && playerNationalityControl && playerNationalityControl.valid && playerAgeControl && playerAgeControl.valid) {
      const firstName = this.form.value.firstName;
      this.playerService.getPlayerById(firstName).subscribe(response => {
        if (response.code == 200) {
          // Client exists, show SweetAlert
          Swal.fire({
            title: 'player existe déjà',
            text: 'player avec le nom spécifié existe déjà.',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
          this.form.controls['firstName'].reset();
          this.form.controls['lastName'].reset();
          this.form.controls['nationality'].reset();
          this.form.controls['age'].reset();
        }
        else {
          const data = {
            idPlayer: this.form.value.idPlayer,
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            nationality: this.form.value.nationality,
            age: this.form.value.age,
            ageEdit: this.form.value.ageEdit, // Add missing properties
            nationalityEdit: this.form.value.nationalityEdit,
            lastNameEdit: this.form.value.lastNameEdit,
            firstNameEdit: this.form.value.firstNameEdit,
            position: this.form.value.position,
             state: this.form.value.state,
              number: this.form.value.number,
               numberOfGoals: this.form.value.numberOfGoals,
                team: this.form.value.team,
            // ... other missing properties
          };
          this.playerService.savePlayer(data).subscribe(
            (x) => {
              this.locationStrategy.back();
              Swal.fire({
                  title: 'player added successfully !',
                  icon: 'success',
                  timer: 4000,
                  showConfirmButton: false
                }
              );
              window.location.reload();
              this.form.reset();
            },
            (saveError) => {
              console.error('Error saving player:', saveError);
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
      idPlayer: this.form.value.idPlayer,
      firstName: this.form.value.firstNameEdit,
      lastName: this.form.value.lastNameEdit,
      nationality: this.form.value.nationalityEdit,
      age: this.form.value.ageEdit,
      number: this.form.value.numberEdit,
      numberOfGoals: this.form.value.numberOfGoalsEdit,
      team: this.form.value.teamEdit,
      ageEdit: this.form.value.ageEdit,
       nationalityEdit: this.form.value.nationalityEdit,
        lastNameEdit: this.form.value.lastNameEdit,
         firstNameEdit: this.form.value.firstNameEdit,
         position: this.form.value.position,
          state: this.form.value.state,
    };
    console.log(data.idPlayer);
    this.playerService.updatePlayer(data, data.idPlayer).subscribe(
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

  open(idPlayer : number){

    this.playerService.getPlayerById(idPlayer).subscribe(response => {
      this.player = response.data;
      this.form.controls['idplayer'].setValue(this.player.idPlayer);
      this.form.controls['firstNameEdit'].setValue(this.player.firstNameEdit);
      this.form.controls['lastNameEdit'].setValue(this.player.lastNameEdit);
      this.form.controls['nationalityEdit'].setValue(this.player.nationalityEdit);
      this.form.controls['ageEdit'].setValue(this.player.ageEdit);
    });
  }

  delete(id : number){
    this.playerService.deletePlayer(id).subscribe(()=>
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