const submitForm = (event) => {
  event.preventDefault();
  // Get values from input fields
  let firstName = document.querySelector('#first-name-input').value;
  let lastName = document.querySelector('#last-name-input').value;
  let id = document.querySelector('#id-input').value;
  let title = document.querySelector('#title-input').value;
  let salary = document.querySelector('#salary-input').value;

  // Append row to table
  let salaryTable = document.querySelector('#salary-table-body');
  salaryTable.innerHTML += `
    <tr>
      <td>${firstName}</td>
      <td>${lastName}</td>
      <td>${id}</td>
      <td>${title}</td>
      <td>${salary}</td>
      <td>
        <button onclick="removeEmployee(event)">Delete</button>
      </td>
    </tr>
  `;
};

const removeEmployee = (event) => {
  event.target.parentElement.parentElement.remove();
}