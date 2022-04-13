<script setup>
import { ref, watch, onMounted } from "vue";

function submitSupplier(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/supplier", {
    method: "POST",
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify(data)
  });
}
</script>

<template>
  <div id="supplier">
    <form @submit.prevent="submitSupplier" id="supplierForm">
      <h4>Name</h4>
      <input type="text" name="name" id="name" class="form-control" required />
      <br />
      <h4>Address</h4>
      <input type="text" name="address" id="address" class="form-control" required/>
      <br />
      <h4>City</h4>
      <input type="text" name="city" id="city" class="form-control" required />
      <br />
      <h4>Zip Code</h4>
      <input type="number" name="zip" id="zip" class="form-control" required />
      <br />
      <h4>Country</h4>
      <input type="text" name="country" id="country" class="form-control" required/>
      <br />
      <h4>Phone Number</h4>
      <input type="text" name="phone" id="phone" class="form-control" required/>
      <br />
      <button type="submit" class="btn btn-primary">Submit Supplier</button>
    </form>
    <br />
    <hr />
    <table class="table table-striped" id="suTable">
      <thead>
        <th>Name</th>
        <th>Address</th>
        <th>City</th>
        <th>Zip</th>
        <th>Country</th>
        <th>Phone</th>
        <th>Edit</th>
        <th>Delete</th>
      </thead>
      <tbody id="supplierTBody"></tbody>
    </table>
  </div>
</template>

<style scoped>
#supplierForm {
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

#suTable {
  margin-bottom: 50px;
  text-align: center;
}
</style>