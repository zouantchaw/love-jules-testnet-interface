export const mintNftTx = `
import LoveJules from 0xLoveJules

transaction() {

  prepare(acct: AuthAccount) {
    // Get collection from callers storage
    let collection = acct.borrow<&LoveJules.Collection>(from: /storage/LoveJulesCollection) ?? panic("This collection does not exist here")

    // Mint and deposit native NFT to callers account
    let nft <- LoveJules.mint()

    // Store nft inside callers collection
    collection.deposit(token: <- nft)
  }

  execute {
    log("A user minted an NFT into their account")
  }
}
`
