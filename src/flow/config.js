import { config } from "@onflow/fcl";

// Use environment variables for easy deployment across environments
config({
  "accessNode.api": "https://rest-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "0xProfile": "0xba1132bc08f82fe2" // account address for testnet profile contract
})

