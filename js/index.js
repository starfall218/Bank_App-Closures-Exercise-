let createName = document.querySelector('.userName');
const question = document.querySelector('.question');
const submitBtn = document.querySelector('.submit');
const acct = document.querySelector('.acct');
let userName = '';
let acctType
acct.addEventListener('click', function(){
  acctType = localStorage.setItem('Account-Type', acct.value);
  
})
const logName = function(){
  const firstName = createName.value.trim();
  userName = localStorage.setItem('userName', firstName);
  console.log(`Hey there ${firstName}`);
  if(!firstName){
    question.textContent = 'Please enter your full name';
    return;
  }
    question.textContent = `Hey there ${firstName}`;
    setTimeout(function(){
      window.location.href = './transaction.html';
    }, 2000)
};
document.addEventListener('keydown', function(e){
  if(e.key === 'Enter') {
    logName();
  };
});
submitBtn.addEventListener('click', logName);