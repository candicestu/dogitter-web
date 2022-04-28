import WalletConnect from "@walletconnect/web3-provider";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1" // required
    }
  },
  // walletlink: {
  //   package: CoinbaseWalletSDK, // Required
  //   options: {
  //     appName: "gmFans.xyz", // Required
  //     infuraId: "INFURA_ID", // Required
  //     chainId: 1, // Optional. It defaults to 1 if not provided

  //     // infuraId: process.env.INFURA_KEY // Required unless you provide a JSON RPC url; see `rpc` below
  //   }
  // },
};