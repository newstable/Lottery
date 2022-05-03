import React, { useEffect, useState } from "react";
import { Radio, Grid, Slider } from '@material-ui/core';
import { TicketButton } from "../Button";
import { Card } from "../Cards/card";
import { RoundPotCard } from "../Cards/roundPotCard"
import { WorkFlowCard } from "../Cards/workFlow"
import { UnLockWalletCard } from "../Cards/unlockWallet"
import { LatestWinNumbercard } from "../Cards/latestWinNumber"
import { LotteryContract, TicketContract, CoinContract, CoinDecimals } from "../../contract";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowDown } from '@fortawesome/free-solid-svg-icons'

import { ethers } from "ethers";



const main = () => {
    function toHHMMSS(sec) {
        let sec_num = parseInt(sec, 10); // don't forget the second parm
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        let Ohours = hours + '';
        let Ominutes = minutes + '';
        let Oseconds = seconds + '';
        if (hours < 10) {
            Ohours = "0" + hours;
        }
        if (minutes < 10) {
            Ominutes = "0" + minutes;
        }
        if (seconds < 10) {
            Oseconds = "0" + seconds;
        }
        var time = Ohours + 'hr ' + Ominutes + 'min';
        return time;
    }

    const duration = 3600;
    const [parseTime, setParseTime] = useState("0");
    const [roundTime, setRoundTime] = useState(60);
    const [ticketTime, setTicketTime] = useState(0);
    const [drawTime, setDrawTime] = useState(0);
    const [timeValue, setTimeValue] = useState();
    const [issueId, setIssueId] = useState("0");
    const [sliderValue, setSliderValue] = useState(60);

    const [winNumbers, setWinNumbers] = useState([12, 1, 3, 2])
    const [totalpot, setTotalPot] = useState(1040);
    const [faIcon, setFaIcon] = useState(faArrowRight);

    useEffect(() => {
        async function getAmount() {
            var _amount = await LotteryContract.totalAmount();
            setTotalPot(ethers.utils.formatUnits(_amount, CoinDecimals));
        }
        getAmount();
    }, [])
    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 960
                ? setFaIcon(faArrowDown)
                : setFaIcon(faArrowRight)
        };

        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    }, []);

    var styledTicketTime = toHHMMSS(ticketTime)
    var styledDrawTime = toHHMMSS(drawTime);

    useEffect(() => {
        async function getDates() {
            var _parseTime = await LotteryContract.nextPharse();
            var _roundTime = await LotteryContract.nextDraw();
            setParseTime(ethers.utils.formatUnits(_parseTime, 0));
            setRoundTime(ethers.utils.formatUnits(_roundTime, 0));
        }
        getDates();
    }, [])

    useEffect(() => {
        if (timeValue != null) {
            clearInterval(timeValue)
        }
        var _timeValue = setInterval(dateUpdate, 3000);
        setTimeValue(_timeValue);
    }, [parseTime, roundTime])

    const dateUpdate = () => {
        let now = Date.now() / 1000;
        //console.log(parseTime-now)
        if (roundTime - now > 0) {
            setDrawTime(roundTime - now);
        }
        else {
            setDrawTime(0);
        }
        if (parseTime < now) {
            setTicketTime(0);
            setSliderValue(100);
        }
        else {
            setTicketTime(parseTime - now);
            setDrawTime(roundTime - now);
            setSliderValue((duration - (roundTime - now)) * 100 / duration);
        }

    }

    //winnumbers 
    useEffect(() => {

        async function getData() {
            var _issueId = await LotteryContract.issueIndex();
            setIssueId(_issueId);
            if (_issueId == "0") {
                setWinNumbers([0, 0, 0, 0]);
            }
            else {
                //get winNumbers
                var _winnumbers = await LotteryContract.getHistoryNumbers((_issueId - 1).toString());

                setWinNumbers(_winnumbers);
            }
        }
        getData();
    }, [])
    return (<>
        <Grid container >
            <Grid item xs={1} sm={1} md={1}></Grid>
            <Grid item xs={10} sm={10} md={10}>
                <Grid container>
                    <Grid item xs={12} sm={6} className="section1">
                        <div style={{ color: "white", fontSize: "24px" }}>New</div>
                        <div className="lottery_Name1" style={{ margin: "5px 0 20px" }}> Crypto Game</div>
                        <TicketButton >BUY TICKET</TicketButton>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className="img-1" />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={1} sm={1} md={1}></Grid>
        </Grid>
        <div>
            <Grid container className="section2" alignItems="center" justifyContent="center">
                <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} className="first">
                    <Grid container alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={12} md={11} className="texts" style={{ display: 'block' }}>
                            <div style={{ color: "#c69b4c", fontSize: 30 }}>B U Y &nbsp; T I C K E T S &nbsp; W I T H &nbsp; I C I C B</div>
                            <div style={{ color: "white", fontSize: 15, marginTop: 10, fontWeight: 100 }}> Win if 2,3 or 4 of your ticket numbers match!</div>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={4} lg={4} className="ticketOut">
                    <div>
                        <span className="ticketTime">{styledTicketTime} </span>
                        <span className="x-font3-white" style={{ fontSize: 18 }}> Until end of ticket sale </span>
                    </div>
                    <div className="ticketSlider">
                        <div style={{ width: "25%" }} className="sliderPercent"></div>
                    </div>
                    <div>
                        <span className="ticketTime">{styledTicketTime} </span>
                        <span className="x-font3-white" style={{ fontSize: 18 }}> Until draw </span>
                    </div>
                    <div className="ticketSlider">
                        <div style={{ width: "40%" }} className="sliderPercent"></div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
            </Grid>
            <Card>
                <RoundPotCard />
            </Card>
        </div>
        <div className="howto">
            <div className="h-font-1">ICICB LOTTERY</div>
            <div className="h-font-2">How it works?</div>
            <Grid container justifyContent="center" alignContent="center" className="item">
                <Grid item xs={7} sm={7} md={3}>
                    <div style={{ textAlign: "center" }}>
                        <div className="item-1"></div>
                        <div><b>Buy Ticket</b> from</div>
                        <div>this website</div>
                    </div>
                </Grid>
                <Grid item xs={7} sm={7} md={1}>
                    <div className="icon">
                        <FontAwesomeIcon icon={faIcon} />

                    </div>
                </Grid>
                <Grid item xs={7} sm={7} md={3}>
                    <div style={{ textAlign: "center" }}>
                        <div className="item-2"></div>
                        <div><b>Select</b> any</div>
                        <div>4 numbers</div>
                    </div>
                </Grid>
                <Grid item xs={7} sm={7} md={1}>
                    <div className="icon">
                        <FontAwesomeIcon icon={faIcon} />

                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                    <div style={{ textAlign: "center" }}>
                        <div className="item-3"></div>
                        <div>For Matched Any</div>
                        <div>of numbers <b>win Jackpot</b></div>
                    </div>
                </Grid>
            </Grid>
        </div>
        <Grid container justifyContent="center" alignContent="center">
            <Grid item xs={12} sm={6} md={4}>
                <div className="buytickets">
                    <div>Buy tickets</div>
                    <div>with ICICB</div>
                    <TicketButton >BUY TICKET</TicketButton>
                </div>
            </Grid>
        </Grid>
        <div className="section6_div" style={{ paddingBottom: "100px" }}>
            <Card>
                <div className="x-font2-red title" >Latest Winning Numbers</div>
                <LatestWinNumbercard numbers={winNumbers} />
            </Card>
        </div>
    </>);
};

export default main;