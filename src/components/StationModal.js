
import React from 'react';
import EthereumSession from '../lib/eth-session.js';
import ContractAbi from '../artifacts/contracts/GoldenVoyager.json';

const mainnetConfig = {
    'CONTRACT': '0x05cef8e8eeFca214F7eD28564C980E6d45A2Bf1d',
    'CHAIN_ID':  1,
    'ABI':       ContractAbi
}

const config = mainnetConfig;

const closeButton = {
    cursor: 'pointer',
    fontSize: '2em',
    position: 'absolute',
    right: '5px',
    top: '-5px',
    zIndex: 100,
    '&:hover': {
        color: 'red'
    }
}

export default function StationModal({ token, refreshToken, setModal }){
    const [ data, setData ] = React.useState({
        name: token.personalization.name,
        description: token.personalization.description,
        story: token.personalization.story
    });

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

    const handleChange = ( evt ) => {
        setData( data => ({
            ...data,
            [evt.target.name]: evt.target.value
        }));
    };

    const handleClose = (evt) => {
        setModal( null );
    };

    const handleSave = async (evt) => {
        try{
            await session.connectEthers( true );
            const account = session.wallet.accounts[0];
            const signer = session.ethersProvider.getSigner();
            const contract = session.contract.connect(signer)

            await session.contract.estimateGas.personalize( token.tokenId, data.name, data.description, data.story, { from: account });
            await contract.personalize( token.tokenId, data.name, data.description, data.story, { from: account });
            alert( "Update saved!" );

            setModal( null );
            refreshToken( token );
        }
        catch( err ){
            const error = err.error ? err.error : err;
            if( error.message ){
                if( error.code )
                    alert( `Error during save:\n\n${error.code}: ${error.message}` );
                else
                    alert( `Error during save:\n\n${error.message}` );
            }
            else{
                alert( "Error during save:\n\n"+ String( error ) );
            }
        }
    }


    return (
        <div style={{ background: 'rgba( 0, 0, 0, 0.8 )', height: document.body.offsetHeight, width: '100%' }}>
            <fieldset style={{ background: 'black', border: '2px solid white', margin: '0 auto', maxWidth: '500px', position: 'relative', width: '50vw', zIndex: 10 }}>
                <div style={closeButton} onClick={handleClose}>&times;</div>
                <h2>{token.json.name}</h2>

                <img key={token.tokenId} alt={token.json.name} src={token.json.image} height="400" width="400" style={{ display: 'block', margin: '1em auto' }} />
                <div>
                    <u style={{ textDecoration: 'underline' }}>Personalization</u><br />
                    <table border="0" width="100%">
                    <tbody>
                    <tr>
                        <td align="right" width="50%"><label>Name:</label></td>
                        <td align="left"><input type="text" onChange={handleChange} name="name" value={data.name} /></td>
                    </tr>
                    <tr>
                        <td align="right"><label>Description:</label></td>
                        <td align="left"><input type="text" onChange={handleChange} name="description" value={data.description} /></td>
                    </tr>
                    <tr>
                        <td align="right" valign="top"><label>Story:</label></td>
                        <td align="left"><textarea onChange={handleChange} name="story" value={data.story} /></td>
                    </tr>
                    <tr>
                        <td align="right" colSpan="2">
                            <button onClick={evt => handleSave( evt, token )}>Save</button>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                </div>
                <hr />
                <div>
                    <u style={{ textDecoration: 'underline' }}>Attributes</u><br />
                    <table border="0" width="100%">
                    <tbody>
                    {token.json.attributes.map( attr => (
                        <tr key={attr.trait_type}>
                            <td align="right"><strong>{attr.trait_type}:</strong></td>
                            <td align="left">{attr.value}</td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </fieldset>
        </div>
    );
}