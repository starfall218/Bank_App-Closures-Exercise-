let createName = document.querySelector('.userName');
const question = document.querySelector('.question');
const submitBtn = document.querySelector('.submit');
let userName = '';
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
submitBtn.addEventListener('click', logName);