import Head from 'next/head'

import Top from './components/top.js'
import Left from  './components/left.js'
import Right from './components/right.js'
import Bottom from './components/bottom.js'


export default function Home() {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      
      </Head>
      <Top>  </Top>
      <div style={{height:"60vh",width:"100%"}}>
        <Side  style={{float:"left",height:"100%",width:"50%" }}>  </Side>
        <Side  style={{float:"right", height:"100%",width:"50%" }}
        type="weather"  api="http://localhost:6900/weather?type=current,daily,hourly"></Side>
      </div>
      <Bottom type="quote" refreshTime={1440000}  api="http://localhost:6900/quote"></Bottom>
      </div>
  )
}
