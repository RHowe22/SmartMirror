import { Component } from "react"

class Left extends Component {
    constructor(props){
        super()
        this.state = { };
   
   
    }



    render(){
        return (
            <div style={{float:"left",height:"100%",width:"50%" }}>
                <div style={{width:"fit-content", margin:"0 auto"}} >
                    <p>Left div </p>
                </div>
            </div>




        )



    }
}

export default Left
