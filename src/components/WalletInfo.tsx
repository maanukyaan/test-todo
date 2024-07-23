import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

// Адрес контракта и ABI
const CONTRACT_ADDRESS = '0x18B2A687610328590Bc8F2e5fEdDe3b582A49cdA';
const CONTRACT_ABI = ['function currentEpoch() view returns (uint256)'];

const WalletInfo: React.FC = () => {
	const [provider, setProvider] =
		useState<ethers.providers.Web3Provider | null>(null);
	const [account, setAccount] = useState<string | null>(null);
	const [balance, setBalance] = useState<string>('0');
	const [epoch, setEpoch] = useState<string>('0');

	useEffect(() => {
		const init = async () => {
			// Проверка наличия MetaMask
			if (window.ethereum) {
				const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
				setProvider(tempProvider);

				// Запрашиваем доступ к кошельку пользователя
				const accounts = await tempProvider.send('eth_requestAccounts', []);
				setAccount(accounts[0]);

				// Получаем баланс в BNB
				const tempBalance = await tempProvider.getBalance(accounts[0]);
				setBalance(ethers.utils.formatEther(tempBalance));

				// Подключаемся к контракту
				const contract = new ethers.Contract(
					CONTRACT_ADDRESS,
					CONTRACT_ABI,
					tempProvider
				);
				const currentEpoch = await contract.currentEpoch();
				setEpoch(currentEpoch.toString());
			}
		};

		init();
	}, []);

	return (
		<div className='bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col items-center'>
			{account ? (
				<>
					<h3 className='text-lg font-bold'>Wallet Info</h3>
					<p className='text-gray-600'>Address: {account}</p>
					<p className='text-gray-600'>Balance: {balance} BNB</p>
					<p className='text-gray-600'>Current Epoch: {epoch}</p>
				</>
			) : (
				<p className='text-gray-600'>
					Please install MetaMask and connect your wallet.
				</p>
			)}
		</div>
	);
};

export default WalletInfo;
