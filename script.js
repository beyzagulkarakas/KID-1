const kontainer=document.querySelector('.kontainer');
const registerBtn=document.querySelector('.register-btn');
const longinBtn=document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
 kontainer.classList.add('active');
});

longinBtn.addEventListener('click', () => {
    kontainer.classList.remove('active');
   });


