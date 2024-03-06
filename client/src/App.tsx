import React from "react";
import Body from "./Body";
import abi1 from "./assets/ERC20.json"; // Use {CONTRACTNAME}abi instead of abi1, abi2...
import abi2 from "./assets/ERC20_A.json";
import abi3 from "./assets/CPAMM.json";
import {ethers,Contract, BrowserProvider, BaseContract} from "ethers";
import { useState, useEffect } from "react";
import {ERC20, ERC20_A, CPAMM} from "../typechain-types";

// Create seperate file for interfaces and types
export interface IState {
  provider : ethers.BrowserProvider | null;
  signer : ethers.JsonRpcSigner | null;
  contract1 : ERC20 | null;
  contract2 : ERC20_A | null;
  contract3 : CPAMM | null;
}

const App = () => {
  const [account, setAccount] = useState(null);
  const [state, setState] = useState<IState | null>({
    provider: null,
    signer: null,
    // use meaningful vaiable names
    contract1: null,
    contract2: null,
    contract3: null,
  });

  useEffect(() => {
    const connectWallet = async () => {
      // use meaningful variable names
      // use environment variable for constant values
      const contractAddress1 = "0x00A47703F42D64e71ee8166a117121656FD0437B";
      const contractAddress1abi1 = abi1.abi;
      const contractAddress2 = "0xe3118826315d8E5d676ffA08470d789b81D35dc8";
      const contractAddress2abi2 = abi2.abi;
      const contractAddress3 = "0x5f0Fc7D3ad8a121Dc65e1664f9aEe3d504590225";
      const contractAddress3abi3 = abi3.abi;

      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          // Commented code should be removed before commiting

          // window.ethereum.on("chainChanged",()=>{
          //   window.location.reload();
          // })

          // window.ethereum.on("accountChanged",()=>{
          //   window.location.reload();
          // })
        //   console.log(ethers)
          const provider = new BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract1 = new Contract(
            contractAddress1,
            contractAddress1abi1,
            signer
          ) as BaseContract as ERC20;

          const contract2 = new Contract(
            contractAddress2,
            contractAddress2abi2,
            signer
          ) as BaseContract as ERC20_A;

          const contract3 = new Contract(
            contractAddress3,
            contractAddress3abi3,
            signer
          ) as BaseContract as CPAMM;

          setAccount(account);
          setState({ provider, signer, contract1, contract2, contract3 });
        } else {
          alert("metamask not installed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
// please remove commented code
// const first = account.slice(0,4);
  return (
    <React.Fragment>
      <h3>Connected Account : {account} </h3>
      <Body state={state} />
    </React.Fragment>
  );
};

export default App;