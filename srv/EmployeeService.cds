using {hwng as my} from '../db/schema';
// using { sfapimetadata as external_sf } from './external/sfapimetadata';

@path: '/service/EmployeeService'
service EmployeeService @(require: 'authenticated-user') {
    entity employees2 as projection on my.Employees2;
}

annotate EmployeeService.employees2 with @(restrict: [
    { grant: ['READ', 'UPDATE'], to: 'Employee', where: 'email = $user' },
    { grant: ['READ', 'UPDATE', 'CREATE'], to: 'Department Lead' }
]);