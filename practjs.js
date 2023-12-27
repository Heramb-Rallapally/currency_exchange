const apiKey = 'ef31668cd36e45d3ba6e043c13f3e52d';
const apiUrl = `https://open.er-api.com/v6/latest?app_id=${apiKey}&base=GBP`;



let bt=document.querySelector("button");

bt.addEventListener("click",function(event)
{
    let inp=document.querySelector("input");
    let amountToConvert=inp.value;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const exchangeRates = data.rates;
    
    let source_Currency = 'SGD';
    let dest_Currency = 'INR';

   let s=document.querySelector("#CONVERTf");
   source_Currency=s.value;


   let d=document.querySelector("#CONVERTt");
   dest_Currency=d.value;

   console.log(source_Currency);
   console.log(dest_Currency);

    const convertedAmount = convertCurrency(amountToConvert, source_Currency, dest_Currency, exchangeRates);

    d=document.querySelector("#res");
    d.value=convertedAmount;
    console.log(`${amountToConvert} ${source_Currency} is approximately equal to ${convertedAmount} ${dest_Currency}`);

  })
  .catch(error => console.error('Error:', error));
});

function convertCurrency(amount, source_Currency, dest_Currency, exchangeRates) {
  const fromRate = exchangeRates[source_Currency];
  const toRate = exchangeRates[dest_Currency];

  if (!fromRate || !toRate) {
    console.error('Invalid currency code');
    return null;
  }

  const convertedAmount = (amount / fromRate) * toRate;
  return convertedAmount.toFixed(3);
}
