var net = require('net');
var config=require('../../config');
var axios=require('axios');
var saveModel=require('./saveModel');
var showModel=require('./showModel');
require('./timeTransfor');

const Host=config.tcp_host;
const Port=config.tcp_port;
function tcp_client(){
    var client=new net.Socket();
    client.setEncoding('utf8');
    client.connect(Port, Host, function() {
        console.log('TCP CONNECTED TO: ' + Host + ':' + Port);
        
        /* 初始化show数据库，以便后面直接修改 */
        var model=new showModel({
            gray1:'',
            gray2:'',
            gray3:'',
            gray4:'',
            gray5:'',
            gray6:'',
            gray7:'',
            gray8:'',
            gray9:'',
            gray10:'',
            path:'',
            time:'',
            workId:'1361010506'
        });
        model.save((err)=>{
            if(err){
                next(err)
            }
        });

/* 定时器实现TCP轮询相机 */
        setTimeout(function f(){

            client.write('TR0\r\n');
            client.once('data',function(data){
                axios.get('http://127.0.0.1:3000/api/show')
                    .then((response)=>{
                        var id=response.data.workId;
                        var db=data.toString().split('$');
                        var savedb={gray1:db[11].trim(),
                                    gray2:db[10],
                                    gray3:db[9],
                                    gray4:db[8],
                                    gray5:db[7],
                                    gray6:db[6],
                                    gray7:db[5],
                                    gray8:db[4],
                                    gray9:db[2],
                                    gray10:db[1],
                                    path:db[3],
                                    time:new Date().format("yyyyMMddhhmmss"),
                                    workId:id};
        /* 将获得的数据连同time和workId传入数据库 */
                        var Model=new saveModel(savedb);
                        Model.save(function(err,doc){
                            if(err){
                                next(err)
                            }                    
                        });
        
        /* 将最新数据单独修改存进给showModel数据表 */
                        showModel.findOneAndUpdate({},savedb,(err)=>{
                            if(err){
                                
                                next(err)
                            }
                        });

                    })
                        .catch((err)=>{
                            next(err)
                        });
            });
            setTimeout(f,100);
        },100);
    });
}

module.exports=tcp_client;