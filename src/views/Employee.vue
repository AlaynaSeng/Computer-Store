<script setup>
import { ref, watch, onMounted } from "vue";

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
        <th>Edit</th>
        <th>Delete</th>
      </thead>
      <tbody id="employeeTBody"></tbody>
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