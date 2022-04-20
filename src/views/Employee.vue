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


function deleteEmployee(employee) {
  fetch(`http://localhost:4000/employee/deleteEmployee/${employee.employeeid}`, {
      method: "Delete",
      headers: { "content-type": "application/json" },
    });
    location.reload();
}
</script>

<template>
  <div id="employee">
    <form @submit.prevent="submitEmployee" id="employeeForm">
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
            {{employee.bday}}
          </td>
          <td>
            {{employee.email}}
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="deleteEmployee(employee)">Delete</button>
          </td>
          <td>
            <button type="button" class="btn btn-success">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
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