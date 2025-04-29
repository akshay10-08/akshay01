const url=  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const drop=document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

 for (let select of drop) {
  for ( ccode in countryList) {
   let newOp = document.createElement("option");
   newOp.innetText=ccode;
   newOp.value=ccode;

   select.append(newOp);
  }  
}
select.addEventListener("change", (evt) => {
    upFlag(evt.target);
  });

  const upFlag = (element) => {
    let ccode = element.value;
    let countryCode = countryList[ccode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
  };
  
  const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amt = amount.value;
    if (amt === "" || amt < 1) {
      amt = 1;
      amount.value = "1";
    }
    const URL = `${url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
  
    let finalAmount = amt * rate;
    msg.innerText = `${amt} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  };

  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });
  

