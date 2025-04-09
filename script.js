// Полноценный калькулятор
let currentInput = "";

function press(value) {
  currentInput += value;
  document.getElementById('calcDisplay').value = currentInput;
}

function clearDisplay() {
  currentInput = "";
  document.getElementById('calcDisplay').value = "";
}

function calculate() {
  try {
    const result = eval(currentInput);
    document.getElementById('calcDisplay').value = result;
    currentInput = result;
  } catch {
    document.getElementById('calcDisplay').value = "Ошибка";
  }
}

// НДС
function calculateVAT() {
  const amount = parseFloat(document.getElementById('vatAmount').value);
  const rate = parseFloat(document.getElementById('vatRate').value);

  if (isNaN(amount)) {
    document.getElementById('vatResult').textContent = "Введите сумму";
    return;
  }

  const vat = (amount * rate) / 100;
  const total = amount + vat;

  document.getElementById('vatResult').textContent = `НДС: ${vat.toFixed(2)}, Итого с НДС: ${total.toFixed(2)}`;
}

// Конвертация валют
async function convertCurrency() {
    const amount = parseFloat(document.getElementById('currencyAmount').value);
    const from = document.getElementById('fromCurrency').value;
    const to = document.getElementById('toCurrency').value;
  
    if (isNaN(amount)) {
      document.getElementById('currencyResult').textContent = "Введите сумму!";
      return;
    }
  
    try {
      const response = await fetch(`https://api.currencyconversionapi.com/v1/convert?q=${from}_${to}&compact=ultra&apiKey=d74c1932ac1edd9fbf449f4459c944b0`, {
        method: 'GET',
      });
  
      const data = await response.json();
      
      if (data[`${from}_${to}`]) {
        const rate = data[`${from}_${to}`];
        const result = rate * amount;
        document.getElementById('currencyResult').textContent = `Результат: ${result.toFixed(2)} ${to}`;
      } else {
        document.getElementById('currencyResult').textContent = "Ошибка при получении данных.";
      }
  
    } catch (error) {
      document.getElementById('currencyResult').textContent = "Ошибка запроса к API.";
    }
  }
  
