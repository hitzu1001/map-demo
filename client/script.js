// function myFunction() {
//   alert("hi there");
// }
// myFunction();

(function () {
  const autocompleteUrlPrefix = '/api/autocomplete/'

  document.getElementById('autocomplete-input').addEventListener('keyup', (e) => {
    // get input value
    let inputValue = e.target.value;
    // call map api to search
    console.log(inputValue);
    debounce(remoteCall, 1000)(inputValue);

  })

  function renderDropdown(suggestions) {
    document.getElementById('dropdown-menu').innerHTML = '';
    suggestions.forEach(element => {
      document.getElementById('dropdown-menu').insertAdjacentHTML('beforeend',
        `<a href="#" class="dropdown-item">${element.label}</a>`);
    });
  }

  async function remoteCall(input) {
    const response = await fetch(autocompleteUrlPrefix + input)
    console.log(response);
    const result = await response.json();
    // render dropdown
    renderDropdown(result.suggestions);
  }

  var inThrottle = false;
  const throttle = (func, limit) => {
    return function () {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }

  var inDebounce = false;
  const debounce = (func, delay) => {
    return function () {
      const context = this
      const args = arguments
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
  }

})();