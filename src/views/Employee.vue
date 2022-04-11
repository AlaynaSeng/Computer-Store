<script setup>
import { ref, watch } from "vue";


function submitEmployee(){

}

</script>

<template>
  <div id="employee">
    <form @submit.prevent="submitEmployee" id="employeeForm">
      <h4>First Name</h4>
      <input type="text" name="fname" id="fname" class="form-control" required>
      <br>
      <br>
      <h4>Last Name</h4>
      <input type="text" name="lname" id="lname" class="form-control" required>
      <br>
      <br>
      <h4>Brithdate</h4>
      <input type="date" name="bday" id="bday" class="form-control" required>
      <br>
      <br>
      <h4>Email</h4>
      <input type="text" name="email" id="email" class="form-control" required>
      <br>
      <br>
      <button type="submit" class="btn btn-warning">Submit Employee</button>
    </form>
  </div>
</template>

<style scoped>
#employeeForm{
  text-align: center;
  margin-top: 30px;
  border: 2px dotted black;
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
  padding: 30px;
  border-radius: 5px;
}
input{
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
}

</style>