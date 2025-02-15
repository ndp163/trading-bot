import fs from 'fs';

export class Logger {
	static logToFile(data: any, filename = 'logs.json') {
		fs.appendFile(filename, JSON.stringify(data) + '\n', (err) => {
			if (err) console.error('Error writing to log file:', err);
		});
	}

	static logToConsole(data: any) {
		console.log(
			`[${new Date().toLocaleString()}]`,
			JSON.stringify(data, null, 2) || ''
		);
	}
}
