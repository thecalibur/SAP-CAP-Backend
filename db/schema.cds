namespace hwng;

entity Employees {
    key ID     : UUID;
    firstName  : String;
    lastName   : String;
    email      : String;
    hireDate   : String;
    department : Association to Departments;
    dateOfBirth: String;
    salary     : Int16;
    currency   : String
}

entity Departments {
    key ID: UUID;
    name  : String
}

entity Employees2 {
    key email     : String;
    firstName     : String;
    lastName      : String;
    hireDate      : String;
    companyCode   : String;
    departmentName: String;
    department    : Association to Departments on department.name = departmentName;
}