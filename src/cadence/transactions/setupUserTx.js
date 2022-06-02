export const setupUserTx = `
  import NonFungibleToken from 0x631e88ae7f1d7c20
  import LoveJules from 0xLoveJules

  transaction {

    prepare(acct: AuthAccount) {
      // Store collection in callers account to allow them to own native NFT
      acct.save(<- LoveJules.createEmptyCollection(), to: /storage/LoveJulesCollection)

      // Create a public link
      acct.link<&LoveJules.Collection{LoveJules.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/MyNFTCollection, target: /storage/MyNFTCollection)

      acct.link<&LoveJules.Collection>(/private/LoveJulesCollection, target: /storage/LoveJulesCollection)

      let MyNFTCollection = acct.getCapability<&LoveJules.Collection>(/private/MyNFTCollection)
    }

    execute {
      log("A user stored a Collection")
    }
  }
`;
