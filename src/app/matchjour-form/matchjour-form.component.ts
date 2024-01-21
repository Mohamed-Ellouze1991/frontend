import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatchDay } from '../../models/MatchJour';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DataServiceService } from '../../service/data-service.service';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-matchjour-form',
  templateUrl: './matchjour-form.component.html',
  styleUrl: './matchjour-form.component.scss'
})
export class MatchjourFormComponent implements OnInit {
  form!:FormGroup;
  MatchDays!: MatchDay[];
  
  MatchDay!: MatchDay;
  displayedColumns: string[] = [' idMatchDay', 'name', 'startDate', 'endDate', 'season', 'actions'];
  dataSource!: MatTableDataSource<MatchDay>;
  constructor(private MatchDayService : DataServiceService , private router : Router , private locationStrategy : LocationStrategy){}
  
  initializeTab() {
    this.MatchDayService.getAllMatchDays().subscribe((response) => {
      this.MatchDays = response.data;
      this.dataSource.data = this.MatchDays;
    });
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<MatchDay>();
    this.initializeTab();
    this.initForm();
    console.log(this.dataSource.data);
  }
  initForm():void {
    this.form = new FormGroup({
      idMatchDay: new FormControl(null, [Validators.required,]),
      name: new FormControl(null, [Validators.required,]),
      startDate: new FormControl(null, [Validators.required,]),
      endDate: new FormControl(null, [Validators.required,]),
      season: new FormControl(null, [Validators.required,]),
      nameEdit: new FormControl(null, [Validators.required,]),
      startDateEdit: new FormControl(null, [Validators.required,]),
      endDateEdit: new FormControl(null, [Validators.required,]),
      seasonEdit: new FormControl(null, [Validators.required,]),
      
    })
  }
  onsub(){
    const MatchDaynameControl = this.form.get('name');
    const MatchDaystartDateControl = this.form.get('startDate');
    const MatchDayendDateControl = this.form.get('endDate');
    const MatchDayseasonControl = this.form.get('season');
    this.form.markAllAsTouched();
    if (MatchDaynameControl && MatchDaynameControl.valid && MatchDaystartDateControl && MatchDaystartDateControl.valid 
      && MatchDayendDateControl && MatchDayendDateControl.valid && MatchDayseasonControl && MatchDayseasonControl.valid) {
      const name = this.form.value.name;
      this.MatchDayService.getMatchDayById(name).subscribe(response => {
        if (response.code == 200) {
          // Client exists, show SweetAlert
          Swal.fire({
            title: 'match existe déjà',
            text: 'match  avec le nom spécifié existe déjà.',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
          this.form.controls['name'].reset();
          this.form.controls['startDate'].reset();
          this.form.controls['endDate'].reset();
          this.form.controls['season'].reset();
        }
        else {
          const data = {
            idMatchDay: this.form.value. idMatchDay,
            name: this.form.value.name,
            startDate: this.form.value.startDate,
            endDate: this.form.value.endDate,
            season: this.form.value.season, // Add missing properties
            endDateEdit: this.form.value.startDate,
            nameEdit: this.form.value.nameEdit,
            startDateEdit: this.form.value.startDateEdit,
            seasonEdit: this.form.value.seasonEdit,
            // ... other missing properties
          };
          this.MatchDayService.saveMatchDay(data).subscribe(
            (x) => {
              this.locationStrategy.back();
              Swal.fire({
                  title: 'macth added successfully !',
                  icon: 'success',
                  timer: 4000,
                  showConfirmButton: false
                }
              );
              window.location.reload();
              this.form.reset();
            },
            (saveError) => {
              console.error('Error saving matchday:', saveError);
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
      idMatchDay: this.form.value.idMatchDay,
      name: this.form.value.name,
      startDate: this.form.value.startDate,
      endDate: this.form.value.endDate,
      season: this.form.value.season,
      nameEdit: this.form.value.nameEdit,
      startDateEdit: this.form.value.startDateEdit,
      seasonEdit: this.form.value.seasonEdit,
      endDateEdit: this.form.value. endDateEdit,
    };
    console.log(data.idMatchDay);
    this.MatchDayService.updateMatchDay(data, data.idMatchDay).subscribe(
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

  open(idMatchDay : number){

    this.MatchDayService.getMatchDayById(idMatchDay).subscribe(response => {
      this.MatchDay = response.data;
      this.form.controls['idMatchDay'].setValue(this.MatchDay.idMatchDay);
      this.form.controls['nameEdit'].setValue(this.MatchDay.name);
      this.form.controls['startDateEdit'].setValue(this.MatchDay.startDateEdit);
      this.form.controls['endDateEdit'].setValue(this.MatchDay.endDateEdit);
      this.form.controls['seasonEdit'].setValue(this.MatchDay.seasonEdit);
    });
  }

  delete(id : number){
    this.MatchDayService.deleteMatchDay(id).subscribe(()=>
    {
      this.locationStrategy.back();
      Swal.fire({
          title: 'match  deleted successfully !',
          icon: 'success',
          timer: 10000,
          showConfirmButton: false
        }
      );
      window.location.reload();
    });
  }
  
}

