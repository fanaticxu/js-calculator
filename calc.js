console.log("started!")
// document.addEventListener("DOMContentLoaded", function(event) {
    
// });
// function init() {
//     console.log("DOM fully loaded and parsed");

//     console.log("Buttons in itialzw");
// }

// document.getElementById("ac").addEventListener("click", dosomething);
var expressionStr = ""; 
var lastChar = "";
// check if calculate or not
var isResult = false;
// var getSeven = document.getElementById("seven");
var getNum = document.getElementsByClassName("num");
var getOperator = document.getElementsByClassName("operator");
var getTextBox = document.getElementById("input");
var getButton = document.getElementsByTagName("button");
var getZero = document.getElementById("zero");
var getEqual = document.getElementById("equal");
var getExpression = document.getElementsByClassName("outputExpression");
var getResult = document.getElementsByClassName("outputResult");
var getAC = document.getElementById("ac");

// from function covert array-like obj to array.
Array.from(getNum).forEach(function(val){
    val.addEventListener("click", printNum.bind(this, val));
});

Array.from(getOperator).forEach(function(val){
    val.addEventListener("click", printOperator.bind(this, val));
});

getEqual.addEventListener("click", printResults.bind(this, getEqual));
getAC.addEventListener("click", handleAC.bind(this, getAC));

// handle AC
function handleAC() {
    getExpression[0].textContent = "";
    getResult[0].textContent = "";
    expressionStr = ""; 
    lastChar = "";
} 

// handle numbers
function printNum(button) {
    if(!isResult){
        if(button.innerText == "."){
            isDot(expressionStr);
            return;
        }
        expressionStr += button.innerText;
        lastChar = expressionStr[expressionStr.length - 1];
        console.log(expressionStr, lastChar);
        getExpression[0].textContent = expressionStr;
    } else {
        isResult = false;
        if(button.innerText == "."){
            isDot(expressionStr);
            return;
        }
        expressionStr = "";
        expressionStr += button.innerText;
        lastChar = expressionStr[expressionStr.length - 1];
        console.log(expressionStr, lastChar);
        getExpression[0].textContent = expressionStr;
    }
}

// handle dot button input expressionStr
function isDot(expStr){
    if(expStr === ""){
        expressionStr = "0.";
    } else if(expStr.indexOf(".") === -1) {
        expressionStr += ".";
    }
    getExpression[0].textContent = expressionStr;    
}
// handle operator
function printOperator(button) {
    if(lastChar != ""&& /[0-9]/g.test(lastChar)){
        if(button.id === "div"){
            expressionStr += "/";
            lastChar = expressionStr[expressionStr.length - 1];
        } else if(button.id === "multi"){
            expressionStr += "*";
            lastChar = expressionStr[expressionStr.length - 1];
        } else {
            expressionStr += button.innerHTML;
            lastChar = expressionStr[expressionStr.length - 1];
        }
        isResult = false;
        console.log(expressionStr, lastChar);
        getExpression[0].textContent = expressionStr;
    }
}

// handle calc results
function printResults(equalButton) {
    if(lastChar != "" && /[0-9]/.test(lastChar)){
        calculate(expressionStr);
    }
}

// handle calcs
function calculate(expression) {
// bug found if use below regex 1+1*1*1*1*1 will become [1, +, 1*1, *, 1*1, *, 1]
//  var expArr = expression.replace(/([0-9])([-+/*\/])([0-9])/g, '$1 $2 $3').split(' ');
// one solution is scan twice first seperate 1* to 1 * then seperate *1 to * 1.
    var expArr = expression.replace(/([0-9])([-+/*\/])/g, '$1 $2');
    expArr = expArr.replace(/([-+/*\/])([0-9])/g, '$1 $2').split(' ');
    console.log(expArr);

    // find the index of high priority operator then calc with index-1 and index+1 then splice into the array
    var calcResults = function(arr) {
        while(arr.length > 2) {
            var operatorIdx = highPriorityOperatorIndex(arr, "*", "/");
            var subExpression =[];
            var subExpressionResults;
            if(operatorIdx !== -1){
                // array.slice selected from begin to end (end not included).
                subExpression = arr.splice(operatorIdx - 1, operatorIdx + 2).join("");
                subExpressionResults = eval(subExpression);
                arr.splice(operatorIdx - 1, 0, subExpressionResults);
                console.log(arr);
            } else {
                subExpression = arr.splice(0, 3).join("");
                subExpressionResults = eval(subExpression);
                arr.splice(0, 0, subExpressionResults);
            }
        }
        console.log(arr[0]);
        //Print result into outputResult div
        getResult[0].textContent =  arr[0];
        //Print expression into outputExpression div
        getExpression[0].textContent = expressionStr + '=' + arr[0];
        //refresh the expressionStr value to current result.
        expressionStr = arr[0]
        isResult = true;
    }

    calcResults(expArr);
    // expArr.indexOf("/*|\//g")


}

// find the operator with high priority 
function highPriorityOperatorIndex(arr, opera1, opera2){
    if(arr.indexOf(opera1) !== -1 && arr.indexOf(opera2) !== -1){
        return Math.min(arr.indexOf(opera1), arr.indexOf(opera2));
    } else if(arr.indexOf(opera1) !== -1) {
        return arr.indexOf(opera1);
    } else if(arr.indexOf(opera2) !== -1) {
        return arr.indexOf(opera2);
    } else {
        return -1;
    }
}

// recursion demo
// var stripeArr = function(val) {
//     if(!Array.isArray(val)){
//       newArr.push(val);
//     } else{
//       for(var i in val){
//         stripeArr(val[i]);
//       }
//     }   
//   };

// Array.from(getButton).forEach(clickButton);

// getSeven.addEventListener("click", printButtonValue(getSeven), false);
// add eventlistener to all the num button
// Array.from(getNum).forEach(function(val){
//     val.addEventListener("click", printButtonValue);
// });

// add eventlistener to all the num button
// Array.from(getOperator).forEach(function(val){
//     val.addEventListener("click", printButtonValue);
// });

// function clickButton(button) {
//     button.addEventListener("click", function(val) {
//         console.log(val.innerText);
//     });
// }

// map(function(val){
//     addEventListener("click", printHello);
// });
// getOperator.addEventListener("click", printHello);

function printHello() {
    console.log("hello");
}



// function printButtonValue() {
//     printEquation = 
//     getTextBox.value = "test";
// }
// document.getElementById("seven").innerText
// document.getElementsByTagName("button");

// handle zero
// if(lastChar == "." || /[0-9]/){
        
// }

