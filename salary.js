/* Global variables */
let yearlySalaryTotal = 0;
let dollarFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

/* Functions */
const evaluateNumberString = (string) => {
  // remove everything that isn't a digit or dot and convert to number
  return Number(string.replace(/[^0-9.]+/g, ''));
};

const updateMonthlyTotal = (salary) => {
  // Update yearly total
  if (!isNaN(salary)) {
    yearlySalaryTotal += salary;
  }

  // Calculate monthly total
  let monthlyTotal = yearlySalaryTotal / 12;

  // Update value on DOM
  let monthlyTotalString = dollarFormat.format(monthlyTotal);
  let monthlyTotalElement = document.querySelector('#monthly-total');
  monthlyTotalElement.innerHTML = `${monthlyTotalString}`;

  // Add warning color if greater than 20,000
  if (monthlyTotal > 20000) {
    monthlyTotalElement.classList.add('warning-format');
  } else {
    monthlyTotalElement.classList.remove('warning-format');
  }
};

const submitForm = (event) => {
  event.preventDefault();
  // Get values from input fields
  let firstName = document.querySelector('#first-name-input').value;
  let lastName = document.querySelector('#last-name-input').value;
  let id = document.querySelector('#id-input').value;
  let title = document.querySelector('#title-input').value;
  let salary = evaluateNumberString(
    document.querySelector('#salary-input').value.replace(',', '')
  );

  // Update yearly salary total
  updateMonthlyTotal(+salary);

  // Append row to table
  let salaryTable = document.querySelector('#salary-table-body');
  salaryTable.innerHTML += `
    <tr>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${id}</td>
      <td>${title}</td>
      <td class="salary-cell">${dollarFormat.format(salary)}</td>
      <td>
        <button onclick="removeEmployee(event)">Delete</button>
      </td>
    </tr>
  `;

  // Reset the form
  document.querySelector('#salary-input-form').reset();
};

const removeEmployee = (event) => {
  let rowElement = event.target.parentElement.parentElement;
  let salaryString = rowElement.querySelector('.salary-cell').innerHTML;
  let salary = evaluateNumberString(salaryString);
  updateMonthlyTotal(-salary);
  rowElement.remove();
};

/* Main script */
let salaryTable = document.querySelector('#salary-table-body');
let salaryCells = document.querySelectorAll('.salary-cell');
for (let salaryCell of salaryCells) {
  salary = evaluateNumberString(salaryCell.innerHTML);
  updateMonthlyTotal(salary);
}
