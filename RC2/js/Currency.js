function convertCurrency() {
    var exchangeRates = {
      "GBP": 1,
      "USD": 1.22,
      "Euro": 1.15,
      "CAD": 1.67,
      "AUD": 1.93,
      "Zloty": 5.12,
      "Rupees": 101.65,
      "Pesos": 22.16,
      "Rubles": 115.35,
      "Yuan": 8.95,
      "Yen": 183.15,
      "Franc": 1.09,
      "Lira": 34.35,
      "NOK": 0.074,
      "WON": 1645.19
    };
  
    var from = document.getElementById('from-currency').value;
    var to = document.getElementById('to-currency').value;
    var amount = document.getElementById('amount').value;
    var result = amount * exchangeRates[to] / exchangeRates[from];
  
    document.getElementById('result').innerHTML = `Converted Amount: ${result.toFixed(2)} ${to}`;
  }