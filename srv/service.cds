using {hwng as my} from '../db/schema';
using { sfapimetadata as external_sf } from './external/sfapimetadata';


@path: '/service/BillService'
service BillService  {
    // entity employees @(restrict: [
    //     { grant: '*', to: 'Admin Demo'}
    // ]) as projection on my.Employees;

    entity employees                  as projection on my.Employees;
    entity sfEmpEmployment            as projection on external_sf.EmpEmployment excluding { includeAllRecords, jobNumber };
    entity sfEmpEmploymentTermination as projection on external_sf.EmpEmploymentTermination excluding { newMainEmploymentId, eventReason };
    entity sfCandidate                as projection on external_sf.Candidate excluding { password };

    action createData()            returns String;

    action updateData(EmpID: UUID) returns String;

    action deleteData(EmpID: UUID) returns String;

    function getData()             returns String;

    action createCandidate()       returns String;
}