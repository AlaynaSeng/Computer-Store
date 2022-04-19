<script setup>
import { ref, watch, onMounted } from "vue";

onMounted(() => {

});

function submitCustomer(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/customer", {
    method: "POST",
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify(data)
  });
  console.log(data)
}
</script>

<template>
  <div id="customer">
    <form @submit="submitCustomer" id="customerForm">
      <h4>First Name</h4>
      <input type="text" name="fname" id="fname" class="form-control" required/>
      <br />
      <h4>Last Name</h4>
      <input type="text" name="lname" id="lname" class="form-control" required/>
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
      <button type="submit" class="btn btn-info">Submit Customer</button>
    </form>
    <br />
    <hr />
    <table class="table table-striped" id="cTable">
      <thead>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>City</th>
        <th>Zip</th>
        <th>Country</th>
        <th>Phone</th>
        <th>Edit</th>
        <th>Delete</th>
      </thead>
      <tbody id="customerTBody">
        <tr v-for="(customer, i) in customers">
          <td>
            {{customer.fname}}
          </td>
          <td>
            {{customer.lname}}
          </td>
          <td>
            {{customer.address}}
          </td>
          <td>
            {{customer.city}}
          </td>
          <td>
            {{customer.zip}}
          </td>
          <td>
            {{customer.country}}
          </td>
          <td>
            {{customer.phone}}
          </td>
          <td>
            <button type="button" class="btn btn-danger">Delete</button>
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
#customerForm {
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

#cTable {
  margin-bottom: 50px;
  text-align: center;
}
</style>