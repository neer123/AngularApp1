import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Employee } from '../Model/employee';
import { EmployeeserviceService } from '../Services/employeeservice.service';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  FB = new FormBuilder();
  employeeForm : FormGroup;
  submitted = false;
  users={};
  flag ;
  constructor(private httpClient : HttpClient, private _empService : EmployeeserviceService) { }
  ngOnInit() {

    
this.GetDataSubscribe();

    this.employeeForm = this.FB.group(
      {
      // fullname : ['',Validators.required],
      // emailaddress :['', [Validators.required,Validators.email]],
      // username : ['', [Validators.required,Validators.maxLength(8), Validators.minLength(6)]],
      // phonenumber : ['',[Validators.required,Validators.maxLength(10), Validators.minLength(10)]],
      // presentaddress :[''],
      // permanentaddress :['']
EmployeeId : [''],
Name : ['',Validators.required],
Address : ['', Validators.required],
CompanyName : ['',Validators.required],
Designation : ['',Validators.required],
Salary : ['', Validators.required],
MobileNo : ['',Validators.required],
      
      }
      )
  }
get f()
{
  return this.employeeForm.controls;
}

SaveEmployee(employee1 : Employee)
{
this.submitted = true;
if(this.employeeForm.invalid)
{
  return;
}
else
{
employee1.EmployeeId = 0;
employee1.MobileNo = 145;
 this.flag = this._empService.createEmployee(this.employeeForm.value).subscribe(datar => this.flag = datar)
  console.log("Saved Called ....." + this.flag );
  console.log(employee1)
}
}

SaveEmpData(employee : Employee): Observable<any>
{
  return this.httpClient.post("",employee)
}

GetDataSubscribe()
{
 this.users=this._empService.getEmployee().subscribe( 
  
    usersData => { this.users = usersData
   // this.users= Array.of((this.users));
    console.log(this.users[0])
    },
    err => console.error("rrrrrrrrrrrrrrr -->" + err)  
  );
 console.log(this.users)
}

// GetData():Observable<any>{

//   return this.httpClient.get("https://jsonplaceholder.typicode.com/users",)
// }

}
