var fs = require('fs')

 function readquotes(){
   var retval=[];
   var quote=new Object();

   var lines = fs.readFileSync('quotes.txt','utf8').split("\n");
        lines.forEach(element => 
            {
            if(!(element==="")){
                if(element.startsWith("--")){
                    quote.author= element.substring(2);
                    retval[retval.length]=quote;
                    quote=new Object();
                    quote.quote=""
                }
                else{
                    quote.quote+=element
                }                  
            } 
    });
    return retval;

}

module.exports ={ readquotes};