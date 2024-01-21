import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Season } from '../../models/Season';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from '../../service/data-service.service';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-saison-form',
  templateUrl: './saison-form.component.html',
  styleUrl: './saison-form.component.scss'
})
export class SaisonFormComponent implements OnInit {
  form!:FormGroup;
  saisons!: Season[];
  saison!: Season;
  displayedColumns: string[] = ['seasonId', 'startDate', 'endDate', 'state','actions'];
  dataSource!: MatTableDataSource<Season>;
  constructor(private saisonService : DataServiceService , private router : Router , private locationStrategy : LocationStrategy){}
  
  initializeTab() {
    this.saisonService.getAllSeason().subscribe((response) => {
      this.saisons = response.data;
      this.dataSource.data = this.saisons;
    });
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<Season>();
    this.initializeTab();
    this.initForm();
    console.log(this.dataSource.data);
  }
  initForm():void {
    this.form = new FormGroup({
      seasonId: new FormControl(null, [Validators.required,]),
      startDate: new FormControl(null, [Validators.required,]),
      endDate: new FormControl(null, [Validators.required,]),
      state: new FormControl(null, [Validators.required,]),
      
      seasonIdEdit: new FormControl(null, [Validators.required,]),
      startDateEdit: new FormControl(null, [Validators.required,]),
      endDateEdit: new FormControl(null, [Validators.required,]),
      stateEdit: new FormControl(null, [Validators.required,]),
     
    })
  }
  onsub(){
    const startDateControl = this.form.get('startDate');
    const endDateControl = this.form.get('endDate');
    const stateControl = this.form.get('state');
  
    this.form.markAllAsTouched();
    if (startDateControl && startDateControl.valid && endDateControl && endDateControl.valid && stateControl && stateControl.valid) {
      const startDate = this.form.value.startDate;
      this.saisonService.getTeamByName(startDate).subscribe(response => {
        if (response.code == 200) {
          // Client exists, show SweetAlert
          Swal.fire({
            title: 'Team existe déjà',
            text: 'Team avec le nom spécifié existe déjà.',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
          this.form.controls['seasonId'].reset();
          this.form.controls['startDate'].reset();
          this.form.controls['endDate'].reset();
          this.form.controls['state'].reset();
        }
        else {
          const data = {
            seasonId:this.form.value.seasonId,
            startDate: this.form.value.startDate,
            endDate: this.form.value.endDate,
            state: this.form.value.state,
            
          };
          this.saisonService.saveSaison(data).subscribe(
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
              this.form.controls['seasonId'].reset();
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
      seasonId: this.form.value.seasonId,
      startDate: this.form.value.startDateEdit,
      endDate: this.form.value.endDateEdit,
      state: this.form.value.stateEdit,
     
    };
    console.log(data.seasonId);
    this.saisonService.updateSaison(data, data.seasonId).subscribe(
      () => {
        this.locationStrategy.back();
        window.location.reload();
      },
      (error) => {
        // Handle the error accordingly, you may want to show an error message or log the error.
        console.error('Error updating season:', error);
        this.form.reset();  // Reset the form if there is an error
      }
    );
  }

  open(seasonId : number){

    this.saisonService.getSaisonById(seasonId).subscribe(response => {
      this.saison = response.data;
      this.form.controls['seasonId'].setValue(this.saison.seasonId);
      this.form.controls['startDate'].setValue(this.saison.startDate);
      this.form.controls['endDate'].setValue(this.saison.endDate);
      this.form.controls['state'].setValue(this.saison.state);
     
    });
  }

  delete(id : number){
    this.saisonService.deleteSaison(id).subscribe(()=>
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
