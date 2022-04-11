<script setup>
import { ref, watch, onMounted } from "vue";

onMounted(() =>{
  
})
function submitCustomer(){

}


</script>

<template>
  <div id="customer">
    <form @submit.prevent="submitCustomer" id="customerForm">
      <h4>First Name</h4>
      <input type="text" name="fname" id="fname" class="form-control" required>
      <br>
      <h4>Last Name</h4>
      <input type="text" name="lname" id="lname" class="form-control" required>
      <br>
      <h4>Address</h4>
      <input type="text" name="address" id="address" class="form-control" required>
      <br>
      <h4>City</h4>
      <input type="text" name="city" id="city" class="form-control" required>
      <br>
      <h4>Zip Code</h4>
      <input type="number" name="zip" id="zip" class="form-control" required>
      <br>
      <h4>Country</h4>
      <input type="text" name="country" id="country" class="form-control" required>
      <br>
      <h4>Phone Number</h4>
      <input type="text" name="phone" id="phone" class="form-control" required>
      <br>
      <button type="submit" class="btn btn-info">Submit Customer</button>
    </form>
  </div>
</template>

<style scoped>
#customerForm{
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