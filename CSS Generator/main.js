const topLeftRange = document.getElementById('tlr'),
      topRightRange = document.getElementById('trr'),
      bottomLeftRange = document.getElementById('blr'),
      bottomRightRange = document.getElementById('brr'),
      input = document.querySelectorAll('.input');

const resultTRR = document.getElementById('result_trr'),
      resultTLR = document.getElementById('result_tlr'),
      resultBLR = document.getElementById('result_blr'),
      resultBRR = document.getElementById('result_brr');

const btnResult = document.getElementById('btn_result'),
      totalResult = document.getElementById('total_result'),
      cube = document.getElementById('cube');

console.log(input);

const changeRadius = () => {
   resultTLR.innerHTML = topLeftRange.value;
   resultTRR.innerHTML = topRightRange.value;
   resultBLR.innerHTML = bottomLeftRange.value;
   resultBRR.innerHTML = bottomRightRange.value;

   cube.style.borderRadius = topLeftRange.value + 'px ' + topRightRange.value + 'px ' + bottomRightRange.value + 'px ' + bottomLeftRange.value + 'px ';
};

for(item of input) {
   item.addEventListener('input', changeRadius);
}

const resultOfRadius = () => {
   totalResult.innerHTML = topLeftRange.value + ' ' + topRightRange.value + ' ' + bottomRightRange.value + ' ' + bottomLeftRange.value;
};

btnResult.addEventListener('click', resultOfRadius);