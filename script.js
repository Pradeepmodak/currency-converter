const Base_Url="https://api.currencyapi.com/v3/latest?apikey=cur_live_vgx8M0DR9GjULRviX3sNe5xcVqQD9cF2OZA2G7Ud";
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
const dropdowns=document.querySelectorAll(".dropdown select");
const info=document.querySelector(".info");
for(let select of dropdowns){
    for(codes in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=codes;
        newOption.value=codes;
        if(select.name==="from" && codes==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && codes==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    });
}
const updateflag=(ele)=>{
    let currCode=ele.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let newImg=ele.parentElement.querySelector("img");
    newImg.src=newSrc;
}

const btn=document.querySelector("button");
const amt=document.querySelector(".input-amount");
btn.addEventListener("click",async (evt)=>{
evt.preventDefault();
updateExchangeRate();
})
const updateExchangeRate=async ()=>{
    let amtVal=amt.value;
    if(amtVal===""||amtVal<="0"){
    amt.value=1;
    amtVal=1;
    }
    const newUrl=`${Base_Url}&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;
    let response=await fetch(newUrl);
    let data=await response.json();
    let currData=data.data;
    let exchangeRate=currData[toCurr.value].value;
    info.innerHTML=`<h>${amtVal} ${fromCurr.value} = ${amtVal*exchangeRate} ${toCurr.value} </h>`;
}
