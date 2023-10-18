import { face } from './face';
import { ethers, BigNumber } from 'ethers';
import { contractAbi, contractAddress } from './contract';

export function getProvider() {
  return new ethers.providers.Web3Provider(face.getEthLikeProvider());
}

export function getSigner() {
  const provider = getProvider();
  return provider.getSigner();
}

export function getContract() {
  const signer = getSigner();
  return new ethers.Contract(contractAddress, contractAbi, signer);
}

export async function getAddress() {
  const signer = getSigner();
  return await signer.getAddress();
}

export async function getBettingAmount(gameId: string, address: string) {
  const contract = getContract();
  const amount = await contract.getBetting(BigNumber.from(gameId), address);

  return BigNumber.from(amount);
}

export async function getParticipantsMap(gameId: string) {
  const contract = getContract();
  const participants = (await contract.gameUsers(BigNumber.from(gameId))) as string[];
  console.log('participants', participants);
  // const result = await contract.getBetting(BigNumber.from(gameId));

  const addressByAmount: { [key: string]: BigNumber } = {};

  for (let i = 0; i < participants.length; i++) {
    const address = participants[i];
    const amount = await getBettingAmount(gameId, address);
    addressByAmount[address] = amount;
  }

  return addressByAmount;
}

export async function bet(gameId: string, _amount: string) {
  const contract = getContract();
  const amount = ethers.utils.parseUnits(_amount, 0);

  const result = await contract.bet(BigNumber.from(gameId), amount);
  console.log('participants', result);
}
