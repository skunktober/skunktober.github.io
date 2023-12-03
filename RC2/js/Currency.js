function convertCurrency() {
    var exchangeRates = {
      "GBP": 1,
      "USD": 1.27,
      "Euro": 1.17,
      "CAD": 1.71,
      "AUD": 1.90,
      "Zloty": 5.05,
      "Rupees": 105.68,
      "Pesos": 21.82,
      "Rubles": 115.85,
      "Yuan": 8.98,
      "Yen": 186.42,
      "Franc": 1.10,
      "TRY": 36.72,
      "NOK": 13.64,
      "KRW": 1648.75,
      "BTC": 0.000032,
      "ETH": 0.00059,
    };
  
    var from = document.getElementById('from-currency').value;
    var to = document.getElementById('to-currency').value;
    var amount = document.getElementById('amount').value;
    var result = amount * exchangeRates[to] / exchangeRates[from];
  
    document.getElementById('result').innerHTML = `Converted Amount: ${result.toFixed(2)} ${to}`;
  }