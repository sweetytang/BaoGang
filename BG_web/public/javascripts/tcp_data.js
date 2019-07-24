
       
      //import net from 'net';
      // function showtime(){
      //   var date=new Date();
      //   var year=date.getFullYear();
      //   var month=date.getMonth()+2;
      //   var day=date.getDate();
      //   var hour=date.getHours();
      //   var minute=date.getMinutes();
      //   var second=date.getSeconds();
      //   /* 统一时间格式 */
      //   function addzero(num){
      //     if(num<10){
      //       num='0'+num;
      //     }
      //     return num;
      //   };
      //   month=addzero(month);
      //   day=addzero(day);
      //   hour=addzero(hour);
      //   minute=addzero(minute);
      //   second=addzero(second);

      //   var time=String(year)+month+day+hour+minute+second;
      //   return time;
      // };

      // var client = net.connect(520, '127.0.0.1', function() {
      //           console.log('CONNECTED TO: ' + '127.0.0.1' + ':' + 520);
      //       }); 
    

            // client.write('TR0\r\n');
            // client.setMaxListeners(15);
            // client.on('data',function(data){
            //     var db=data.toString().split('$');
            var axios=require('axios');
            function sendsign(){
                  axios.post('http://127.0.0.1:3000/api/save',{
                  gray1:'1',
               gray2:'1',
               gray3:'1',
               gray4:'1',
               gray5:'1',
               gray6:'1',
               gray7:'1',
               gray8:'1',
               gray9:'1',
               gray10:'1',
               path:'1',
               time:'2019',
               workID:'123' 
             })
               .then(function(){
                     console.log('ok')
               })
               .catch(function(err){
                     console.log(err)
               })
            };
            
            module.exports=sendsign;
            //       .then(function(response){
            //         console.log(response.data);
            //       })
            //         .catch(function(err){
            //           console.log(err);
            //         });
            //}) 