import { CoinScanner } from './services';
import { PortfolioManager } from './services/PortfolioManager.service';

const scanner = new CoinScanner();
scanner.startScanning();
PortfolioManager.startTracking();
