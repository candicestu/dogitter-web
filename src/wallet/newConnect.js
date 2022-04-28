import  React,{useReducer,useCallback,useMemo, useContext,useEffect} from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { AppContext } from "../AppContext";

import { providerOptions } from "./provider/providerOptions";

const web3Modal = new Web3Modal({
    cacheProvider: true, // optional
    providerOptions // required
  });

export const useNewConnectWallet = ()=>{
  const {state, dispatch} = useContext(AppContext);
  const provider = state.profile.provider
  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    // dispatch({type:types.LOGOUT})
    // refreshState();
  };

    const connectWallet = async () => {
        try {
            const provider = await web3Modal.connect();
            const library = new ethers.providers.Web3Provider(provider);
            const accounts = await library.listAccounts();
            const network = await library.getNetwork();

            let address = ""
            if (accounts) address = accounts[0]

            // dispatch({type:types.LOGIN,address:address,provider:provider,library:library})
            // setProvider(provider);
            // setLibrary(library);
            // if (accounts) setAccount(accounts[0]);
            // setChainId(network.chainId);
        } catch (error) {
            console.log(error);
        }
    };

    const newConnectWallet = useCallback(() => {
            return connectWallet()
        })
    // if (web3Modal.cachedProvider) {
        // connectWallet();
    //   }
    const newDisconnect = useCallback(()=>{
        return disconnect()
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

    useMemo(() => {
        // console.log('reload connect',provider)
        // first connect
        if (web3Modal.cachedProvider) {
            newConnectWallet();
          }
        // web3Modal.cachedProvider && newConnectWallet()

        }, [])
  
      return [newConnectWallet,newDisconnect]
}
