import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useWallet, UseWalletProvider } from 'use-wallet'
import { Grid } from '@material-ui/core';
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import '@progress/kendo-theme-default/dist/all.css';
import { Calendar } from '@progress/kendo-react-dateinputs'
import { LotteryContract, TicketContract, CoinContract, CoinDecimals, MultiContract } from "../../../contract"
import { ethers } from "ethers";

function timeConverterDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year;
  return time;
}

function timeConverterTime(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = hour + ':' + min + ':' + sec;
  return time;
}

const CardHeader = () => {
  return (
    <ListViewHeader
      className="pl-4 pb-2 pt-2"
    >
      <Grid container className="text-center">
        <Grid item xs={6} sm={6} md className="x-font3-red">
          DATE
        </Grid>
        <Grid item xs={6} sm={6} md className="x-font3-red">
          TIME
        </Grid>
        <Grid item xs={4} sm={4} md className="x-font3-yellow">
          COMBINATION
        </Grid>
        <Grid item xs={4} sm={4} md className="x-font3-yellow">
          WINNINGS ATRI
        </Grid>
        <Grid item xs={4} sm={4} md className="x-font3-yellow">
          CLAIM REWARD
        </Grid>
      </Grid>
      <div className="space-line"></div>
    </ListViewHeader>
  );
};

const CardItem = (props) => {
  let item = props.dataItem;
  const handleClaim = item[5];

  var timestamp = item[7].toString();
  var date = timeConverterDate(timestamp);
  var time = timeConverterTime(timestamp);

  const [claim, setClaim] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleClick = (e) => {
    if (!item[3] && item[4]) {
      handleClaim(item[0]);
      setClaim(item[6].includes(item[0]))
    }
  }

  useEffect(() => {
    // //console.log(item[6],item[0])
    setClaim(item[6].includes(item[0]))
  })

  useEffect(() => {
    //console.log(item[3]||!item[4])
    setDisabled(item[3] || !item[4]);
  })

  return (
    <Grid container className="text-center">
      <Grid item xs={6} sm={6} md className="x-font4-white">
        {date}
      </Grid>
      <Grid item xs={6} sm={6} md className="x-font4-white">
        {time}
      </Grid>
      <Grid item xs={4} sm={4} md className="x-font4-white">
        {item[2][0]},{item[2][1]},{item[2][2]},{item[2][3]}
      </Grid>
      <Grid item xs={4} sm={4} md className="x-font4-white">
        {ethers.utils.formatUnits(item[1], CoinDecimals)}
      </Grid>
      <Grid item xs={4} sm={4} md className="x-font4-yellow">
        <Checkbox disabled={disabled} checked={claim} onChange={handleClick} /> {!disabled ? "Claim" : item[3] ? "Claimed" : "Drawing"}
      </Grid>
    </Grid>
  )
}

const TicketInfoCard = (props) => {
  const { round } = props;
  const [totalpot, setTotalPot] = useState(1040);
  const [winNumbers, setWinNumbers] = useState([12, 1, 3, 2]);
  const [historyData, setHistoryData] = useState([1, 1, 2, 2, 22, 22, 2]);
  const [userTickets, setUserTickets] = useState([]);
  const [ticketDatas, setTicketDatas] = useState([]);
  const [styledTicketDatas, setStyledTicketDatas] = useState([]);
  const [claimTickets, setClaimTicket] = useState([]);
  const wallet = useWallet();
  const [roundTime, setRoundTime] = useState(0);

  async function getData() {

    var _roundTime = await LotteryContract.nextDraw();
    setRoundTime(ethers.utils.formatUnits(_roundTime, 0));
    if (wallet.status === 'connected') {

      //console.log("userTickets",userTickets);
      const provider = new ethers.providers.Web3Provider(wallet.ethereum);
      var signer = provider.getSigner();
      var Lottery = LotteryContract.connect(signer);
      var userAddress = await signer.getAddress();
      var userTickets = await Lottery.getUserInfo(userAddress);
      setUserTickets(userTickets);

      //console.log("userTickets",userTickets);
      var Multi = MultiContract.connect(signer);
      // var ticketDatas = await Multi.
      var ticketDatas = await Multi.ticketDatas(userTickets)
        .catch((err) => {
          //console.log("err",err)
        });

      setTicketDatas(ticketDatas);
      //console.log("ticketDatas",ticketDatas);
    }
  }

  const addClaim = (e) => {
    var _included = claimTickets.includes(e);
    if (!_included) {
      claimTickets.push(e);
    }
    else {
      const index = claimTickets.indexOf(e);
      if (index > -1) {
        claimTickets.splice(index, 1);
      }
    }
  }

  const handleClaim = async (e) => {
    if (claimTickets.length > 0) {
      const provider = new ethers.providers.Web3Provider(wallet.ethereum);
      var signer = provider.getSigner();
      var Lottery = LotteryContract.connect(signer);
      var tx = await Lottery.multiClaim(claimTickets);
      //console.log(await tx.wait());
      window.location.reload();
    }
  }


  useEffect(() => {
    getData();
  }, [wallet.status])

  //styled tickets
  useEffect(() => {
    var _styledTicketDatas = [];
    // //console.log(ticketDatas);
    if (ticketDatas != [] && ticketDatas != null && ticketDatas.drawStatus != null)
      ticketDatas.drawStatus.map((data, index) => {
        if (ticketDatas._drawTimes[index].toString() == "0") {
          _styledTicketDatas.push([userTickets[index].toString(), ticketDatas.rewardAmounts[index].toString(), ticketDatas.ticketNumber[index], ticketDatas.claimStatus[index], ticketDatas.drawStatus[index], addClaim, claimTickets, roundTime])

        }
        else
          _styledTicketDatas.push([userTickets[index].toString(), ticketDatas.rewardAmounts[index].toString(), ticketDatas.ticketNumber[index], ticketDatas.claimStatus[index], ticketDatas.drawStatus[index], addClaim, claimTickets, ticketDatas._drawTimes[index]])
      });
    // //console.log(_styledTicketDatas);
    setStyledTicketDatas(_styledTicketDatas);
  }, [ticketDatas])


  //list
  const [page, setPage] = React.useState({
    skip: 0,
    take: 5,
  });
  const { skip, take } = page;

  const handlePageChange = (e) => {
    setPage({
      skip: e.skip,
      take: e.take,
    });
  };

  return (
    <div className="RoundInfoCard">
      <ListView
        data={styledTicketDatas.slice(skip, skip + take)}
        item={CardItem}
        style={{
          width: "100%",
        }}
        header={CardHeader}
      />
      <Pager
        skip={skip}
        take={take}
        onPageChange={handlePageChange}
        total={styledTicketDatas.length}
      />
      <div className="claim-button-box">
        <button className="claim-button" onClick={handleClaim}>Claim Reward</button>
      </div>

    </div>
  )
}

export { TicketInfoCard };