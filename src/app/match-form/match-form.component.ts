import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Match } from '../../models/Match';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../service/data-service.service';
@Component({
  selector: 'app-match-form',
  templateUrl: './match-form.component.html',
  styleUrl: './match-form.component.scss'
})
export class MatchFormComponent  {
   
  }