import react from "react"



/**
 *  represemts generic sidebar list 
 */
function ListItem(props){
return(   
    <div>
    <img src={props.imgsource}/> 
    <div>
    <p> {props.PrimaryValue}  </p>
    <p> {props.SecondaryValue}</p>
    </div>

    </div>
);


}

