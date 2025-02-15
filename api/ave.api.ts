export class AveApi {
	static async getSmartMetrics(address: string) {
		try {
			const response = await fetch(
				`https://febweb002.com/v1api/v3/tokens/${address}-solana`,
				this.getRequestOptions()
			);
			const data = JSON.parse((await response.json()).data);

			return {
				smart_money_buy_count_24h: data.pairs[0].smart_money_buy_count_24h,
				smart_money_sell_count_24h: data.pairs[0].smart_money_sell_count_24h,
				smart_money_buy_volume_24h: data.pairs[0].buy_volume_u_24h,
				smart_money_sell_volume_24h: data.pairs[0].sell_volume_u_24h,
				cto_flag: data.token.cto_flag,
			};
		} catch (error) {
			console.error('Error getting smart metrics:', error);
			return null;
		}
	}

	private static getRequestOptions(): RequestInit {
		return {
			method: 'GET',
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-US,en;q=0.7',
				'ave-udid':
					'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36--1734839612671--bafd4cfe-1c6a-463f-8f49-b4b9d0ef9e02',
				lang: 'en',
				priority: 'u=1, i',
				'sec-ch-ua':
					'"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Linux"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'cross-site',
				'sec-gpc': '1',
				'x-auth': '5a768dd7756bcbb18d9b24015985cf811739007689551455041',
				Referer: 'https://ave.ai/',
				'Referrer-Policy': 'strict-origin-when-cross-origin',
			},
		};
	}
}
