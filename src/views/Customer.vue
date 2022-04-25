<script setup>
import { ref, watch, onMounted } from "vue";

let customers = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/customer", { method: "GET" });
  customers.value = await res.json();
});

function submitCustomer(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/customer", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
}

let fnameInput = ref(null);
let lnameInput = ref(null);
let addressInput = ref(null);
let cityInput = ref(null);
let zipInput = ref(null);
let countryInput = ref(null);
let phoneInput = ref(null);
let IDInput = ref(null);

function editCustomer(customer){
  fnameInput.value.value = customer.fname;
  lnameInput.value.value = customer.lname;
  addressInput.value.value = customer.address;
  cityInput.value.value = customer.city;
  zipInput.value.value = customer.zip;
  countryInput.value.value = customer.country;
  phoneInput.value.value = customer.phone;
  IDInput.value.value = customer.customerid
  let modal = new bootstrap.Modal(document.querySelector('#edit-customer'));
  modal.show();
}

function updateCustomer(e){
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/customer/update", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data)
}

async function deleteCustomer(customer) {
const res = await fetch(
    `http://localhost:4000/customer/deleteCustomer/${customer.customerid}`,
    {
      method: "Delete",
      headers: { "content-type": "application/json" },
    }
  );
  if(res.status == 400){
    alert(`There was an error deleting this customer. Please make sure that no orders have been made under this name before continuing.`)
    return
  }
  location.reload();
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
        <th>Delete</th>
        <th>Edit</th>
      </thead>
      <tbody id="customerTBody">
        <tr v-for="customer in customers" :key="customer.id">
          <td>
            {{ customer.fname }}
          </td>
          <td>
            {{ customer.lname }}
          </td>
          <td>
            {{ customer.address }}
          </td>
          <td>
            {{ customer.city }}
          </td>
          <td>
            {{ customer.zip }}
          </td>
          <td>
            {{ customer.country }}
          </td>
          <td>
            {{ customer.phone }}
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="deleteCustomer(customer)">Delete</button>
          </td>
          <td>
            <button type="button" class="btn btn-success" @click="editCustomer(customer)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="edit-customer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Customer</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
            <form id="customerUpdateForm" @submit="updateCustomer">
              <h4>First Name</h4>
              <input type="text" name="fname" id="nfname" class="form-control" ref="fnameInput" required/>
              <br />
              <h4>Last Name</h4>
              <input type="text" name="lname" id="nlname" class="form-control" ref="lnameInput" required/>
              <br />
              <h4>Address</h4>
              <input type="text" name="address" id="naddress" class="form-control" ref="addressInput" required/>
              <br />
              <h4>City</h4>
              <input type="text" name="city" id="ncity" class="form-control" ref="cityInput" required />
              <br />
              <h4>Zip Code</h4>
              <input type="number" name="zip" id="nzip" class="form-control" ref="zipInput" required />
              <br />
              <h4>Country</h4>
              <input type="text" name="country" id="ncountry" class="form-control" ref="countryInput" required/>
              <br />
              <h4>Phone Number</h4>
              <input type="text" name="phone" id="phone" class="form-control" ref="phoneInput" required/>
              <br />
              <input type="hidden" id="customerid" name="customerid" ref="IDInput">
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
#customerUpdateForm {
  text-align: center;
  padding: 30px;
}

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