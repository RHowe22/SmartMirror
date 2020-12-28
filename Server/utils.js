var fs = require('fs')

function readquotes(){
    var retval =[];
   var quote={
       author:'',
       quote:''
   };

    fs.readFile('quotes.txt','utf8', (data)=>{
        var lines= data.split("\n");
        lines.array.forEach(element => {
            if(!(element==="")){
                if(element.includes("--")){
                    quote.author= element.substring(2);
                    retval[retval.length]=quote;
                    quote={
                        author:'',
                        quote:''
                    };
                }
                else{
                    quote+=element
                }                  
            } 
        });

    });
    return retval

}

module.exports ={ readquotes};