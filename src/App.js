import { useState,useCallback,useEffect } from 'react';
import Web3Modal from "web3modal";
import { providerOptions } from "./wallet/provider/providerOptions";
import { ethers } from "ethers";
import { truncateAddress } from "./utils/utils";
import makeBlockie from 'ethereum-blockies-base64';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'

import './App.css';
import banner from './static/images/banner.jpeg'
// import money from './static/images/money.jpeg'
import fei from './static/images/fei.jpeg'
import twitter from './static/images/twitter.svg'
import twitter2 from './static/images/twitter2.svg'
import item1 from './static/images/item1.jpeg'
import item2 from './static/images/item2.jpeg'
import item3 from './static/images/item3.jpeg'
import item4 from './static/images/item4.jpeg'
import item5 from './static/images/item5.jpeg'
import item6 from './static/images/item6.jpeg'
import item7 from './static/images/item7.jpeg'
import item8 from './static/images/item8.jpeg'
import item9 from './static/images/item9.jpeg'





import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 100,
  strokeWidth: 6
};

const renderTime = (dimension, time) => {
  return (
    <div className="time-wrapper">
      <div className="time">{time}</div>
      <div>{dimension}</div>
    </div>
  );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

function App() {
  const currentYear = new Date().getFullYear();
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = 1651168800; // use UNIX timestamp in seconds
  const remainingTime = endTime - stratTime;
  // const days = Math.ceil(remainingTime / daySeconds);
  // const daysDuration = days * daySeconds;

  const [provider,setProvider] = useState(null)
  const [account,setAccount] = useState("")
  const [showBtn,setShowBtn] = useState(false)

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    // dispatch({type:types.LOGOUT})
    // refreshState();
    clearAll()
  };
  const clearAll = ()=>{
    setProvider(null)
    setAccount("")
  }

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();

            if (accounts) setAccount(accounts[0])

            setProvider(provider);
            // if (accounts) setAccount(accounts[0]);
            // setChainId(network.chainId);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
      if (web3Modal.cachedProvider) {
        connectWallet();
      }
    })
    
    
    useEffect(() => {
      if (provider && provider.on) {
        const handleAccountsChanged = (accounts) => {
          console.log("accountsChanged", accounts);
          // if (accounts)  dispatch({type:types.SETADDRESS,address:accounts[0]});
        };
  
        const handleChainChanged = (_hexChainId) => {
          console.log("changeChain", _hexChainId);
          // setChainId(_hexChainId);
        };
  
        const handleDisconnect = (error) => {
          console.log("disconnect", error);
          disconnect();
        };
  
        provider.on("accountsChanged", handleAccountsChanged);
        provider.on("chainChanged", handleChainChanged);
        provider.on("disconnect", handleDisconnect);
  
        return () => {
          if (provider.removeListener) {
            provider.removeListener("accountsChanged", handleAccountsChanged);
            provider.removeListener("chainChanged", handleChainChanged);
            provider.removeListener("disconnect", handleDisconnect);
          }
        };
      }
    }, [provider]);

  // const children = ({ remainingTime }) => {
  //   const hours = Math.floor(remainingTime / 3600)
  //   const minutes = Math.floor((remainingTime % 3600) / 60)
  //   const seconds = remainingTime % 60
  
  //   return `${hours}:${minutes}:${seconds}`
  // }

  return (
    <div className="App">
      <div className='header-css'>
        <div className='web-name'>Dogitter</div>
        
        <div className='wallet-css'>
          {
            account?
            <Menu>
            <MenuButton>
            <div  className='btn-css'> <img src={makeBlockie(account)} alt="" /> {truncateAddress(account)}</div>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={disconnect}><span className="text-size-16 font-bold font-color-000"> LOG OUT</span></MenuItem>
            </MenuList>
          </Menu>
            :
            <div onClick={connectWallet} className='btn-css'>  connect wallet</div>
          }
          </div>
          <div className='link-css'>
            <a href='https://twitter.com/Dogitter_NFT' rel="noreferrer noopener"  target="_blank"><img src={twitter}  alt="" width={40} /></a>
        </div>
      </div>
      <div className='banner-css'>
      <img src={banner} className='mt-fu10' alt="" />
      </div>
      <div className='empty'>

      </div>
      <div className='mint-css'>
        <div className='mint-left'>
          <div className='radius'>
          <img src={fei} alt='' />
          </div>
        </div>
        <div className='mint-right'>
        <div className='mg-t-20'>
            <div className='mg-10 height-30'>
            What is freedom of speech?
            </div>
            <div className='mg-10 height-30'>
            Dogitter is more than just a meme.
            </div>
          </div>
          <div className='mint-right-top'>
            <div className='mg-10' >
            <CountdownCircleTimer
              {...timerProps}
              colors="#D14081"
              duration={daySeconds}
              initialRemainingTime={remainingTime % daySeconds}
              onComplete={(totalElapsedTime) => {
                return {
                shouldRepeat: remainingTime - totalElapsedTime > hourSeconds
              }
            }
            }
            >
              {({ elapsedTime, color }) => (
                <span style={{ color }}>
                  {renderTime("hours", getTimeHours(daySeconds - elapsedTime))}
                </span>
              )}
            </CountdownCircleTimer>
            </div>
            <div className='mg-10'>
              <CountdownCircleTimer
                {...timerProps}
                colors="#EF798A"
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={(totalElapsedTime) => ({
                  shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                })}
              >
                {({ elapsedTime, color }) => (
                  <span style={{ color }}>
                    {renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}
                  </span>
                )}
              </CountdownCircleTimer>
            </div>
            <div className='mg-10'>
              <CountdownCircleTimer
                {...timerProps}
                colors="#218380"
                duration={minuteSeconds}
                initialRemainingTime={remainingTime % minuteSeconds}
                onComplete={(totalElapsedTime) => {
                  if (remainingTime - totalElapsedTime <=0) {
                    setShowBtn(true)
                  }
                  return {
                  shouldRepeat: remainingTime - totalElapsedTime > 0
                }}}
              >
                {({ elapsedTime, color }) => (
                  <span style={{ color }}>
                    {renderTime("seconds", getTimeSeconds(elapsedTime))}
                  </span>
                )}
              </CountdownCircleTimer>
            </div>
           
          </div>
       
        <div className={showBtn?'show-mint common-mint':'gray-mint common-mint'}>MINT NOW</div>
        </div>
      </div>

      <div className='show-imgs'>
          <div className='item-css'>
                <img src={item1} alt="" />
          </div>
         
          <div className='item-css'>
          <img src={item3} alt="" />
          </div>
          <div className='item-css'>
          <img src={item2} alt="" />
          </div>
          <div className='item-css'>
          <img src={item4} alt="" />
          </div>
      </div>
      <div className='question-css'>
        <div className='question-left'>
          <div className='text-title'>
            FAQ：
          </div>
          <div className='text-title'>
          Total supply of Dogitter?
          </div>
          <div className='text-answer'>
            1999.
          </div>
          <div className='text-title'>
          Mint price?
          </div>
          <div className='text-answer'>
            Free.
          </div>
          <div className='text-title'>
             How many WLs?
          </div>
          <div className='text-answer'>
             1000.
          </div>

          <div className='text-title'>
            What{"'"}s the Utility?
          </div>
          <div className='text-answer'>
          Vibe and Meme
          </div>
        </div>
        <div className='question-right'>
          <div className='item-img'>
            <img src={item6} className="item-css" alt=''/>
            <img src={item7} alt='' className="item-css" />
          </div>
          <div className='item-img'>
            <img src={item8} alt='' className="item-css"/>
            <img src={item9} alt='' className="item-css" />
          </div>
        </div>
      </div>
      <div className='footer'>
                  <div className='footer-img'>
                    <a href='https://twitter.com/Dogitter_NFT' rel="noreferrer noopener"  target="_blank" className='footer-img-css'>
                      <img src={twitter2} width={18} alt="" />
                    </a>
                    <div> © {currentYear} Dogitter, All rights reserved. </div>
                  </div>
      </div>
    </div>
  );
}

export default App;
