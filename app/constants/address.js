import { AuctionAbi, MarketAbi, NftAbi, wKaiAbi, MarketAbi_Dev } from '../abis';
const isProduction = process.env.REACT_APP_ENV === 'production';
export const MARKETPLACE = isProduction
  ? process.env.MARKETPLACE
  : process.env.MARKETPLACE_DEV;
export const AUCTION = isProduction
  ? process.env.AUCTION
  : process.env.AUCTION_DEV;
export const KAIADDRESS = isProduction
  ? process.env.WKAI_TOKEN
  : process.env.WKAI_TOKEN_DEV;
export const KAI_ID_CHAIN = isProduction
  ? process.env.KAI_ID_CHAIN
  : process.env.KAI_ID_CHAIN_DEV;
export const RPC_URL = isProduction
  ? process.env.RPC_URL
  : process.env.RPC_URL_DEV;
export const Testnet = 'Kardiachain';
export const SMC_NFT_CT = isProduction
  ? process.env.SMC_NFT_CT
  : process.env.SMC_NFT_CT_DEV;
export const SMC_NFT_UDA = isProduction
  ? process.env.SMC_NFT_UDA
  : process.env.SMC_NFT_UDA_DEV;
export const NULLADDRESS = '0x000000000000000000000000000000';
export const Contracts = {
  auction: { name: 'auction', address: AUCTION, abi: AuctionAbi },
  market: { name: 'market', address: MARKETPLACE, abi: MarketAbi },
  nftSkygate: { name: 'nftSkygate', address: SMC_NFT_CT, abi: NftAbi },
  nftUda: { name: 'nftUda', address: SMC_NFT_UDA, abi: NftAbi },
  wKai: { name: 'wKai', address: KAIADDRESS, abi: wKaiAbi },
  market_dev: { name: 'market_dev', address: MARKETPLACE, abi: MarketAbi_Dev },
};
export const TokenName = {
  [isProduction ? process.env.VNDT_TOKEN : process.env.VNDT_TOKEN_DEV]: 'VNDT',
  [isProduction ? process.env.USDT_TOKEN : process.env.USDT_TOKEN_DEV]: 'USDT',
  [isProduction ? process.env.WKAI_TOKEN : process.env.WKAI_TOKEN_DEV]: 'WKAI',
  [isProduction ? process.env.UDA_TOKEN : process.env.UDA_TOKEN_DEV]: 'UDA',
};
