/* Значения текстовых инпутов */
const anInitialFee = document.getElementById('an-initial-fee'), // Первоначальный взнос
      creditTerm = document.getElementById('credit-term'); // Срок кредита

/* Значения из range инпутов */
const anInitialFeeRange = document.getElementById('an-initial-fee-range'), // Range для первоначального взноса
      creditTermRange = document.getElementById('credit-term-range'); // Range для срока кредита

/* Итоговые данные */
const totalAmountOfCredit = document.getElementById('amount-of-credit'), // Сумма кредита
      totalMonthlyPayment = document.getElementById('monthly-payment'); // Ежемесячный платеж

const inputsRange = document.querySelectorAll('.input-range');

const assignValue = () => {
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}

assignValue();

/* Модальное окно */
const btnOpenConfigure = document.getElementById('open-configure'),
      wrapperModal = document.getElementById('wrapper-modal'),
      overlay = document.getElementById('overlay');

const cancelConfiguration = document.getElementById('cancelConfiguration'),
      saveConfiguration = document.getElementById('saveConfiguration');

btnOpenConfigure.addEventListener('click', () => {
      wrapperModal.classList.add('active');
});

const closeModal = () => {
      wrapperModal.classList.remove('active');
};

/* Закрытие модального окна */
overlay.addEventListener('click', () => closeModal());
saveConfiguration.addEventListener('click', () => closeModal());
cancelConfiguration.addEventListener('click', () => closeModal());

/* Дополнительная сумма */
let totalAmountOfConfiguration = 0;
const currentPercent = 8.7;
const additionalAmount = document.getElementById('additionalAmount');
additionalAmount.innerHTML = totalAmountOfConfiguration;

/* Сумма авто без допов */
const priceOfAuto = 700000;
const priceOfAutoElement = document.getElementById('priceOfAuto');
priceOfAutoElement.innerHTML = priceOfAuto;

for(input of inputsRange){
      input.addEventListener('input', () => {
            assignValue();
            calculate(anInitialFee.value, creditTerm.value);
      });
}

const calculate = (anInitialFee = 100000, creditTerm = 1) => {
      /* Рассчет итогового кредита */
      const amountOfPercents = ((priceOfAuto + totalAmountOfConfiguration - anInitialFeeRange.value) * currentPercent) / 100;
      const totalPriceOfCredit = priceOfAuto + totalAmountOfConfiguration - anInitialFeeRange.value + amountOfPercents;

      /* Рвсчет месяцев */
      const numberOfMonths = creditTerm * 12; // Количество месяцев
      const monthlyPayment = totalPriceOfCredit / numberOfMonths; // Ежемесячный платеж

      if (totalPriceOfCredit < 0){
            return false;
      } else {
            totalAmountOfCredit.innerHTML = Math.round(totalPriceOfCredit);
            totalMonthlyPayment.innerHTML = Math.round(monthlyPayment);
      }
}

calculate();

/* Перекрашивание авто в другой цвет */
const cars = document.querySelectorAll('.car'),
      dots = document.querySelectorAll('.dot');

const pricesOfColors = {
      blue: 0,
      brown: 2000,
      orange: 4000,
      pink: 6000,
      red: 8000
};

let currentPriceOfColor = pricesOfColors.blue;

const activeColor = color => {
      for(car of cars) {
            car.classList.remove('active');
      }

      for(dot of dots) {
            dot.classList.remove('active');
      }

      Array.from(cars).filter(item => {
            return item.dataset.color === color;
      }).forEach(item => {
            item.classList.add('active');
      })

      currentPriceOfColor = pricesOfColors[`${color}`];
      calculateAdditionalAmount();
};

/* Активные доты */
for (dot of dots){
      dot.addEventListener('click', e => {
            e.target.classList.add('active');
      });
};

/* Селекты двигателя и комплектации */
const engine = document.getElementById('engine');
      complectation = document.getElementById('complectation');

const calculateAdditionalAmount = () => {
      totalAmountOfConfiguration = +(engine.value) + +(complectation.value) + currentPriceOfColor;
      additionalAmount.innerHTML = totalAmountOfConfiguration;
      calculate(anInitialFee.value, creditTerm.value);
};

saveConfiguration.addEventListener('click', calculateAdditionalAmount);
engine.addEventListener('change', calculateAdditionalAmount);
complectation.addEventListener('change', calculateAdditionalAmount);

