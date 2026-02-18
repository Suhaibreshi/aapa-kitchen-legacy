export interface StockItem {
  item: string;
  stock: number;
}

export interface GoogleSheetsConfig {
  apiKey: string;
  spreadsheetId: string;
  range: string;
}

const config: GoogleSheetsConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '',
  spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID || '',
  range: 'Sheet1!A:B' // Adjust based on your sheet name and range
};

export async function fetchStockData(): Promise<StockItem[]> {
  try {
    if (!config.apiKey || !config.spreadsheetId) {
      console.warn('Google Sheets credentials not configured, using fallback data');
      return getFallbackStockData();
    }

    console.log('Fetching stock data from Google Sheets...');
    console.log('Spreadsheet ID:', config.spreadsheetId);
    console.log('API Key (first 10 chars):', config.apiKey.substring(0, 10) + '...');
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${config.range}?key=${config.apiKey}`;
    console.log('Request URL:', url.replace(config.apiKey, 'API_KEY_HIDDEN'));
    
    const response = await fetch(url);
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API error response:', errorText);
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Google Sheets response data:', data);
    
    if (!data.values || data.values.length === 0) {
      console.warn('No data found in Google Sheets');
      return getFallbackStockData();
    }

    // Skip header row and convert to StockItem format
    const stockItems: StockItem[] = data.values
      .slice(1) // Skip header row
      .map((row: string[]) => ({
        item: row[0]?.trim() || '',
        stock: parseInt(row[1]) || 0
      }))
      .filter(item => item.item && !isNaN(item.stock));

    console.log('Processed stock items:', stockItems);
    return stockItems;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return getFallbackStockData();
  }
}

function getFallbackStockData(): StockItem[] {
  return [
    { item: 'haakh-anchaar', stock: 10 },
    { item: 'mixed-anchaar', stock: 20 }
  ];
}

export function isItemInStock(itemId: string, stockData: StockItem[]): boolean {
  const stockItem = stockData.find(item => item.item === itemId);
  return stockItem ? stockItem.stock > 0 : false;
}

export function getItemStock(itemId: string, stockData: StockItem[]): number {
  const stockItem = stockData.find(item => item.item === itemId);
  return stockItem ? stockItem.stock : 0;
}
