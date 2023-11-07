function convertCurrency() {
    var exchangeRates = {
      "GBP": 1,
      "USD": 1.23,
      "Euro": 1.15,
      "CAD": 1.69,
      "AUD": 1.91,
      "Zloty": 5.12,
      "Rupees": 102.38,
      "Pesos": 21.50,
      "Rubles": 113.27,
      "Yuan": 8.95,
      "Yen": 184.98,
      "Franc": 1.11,
      "TRY": 35.03,
      "NOK": 13.76,
      "KRW": 1605.33
    };
  
    var from = document.getElementById('from-currency').value;
    var to = document.getElementById('to-currency').value;
    var amount = document.getElementById('amount').value;
    var result = amount * exchangeRates[to] / exchangeRates[from];
  
    document.getElementById('result').innerHTML = `Converted Amount: ${result.toFixed(2)} ${to}`;
  }