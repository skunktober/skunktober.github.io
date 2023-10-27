function convertCurrency() {
    var exchangeRates = {
      "GBP": 1,
      "USD": 1.21,
      "Euro": 1.15,
      "CAD": 1.68,
      "AUD": 1.91,
      "Zloty": 5.12,
      "Rupees": 100.99,
      "Pesos": 21.94,
      "Rubles": 114.16,
      "Yuan": 8.87,
      "Yen": 181.21,
      "Franc": 1.09,
      "TRY": 34.16,
      "NOK": 13.54,
      "KRW": 1644.01
    };
  
    var from = document.getElementById('from-currency').value;
    var to = document.getElementById('to-currency').value;
    var amount = document.getElementById('amount').value;
    var result = amount * exchangeRates[to] / exchangeRates[from];
  
    document.getElementById('result').innerHTML = `Converted Amount: ${result.toFixed(2)} ${to}`;
  }