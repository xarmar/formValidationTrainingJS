require('./styles.scss');

// Add EventListers For All Inputs
const allInputs = Array.from(document.querySelectorAll('#mainForm input'));
allInputs.forEach(input => {
  input.addEventListener('input', function () {
    validateInput(input);
  });
});

// Validate Input
const validateInput = input => {
  let index = allInputs.indexOf(input);
  ifInvalidShowError(input, index);
};

const allSpans = Array.from(document.querySelectorAll('#mainForm span'));
// Show Errors When Validity Fails
const ifInvalidShowError = (input, index) => {
  switch (input.id) {
    case 'email':
      // If empty
      if (input.validity.valueMissing) {
        allSpans[index].textContent = 'Please enter an email address.';
      } else if (!input.checkValidity()) {
        allSpans[index].textContent = 'Invalid. Example: john@example.com';
      } else {
        allSpans[index].textContent = '';
      }
      break;

    case 'country':
      // If empty
      if (input.validity.valueMissing) {
        allSpans[index].textContent = 'Please select an option.';
      } else if (!input.checkValidity()) {
        allSpans[index].textContent = 'Please a valid option.';
      } else {
        allSpans[index].textContent = '';
      }
      break;

    case 'zipCode':
      // If empty
      if (input.validity.valueMissing) {
        allSpans[index].textContent = 'Please enter a zip code.';
      } else if (!input.checkValidity()) {
        allSpans[index].textContent = 'Invalid. Example: 1234-123';
      } else {
        allSpans[index].textContent = '';
      }
      break;

    case 'password':
      // If empty
      if (input.validity.valueMissing) {
        allSpans[index].textContent = 'Please enter a password.';
      } else if (!input.checkValidity()) {
        allSpans[index].textContent =
          'Must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.';
      } else {
        allSpans[index].textContent = '';
      }
      break;

    case 'passwordConfirmation':
      // If empty
      if (input.validity.valueMissing) {
        allSpans[index].textContent = 'Please confirm your password.';
      } else if (input.value !== allInputs[index - 1].value) {
        allSpans[index].textContent = 'Passwords do not match!';
      } else {
        allSpans[index].textContent = '';
      }
      break;

    default:
      break;
  }
};

// Add Button listener - prevent default and check if all inputs are filled in
const button = document.querySelector('button');
button.addEventListener('click', function (event) {
  event.preventDefault();

  let validationCount = 0;

  //   For each valid input, add 1 to validationCount
  allInputs.forEach(input => {
    if (input.checkValidity()) {
      validationCount++;
    }
  });

  //   if user selected a country from the list, add 1 to validationCount
  let countryInput = document.querySelector('#country');
  if (countryInput.checkValidity()) {
    validationCount++;
  }

  //   if everything is filled in and valid
  if (validationCount === allInputs.length + 1) {
    allSpans[allSpans.length - 1].textContent =
      'Form would have submited. All fields are valid.';
    allSpans[allSpans.length - 1].classList.add('valid');

    // ELSE
  } else {
    allSpans[allSpans.length - 1].textContent =
      'Form submission would have failed. Some fields are invalid.';
    allSpans[allSpans.length - 1].classList.remove('valid');
  }
});
