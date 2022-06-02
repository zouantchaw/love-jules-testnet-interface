import "./App.css";
import "./flow/config";
import * as fcl from "@onflow/fcl";
import Wallet from "./components/Wallet";
import { useState, useEffect } from "react";

function App() {
  // UI State
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("Connect Wallet");

  // Update user on page load
  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  // Logged in user
  const AuthedState = () => {
    // setMessage(user.addr);
    return (
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
        <h1>Logged In</h1>
        <button onClick={fcl.unauthenticate}>Disconnect</button>
      </div>
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
        <h1>Yes Jules dApp</h1>
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
