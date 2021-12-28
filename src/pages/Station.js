
import React from 'react';
import EthereumSession from '../lib/eth-session.js';
import ContractAbi from '../artifacts/contracts/GoldenVoyager.json';

import StationModal from '../components/StationModal.js';

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
    height: '500px',
    textAlign: 'left',
    width: '250px'
}

export default function Station(){
    const [ showModal, setModal ] = React.useState( null );
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

    const handlePersonalize = async (evt, token) => {
        if( evt && evt.cancelable )
            evt.preventDefault();

        setModal( token );
    };

    const fetchPersonalizations = async ( wallet ) => {
        return await Promise.all( wallet.map( tokenId => {
            return new Promise(async ( resolve, reject ) => {
                let lastErr = null;
                for( let i = 0; i < 3; ++i ){
                    try{
                        const data = await session.contract.personalized( tokenId )
                        resolve({
                            tokenId,
                            data
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

    const fetchTokenData = async ( URLs ) => {
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

    const fetchURLs = async ( wallet ) => {
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

    const loadWallet = async ( session ) => {
        const account = '0x4da11ecf1bfe8aba3fedc5faa6e0c81ab8aa23e4';//session.wallet.accounts[0];
        let wallet = await session.contract.walletOfOwner( account );
        wallet = wallet.map( tokenId => parseInt( tokenId.toString() ) );
        

        const URLs = await fetchURLs( wallet );
        const responses = await fetchTokenData( URLs );

        const pMap = {};
        const personalizations = await fetchPersonalizations( wallet );
        for( let p of personalizations ){
            pMap[ p.tokenId ] = p.data
        }

        const tokenData = await Promise.all(
            responses.filter( data => data.response.ok )
                .map( async (data) => ({
                    tokenId: data.tokenId,
                    json: await data.response.json(),
                    personalization: pMap[ data.tokenId ] || {}
                })
            ));

        setWallet(wallet);
        setTokenData( tokenData );
    };

    const refreshToken = async ( token ) => {
        for( let i = 0; i < 3; ++i ){
            try{
                const data = await session.contract.personalized( token.tokenId )
                for(let td of tokenData){
                    if( td.tokenId === token.tokenId ){
                        td.personalization = data;
                        setTokenData( tokenData );
                        return;
                    }
                }
            }
            catch( err ){}
        }
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
                <fieldset key={token.tokenId} style={tokenCard}>
                    <legend>{token.json.name}</legend>
                    <img alt={token.json.name} src={token.json.image} height="200" width="200" style={{ display: 'block', margin: '1em auto' }} />
                    <div>
                        <u style={{ textDecoration: 'underline' }}>Personalization</u><br />
                        <label>Name</label>: {token.personalization.name}<br />
                        <label>Description</label>: {token.personalization.description}<br />
                        <label>Story</label>: {token.personalization.story}<br />
                        <button style={{ float: 'right' }} onClick={evt => handlePersonalize( evt, token )}>Edit</button>
                    </div>
                    <hr style={{ clear: 'both' }} />
                    <div>
                        <u style={{ textDecoration: 'underline' }}>Attributes</u><br />
                        {token.json.attributes.map( attr => (
                            <div key={attr.trait_type}>
                                <label style={{ fontWeight: 'bold' }}>{attr.trait_type}</label>: {attr.value}
                            </div>
                        ))}
                    </div>
                </fieldset>
            );
        })
    };


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

    let modal = null;
    if( showModal ){
        modal = <StationModal token={showModal} refreshToken={refreshToken} setModal={setModal} />
    }

    return (
        <div style={{ color: 'white', textAlign: 'center' }}>
            <h1>The Station</h1>
            <div style={{ position: 'absolute', width: '100%' }}>{modal}</div>
            {content}
        </div>
    );
}