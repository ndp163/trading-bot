export interface Currency {
	USD: number;
	SOL: number;
}

export class PumpfunapiApi {
	static async getPrice(address: string): Promise<Currency> {
		try {
			const response = await fetch(
				`https://api.pumpfunapi.org/price/${address}`
			);

			const data = await response.json();
			return {
				SOL: Number(data.SOL),
				USD: Number(data.USD),
			};
		} catch (error) {
			// If there was an error, log it
			console.error('Error fetching price:', error);
			console.log('Retry fetch price...');
			await this.delay(2000);
			return await this.getPrice(address);
		}
	}

	static delay(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
