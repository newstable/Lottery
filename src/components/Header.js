import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { toast } from 'react-toastify';
import logo from "../assets/img/logo.png"

import { useWallet } from 'use-wallet'
import { ethers } from 'ethers';
import { maxWidth } from '@mui/system';

const NabBar = styled.div`
    padding-left: 8%;
    padding-right:8%;
    background-color: #020203;
    display: flex;
    align-items: center;
    justify-content: center;
`
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Header = () => {
    const wallet = useWallet();
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (wallet.status == "error") {
            setConnected(!connected);
            toast.error("Please change your wallet to Fantom testnet!");
        }
    }, [wallet.status])
    var styledAddress = wallet.account ? wallet.account.slice(0, 6) + ".." + wallet.account.slice(-4) : "";

    const handleConnect = async () => {
        setConnected(!connected);
        if (connected) {
            wallet.connect();
        } else {
            wallet.reset();
        }

        localStorage.setItem('connect', wallet.status);
    }
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        async function check() {

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.listAccounts();
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (accounts.length != 0) {
                wallet.connect();
            }

        }
        check();
    }, []);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChainError = () => {
        setIsOpen(true);
    };

    return (
        <NabBar>
            <Grid container className='Navbar'>
                <Grid item xs={1} sm={1} md={3} className="nav-buttons">
                    <Link to="/">
                        <img src={logo} className="logo" />
                    </Link>
                </Grid>
                <Grid item xs={11} sm={11} md={9} >
                    <div className='button-2' onClick={handleConnect}>{wallet.status === 'connected' ? (<span>{styledAddress}</span>) : "CONNECT"}</div>
                    <Link to="/mytickets" className='button-1'>My Tickets</Link>
                    <Link to="/history" className='button-1'>History</Link>
                </Grid>
            </Grid>
        </NabBar>
    )
}

export default Header;