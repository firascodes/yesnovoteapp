import { ConnectWallet, useAddress, useContract, useContractRead, Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";


const Home: NextPage = () => {

  const address= useAddress();
  const contractAddress = "0x1cA2353648b3D239CDb205D4eEe86438045B6d31";

  const { contract } = useContract(contractAddress);
  const { data: proposal1, isLoading: proposal1Loading } = useContractRead(contract,"proposals",0);
  const { data: proposal2, isLoading: proposal2Loading } = useContractRead(contract,"proposals",3);
  const { data: hasVoted, isLoading: hasVotedLoading } = useContractRead(contract, "hasVoted", address);
  
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
      <h1>Decentralized Opinion/Survey Board</h1>
      <p><i>(One vote per Account)</i></p>
      <br />
      <ConnectWallet theme="dark"/>
      <br />
      <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h1>Question #1</h1>
            <div>
            {address ? (
              <div>
                { proposal1Loading ? (
                  <div>
                    <p> Loading Proposal ....</p>
                  </div>
                ): (
                  <div>
                    <h2>{proposal1[0]}</h2>
                    {
                      !hasVoted?<div className={styles.btns}>
                      <Web3Button className={styles.web3btn}
                      contractAddress={contractAddress}
                      action={(contract)=> contract.call("voteYes",0)}
                      onSuccess={(result) => alert("Success!")}
                      onSubmit={() => console.log("Transaction submitted")}
                      theme="light"
                      isDisabled={hasVoted}
                      >Yes</Web3Button>
                      <br />
                      <br />
                      <Web3Button className={styles.web3btn}
                      contractAddress={contractAddress}
                      action={(contract)=> contract.call("voteNo",0)}
                      onSuccess={(result) => alert("Success!")}
                      onSubmit={() => console.log("Transaction submitted")}
                      theme="light"
                      isDisabled={hasVoted}
                      >No</Web3Button>
                    </div> :
                      <h4>You Have Voted Successfully!</h4>
                    }
                    <div>
                      {!hasVotedLoading && hasVoted? (
                        <div>
                            <h3>Result: </h3>
                            <p>Yes:  {proposal1[1].toNumber()}</p>
                            <p>No:  {proposal1[2].toNumber()}</p>
                        </div>
                      ): (
                        <div>
                          <br />
                          <p>You have not voted yet. Result will show after you vote</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              ) : (
                <p>Please connect your wallet to continue.</p>
              )}
            </div>
          </div>
          {/* <div className={styles.or}>
            <h1>Or</h1>
          </div> */}
          <div className={styles.card}>
            <h1>Question #2</h1>
            <div>
            {address ? (
              <div>
                { proposal2Loading ? (
                  <div>
                    <p> Loading Proposal ....</p>
                  </div>
                ): (
                  <div>
                    <h2>{proposal2[0]}</h2>
                    { !hasVoted? <div className={styles.btns}>
                      <Web3Button className={styles.web3btn}
                      contractAddress={contractAddress}
                      action={(contract)=> contract.call("voteYes",3)}
                      onSuccess={(result) => alert("Success!")}
                      onSubmit={() => console.log("Transaction submitted")}
                      theme="light"
                      isDisabled={hasVoted}
                      >Yes</Web3Button>
                      <br />
                      <br />
                      <Web3Button className={styles.web3btn}
                      contractAddress={contractAddress}
                      action={(contract)=> contract.call("voteNo",3)}
                      onSuccess={(result) => alert("Success!")}
                      onSubmit={() => console.log("Transaction submitted")}
                      theme="light"
                      isDisabled={hasVoted}
                      
                      >No</Web3Button>                  
                    </div> : <h4>You Have Voted Successfully!</h4>
                    }
                    <div>
                      {!hasVotedLoading && hasVoted? (
                        <div>
                            <h3>Result: </h3>
                            <p>Yes:  {proposal2[1].toNumber()}</p>
                            <p>No:  {proposal2[2].toNumber()}</p>
                        </div>
                      ): (
                        <div>
                          <br />
                          <p>You have not voted yet. Result will show after you vote</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              ) : (
                <p>Please connect your wallet to continue.</p>
              )}
            </div>
          </div>
      </div>
      </main>
    </div>
  );

  


};

export default Home;
