export class CheckDexApi {
	static async checkDexPaid(address: string) {
		try {
			const response = await fetch(
				`https://www.checkdex.xyz/api/dexscreener?tokenAddress=${address}`,
				this.getRequestOptions()
			);
			const data = await response.json();
			return Boolean(data?.pairs ?? false);
		} catch (error) {
			console.error('Error checking dex paid:', error);
			return false;
		}
	}

	private static getRequestOptions(): RequestInit {
		return {
			method: 'GET',
			headers: {
				accept: '*/*',
				'accept-language': 'en,vi;q=0.9,en-US;q=0.8,ko;q=0.7',
				'cache-control': 'no-cache',
				cookie: '_ga=GA1.1.150711452.1732069342; ...',
				dnt: '1',
				pragma: 'no-cache',
				priority: 'u=1, i',
				referer: 'https://www.checkdex.xyz/',
				'sec-ch-ua':
					'"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"Windows"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'user-agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
			},
			redirect: 'follow',
			referrerPolicy: 'no-referrer',
		};
	}
}
