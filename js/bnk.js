let createName = document.querySelector('.userName');
const dialogue = document.querySelector('.dialogue');
const userbalance = document.querySelector('.balance');
const debitBtn = document.querySelector('.debit');
const creditBtn = document.querySelector('.credit');
const numberInput = document.querySelector('.num-oper');
const historyBox = document.querySelector('.history');
const user = {
  firstName: localStorage.getItem('userName'),
  acurrAccBalance: undefined,
};

const bankCreation = function(currBalance){
  let balance = currBalance;
  user.acurrAccBalance = balance;
  function credit(amount) {
    balance += amount;
    return `You’ve credited $${amount}. New balance: $${balance}`;
  }

  function debit(amount) {
    if (balance < amount) {
      return `Insufficient funds. Balance is: $${balance}`;
    }
    balance -= amount;
    return `You just debited $${amount}, your balance is: $${balance}`;
  }

  return { credit, debit };
}
debitBtn.addEventListener('click', function(){
  const acctBalance = parseFloat(userbalance.value);
  let numOper = parseFloat(numberInput.value);
  if(!numOper || !acctBalance){
    dialogue.textContent = 'Please fill out the field.';
    return;
  }
  dialogue.textContent = bankCreation(acctBalance).debit(numOper);
  userbalance.style.display = 'none';
  const paragraph = document.createElement('p');
  dialogue.textContent = dialogue.textContent;
  paragraph.textContent = dialogue.textContent;
  historyBox.style.display = 'block';
  historyBox.prepend(paragraph);
});
creditBtn.addEventListener('click', function(){
  const acctBalance = parseFloat(userbalance.value);
  let numOper = parseFloat(numberInput.value);
  if(!numOper || !acctBalance){
    dialogue.textContent = 'Please fill out the field.';
    return;
  }
  dialogue.textContent = bankCreation(acctBalance).credit(numOper);
  userbalance.style.display = 'none';
  const paragraph = document.createElement('p');
  dialogue.textContent = dialogue.textContent;
  paragraph.textContent = dialogue.textContent;
  historyBox.style.display = 'block';
  historyBox.prepend(paragraph);
});