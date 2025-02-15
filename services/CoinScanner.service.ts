import { MevxApi } from '../api';
import { CoinAnalyzer, Logger } from '.';
import { PortfolioManager } from './PortfolioManager.service';

export class CoinScanner {
	private scannedCoins: any[] = [];
	private analyzer = new CoinAnalyzer();

	async startScanning(interval = 1000) {
		await this.scanJob();
		setTimeout(() => this.startScanning(interval), interval);
	}

	private async scanJob() {
		try {
			const coins = await MevxApi.getCoins();
			const lastScannedCoinIndex = this.scannedCoins.length
				? coins.findIndex(
						(coin: any) => this.scannedCoins[0].address === coin.address
				  )
				: -1;
			const newCoins =
				lastScannedCoinIndex === -1
					? coins.slice()
					: coins.slice(0, lastScannedCoinIndex);
			this.scannedCoins.unshift(...newCoins);

			Logger.logToConsole('New Coins: ' + newCoins.length);
			Logger.logToConsole('Total Scanned: ' + this.scannedCoins.length);

			for (const coin of newCoins) {
				console.log(coin.address);
				if (await this.analyzer.checkPotentialCoin(coin)) {
					const analysis = await this.analyzer.analyzeCoin(coin);
					Logger.logToFile({ coin, ...analysis });
					Logger.logToConsole('Potential Coin Found:');
					Logger.logToConsole(coin);
					PortfolioManager.addCoin(coin.address);
				}
			}
		} catch (error) {
			Logger.logToConsole(error);
		}
	}
}
