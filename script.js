const calculatorDisplay=document.querySelector("h1")
const calculatorButton=document.querySelectorAll("button")
const clearbtn=document.getElementById("clear-btn")

let firstValue=0;
let operatorValue="";
let nextAwaitingValue=true

function sendNumberValue(number){
    if(nextAwaitingValue){
        calculatorDisplay.textContent=number
        nextAwaitingValue=false;
    }else{
        const displayValue= calculatorDisplay.textContent;
    calculatorDisplay.textContent=displayValue==="0"?number:displayValue+number

    }

    }
// decimal function
function addDecimal(){
    // if operator pressed don't add decimal
    if(nextAwaitingValue) return;

    if(!calculatorDisplay.textContent.includes(".")){
        calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`
    }
}

// calculate first and second value
const calculate={
    "/":(firstNumber,secondNumber)=>firstNumber/secondNumber,
    "*":(firstNumber,secondNumber)=>firstNumber*secondNumber,
    "-":(firstNumber,secondNumber)=>firstNumber-secondNumber,
    "+":(firstNumber,secondNumber)=>firstNumber+secondNumber,
    "=":(firstNumber,secondNumber)=>secondNumber,
};
function useOperator(operator){
    const currrentValue=Number(calculatorDisplay.textContent)

    if(operatorValue && nextAwaitingValue) {
        operatorValue=operator
        return
    };
    // assign first value if not exist
    if(!firstValue){
        firstValue=currrentValue
    }else{
        // console.log(firstValue,operatorValue, currrentValue)
        const calculation=calculate[operatorValue](firstValue,currrentValue)
        // console.log("calculation", calculation)
        firstValue=calculation
        calculatorDisplay.textContent=calculation
    }
    nextAwaitingValue=true
    operatorValue=operator;
    

}

// Add eventListener on buttons
calculatorButton.forEach((inputBtn)=>{
    if(inputBtn.classList.length===0){
inputBtn.addEventListener("click",() => sendNumberValue(inputBtn.value))
}else if(inputBtn.classList.contains("operator")){
    inputBtn.addEventListener("click",() => useOperator(inputBtn.value))
}else if(inputBtn.classList.contains("decimal")){
    inputBtn.addEventListener("click",() => addDecimal(inputBtn.value))
}
})

function reset(){
    firstValue=0;
    operatorValue="";
    nextAwaitingValue=true
    calculatorDisplay.textContent="0"
}
clearbtn.addEventListener("click",reset)