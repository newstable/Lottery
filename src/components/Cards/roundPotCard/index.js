import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useWallet, UseWalletProvider } from 'use-wallet'
import { Grid } from '@material-ui/core';
import { LotteryContract, TicketContract, CoinContract, CoinDecimals } from "../../../contract";
import { ethers } from "ethers";
import img8 from "../../../assets/8.png"
function commafy(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const RoundPotCard = () => {
  const wallet = useWallet();
  const [totalpot, setTotalPot] = useState(1040);
  useEffect(() => {
    async function getAmount() {
      var _amount = await LotteryContract.totalAmount();
      setTotalPot(ethers.utils.formatUnits(_amount, CoinDecimals));
    }
    getAmount();
  }, [])
  return (
    <>
      <Grid container justifyContent='center' alignItems='center' className="Pot">
        <Grid item xs={12} sm={12} md={5} className="totalPot">
          <div className='totalpot-font'>Total Pot :&nbsp;</div>
          <div className='totalpot-font1'>{commafy(Number(totalpot))} I  C  I  C  B</div>
          <div className='money'></div>
        </Grid>
        <Grid item xs={12} sm={12} md={7}>
          <div className='RoundPotCard'>
            <Grid container alignItems='center' justifyContent='center' className='title'>
              <Grid item xs={8} style={{ textAlign: "left" }}>No of matched</Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>Prize</Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='center' className='body'>
              <Grid item xs={4} style={{ borderRight: "1px solid #27231d", textAlign: "left" }}>Lorem 1</Grid>
              <Grid item xs={8} style={{ textAlign: "right" }}>{commafy(Math.floor(parseFloat((totalpot * 0.63))))}</Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='center' className='body'>
              <Grid item xs={4} style={{ borderRight: "1px solid #27231d", textAlign: "left" }}>Lorem 2</Grid>
              <Grid item xs={8} style={{ textAlign: "right" }}>{commafy(Math.floor(parseFloat((totalpot * 0.18))))}</Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='center' className='body'>
              <Grid item xs={4} style={{ borderRight: "1px solid #27231d", textAlign: "left" }}>Lorem 3</Grid>
              <Grid item xs={8} style={{ textAlign: "right" }}>{commafy(Math.floor(parseFloat((totalpot * 0.09))))}</Grid>
            </Grid>
            <Grid container alignItems='center' justifyContent='center' className='body' >
              <Grid item xs={4} style={{ borderRight: "1px solid #27231d", textAlign: "left" }}>Lorem 4</Grid>
              <Grid item xs={8} style={{ textAlign: "right" }}>{commafy(Math.floor(parseFloat((totalpot * 0.1))))}</Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      {/* <div className="RoundPotCard">
      <div className="title">
        <img src={img8} id="" alt="" fill="" width="35px" height="35px" layout="fixed" />
        <div className="x-font2-white" style={{ marginLeft: 10 }}>Total Pool:</div>
        <div className="x-font2-white" style={{ marginLeft: 10 }}>{commafy(Number(totalpot))} ATRI</div>
      </div>

      <div className="body" style={{ width: '90%', margin: 'auto' }}>
        <Grid container
          alignItems="center"
          justifyContent="center">
          <Grid item xs={8} sm={8} md={8} >
            <div className="x-font4-bold-yellow item">PRIZE ALLOCATION</div>
            <div className="x-font4-bold-white item">4 matching numbers</div>
            <div className="x-font4-bold-white item">3 matching numbers</div>
            <div className="x-font4-bold-white item">2 matching numbers</div>
            <div className="x-font4-bold-white item">Processing and organisation fee</div>
          </Grid>
          <Grid item xs={4} sm={4} md={4} className="text-left">
            <div className="x-font4-bold-yellow item">ATRI</div>
            <div className="x-font4-bold-white item">{commafy(Math.floor(parseFloat((totalpot * 0.63))))}</div>
            <div className="x-font4-bold-white item">{commafy(Math.floor(parseFloat((totalpot * 0.18))))}</div>
            <div className="x-font4-bold-white item">{commafy(Math.floor(parseFloat((totalpot * 0.09))))}</div>
            <div className="x-font4-bold-white item">{commafy(Math.floor(parseFloat((totalpot * 0.1))))}</div>
          </Grid>
        </Grid>
      </div>
    </div> */}
    </>
  )
}

export { RoundPotCard };