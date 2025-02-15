import { PumpFunApi, CheckDexApi, AveApi } from '../api';

export class CoinAnalyzer {
	async checkPotentialCoin(coin: any) {
		const { top10HolderPercent, marketCap, Liquidity, devBuyPercent } = coin;

		if (
			Liquidity / marketCap <= 0.05 ||
			devBuyPercent >= 8 ||
			top10HolderPercent >= 25 ||
			Liquidity <= 10000 ||
			marketCap >= 59999
		) {
			return;
		}

		const createdCoins = await PumpFunApi.getCoinsCreatedByOwner(coin.owner);
		if (!createdCoins) return false;

		const metrics = this.aggregateCoinsMetrics(createdCoins);
		const kingRate = metrics.kingOfHillTotal / createdCoins.length;
		const completeRate = metrics.raydiumTotal / createdCoins.length;
		console.log(kingRate, completeRate);
		if (kingRate < 0.5 && completeRate < 0.5) {
			console.log('King rate and complete rate low');
			return false;
		}

		return true;
	}

	async analyzeCoin(coin: any) {
		return {
			isDexPaid: await CheckDexApi.checkDexPaid(coin.address),
			smartMetrics: await AveApi.getSmartMetrics(coin.address),
		};
	}

	aggregateCoinsMetrics(coins: any[]) {
		return coins.reduce(
			(metrics, coin) => {
				metrics.completedTotal += coin.complete ? 1 : 0;
				metrics.kingOfHillTotal += coin.king_of_the_hill_timestamp ? 1 : 0;
				metrics.raydiumTotal += coin.raydium_pool ? 1 : 0;

				const lastTradeTime = coin.last_trade_timestamp ?? 0;
				const createdTime = coin.created_timestamp ?? 0;
				const duration = lastTradeTime - createdTime;
				metrics.shortestTime = Math.min(duration, metrics.shortestTime);
				metrics.longestTime = Math.max(duration, metrics.longestTime);

				if (coin.complete && coin.king_of_the_hill_timestamp !== null) {
					metrics.recentLaunch += '🟢';
				} else if (!coin.complete && coin.king_of_the_hill_timestamp !== null) {
					metrics.recentLaunch += '🟡';
				} else {
					metrics.recentLaunch += '🔴';
				}

				return metrics;
			},
			{
				completedTotal: 0,
				kingOfHillTotal: 0,
				raydiumTotal: 0,
				shortestTime: 0,
				longestTime: 0,
				totalTime: 0,
				recentLaunch: '',
			}
		);
	}
}
