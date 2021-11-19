import React, { useEffect, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector }    from "@web3-react/walletlink-connector";

import ContractAbi from '../artifacts/contracts/GoldenVoyager.json';
import Modal from './Modal.js';
import Navbar from './NavbarMint'
import "./MintHome.css";

import { ethers } from 'ethers';
import EthereumSession from '../lib/eth-session.js';

/*
const mainnetConfig = {
    'CONTRACT': '0x68cf439BA5D2897524091Ef81Cb0A3D1F56E5500',
    'CHAIN_ID':  1,
    'RPC_URL':   process.env.INFURA_API_MAINNET_KEY,
    'ABI':       ContractAbi
}
*/

const rinkebyConfig = {
    'CONTRACT': '0xb370804cBA5AD127D426aca7C2a24B6f9D7E5C4b',
    'CHAIN_ID':  4,
    'RPC_URL':   process.env.INFURA_API_RINKEBY_KEY,
    'ABI':       ContractAbi
}


const config = rinkebyConfig;

const CONNECTORS = {};
CONNECTORS.Walletlink = new WalletLinkConnector({
    url: config.RPC_URL,
    appLogoUrl: null,
    appName: "Golden Voyager Party",
});

CONNECTORS.WalletConnect = new WalletConnectConnector({
    supportedChainIds: [config.CHAIN_ID],
    rpc: config.RPC_URL,
});

export default function MintHome () {
    const context = useWeb3React();
    
    const [walletAddress, setWalletAddress] = useState(null);

    const signedIn = !!walletAddress;

    const [contract, setContract] = useState(null);
    const [contractWithSigner, setContractWithSigner] = useState(null);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [howManyTokens, setHowManyTokens] = useState(15)
    const [totalSupply, setTotalSupply] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const [modalShown, toggleModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const ethereumSession = useMemo(() => {
        if( window.ethereum ){
            const session = new EthereumSession({
                chain:           EthereumSession.COMMON_CHAINS[ config.CHAIN_ID ],
                contractAddress: config.CONTRACT,
                contractABI:     config.ABI
            });
            return session;
        }
        else{
            return null;
        }
    },[]);

    useEffect(() => { 
        if( window.ethereum ){
            ethereumSession.connectEthers()
                .then(() => loadContractData())
                .then(() => {
                    if( ethereumSession.hasAccounts() )
                        setWalletAddress( ethereumSession.wallet.accounts[0] );
                })
                .catch( err => {
                    if( err.code === "CALL_EXCEPTION" ){
                        //we're on the wrong chain
                    }
                    else{
                        debugger
                    }
                })
        }
    }, []);

    async function connectProvider( connector ){
        context.activate( connector, async (err) => {
          //other connectors
          if( err.code === 4001 ){
            //WalletLink: User denied account authorization
            console.debug( err.message );
            return;
          }
          else if( err.name === 'UserRejectedRequestError' ){
            //WalletConnect: The user rejected the request
            console.debug( err.message );
            return;
          }
          else{
            console.warn( err.message );
          }
        });
    }

    function redirect( to ){
        if( to === 'metamask' ){
            const link = 'https://metamask.app.link/dapp/'+ window.location.href.substr( 8 );
            window.location = link;
        }
        else if( to === 'trustwallet' ){
            const link = 'https://link.trustwallet.com/open_url?coin_id=60&url='+ window.location.href;
            window.location = link;
        }
    }

    async function signIn() { 
        if ( !window.ethereum ) {
            setErrorMessage(<div id="providers">
                <p>No Ethereum interface injected into browser.<br />Other providers:</p>
                <ul>
                    <li onClick={() => connectProvider( CONNECTORS.Walletlink )}>&bull; Coinbase Wallet</li>
                    <li onClick={() => redirect( 'metamask' )}>&bull; MetaMask</li>
                    <li onClick={() => redirect( 'trustwallet' )}>&bull; Trust Wallet</li>
                    <li onClick={() => connectProvider( CONNECTORS.WalletConnect )}>&bull; WalletConnect</li>
                </ul>
            </div>);
            toggleModal(true);
            return;
        }

        try{
            let curChain = await ethereumSession.getWalletChainID();
            await ethereumSession.connectEthers( true );
            if( curChain !== ethereumSession.chain.hex ){
                curChain = await ethereumSession.getWalletChainID();
                if( curChain === ethereumSession.chain.hex ){
                    //force the browser to switch to the new chain
                    window.location.reload();
                    return;
                } else {
                    setErrorMessage( `Switch network to the ${ethereumSession.chain.name} before continuing.`)
                    toggleModal(true);
                    return;
                }
            }

            if (ethereumSession.hasAccounts()) {
                setWalletAddress(ethereumSession.wallet.accounts[0])
                await loadContractData()
            }
        }
        catch( error ){
            if (error.code === 4001) {
                setErrorMessage("Sign in to mint Golden Voyagers!")
                toggleModal(true);
            } else { 
                setErrorMessage(error)
                toggleModal(true);
            }
        }
    }

    async function signOut() {
        setWalletAddress(null)
    }

    async function loadContractData () {
        const contract = ethereumSession.contract;
        const signer = ethereumSession.ethersProvider.getSigner();
        const contractWithSigner = contract.connect(signer)
        const totalSupply = await contract.totalSupply();
        const tokenPrice = await contract.PRICE();
        const isActive = await contract.isActive();

        setContract(contract);
        setContractWithSigner(contractWithSigner);
        setTokenPrice(tokenPrice);
        setTotalSupply(totalSupply.toNumber())
        setIsActive(isActive);
    }

    async function mint () { 
        if (!signedIn || !contractWithSigner){
            setErrorMessage("Please connect wallet or reload the page!")
            toggleModal(true);
            return
        }

        if( !isActive ){
            setErrorMessage("Sale is not active right now.  Try again later!")
            toggleModal(true);
            return;
        }

        if( !(await ethereumSession.connectAccounts( true )) ){
            setErrorMessage("Please unlock your wallet and select an account.")
            toggleModal(true);
            return;
        }

        if( !(await ethereumSession.connectChain( true )) ){
            setErrorMessage(`Please open your wallet and select ${ethereumSession.chain.name}.`);
            toggleModal(true);
            return;
        }

        if ( ethereumSession.chain.hex !== await ethereumSession.getWalletChainID() ){
            window.location.reload();
            return;
        }

        //connected
        try{
            const price = String(tokenPrice * howManyTokens)

            const overrides = {
                from: walletAddress,
                value: price
            }
            const gasBN = await ethereumSession.contract.estimateGas.mint(howManyTokens, overrides);
            const finalGasBN = gasBN.mul( ethers.BigNumber.from(11) ).div( ethers.BigNumber.from(10) );
            overrides.gasLimit = finalGasBN.toString();

            const txn = await contractWithSigner.mint(howManyTokens, overrides)
            await txn.wait();
            setMintingSuccess(howManyTokens)
        } catch (error) {
            if (error.error) {
                setMintingError(error.error.message)
            } 
        }
    }

    const setMintingSuccess = (howManyTokens) => {
        setErrorMessage("Congrats on minting " + howManyTokens + "  Golden Voyagers!!");
        toggleModal(true);
    }

    const setMintingError = (error) => {
        setErrorMessage(error);
        toggleModal(true);
    }

    function checkHowMany (newNumber) { 
        if (newNumber > 15) {
            setHowManyTokens(15)
        } else if (newNumber < 1) { 
            setHowManyTokens("")
        } else { 
            setHowManyTokens(newNumber) 
        }
    }

    const oneText = howManyTokens < 2 && howManyTokens > 0 ? "MINT " + howManyTokens + " VOYAGER!" : "MINT " + howManyTokens + " VOYAGERS!"
    const zeroText = howManyTokens < 1 ? "MUST MINT ATLEAST 1 VOYAGER" : oneText

    const paraText = signedIn ? "INPUT NUMBER OF VOYAGERS TO MINT: " : "CONNECT WALLET ABOVE TO MINT VOYAGERS!"
    const buttonText = signedIn ? zeroText : "CONNECT WALLET TO MINT"

    return (
        <div className="minthome">
            <div className="minthomeBg">
                <div className="minthome__wrapper">
                    <Navbar />
                    <div className="minthome__container">
                        <div className="minthome__info">
                            <h1>MINT YOUR VOYAGER NOW!</h1>
                            <p>Mint Price: 0.04 ETH / Limit per Transaction: 15</p>
                            <div className="minthome__signIn"> 
                                {!signedIn ? <button onClick={signIn}>CONNECT WALLET</button>
                                    : <button onClick={signOut}>WALLET CONNECTED<br /> CLICK TO SIGN OUT</button>
                                }
                            </div>
                            
                            <p>VOYAGERS: {totalSupply} / 9000</p>
                            <p>{paraText}</p>
                            
                            <div className={signedIn ? "minthome__signIn-input" : "minthome__signIn-input-false"}>
                                <input 
                                    type="number" 
                                    min="1"
                                    max="15"
                                    value={howManyTokens}
                                    onChange={ e => checkHowMany(e.target.value) }
                                    name="" 
                                />
                            </div>
                            
                            <br/>
                            
                            <div className={signedIn && howManyTokens > 0 ? "minthome__mint" : "minthome__mint-false"}>
                                {howManyTokens > 0 ? <button onClick={() => mint()}>{buttonText}</button>
                                    : <button>{buttonText}</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="minthome__gif">
            </div>

            <Modal
                shown={modalShown}
                close={() => {
                    toggleModal(false);
                }}
                message={errorMessage}
            ></Modal>
        </div>
    );
}