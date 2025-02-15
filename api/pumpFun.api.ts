export class PumpFunApi {
	private static readonly BASE_URL = 'https://frontend-api-v3.pump.fun';
	static async getCoinsCreatedByOwner(ownerAddress: string) {
		const url = `${this.BASE_URL}/coins/user-created-coins/${ownerAddress}?offset=0&limit=100&includeNsfw=false`;
		const response = await fetch(url);
		return await response.json();
	}

	static async getPrice(tokenAddress: string) {
		const response = await fetch(
			`${this.BASE_URL}/candlesticks/${tokenAddress}?offset=0&limit=1&timeframe=5`,
			this.getRequestOptions()
		);
		return await response.json();
	}
	private static getRequestOptions(): RequestInit {
		return {
			headers: {
				accept: '*/*',
				'accept-language': 'en-US,en;q=0.9',
				'if-none-match':
					'W/"1a8b-nl3i7BG3VwKT3aPC6915DAJXJww:dtagent10305250107141607cNrR"',
				priority: 'u=1, i',
				'sec-ch-ua':
					'"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Linux"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'sec-gpc': '1',
				Referer: 'https://pump.fun/',
				'Referrer-Policy': 'strict-origin-when-cross-origin',
			},
			body: null,
			method: 'GET',
		};
	}
}
