import "./App.css";
import "./flow/config";
import * as fcl from "@onflow/fcl";
import Wallet from "./components/Wallet";
import { useState, useEffect } from "react";

function App() {
  // UI State
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("Connect Wallet");
  const [hasCollection, setHasCollection] = useState(false);
  const [mintMessage , setMintMessage] = useState("");

  // Update user on page load
  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  // Logged in user
  const AuthedState = () => {
    // setMessage(user.addr);
    return (
      <>
        {/* Wallet */}
        <div>
          <button
            className="bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 border hover:border-gray-300 focus:border-gray-300 rounded shadow-lg absolute top-4 right-4 lg:top-8 lg:right-8 p-4 flex items-center text-xs disabled:cursor-not-allowed"
            onClick={() => fcl.authenticate()}
            disabled={user.loggedIn}
          >
            {
              <>
                <span className="rounded-full h-2 w-2 block mr-2 bg-green-500" />
              </>
            }
            {user.addr}
          </button>
          <button onClick={fcl.unauthenticate}>Disconnect</button>
        </div>

        {/* Main page */}
        <div className="space-y-8">
          <h1 className="text-4xl font-semibold mb-8">
            Love Jules Minting dApp
          </h1>
          {/* Total Supply */}
          <p>
            Tokens minted: 0/100
            <br />
            Contract value: 0Flow
          </p>

          {/* Mint NFT */}
          <div className="space-y-8">
            <div className="bg-gray-100 p-4 lg:p-8">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Mint NFTs</h2>
                <label className="text-gray-600 text-sm mb-2 inline-block">
                  {hasCollection ? "Currently restricted to one NFT per mint" : "You must send an approval transaction before minting"}
                </label>
                <div className="flex">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-tr rounded-br rounded-tl rounded-bl w-1/3 ">
                    {hasCollection ? "Mint" : "Approve"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* List NFTs in Wallet */}
          <h2 className="text-2xl font-semibold mb-2">Your NFTs</h2>
          <ul className="grid grid-cols-4 gap-6"></ul>
        </div>
      </>
    );
  };

  // Logged out user
  const UnauthenticatedState = () => {
    // setMessage("Connect Wallet");
    return (
      <div>
        <button
          className="bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 border hover:border-gray-300 focus:border-gray-300 rounded shadow-lg absolute top-4 right-4 lg:top-8 lg:right-8 p-4 flex items-center text-xs disabled:cursor-not-allowed"
          onClick={() => fcl.authenticate()}
        >
          {
            <>
              <span className="rounded-full h-2 w-2 block mr-2 bg-red-500" />
            </>
          }
          {/* {message} */}
          Connect Wallet
        </button>
        <div className="space-y-8">
          <h1 className="text-4xl font-semibold mb-8">
            Love Jules Minting dApp
          </h1>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-xl mt-36 mx-auto px-4">
      {user?.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
    </div>
  );
}

export default App;
