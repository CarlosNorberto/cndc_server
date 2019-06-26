const oracledb=require('oracledb');

const finance =
    "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.2.185)(PORT = 1521))(CONNECT_DATA = (SID = ORCL)))";

const cns={
    user:'CAPTURE',
    password:'capture',
    connectString:finance
}

function close(cn){
    cn.release(
        function(err){
            if(err){
                console.log(err.message + " CLOSE!!!");
            }
        }
    )
}

function getAllAccesos(sql,variables,response){
    oracledb.getConnection(cns,function(err,cn){

        cn.execute(sql,variables,function(err,result){
            if(!err){
                console.log(result.rows[0]);
                response.status(200).json(result.rows[0]);
            }else{
                response.status(500).send(err);
            }
            
            close(cn);
        })
    });
}

function getAccesosCron(sql){
    return new Promise(async (resolve,reject)=>{
        oracledb.getConnection(cns,function(err,cn){

            cn.execute(sql,[],function(err,result){
                if(!err){
                    resolve(result.rows);   
                }else{
                    reject(err);
                }
                
                close(cn);
            })
        });
    });    
}

module.exports={
    getAllAccesos,
    getAccesosCron
}