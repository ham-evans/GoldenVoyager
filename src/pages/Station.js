
import React, { useEffect } from 'react';
import EthereumSession from '../lib/eth-session.js';
import ContractAbi from '../artifacts/contracts/GoldenVoyager.json';

const mainnetConfig = {
    'CONTRACT': '0x05cef8e8eeFca214F7eD28564C980E6d45A2Bf1d',
    'CHAIN_ID':  1,
    'ABI':       ContractAbi
}

const config = mainnetConfig;

const connectButton = {
    background: 'transparent',
    border: '2px solid white',
    borderRadius: '24px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.2em',
    padding: '0.5em 1em'
};

const tokenCard = {
    border: "2px solid white",
    color: 'white',
    float: 'left',
    margin: '1em',
    height: '380px',
    textAlign: 'left',
    width: '250px'
}

export default function Station(){
    const [ tokenData, setTokenData ] = React.useState([]);
    const [ wallet, setWallet ] = React.useState( null );

    const session = React.useMemo(() => {
        if( window.ethereum ){
            return new EthereumSession({
                chain:           EthereumSession.COMMON_CHAINS[ config.CHAIN_ID ],
                contractAddress: config.CONTRACT,
                contractABI:     config.ABI
            });
        }
        else{
            return null;
        }
    },[]);

    const handleConnect = async (evt) => {
        await session.connectEthers( true );
        if( session.isConnected() ){
            loadWallet( session );
        }
    };

    const getTokenData = async ( URLs ) => {
        return await Promise.all( URLs.map( urlData => {
            return new Promise(async ( resolve, reject ) => {
                let lastErr = null;
                for( let i = 0; i < 3; ++i ){
                    try{
                        const response = await fetch( 'https://goldenvoyagerparty.com/relay.php?url='+ encodeURIComponent( urlData.url ))
                        resolve({
                            tokenId: urlData.tokenId,
                            response: response
                        });
                        return;
                    }
                    catch( err ){
                        lastErr = err;
                    }
                }
                reject( lastErr );
            })
        })) || [];
    };

    const getURLs = async ( wallet ) => {
        return await Promise.all( wallet.map( tokenId => {
            return new Promise(async ( resolve, reject ) => {
                let lastErr = null;
                for( let i = 0; i < 3; ++i ){
                    try{
                        const url = await session.contract.tokenURI( tokenId )
                        resolve({
                            tokenId,
                            url
                        });
                        return;
                    }
                    catch( err ){
                        lastErr = err;
                    }
                }
                reject( lastErr );
            })
        })) || [];
    };

    const renderGallery = () => {
        return tokenData.map(( token ) => {
            token.json.attributes.sort(( left, right ) => {
                if( left.name < right.name )
                    return -1;

                if( left.name > right.name )
                    return 1;

                return 0;
            });

            return (
                <fieldset style={tokenCard}>
                    <legend>{token.json.name}</legend>
                    <img key={token.tokenId} src={token.json.image} height="200" width="200" style={{ display: 'block', margin: '1em auto' }} />
                    {token.json.attributes.map( attr => (
                        <div>
                            <label style={{ fontWeight: 'bold' }}>{attr.trait_type}</label>: {attr.value}
                        </div>
                    ))}
                </fieldset>
            );
        })
    };

    const loadWallet = async ( session ) => {
        const account = '0x4da11ecf1bfe8aba3fedc5faa6e0c81ab8aa23e4';//session.wallet.accounts[0];
        let wallet = await session.contract.walletOfOwner( account );
        wallet = wallet.map( tokenId => parseInt( tokenId.toString() ) );
        setWallet(wallet);

        const URLs = await getURLs( wallet );
        const responses = await getTokenData( URLs );
        const tokenData = await Promise.all(
            responses.filter( data => data.response.ok )
                .map( async (data) => ({
                    tokenId: data.tokenId,
                    json: await data.response.json()
                })
            ));

        setTokenData( tokenData );
    }


    let content = (
        <div style={{ textAlign: 'center' }}>
            <button style={connectButton} onClick={handleConnect}>Connect</button>
        </div>
    );

    if( window.ethereum && wallet === null ){
        session.connectEthers()
            .then(() => {
                if( session.isConnected() ){
                    loadWallet( session );
                }
            })
            .catch( err => {
                console.warn( err );
            })
    }
    else if( tokenData ){
        content = (
            <>
            <h3>{tokenData.length} token(s)</h3>
            {renderGallery()}
            </>
        );
    }

    console.info( "refresh" );
    return (
        <div style={{ color: 'white', textAlign: 'center' }}>
            <h1>The Station</h1>
            {content}
        </div>
    );
}