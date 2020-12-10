const oracledb=require('oracledb');
const fs=require('fs');
const path=require('path');
const cns=require('../config').cns;

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

            if(!err){
                cn.execute(sql,[],function(err,result){
                    if(!err){
                        console.log(result.rows);
                        resolve(result.rows);   
                    }else{
                        reject(err);
                    }
                    
                    close(cn);
                })
            }else{
                console.log(err);
                reject(err);
            }
            
        });
    });    
}

function getPhoto(req,res){
    var photo = req.params.photo;
    console.log(photo);
    var path_file = "uploads/photos/" + photo;
    var path_file_sin_foto = "uploads/photos/sin_foto.jpg";
	fs.exists(path_file, function (exists) {
		if (exists) {
			res.sendFile(path.resolve(path_file));
		} else {
            res.sendFile(path.resolve(path_file_sin_foto));
		}
	});
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

module.exports={
    getAllAccesos,
    getAccesosCron,
    getPhoto
}