import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../models/employee';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: false,

  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employeeArrey: Employee[] = [];
  employeeFormGroup: FormGroup;
  buttonText: string = 'Create';

  constructor(private empService: EmployeeService, private fb: FormBuilder) {
    this.employeeFormGroup = this.fb.group({
      id: [""],
      name: [""],
      mobileNo: [""],
      emailAddress: [""],
    })
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee() {
    this.empService.Getemployee().subscribe(response => {
      this.employeeArrey = response;
    })
  }

  postEmployee() {
    // update employee
    if (this.employeeFormGroup.value.id != null && this.employeeFormGroup.value.id !== "") {
      this.buttonText = 'Updating...';
      this.empService.Updateemployee(this.employeeFormGroup.value).subscribe(response => {
        this.getEmployee();
        this.resetForm();
      });

      // create employee
    } else {
      this.empService.Createemplaoyee(this.employeeFormGroup.value).subscribe(response => {
        this.getEmployee();
        this.resetForm();      
      });
    }
  }

  resetForm() {
    this.employeeFormGroup.setValue({
      id: "",
      name: "",
      mobileNo: "",
      emailAddress: "",
    });
    this.buttonText = 'Create';
  }

  fillForm(emp: Employee) {
    this.employeeFormGroup.setValue({
      id: emp.id,
      name: emp.name,
      mobileNo: emp.mobileNo,
      emailAddress: emp.emailAddress,
    });
    this.buttonText = 'Update';
  }

  deleteEmployee(id: string) {
    this.empService.Deleteemployee(id).subscribe(response => {
      this.getEmployee();
    });
  }
}
