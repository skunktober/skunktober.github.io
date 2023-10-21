function convertCurrency() {
    var exchangeRates = {
      "GBP": 1,
      "USD": 1.39,
      "Euro": 1.17,
      "CAD": 1.75,
      "AUD": 1.79,
      "Zloty": 5.29,
      "Rupees": 102.92,
      "Pesos": 27.24,
      "Rubles": 102.03,
      "Yuan": 8.91,
      "Yen": 151.47
    };
  
    var from = document.getElementById('from-currency').value;
    var to = document.getElementById('to-currency').value;
    var amount = document.getElementById('amount').value;
    var result = amount * exchangeRates[to] / exchangeRates[from];
  
    document.getElementById('result').innerHTML = `Converted Amount: ${result.toFixed(2)} ${to}`;
  }