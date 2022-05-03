import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
// import workFlowImage from "../../public/image/5.png"

const WorkFlowCard = () => {
   return (
      <div className="workflow-card">
         {/* <div className="small_head1" style={{textAlign:'center', marginTop:150}}>Atari Lottery</div>
        <div className="title">How it works</div> */}
         <div style={{
            position: "relative",
         }}>
            {/* <Grid container style={{marginTop:100, marginBottom:100}} >
             <Grid item xs={12} sm={12} md={4} lg={4} style={{textAlign:'center'}}>
                <p className="small_head1">1</p>
                <p style={{color:'white'}}>Buy Ticket from <br />this website</p>
             </Grid>
             <Grid item xs={12} sm={12} md={1} lg={1} style={{textAlign:'center', alignSelf:'center'}}>
                <Image src="/image/ARROW.png" width="20px" height="10px" />
             </Grid>
             <Grid item xs={12} sm={12} md={3} lg={3} style={{textAlign:'center'}}>
                <p className="small_head1">2</p>
                <p style={{color:'white'}}>Select Any <br />4 numbers</p>
             </Grid>
             <Grid item xs={12} sm={12} md={1} lg={1} style={{textAlign:'center', alignSelf:'center'}}>
                <Image src="/image/ARROW.png" width="20px" height="10px" />
             </Grid>
             <Grid item xs={12} sm={12} md={3} lg={3} style={{textAlign:'center', alignItems:'center'}}>
             <p className="small_head1">3</p>
                <p style={{color:'white'}}>Fot Mached Any <br />of numbers win Jackpot</p>
             </Grid>
           </Grid> */}
         </div>

      </div>
   )
}

export { WorkFlowCard };