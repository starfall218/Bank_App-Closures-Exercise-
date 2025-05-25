let createName = document.querySelector('.userName');
const dialogue = document.querySelector('.dialogue');
const userbalance = document.querySelector('.balance');
const debitBtn = document.querySelector('.debit');
const creditBtn = document.querySelector('.credit');
const numberInput = document.querySelector('.num-oper');
const historyBox = document.querySelector('.history');
const historyIcon= document.querySelector('.history-icon');
const buttonDiv = document.querySelector('.button');
const conditionText = document.querySelector('.condition-text');
const logOutBtn = document.querySelector('.log-out');

const user = {
  firstName: localStorage.getItem('userName'),
  accountType: undefined,
  acurrAccBalance: undefined,
};

let bank; // Will hold the reusable bank account

const bankCreation = function(currBalance){
  let balance = currBalance;
  function credit(amount) {
    balance += amount;
    return `+$${amount}. New balance: $${balance}`;
  }
  function debit(amount) {
    if (balance < amount) {
      return `Insufficient funds. Balance is: $${balance}`;
    }
    balance -= amount;
    return `-$${amount}, your balance is: $${balance}`;
  }
  return { credit, debit };
};

document.addEventListener('keydown', function(e){
  if(e.key === 'Enter'){
    let accountBalance = parseFloat(userbalance.value);
    if(isNaN(accountBalance) || accountBalance <= 2000){
        dialogue.textContent = 'Please enter a valid number above 2000.';
        return;
    } else {
      user.acurrAccBalance = accountBalance;
      user.accountType = localStorage.getItem('Account-Type').toLowerCase();
      dialogue.textContent = `Account Balance: $${accountBalance}`;
      numberInput.style.display = 'inline-block';
      bank = bankCreation(accountBalance); 
      userbalance.style.display = 'none';
      conditionText.style.display = 'none';
      buttonDiv.style.display = 'flex';
    }
  }
});

debitBtn.addEventListener('click', function(){
  let numOper = parseFloat(numberInput.value);
  if(isNaN(numOper)){
    dialogue.textContent = 'Please fill out the field.';
    return;
  }
  if(user.accountType === 'savings' && numOper > 5000){
    dialogue.textContent = 'You can\'t debit more than 3500 at once.';
    return;
  };
  const result = bank.debit(numOper);
  dialogue.textContent = result;
  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'previous-acc');
  paragraph.textContent = result;
  historyIcon.style.display = 'block';
  historyBox.prepend(paragraph);
  numberInput.value = '';
});

creditBtn.addEventListener('click', function(){
  let numOper = parseFloat(numberInput.value);
  if(isNaN(numOper)){
    dialogue.textContent = 'Please fill out the field.';
    return;
  };
  const result = bank.credit(numOper);
  dialogue.textContent = result;
  const paragraph = document.createElement('p');
  paragraph.textContent = result;
  historyIcon.style.display = 'block';
  historyBox.prepend(paragraph);
  numberInput.value = '';
});

// History box toggle
historyIcon.addEventListener('click', function(){
  if(historyBox.style.display === 'none'){
  historyBox.style.display = 'block';
  } else if(historyBox.style.display = 'block'){
    historyBox.style.display = 'none';
  }
});
logOutBtn.addEventListener('click', function(){
  user.accountType = '';
  user.firstName = '';
  user.acurrAccBalance = '';
})