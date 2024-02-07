import React, { useState } from 'react';
import '../styles/Landing.css';
import Login from '../components/Login';
import Register from '../components/Register';
import Navbar from '../components/Navbar';
import HeroImg from '../assets/home-hero-img.png';
import About1 from '../assets/about1.jpg';
import About2 from '../assets/about2.jpg';

const Landing = () => {

    const [isLoginBox, setIsLoginBox] = useState(true);


  return (
    <>
    <div className='landingPage'>


        <div className="landing-body">

            <div className="landing-hero" id='home'>
                <div className="landing-hero-content">
                    <h1>SB Stock Trading</h1>
                    <p>Experience seamless stock market trading with our user-friendly platform, offering real-time data, advanced analytics, and swift execution to empower traders and investors alike. </p>

                    <div className="authentication-form">

                        { isLoginBox ?

                            <Login setIsLoginBox={setIsLoginBox} />
                            :
                            <Register setIsLoginBox={setIsLoginBox} />
                        }

                    </div>

                </div>


                <div className="landing-hero-image">
                    
                        <img src={HeroImg} alt="" />
                   
                </div>
            </div>

            <div className="landing-about" id='about'>

                <div className="about-1">
                    <img src={About1} alt="" />
                    <div className="about-1-content">

                        <h3>Real-Time Data</h3>
                        <p>Gain a competitive edge with lightning-fast access to real-time market data, keeping you ahead of every market movement. Stay on top of price fluctuations and trends with up-to-the-minute updates. Make timely and informed decisions with our cutting-edge data delivery. Elevate your trading game with our unparalleled real-time data solutions.</p>
                        <a href='#home'>Join now!!</a>

                    </div>
                </div>
                <div className="about-2">
                    <div className="about-2-content">
                        <h3>Portfolio Management</h3>
                        <p>Effortlessly manage your investments using our comprehensive portfolio management tools, enabling seamless organization and optimization. Stay informed about your portfolio's performance with advanced tracking capabilities. Mitigate risks effectively with our integrated risk assessment features. Take full control of your financial future with our user-friendly and powerful portfolio management solutions.</p>
                        <a href='#home'>Join now!!</a>
                    </div>
                    <img src={About2} alt="" />
                </div>

            </div>

            <div className="footer">
                <p>All rights reserved - &#169; SB-Stocks.com</p>
            </div>


        </div>

    </div>
    </>
  )
}

export default Landing