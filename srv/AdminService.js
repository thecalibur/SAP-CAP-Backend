const cds = require("@sap/cds");
module.exports = cds.service.impl(async function (srv) {

    // const { employees2 } = this.entities;
    this.on('READ', 'employees2', async(req) => {
        console.log(req.user.tokenInfo.jwt);
    });
});