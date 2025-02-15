import fs from 'fs';
import { PumpfunapiApi } from '../api';

interface TrackingCoin {
	address: string;
	entryPrice: number;
	trackingAt: number;
}

export class PortfolioManager {
	private static trackingCoins: TrackingCoin[] = [];
	private static stopLoss = 0.1;
	private static takeProfit = 4;
	private static balance = 0;

	static async addCoin(tokenAddress: string) {
		const price = await PumpfunapiApi.getPrice(tokenAddress);

		this.trackingCoins.push({
			address: tokenAddress,
			entryPrice: price.SOL,
			trackingAt: Date.now(),
		});
	}

	static async startTracking() {
		for (const coin of this.trackingCoins) {
			const price = await PumpfunapiApi.getPrice(coin.address);
			if (
				price.SOL < coin.entryPrice * (1 - this.stopLoss) ||
				price.SOL > coin.entryPrice * (1 + this.takeProfit)
			) {
				this.balance += price.SOL - coin.entryPrice;
				this.trackingCoins = this.trackingCoins.filter(
					(coin) => coin.address !== coin.address
				);
				fs.appendFile(
					'balance.json',
					JSON.stringify({ balance: this.balance, coin, price }) + '\n',
					(err) => {
						if (err) console.error('Error writing to log file:', err);
					}
				);
			}
		}
		console.log('Tracking:', this.trackingCoins.length);
		setTimeout(() => this.startTracking(), 5000);
	}
}
