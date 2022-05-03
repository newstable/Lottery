import React from "react"
import { Grid } from "@material-ui/core";
import logo from "../assets/img/logo.png";
import { FaDiscord, FaTelegramPlane, FaRedditAlien, FaTwitter, FaFacebookF } from "react-icons/fa";

const Footer = () => {
    return (
        <Grid container justifyContent="center" alignContent="center">
            <Grid item xs={1}></Grid>
            <Grid item xs={10} style={{ textAlign: "center" }}>
                <img src={logo} className="footer-img noselect"></img>
                <Grid container justifyContent="center" alignContent="center">
                    <Grid item xs={12} sm={4} md={4} className="footer-font">
                        <div className="footer-header">P R O D U C T S</div>
                        <div>Exchange</div>
                        <div>ICO Tokens</div>
                        <div>ATM Locations</div>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} className="footer-font">
                        <div className="footer-header">A B O U T &nbsp; U S</div>
                        <div>About Us</div>
                        <div>Privacy Policy</div>
                        <div>Terms & Conditions</div>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} className="footer-font">
                        <div className="footer-header">S U P P O R T</div>
                        <div>Help Center</div>
                        <div>Product suggession</div>
                        <div>Referral</div>
                    </Grid>
                </Grid>
                <div className="footer-bottom">Join our community</div>
                <Grid container justifyContent="center" alignContent="center" style={{ marginBottom: "100px" }}>

                    <div className="footer-icon">
                        <FaRedditAlien />
                    </div>
                    <div className="footer-icon">
                        <FaTwitter />
                    </div>
                    <div className="footer-icon">
                        <FaFacebookF />
                    </div>
                    <div className="footer-icon">
                        <FaTelegramPlane />
                    </div>
                    <div className="footer-icon">
                        <FaDiscord />
                    </div>
                </Grid>
            </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
    );
}

export default Footer