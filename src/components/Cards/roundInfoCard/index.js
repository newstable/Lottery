import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useWallet, UseWalletProvider } from 'use-wallet'
import { Grid } from '@material-ui/core';
import { LotteryContract, TicketContract, CoinContract, CoinDecimals, MultiContract } from "../../contract"

import Image from 'next/image'
import { ethers } from "ethers";


const RoundInfoCard = (props) => {
  const { round } = props;
  const [totalpot, setTotalPot] = useState(1040);
  const [winNumbers, setWinNumbers] = useState([[12, 1, 3, 2]])
  const [roundWinNumber, setRoundWinNumbers] = useState([12, 1, 3, 2])
  const [roundWinAmount, setRoundWinAmount] = useState([12, 1, 3, 2])
  const [issueId, setIssueId] = useState("0");
  const [winAmounts, setWinAmounts] = useState([[12, 1, 3, 2]])

  // //console.log("roundWinNumber",roundWinNumber)
  //date update
  useEffect(() => {
    async function getData() {
      var _issueId = await LotteryContract.issueIndex();
      setIssueId(_issueId);
      //console.log(_issueId);
      if (_issueId.toString() == "0") {
        setWinNumbers([[0, 0, 0, 0]]);
        setWinAmounts([[0, 0, 0, 0]]);
      }
      else {
        var roundIDs = []
        for (var i = 0; i < _issueId; i++)
          roundIDs.push(i);
        //get round infos
        var _RoundDatas = await MultiContract.historyDatas(roundIDs);
        // //console.log("_RoundDatas-card",_RoundDatas[1]);
        setWinNumbers(_RoundDatas[0]);
        setWinAmounts(_RoundDatas[1]);
      }
    }
    getData();
  }, [])

  useEffect(() => {
    //console.log("winAmounssts",winAmounts,round)
    if (round < 0 || typeof (winNumbers[round]) == "undefined" || typeof (winAmounts[round]) == "undefined") {
      setRoundWinNumbers([0, 0, 0, 0]);
      setRoundWinAmount([0, 0, 0, 0]);
    }
    else {
      setRoundWinNumbers(winNumbers[round]);
      setRoundWinAmount([
        ethers.utils.formatUnits(winAmounts[round][0], CoinDecimals),
        ethers.utils.formatUnits(winAmounts[round][1], CoinDecimals),
        ethers.utils.formatUnits(winAmounts[round][2], CoinDecimals),
        ethers.utils.formatUnits(winAmounts[round][3], CoinDecimals)
      ]
      );
    }
  }, [round, winNumbers, winAmounts])

  return (
    <div className="RoundInfoCard">

      <Grid container className="title">
        <Grid item xs={12} sm={12} md={6}
          className="RoundInfoCard-header1">
          <Grid container
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={4} sm={4} md={4} >
              <div style={{
                position: "relative",
                height: "60px"
              }}>
                <Image src="/image/logo.png" id="" alt="" fill="" width="80px" height="80px" layout="fixed" />
              </div>
            </Grid>
            <Grid item xs={8} sm={8} md={8} className="texts">
              <div className="x-font3-white">Winning numbers</div>
              <div className="x-font2-yellow">{roundWinNumber[0].toString()},{roundWinNumber[1].toString()},{roundWinNumber[2].toString()},{roundWinNumber[3].toString()}</div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}
          className="RoundInfoCard-header2">
          <Grid container
            alignItems="center"
            justifyContent="center">
            <Grid item xs={4} sm={4} md={4} >
              <div style={{
                position: "relative",
                height: "60px"
              }}>
                <Image src="/image/price-tag.png" id="" alt="" fill="" width="60px" height="60px" layout="fixed" />
              </div>
            </Grid>
            <Grid item xs={8} sm={8} md={8} className="texts">
              <div className="x-font3-white">Total Prize:</div>
              <div className="x-font2-white">{Number(roundWinAmount[0]).toFixed(0)} ATRI</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <div className="body">
        <Grid container
          alignItems="center"
          justifyContent="center">
          <Grid item xs={4} sm={4} md={4} >
            <div className="x-font4-bold-yellow item">NO OF MATCHED</div>
            <div className="x-font4-bold-white item">04</div>
            <div className="x-font4-bold-white item">03</div>
            <div className="x-font4-bold-white item">02</div>
          </Grid>
          <Grid item xs={4} sm={4} md={4} className="text-left">
            <div className="x-font4-bold-yellow item">PRIZE</div>
            <div className="x-font4-bold-white item">{Number(roundWinAmount[1]).toFixed(2)}</div>
            <div className="x-font4-bold-white item">{Number(roundWinAmount[2]).toFixed(2)}</div>
            <div className="x-font4-bold-white item">{Number(roundWinAmount[3]).toFixed(2)}</div>
          </Grid>
        </Grid>

      </div>
    </div>
  )
}

export { RoundInfoCard };