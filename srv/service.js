const cds = require("@sap/cds");

module.exports = cds.service.impl(async function (srv) {
    const { employees } = this.entities;

    const { sfEmpEmployment, sfEmpEmploymentTermination, sfCandidate } = this.entities;

    this.on("createData", async (req) => {
        try {
            const oData = {
                ID           : "550e8400-e29b-41d4-a716-446655440004",
                firstName    : "Bill",
                lastName     : "Nguyen",
                email        : "hungnguyen@gmail.com",
                hireDate     : "2023-06-19",
                department_ID: "123e4567-e89b-12d3-a456-426614174000",
                dateOfBirth  : "2001-06-19",
                salary       : 5000,
                currency     : "USD"
            }

            var hireDate    = new Date(oData.hireDate);
            var dateOfBirth = new Date(oData.dateOfBirth);

            const checkFirstName = oData.firstName.match(/\d+/) !== null;
            const checkLastName  = oData.lastName.match(/\d+/) !== null;

            var re = /\S+@\S+\.\S+/;
            const checkEmail = re.test(oData.email);

            
            // Validate dateOfBirth and hireDate
            if(dateOfBirth >= hireDate){
                return req.error(405, "Not allow Date of birth >= Hire date");
            }

            // Validate firstname and lastname
            if(checkFirstName == true || checkLastName == true) {
                return req.error(406, "First Name/Last Name not allow");
            }
            
            // Validate email
            if(checkEmail == false) {
                return req.error(407, "Email is not valid");
            }

            const createResponse = await INSERT.into(employees).entries([oData]);

            console.log("User", req.user.id);
            console.log("User attributes: ", req.user.attr);
            return createResponse;

        } catch (error) {
            console.log(error);
        }
    });

    this.on("updateData", async (req) => {
        const { EmpID }         = req.data;
        const oUpdateFields     = {}
        oUpdateFields.firstName = "Quoc Hung";
        oUpdateFields.lastName  = "Nguyen";
        const updateResponse    = await UPDATE(employees).set(oUpdateFields).where({ ID: EmpID })
        return updateResponse;
    });

    this.on("deleteData", async (req) => {
        const { EmpID } = req.data;
        const deleteResponse = await DELETE.from(employees).where({ ID: EmpID });
        return deleteResponse;
    });

    this.on("getData", async (req) => {
        const query = await SELECT.from(employees);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        query.forEach(employee => {
            var hireDate  = new Date(employee.hireDate);
            var hireYear  = hireDate.getFullYear();
            var workYears = currentYear - hireYear;

            if(workYears >= 3) {
                employee.salary += employee.salary*0.3;
            }

            console.log("Salary: ", employee.salary)
        });

        console.log("User attributes: ", req.user.attr);
    });

    const apiSf = await cds.connect.to('sfapimetadata');

    this.on('READ', sfEmpEmployment, async(req) => {
        let vsfEmpEmployment = SELECT.from(sfEmpEmployment);
        let result = await apiSf.tx(req).send({
            query: vsfEmpEmployment
        });

        return result;
    });

    this.on('READ', sfEmpEmploymentTermination, async(req) => {
        let vsfEmpEmploymentTermination = SELECT.from(sfEmpEmploymentTermination);
        let result = await apiSf.tx(req).send({
            query: vsfEmpEmploymentTermination
        });
        return result;
    });

    this.on('READ', sfCandidate, async(req) => {
        let vsfCandidate = SELECT.from(sfCandidate);
        let result = await apiSf.tx(req).send({
            query: vsfCandidate
        });
        return result;
    });

    this.on('createCandidate', async (req) => {
        const oData = {
            country     : "DE",
            primaryEmail: "minhnguyen@gmail.com",
            zip         : "75008",
            firstName   : "Minh",
            currentTitle: "Junior",
            lastName    : "Nguyen",
            city        : "Ho Chi Minh",
            address     : "100 Thong Nhat",
            contactEmail: "test@gmail.com",
            cellPhone   : "+123456789"
        }

        let query = INSERT.into(sfCandidate).entries([oData]);
        let result = await apiSf.tx(req).send({
            query: query
        });

        return result;
    });
});