let billInput = document.getElementById("bill");
let tipInput = document.querySelector('input[name="tip"]:checked');
let peopleInput = document.getElementById('people');

let customTipElt = document.getElementById('tip-custom-input');
let customTipRadio = document.getElementById('tip-custom-radio');

let peopleErrorMessage = document.getElementById('peopleErrorMessage');


/********** Managing text input as radio button value **********/

// When text input is clicked on, corresponding radio button is checked
customTipElt.addEventListener('click', function(e) {
  customTipRadio.checked = true;
  customTipElt.classList.add('inputCheck');
})

// When text input is modified, corresponding radio button value is modified
customTipElt.addEventListener('input', function(e) {
  let customValue = customTipElt.value;
  customTipRadio.setAttribute('value',customValue);
})

// When an other radio buttion is clicked on, text inpu button is unchecked
document.querySelectorAll("input[name='tip']").forEach(element => {
  element.addEventListener('click', function(e){
     if ((element.value != "custom") && (customTipElt.classList.contains('inputCheck'))) {
      customTipElt.classList.remove('inputCheck');
     }
   });
})

/********** Managing input errors **********/
// Check each input
function checkInputs() {
  if (billInput.value == undefined) {
    return false;
  } 
  else if (document.querySelector('input[name="tip"]:checked') == undefined) {
    return false;
  }
  else if ((document.querySelector('input[name="tip"]:checked') == customTipRadio) && (customTipRadio.value == "custom")) {
    return false;
  } else if ((peopleInput.value == undefined) || (peopleInput.value == "")) {
    return false;
  } 
    // Displaying error when number of people is set to 0 or less
    else if (peopleInput.value <= 0) {
    peopleErrorMessage.innerText = "Can't be zero"
    peopleInput.classList.add('incorrect');
  } else {
    return true;
  }
}

// Clear error message of given element
function clearError(element){
  if (element.classList.contains('incorrect')) {
    element.classList.remove('incorrect');
  }
  peopleErrorMessage.innerText = "";
}

// Clear error message when people number input is modified
peopleInput
  .addEventListener('input', function(e){
    e.stopPropagation;
    clearError(peopleInput);
    if (peopleInput.value <= 0) {
      peopleErrorMessage.innerText = "Can't be zero"
      peopleInput.classList.add('incorrect');
    }
})

// Round input value to  2 digits 
function roundedValue(value) {
  return Math.round(value * 100)/100;
}

// Calculate tip per person
function calculateTip(bill, percentage, people){
  let tip = (bill * percentage / 100) / people;
  // return roundedValue(tip).toLocaleString('en', {style:'currency', useGrouping) ;
  return tip.toLocaleString('en', {style:'currency',currency:'USD', useGrouping:'true', minimumFractionDigits:'0'}) ;
}

// Calculate total amount to pay per person 
function calculateTotal(bill, percentage, people) {
  let total = bill * (1 + percentage / 100) / people;
  // return roundedValue(total);
  return total.toLocaleString('en', {style:'currency',currency:'USD', useGrouping:'true', minimumFractionDigits:'0'}) ;
}

let resultTipElt = document.getElementById('result-tip');
let resultTotalElt = document.getElementById('result-total');

// Whenever an input is modified, if the inputs are valid the results are displayed and updated
document
  .querySelectorAll("input")
  .forEach(element => {
    element.addEventListener('input', function(e){

      e.stopPropagation;

      if (resetButton.getAttribute('disabled')) {
        resetButton.removeAttribute('disabled');
      }

      let inputIsValid = checkInputs();

      if (inputIsValid == true) {

        let billValue = billInput.value;
        let tipValue = document.querySelector('input[name="tip"]:checked').value;
        let numberOfPeople = peopleInput.value;

        let resultTip = calculateTip(billValue, tipValue, numberOfPeople);
        let resultTotal = calculateTotal(billValue, tipValue, numberOfPeople);

        resultTipElt.innerText = `${resultTip}`;
        resultTotalElt.innerText = `${resultTotal}`;
      }
    })
});

document
  .querySelectorAll("input")
  .forEach(element => {
    element.addEventListener('click', function(e){

    e.stopPropagation;
    let inputIsValid = checkInputs();

    if (inputIsValid == true) {
    let billValue = billInput.value;
    let tipValue = document.querySelector('input[name="tip"]:checked').value;
    let numberOfPeople = peopleInput.value;

    let resultTip = calculateTip(billValue, tipValue, numberOfPeople);
    let resultTotal = calculateTotal(billValue, tipValue, numberOfPeople);

    resultTipElt.innerText = `${resultTip}`;
    resultTotalElt.innerText = `${resultTotal}`;
    }
  })
});

// Inputs and results reset
let resetButton = document.querySelector("button.results__reset");
let inputsForm = document.querySelector("form.inputs");

resetButton.addEventListener('click', function(e) {
  e.stopPropagation;
  if (!resetButton.getAttribute("disabled")) {
    inputsForm.reset();
    resultTipElt.innerText = "$0.00";
    resultTotalElt.innerText = "$0.00";
    if (customTipElt.classList.contains('inputCheck')) {
      customTipElt.classList.remove('inputCheck'); // remove style from custom input
    }
    clearError(peopleInput)
  }
})