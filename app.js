const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
for (code in countryList) {
  console.log(code);
}

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currCode;
    newoption.value = currCode;
    select.append(newoption);
    if (select.name === "from" && currCode === "USD") {
      newoption.selected = "selected";
    } else if (select.option === "to" && currCode === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  })
}

const updateflag = (element) => {
  console.log(element);
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtvalue = amount.value;

  if (amtvalue === "" || amtvalue < 1) {
    amtvalue = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json();
  console.log(data);
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; 
  let finalAmount = rate * amtvalue;
  msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

});