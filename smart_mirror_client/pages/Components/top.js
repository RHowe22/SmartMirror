import { Component } from "react"

class Top extends Component {
    constructor(props){
        super()
        this.state = { time: new Date()}
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({time:new Date() })

      }


    render(){
        return (
            <div style={{width:'100vw',height:'20vh'}}>
            <div style={{width:"fit-content", margin:"0 auto"}} >
                        

               <p style={{fontSize:"20px", textAlign:"center"}}> {this.state.time.toLocaleTimeString() } </p>
               <p  style={{fontSize:"12px", textAlign:"center"}}> {this.state.time.toLocaleDateString() } </p>
                        
            </div>
            </div>



        )



    }
}









export default Top
