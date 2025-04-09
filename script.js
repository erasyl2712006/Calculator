// Арифметика
function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operator = document.getElementById('operator').value;
    let result;
  
    if (isNaN(num1) || isNaN(num2)) {
      result = "Введите оба числа!";
    } else {
      switch (operator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num2 !== 0 ? (num1 / num2) : "Ошибка: деление на ноль"; break;
        case '%': result = (num1 * num2) / 100; break;
        default: result = "Неверный оператор";
      }
    }
  
    document.getElementById('result').textContent = "Результат: " + result;
  }
  
 // Конвертация валют с использованием твоего API-ключа
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
  
    if (isNaN(amount)) {
      document.getElementById('conversionResult').textContent = "Введите сумму!";
      return;
    }
  
    try {
      const response = await fetch(`https://currencyconversionapi.com/dashboard?to=${to}&from=${from}&amount=${amount}`, {
        method: 'GET',
        headers: {
          'apikey': 'a0b2dd92611d2908a5958ef5c8f9a0d1'
        }
      });
  
      const data = await response.json();
  
      if (data.result) {
        document.getElementById('conversionResult').textContent = `Результат: ${data.result.toFixed(2)} ${to}`;
      } else {
        document.getElementById('conversionResult').textContent = "Ошибка при получении данных.";
      }
  
    } catch (error) {
      document.getElementById('conversionResult').textContent = "Ошибка запроса к API.";
    }
  }
  
  
  // Рабочие дни
  function calculateWorkdays() {
    const start = new Date(document.getElementById('startDate').value);
    const end = new Date(document.getElementById('endDate').value);
    let count = 0;
  
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
      document.getElementById('workdaysResult').textContent = "Введите корректные даты!";
      return;
    }
  
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day !== 0 && day !== 6) count++;
    }
  
    document.getElementById('workdaysResult').textContent = `Рабочих дней: ${count}`;
  }
  
