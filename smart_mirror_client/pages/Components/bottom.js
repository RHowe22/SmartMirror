import { Component } from "react"

class Bottom extends Component {
    constructor(props){
        super()
        this.state = {type:props.type,
                      api:props.api,
                      value: null  }
    }
    componentDidMount(){
        if(this.state.api){
            this.fillContent()
            this.TimerID= setInterval( 
                  ()=>   this.fillContent(), 24*60*1000        );
        }
        else
        {console.log("no Api")}
    }
   componentWillUnmount(){
        clearInterval(this.TimerID);
    }


    fillContent(){
        console.log("fetching")
        fetch(this.state.api)
        .then(res => res.json())
        .then((result)=>{
            console.log(result)
            if(this.state.type="quote") {
                this.setState({
                    value: (<div style={{width:"fit-content",fontSize:"11 em", margin:"0 auto"}}><p>{result["quote"]}</p><br/><i>{result["author"]} </i> </div>)  
                });
            }
        },
        (error)=>{
            console.log(error)

            this.setState({
                value: ()=>{ return <div><p>{error} </p> </div>  }
            });
        }

        )
    }
   

    render(){
        return (
            <div style={{height:"20vh",width:"100%", margin:"0 auto" }} >
              <div style={{width:"fit-content", margin:"0 auto"}} >
                { this.state.value}  
            </div>
            </div>

        )

    }
}

export default Bottom
