/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import Web3 from 'web3';
import React from 'react';
import BigNumber from 'big-js';
// import * as Noti from 'utils/notification';
// import {
//   RPC_URL,
//   KAI_ID_CHAIN,
//   Testnet,
//   TokenName,
//   KAIADDRESS,
// } from 'constants/address';
// import { FormattedMessage } from 'react-intl';
import { getUserState, getUser } from 'utils/auth';
import { TokenAbi, NftAbi, wKaiAbi } from 'abis';
let eth;

const getWeb3 = () => {
  if (!eth) {
    if (window[getUserState()]) {
      const provider = window[getUserState()];
      eth = new Web3(provider);
    } else if (window.web3) {
      eth = new Web3(window.web3.currentProvider);
    } else
      // Noti.showNotiError(<FormattedMessage id="app.WalletExtension.install" />);
  }
  return eth;
};

function checkSum(address) {
  const web3 = getWeb3();
  const checkedAddress = web3.utils.toChecksumAddress(address);
  return checkedAddress;
}

async function connectToMetamask() {
  let accounts;
  if (window.ethereum) {
    const provider = window.ethereum;
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      accounts = await provider.request({
        method: 'eth_requestAccounts',
      });
      if (accounts) {
        if (provider.networkVersion !== KAI_ID_CHAIN) {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: KAI_ID_CHAIN }], // chainId must be in hexadecimal numbers
          });
        }
        return accounts[0];
      }
    } catch (error) {
      if (error.code === -32002)
        Noti.showNotiError(
          // <FormattedMessage id="app.WalletExtension.already_request" />,
        );
      if (error.code === 4001)
        if (accounts)
          Noti.showNotiError(
            // <FormattedMessage id="app.WalletExtension.switch_failed" />,
          );
        else
          Noti.showNotiError(
            // <FormattedMessage id="app.WalletExtension.rejected" />,
          );

      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: KAI_ID_CHAIN,
                chainName: Testnet,
                rpcUrls: [RPC_URL],
              },
            ],
          });
          return accounts[0];
        } catch (addError) {
          Noti.showNotiError(
            // <FormattedMessage id="app.WalletExtension.add_failed" />,
          );
        }
      }
    }
  } else {
    // Noti.showNotiError(<FormattedMessage id="app.WalletExtension.install" />);
  }
}

function loadSmartContracts(contracts) {
  const web3 = getWeb3();
  const rs = {};

  contracts.forEach(contract => {
    rs[contract.name] = new web3.eth.Contract(contract.abi, contract.address);
  });
  return rs;
}

function getErc20Contract(token) {
  const { tokenContract } = loadSmartContracts([
    { name: 'tokenContract', abi: TokenAbi, address: token },
  ]);
  return tokenContract;
}
function getArtworkNFT(token) {
  const { tokenContract } = loadSmartContracts([
    { name: 'tokenContract', abi: NftAbi, address: token },
  ]);
  return tokenContract;
}

const getDecimals = NftSmartContract =>
  NftSmartContract.methods.decimals().call();

const getBalance = (NftSmartContract, account) =>
  NftSmartContract.methods.balanceOf(account).call();

const getKAIBalance = account => getWeb3().eth.getBalance(account);

const getAllBalance = async () => {
  const account = getUser().wallet;
  const kaiBalance = BigNumber(await getKAIBalance(account))
    .div(BigNumber(10).pow(18))
    .toFixed(0);
  const listToken = [];
  for (const address of Object.keys(TokenName)) {
    const contract = getErc20Contract(address);
    const decimals = await getDecimals(contract);
    const balance = await getBalance(contract, account);
    const formatBalance = BigNumber(balance)
      .div(BigNumber(10).pow(parseInt(decimals, 10)))
      .toFixed(0);
    listToken.push({
      name: TokenName[address],
      balance: formatBalance,
      address,
      is_pending: false,
    });
  }
  return {
    data: {
      wallet: account,
      kai_balance: kaiBalance,
      kai_token_name: 'KAI',
      tokens: listToken,
    },
  };
};

const widthdrawWKai = async account => {
  const { wKai } = loadSmartContracts([
    { name: 'wKai', abi: wKaiAbi, address: KAIADDRESS },
  ]);
  const balance = await wKai.methods.balanceOf(account).call();
  return wKai.methods.withdraw(balance).send({ from: account });
};
export {
  loadSmartContracts,
  connectToMetamask,
  getDecimals,
  getBalance,
  getErc20Contract,
  getKAIBalance,
  getArtworkNFT,
  checkSum,
  getAllBalance,
  widthdrawWKai,
};
