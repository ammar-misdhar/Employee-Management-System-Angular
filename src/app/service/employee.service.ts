import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpclient : HttpClient) { }
  baseUrl="https://localhost:7298/api/Employee";

  Getemployee():Observable<Employee[]>{
    return this.httpclient.get<Employee[]>(this.baseUrl);
  }

  Createemplaoyee(emp:Employee):Observable<Employee>{
    emp.id="0";
    return this.httpclient.post<Employee>(this.baseUrl,emp);
  }

  Updateemployee(emp:Employee):Observable<Employee>{
    return this.httpclient.put<Employee>(this.baseUrl+'/'+emp.id,emp)
  }

  Deleteemployee(id:string):Observable<Employee>{
    return this.httpclient.delete<Employee>(this.baseUrl+'/'+id)
  }

}
