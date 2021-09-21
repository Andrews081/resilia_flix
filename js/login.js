const init = () => {
    const validateEmail = (event) => {
        const input = event.currentTarget;
        const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const emailTest = regex.test(input.value);

        if (!emailTest) {
            submitButton.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        } else {
            submitButton.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        }
    }
    const validatePassword = (event) => {
        const input = event.currentTarget;

        if (input.value.length < 8) {
            submitButton.setAttribute("disable", "disable");
            input.nextElementSibling.classList.add('error');
        } else {
            submitButton.removeAttribute("disable");
            input.nextElementSibling.classList.remove('error');
        }
    }

    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const submitButton = document.querySelector('.login_submit');

    inputEmail.addEventListener('input', validateEmail);
    inputPassword.addEventListener('input', validatePassword);

    if (submitButton){
        submitButton.addEventListener('click', (event) => {
          event.preventDefault();

          submitButton.textContent = ":)";
          fetch('https://reqres.in/api.login',{
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: inputEmail.value,
                  password: inputPassword.value,
              })
          }) 
        })
    }
}
window.onload = init;
