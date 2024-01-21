import { Season } from "./Season";

export interface MatchDay {
  seasonEdit: any;
  endDateEdit: any;
  startDateEdit(startDateEdit: any): unknown;
  idMatchDay:number,
  name:string,
  startDate:Date,
  endDate: Date,
  season:Season
}