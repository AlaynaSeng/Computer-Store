<script setup>
import { ref, watch, onMounted } from "vue";

let employees = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/employee", {method: "GET",});
  employees.value = await res.json();
});


function submitEmployee(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/employee", {
    method: "POST",
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify(data)
  });
  console.log(data)
}


let fnameInput = ref(null);
let lnameInput = ref(null);
let bdayInput = ref(null);
let emailInput = ref(null);
let IDInput = ref(null);

function editEmployee(employee){
  fnameInput.value.value = employee.fname;
  lnameInput.value.value = employee.lname;
  bdayInput.value.value = employee.bday.split("T")[0];
  emailInput.value.value = employee.email;
  IDInput.value.value = employee.employeeid
  let modal = new bootstrap.Modal(document.querySelector('#edit-employee'));
  modal.show();
}

function updateEmployee(e){
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/employee/update", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data)
}

async function deleteEmployee(employee) {
const res = await fetch(
    `http://localhost:4000/employee/Deleteemployee/${employee.employeeid}`,
    {
      method: "Delete",
      headers: { "content-type": "application/json" },
    }
  );
  if(res.status == 400){
    alert(`There was an error deleting this employee. Please make sure that no orders have been made under this name before continuing.`)
    return
  }
  location.reload();
}
</script>

<template>
  <div id="employee">
    <form @submit="submitEmployee" id="employeeForm">
      <h4>First Name</h4>
      <input type="text" name="fname" id="fname" class="form-control" required/>
      <br />
      <br />
      <h4>Last Name</h4>
      <input type="text" name="lname" id="lname" class="form-control" required/>
      <br />
      <br />
      <h4>Brithdate</h4>
      <input type="date" name="bday" id="bday" class="form-control" required />
      <br />
      <br />
      <h4>Email</h4>
      <input type="text" name="email" id="email" class="form-control" required/>
      <br />
      <br />
      <button type="submit" class="btn btn-warning">Submit Employee</button>
    </form>
    <br />
    <hr />
    <table class="table table-striped" id="eTable">
      <thead>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Birthdate</th>
        <th>Email</th>
        <th>Delete</th>
        <th>Edit</th>
      </thead>
      <tbody id="employeeTBody">
        <tr v-for="(employee) in employees" :key="employee.id">
          <td>
            {{employee.employeeid}}
          </td>
          <td>
            {{employee.fname}}
          </td>
          <td>
            {{employee.lname}}
          </td>
          <td>
            {{employee.bday.split("T")[0]}}
          </td>
          <td>
            {{employee.email}}
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="deleteEmployee(employee)">Delete</button>
          </td>
          <td>
            <button type="button" class="btn btn-success" @click="editEmployee(employee)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="edit-employee" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Employee</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
            <form id="employeeUpdateForm" @submit="updateEmployee">
              <h4>First Name</h4>
              <input type="text" name="fname" id="nfname" class="form-control" ref="fnameInput" required/>
              <br />
              <h4>Last Name</h4>
              <input type="text" name="lname" id="nlname" class="form-control" ref="lnameInput" required/>
              <br />
              <h4>Birthdate</h4>
              <input type="date" name="bday" id="nbday" class="form-control" ref="bdayInput" required/>
              <br />
              <h4>Email</h4>
              <input type="text" name="email" id="nemail" class="form-control" ref="emailInput" required />
              <br />
              <input type="hidden" id="employeeid" name="employeeid" ref="IDInput">
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
 #employeeUpdateForm{
   text-align: center;
    padding: 30px;
 }

#employeeForm {
  text-align: center;
  margin-top: 30px;
  border: 2px dotted black;
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
  padding: 30px;
  border-radius: 5px;
}
input {
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
}

#eTable {
  text-align: center;
}
</style>