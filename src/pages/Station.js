import React, { useEffect } from "react";
import EthereumSession from "../lib/eth-session.js";
import ContractAbi from "../artifacts/contracts/GoldenVoyager.json";
import PersonalizeAvatar from "../components/PersonalizeAvatar.js";
import "./Station.css";

const mainnetConfig = {
  CONTRACT: "0x05cef8e8eeFca214F7eD28564C980E6d45A2Bf1d",
  CHAIN_ID: 1,
  ABI: ContractAbi,
};

const rinkebyConfig = {
  CONTRACT: "0x6D8Eb73BdE1e964EA26E4B82443F39E3c0c741e4",
  CHAIN_ID: 4,
  ABI: ContractAbi,
};

const config = rinkebyConfig;

const connectButton = {
  background: "transparent",
  border: "2px solid white",
  borderRadius: "24px",
  color: "white",
  cursor: "pointer",
  fontSize: "1.2em",
  padding: "0.5em 1em",
};

const tokenCard = {
  border: "2px solid white",
  color: "white",
  float: "left",
  margin: "1em",
  height: "500px",
  textAlign: "left",
  width: "250px",
};

export default function Station() {
  const [showModal, setModal] = React.useState(false);
  const [tokenData, setTokenData] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [wallet, setWallet] = React.useState(null);
  const [contractWithSigner, setContractWithSigner] = React.useState(null);

  const session = React.useMemo(() => {
    if (window.ethereum) {
      return new EthereumSession({
        chain: EthereumSession.COMMON_CHAINS[config.CHAIN_ID],
        contractAddress: config.CONTRACT,
        contractABI: config.ABI,
      });
    } else {
      return null;
    }
  }, []);

  const handleConnect = async (evt) => {
    await session.connectEthers(true);
    if (session.isConnected()) {
      loadWallet(session);
      setConnected(true);
    }
  };

  const fetchPersonalizations = async (wallet) => {
    return (
      (await Promise.all(
        wallet.map((tokenId) => {
          return new Promise(async (resolve, reject) => {
            let lastErr = null;
            for (let i = 0; i < 3; ++i) {
              try {
                debugger;
                const data = await session.contract.personalized(tokenId);
                resolve({
                  tokenId,
                  data,
                });
                return;
              } catch (err) {
                lastErr = err;
              }
            }
            reject(lastErr);
          });
        })
      )) || []
    );
  };

  const fetchTokenData = async (URLs) => {
    return (
      (await Promise.all(
        URLs.map((urlData) => {
          return new Promise(async (resolve, reject) => {
            let lastErr = null;
            for (let i = 0; i < 3; ++i) {
              try {
                const response = await fetch(
                  "https://goldenvoyagerparty.com/relay.php?url=" +
                    encodeURIComponent(urlData.url)
                );
                console.log(response);
                debugger;
                resolve({
                  tokenId: urlData.tokenId,
                  response: response,
                });
                return;
              } catch (err) {
                lastErr = err;
              }
            }
            reject(lastErr);
          });
        })
      )) || []
    );
  };

  const fetchURLs = async (wallet) => {
    return (
      (await Promise.all(
        wallet.map((tokenId) => {
          return new Promise(async (resolve, reject) => {
            let lastErr = null;
            for (let i = 0; i < 3; ++i) {
              try {
                const url = await session.contract.tokenURI(tokenId);
                resolve({
                  tokenId,
                  url,
                });
                return;
              } catch (err) {
                debugger;
                lastErr = err;
              }
            }
            reject(lastErr);
          });
        })
      )) || []
    );
  };

  const loadWallet = async (session) => {
    const account = session.wallet.accounts[0];
    let wallet = await session.contract.walletOfOwner(account);
    wallet = wallet.map((tokenId) => parseInt(tokenId.toString()));

    const URLs = await fetchURLs(wallet);
    const responses = await fetchTokenData(URLs);

    const pMap = {};
    const personalizations = await fetchPersonalizations(wallet);
    for (let p of personalizations) {
      pMap[p.tokenId] = p.data;
    }
    const tokenData = await Promise.all(
      responses
        .filter((data) => data.response.ok)
        .map(async (data) => ({
          tokenId: data.tokenId,
          // json: await data.response.json(), // TODO Currently JSON package is not parsing correctly, will need investigation
          personalization: pMap[data.tokenId] || {},
        }))
    );

    setWallet(wallet);
    setTokenData(tokenData);
  };

  const renderGallery = () => {
    return tokenData.map((token) => {
      return (
        <PersonalizeAvatar
          token={token.personalization}
          tokenId={token.tokenId}
          personalize={personalize}
        />
      );
    });
  };

  const personalize = async (e, token, tokenId) => {
    e.preventDefault();
    const ethers = require("ethers");
    const signer = await session.ethersProvider.getSigner();
    const paymentAmount = String(ethers.utils.parseEther(".01"));
    const overrides = {
      from: await signer.getAddress(),
      value: paymentAmount,
    };

    try {
      const contract = await session.contract;
      const contractWithSigner = contract.connect(signer);
      const gasBN = await contractWithSigner.estimateGas.personalize(
        tokenId,
        token.name,
        token.description,
        token.story,
        overrides
      );
      const finalGasBN = await gasBN.mul(
        ethers.BigNumber.from(11).div(ethers.BigNumber.from(9))
      );
      // overrides.gasLimit = finalGasBN.toString();

      setContractWithSigner(contractWithSigner);
      console.log(session, contract);
      // TODO: Determine if we will wait for transaction confirmation to update users token data locally;
      await contractWithSigner.personalize(
        tokenId,
        token.name,
        token.description,
        token.story,
        overrides
      );
      console.log("Account:", await signer.getAddress());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [tokenData]);

  return (
    <>
      <div style={{ color: "white", textAlign: "center", fontSize: "32px" }}>
        <h1>The Station</h1>
      </div>
      {tokenData.length < 1 ? (
        <div>
          <div style={{ textAlign: "center" }}>
            <button style={connectButton} onClick={handleConnect}>
              Connect
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h3>{tokenData.length} token(s)</h3>
        </div>
      )}
      <section className="cards">
        {tokenData.length < 1 ? (
          ""
        ) : (
          <div>
            <div className="flex-container">{renderGallery()}</div>
          </div>
        )}
      </section>
    </>
  );
}
