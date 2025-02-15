export class MevxApi {
	static async getCoins() {
		const now = new Date();
		const response = await fetch(
			`https://api.mevx.io/trade/memezone?minSocial=0&topHolder=0&exchange=pump&devHoldTo=7&holderFrom=10&liquidFrom=10000&volumeFrom=10000&mktCapFrom=10000&txnFrom=55&buyFrom=5&tokenAgeFrom=${Math.floor(
				now.setMinutes(now.getMinutes() - 5) / 1000
			)}&orderBy=create&interval=1440&limit=10`,
			this.getRequestOptions()
		);
		return await response.json();
	}

	private static getRequestOptions(): RequestInit {
		return {
			method: 'GET',
			headers: {
				accept: '*/*',
				'accept-language': 'en,vi;q=0.9,en-US;q=0.8,ko;q=0.7',
				'cache-control': 'no-cache',
				'content-type': 'application/json',
				dnt: '1',
				origin: 'https://mevx.io',
				pragma: 'no-cache',
				priority: 'u=1, i',
				referer: 'https://mevx.io/',
				'sec-ch-ua':
					'"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Windows"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-site',
				'user-agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		};
	}
}
