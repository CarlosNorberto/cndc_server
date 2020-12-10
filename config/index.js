const connect =
    "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.2.185)(PORT = 1521))(CONNECT_DATA = (SID = ORCL)))";

// const cns = {
//     user: 'CAPTURE',
//     password: 'capture',
//     connectString: '192.168.2.185/ORCL'
// }

const cns = {
    user: 'OCACCESS',
    password: 'oc1976',
    // connectString: "(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(HOST=192.168.2.185)(PORT=1521)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=ORCL)))"
    connectString: 'vpn.cym.com.bo/ORCL'
}


module.exports={
    cns
}