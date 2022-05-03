import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { ListView, ListViewHeader } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import '@progress/kendo-theme-default/dist/all.css';
import { CoinDecimals } from "../../../contract"
import { ethers } from "ethers";
function commafy(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
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
        <Grid item xs={12} sm={12} md={6}>
          <Grid container className="text-center">
            <Grid item xs={6} sm={6} md={3} className="x-font3-red">
              DATE
            </Grid>
            <Grid item xs={6} sm={6} md={3} className="x-font3-red">
              TIME
            </Grid>
            <Grid item xs={6} sm={6} md={3} className="x-font3-red">
              POOL (ICICB)
            </Grid>
            <Grid item xs={6} sm={6} md={3} className="x-font3-yellow">
              WINNING COMBINATION
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Grid container className="text-center">
            <Grid item xs={6} sm={6} md={3} className="x-font4-yellow">
              4 WINNING NUMBERS
            </Grid>
            <Grid item xs={6} sm={6} md={3} className="x-font4-yellow">
              3 WINNING NUMBERS
            </Grid>
            <Grid item xs={6} sm={6} md={3} className="x-font4-yellow">
              2 WINNING NUMBERS
            </Grid>
            <Grid item xs={6} sm={6} md={3} className="x-font4-yellow">
              ROLLED OVER
            </Grid>
          </Grid>
        </Grid>


      </Grid>
      <div className="space-line"></div>
    </ListViewHeader>
  );
};
const CardItem = (props) => {
  let item = props.dataItem;
  //console.log("item",item);
  var timestamp = typeof (item[0]) == "undefined" ? 0 : item[0].toString();
  var date = timeConverterDate(timestamp);
  var time = timeConverterTime(timestamp);

  var winamount = typeof (item[2]) == "undefined" ? "0" : (Number(item[2][1].toString()) + Number(item[2][2].toString()) + Number(item[2][3].toString()));
  var rolloverAmount = typeof (item[2]) == "undefined" ? "0" : (winamount == 0 ? (Number(item[2][0].toString()) - winamount) : (Number(item[2][0].toString()) * 0.9 - winamount));

  return (
    <Grid container className="text-center" style={{ marginBottom: 20 }}>
      <Grid item xs={12} sm={12} md={6} className="x-font4-white">
        <Grid container className="text-center">
          <Grid item xs={6} sm={6} md={3} className="x-font4-white">
            {date}
          </Grid>
          <Grid item xs={6} sm={6} md={3} className="x-font4-white">
            {time}
          </Grid>
          <Grid item xs={6} sm={6} md={3} className="x-font4-yellow">
            {/* {ethers.utils.formatUnits(typeof(item[2])!="undefined"?(item[2][0]):"0",CoinDecimals)} ICICB */}
            {typeof (item[2]) == "undefined" ? "0" : commafy(Number(item[2][0].toString()) - Number(item[2][1].toString()) - Number(item[2][2].toString()) - Number(item[2][3].toString()))} ICICB

          </Grid>
          <Grid item xs={6} sm={6} md={3} className="x-font4-white">
            {typeof (item[1]) != "undefined" ?
              `${item[1][0]},${item[1][1]},${item[1][2]},${item[1][3]}`
              : "0,0,0,0"}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={12} md={6} className="x-font4-white">
        <Grid container className="text-center">
          <Grid item xs={6} sm={6} md={3} className="x-font4-yellow">
            {ethers.utils.formatUnits(typeof (item[2]) != "undefined" ? (item[2][1]) : "0", CoinDecimals)} ICICB
          </Grid>
          <Grid item xs={6} sm={6} md={3} className="x-font4-yellow">
            {ethers.utils.formatUnits(typeof (item[2]) != "undefined" ? (item[2][2]) : "0", CoinDecimals)} ICICB
          </Grid>
          <Grid item xs={6} sm={6} md={3} className="x-font4-yellow">
            {ethers.utils.formatUnits(typeof (item[2]) != "undefined" ? (item[2][3]) : "0", CoinDecimals)} ICICB
          </Grid>
          <Grid item xs={6} sm={6} md={3} className="x-font4-yellow">
            {typeof (item[2]) == "undefined" ? "0" : commafy(rolloverAmount)} ICICB
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const HistoryInfoCard = (props) => {
  const { data } = props;
  //console.log("HistoryInfoCarddata",data)

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
        data={data.slice(skip, skip + take)}
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
        total={data.length}
      />
    </div>
  )
}

export { HistoryInfoCard };