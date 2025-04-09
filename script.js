const display = document.getElementById('display');

function append(char) {
  display.value += char;
}

function clearDisplay() {
  display.value = '';
}

function calculate() {
  try {
    let expr = display.value.replace('%', '/100');
    display.value = eval(expr);
  } catch {
    display.value = 'Ошибка';
  }
}

function calculateNDS(rate) {
    const displayValue = parseFloat(display.value);
    const resultDiv = document.getElementById("ndsResult");
    resultDiv.innerText = '';
  
    if (isNaN(displayValue)) {
      resultDiv.innerText = 'Введите число';
      return;
    }
  
    const mode = document.querySelector('input[name="ndsMode"]:checked').value;
    let resultText = '';
  
    if (mode === 'with') {
      // Сумма с НДС
      const withoutNDS = displayValue / (1 + rate / 100);
      const nds = displayValue - withoutNDS;
  
      resultText =
        `Сумма с НДС: ${displayValue.toFixed(2)}\n` +
        `НДС (${rate}%): ${nds.toFixed(2)}\n` +
        `Без НДС: ${withoutNDS.toFixed(2)}`;
    } else {
      // Сумма без НДС
      const nds = displayValue * (rate / 100);
      const withNDS = displayValue + nds;
  
      resultText =
        `Сумма без НДС: ${displayValue.toFixed(2)}\n` +
        `НДС (${rate}%): ${nds.toFixed(2)}\n` +
        `Сумма с НДС: ${withNDS.toFixed(2)}`;
    }
  
    resultDiv.innerText = resultText;
  }
  
  

// ===== Конвертация валют =====
const API_KEY = '3af59e8f3866da00f4e31079';
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');

async function loadCurrencies() {
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`);
    const data = await res.json();

    const currencies = Object.keys(data.conversion_rates);
    currencies.forEach(curr => {
      const option1 = new Option(curr, curr);
      const option2 = new Option(curr, curr);
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
  } catch {
    alert('Ошибка при загрузке валют');
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    alert("Введите корректную сумму");
    return;
  }

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`);
    const data = await res.json();
    const rate = data.conversion_rates[to];
    const converted = amount * rate;

    document.getElementById('conversionResult').innerText =
      `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch {
    alert("Ошибка при конвертации");
  }
}

// Загрузка валют при старте
window.addEventListener('DOMContentLoaded', loadCurrencies);
