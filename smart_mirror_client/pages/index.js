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
        <Left>  </Left>
        <Right></Right>
      </div>
      <Bottom></Bottom>
      </div>
  )
}
