import { Injectable } from '@angular/core';
import { Observer, Observable,throwError  } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Model/employee';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:62136/api/Employee/";

getEmployee():Observable<any>
{
  console.log("Get method called...");
  return this.http.get(this.baseUrl+"GetEmployee").pipe(catchError(this.errorHandler));
} 

saveEmployee(emp: Employee)
{
  return this.http.post(this.baseUrl+"SaveEmployee",emp);
}

createEmployee(employee: Employee): Observable<Employee> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Employee>(this.baseUrl + 'SaveEmployee/',  
  employee, httpOptions);  
} 

/** Error Handling method */

errorHandler(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
}


}
