
import styled from 'styled-components'
import Modal from 'react-modal';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { LotteryContract, CoinContract, CoinDecimals } from "../contract"
import { useWallet } from 'use-wallet'

import { ethers } from "ethers";

const Lockbutton = styled(Button)`
    background-color: transparent;
    border:2px solid rgb(253,153,45);
    color:rgb(253,153,45);
    font-size: 18px;
    border-radius: 20px;
    padding:10px;
    width:150px;
    float: right;
    transition: 0.5s;
    :hover {
        cursor: pointer;
        background-color:rgb(253,153,45) ;
        color:white;
    }
`
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '500px',
        height: '400px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "rgba(0,0,0, 0.92)"
    },
};

const TicketButton = ({ children }) => {
    const wallet = useWallet();
    const [isOpen, setIsOpen] = React.useState(false);
    const [number1, setNumber1] = useState("1");
    const [number2, setNumber2] = useState("1");
    const [number3, setNumber3] = useState("1");
    const [number4, setNumber4] = useState("1");
    const [ticketAmount, setTicketAmount] = useState("1");
    const [price, setPrice] = useState("1");

    useEffect(() => {
        async function getPrice() {
            var _price = await LotteryContract.minPrice();
            setPrice(ethers.utils.formatUnits(_price, CoinDecimals));
        }
    }, [number4]);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const handleAmount = (e) => {
        setTicketAmount(e.target.value);
    }

    const handleNumber = async (e, v) => {

        if (e.target.value >= 0 && Number.isInteger(Number(e.target.value))) {
            var targetValue = Number(e.target.value);
            while (targetValue > 20) {
                targetValue = targetValue - Math.floor(targetValue / 10) * 10;
                if (targetValue == 0) targetValue = 1;
            }
            if (v == "1") {
                setNumber1(targetValue)
            }
            else if (v == "2") {
                setNumber2(Number(targetValue))
            }
            else if (v == "3") {
                setNumber3(Number(targetValue))
            }
            else {
                setNumber4(Number(targetValue))
            }
        }

    }

    const handleBuy = async () => {
        if (ticketAmount > 0 && wallet.status === 'connected') {
            if (number1 > 0 && number2 > 0 && number3 > 0 && number4 > 0) {
                const provider = new ethers.providers.Web3Provider(wallet.ethereum);
                var signer = provider.getSigner();
                var Lottery = LotteryContract.connect(signer);
                var ticketPrice = (price * ticketAmount).toFixed(16);
                var coin = CoinContract.connect(signer);
                console.log(Lottery.address);
                if (Number((await coin.balanceOf(await signer.getAddress())).toString()) < Number(ticketPrice.toString())) {
                    alert("It needs at least 1000ATRI for ticket");
                }
                else {
                    if (await coin.allowance(await signer.getAddress(), Lottery.address) < ethers.utils.parseUnits(ticketPrice.toString(), CoinDecimals)) {
                        var tx = await coin.approve(Lottery.address, ethers.utils.parseUnits((ticketPrice * 100).toString(), CoinDecimals))
                            .catch((err) => {
                                alert("here")
                                console.log(err)
                            });
                        closeModal();
                        if (tx == null) return;
                        await tx.wait();

                        //console.log(tx.hash);
                    }
                    //buy tickets
                    if (ticketAmount == 1) {
                        var ticketNumbers = [number1, number2, number3, number4];
                        var tx = await Lottery.buy(ethers.utils.parseUnits(price.toString(), CoinDecimals), ticketNumbers)
                            .catch((err) => {
                                //console.log(err)
                            });

                        closeModal();
                        if (tx != null)
                            await tx.wait()
                    }
                    else {
                        var ticketNumbers = [];
                        for (var i = 0; i < ticketAmount; i++) {
                            ticketNumbers.push([number1, number2, number3, number4])
                        }
                        var tx = await Lottery.multiBuy(ethers.utils.parseUnits(price.toString(), CoinDecimals), ticketNumbers)
                            .catch((err) => {
                                //console.log(err)
                            });

                        if (tx != null)
                            await tx.wait()
                    }
                    //console.log(ticketNumbers)
                }
            }
            else {
                alert("Ticket number must be in 1-20");
            }
        }
        else {
            alert("Please connet wallet");
        }
    }
    return (
        <div>
            {children === "BUY TICKET1" ? (
                <button className="ticketStyledButton1" onClick={openModal}>
                    BUY TICKET
                </button>
            ) :
                (
                    <button className="ticketStyledButton" onClick={openModal}>

                        BUY TICKET
                    </button>
                )
            }
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
                style={customStyles}
            >
                <div className="modal-card1">
                    {/* <TextField variant="outlined" label="Number of tickets" className = "round-input" value={ticketAmount} onChange={handleAmount}/> */}
                    <div className="lucky-title x-font2-white" style={{ fontSize: 18 }}>Select your 4 lucky numbers (1 to 20)</div>
                    <Grid container className="ticket-number">
                        <Grid item xs={3} sm={3} md={3}>
                            <TextField className=" x-font3-yellow" variant="outlined" value={number1} onChange={(e) => { handleNumber(e, "1") }}></TextField>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3}>
                            <TextField variant="outlined" value={number2} onChange={(e) => { handleNumber(e, "2") }}></TextField>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3}>
                            <TextField variant="outlined" value={number3} onChange={(e) => { handleNumber(e, "3") }}></TextField>
                        </Grid>
                        <Grid item xs={3} sm={3} md={3}>
                            <TextField variant="outlined" value={number4} onChange={(e) => { handleNumber(e, "4") }}></TextField>
                        </Grid>
                    </Grid>
                    <div className="x-font3-yellow space-3" style={{ fontSize: 16, marginBottom: 10 }}>Price (in ICICB tokens): {price}</div>
                    <button className="ticketStyledButton3" onClick={handleBuy} >
                        BUY TICKET
                    </button>
                </div>
            </Modal>
        </div>
    )
}
export { Lockbutton, TicketButton };