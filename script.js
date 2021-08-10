const billInput = document.querySelector(".bill__input");
const tipInputRadio = document.querySelectorAll(".tip__input-radio");
const tipCustomInput = document.querySelector(".tip__custom");
const peopleInput = document.querySelector(".number-of-people__input");
const resetBtn = document.querySelector(".result__reset-btn");
const resultTipTxt = document.querySelector(".result__tip-amount");
const totalResultTxt = document.querySelector(".result__total-price");
const msgError = document.querySelector(".number-of-people__msg-error");

let tipCalc = function() {

    let bill = 0
    ,numberOfPeople = 0 
    ,tip = 0
    
    function tipAmount(){
        if(peopleInput.value[0] === "0") {
            msgError.textContent = `Can't be zero`;
        }
        else if(billInput.value[0] === "0" 
        || peopleInput.value[0] === "0" 
        || tipCustomInput.value[0] === "0"){
            return;
        }
        else if(bill>0 && tip>0 && numberOfPeople>0){
           let resultTip = (tip * bill)/numberOfPeople;
           let totalResult = (bill/numberOfPeople)+resultTip;
           msgError.textContent = ` `;
            resultTipTxt.textContent = `$${resultTip.toFixed(2)}`;
            totalResultTxt.textContent = `$${totalResult.toFixed(2)}`;
    }}
    
    billInput.addEventListener('input', () =>  {
        bill = +billInput.value;
        tipAmount();
    });
    
    peopleInput.addEventListener('input', () => {
        numberOfPeople = +peopleInput.value;
        tipAmount();
    })
    
    tipInputRadio.forEach(radio => {
        radio.addEventListener('click', ()=>{
            tip =+ radio.value;
            tipCustomInput.value = "";
            tipCustomInput.onclick = function(){
                radio.checked = false;
            }
            tipAmount();          
        })
    });

    tipCustomInput.addEventListener('input', ()=>{
        tip =+ tipCustomInput.value / 100;
        tipAmount();
    });
    
    resetBtn.addEventListener('click', () =>{
        resultTipTxt.textContent = `$0.00`;
        totalResultTxt.textContent = `$0.00`;
        resetValues();
    })
    
    function resetValues(){
        bill = 0;
        numberOfPeople = 0;
        tip = 0;
        billInput.value = "";
        tipCustomInput.value = "";
        peopleInput.value = "";
    }
    resetValues();
}

tipCalc();