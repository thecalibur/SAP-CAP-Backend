using {hwng as my} from '../db/schema';
// using { sfapimetadata as external_sf } from './external/sfapimetadata';

@path: '/service/AdminService'
service AdminService @(require: 'authenticated-user') {

    entity employees2 @(restrict: [
        { grant: ['READ', 'UPDATE'], to: 'Employee', where: 'email=$user.email' },
        { grant: ['READ', 'UPDATE', 'CREATE'], to: 'Department Lead', where: 'companyCode=$user.companyCode' },
        { grant: '*', to: 'Admin' }
    ]) as projection on my.Employees2;

    @readonly
    entity departments @(restrict: [
        { grant: 'READ', to: 'Department Lead' },
        { grant: 'READ', to: 'Admin' }
    ]) as projection on my.Departments;
}