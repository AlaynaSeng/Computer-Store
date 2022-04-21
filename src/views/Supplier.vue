<script setup>
import { ref, watch, onMounted } from "vue";

let suppliers = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/supplier", {method: "GET",});
  suppliers.value = await res.json();
});

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
  console.log(data)
}

function deleteSupplier(supplier) {
  fetch(`http://localhost:4000/supplier/deleteSupplier/${supplier.supplierid}`, {
      method: "Delete",
      headers: { "content-type": "application/json" },
    });
    location.reload();
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
        <th>Delete</th>
        <th>Edit</th>
      </thead>
      <tbody id="supplierTBody">
        <tr v-for="(supplier) in suppliers" :key="supplier.id">
          <td>
            {{supplier.name}}
          </td>
          <td>
            {{supplier.address}}
          </td>
          <td>
            {{supplier.city}}
          </td>
          <td>
            {{supplier.zip}}
          </td>
          <td>
            {{supplier.country}}
          </td>
          <td>
            {{supplier.phone}}
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="deleteSupplier(supplier)">Delete</button>
          </td>
          <td>
            <button type="button" class="btn btn-success">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="edit-suppliers" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Supplier</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
            <form id="supplierUpdateForm">
              <h4>Name</h4>
              <input type="text" name="name" id="uname" class="form-control" required/>
              <br />
              <h4>Address</h4>
              <input type="text" name="address" id="naddress" class="form-control" required/>
              <br />
              <h4>City</h4>
              <input type="text" name="city" id="ncity" class="form-control" required/>
              <br />
              <h4>Zip</h4>
              <input type="text" name="zip" id="nzip" class="form-control" required />
              <br />
              <h4>Country</h4>
              <input type="number" name="country" id="ncountry" class="form-control" required />
              <br />
              <h4>Phone Number</h4>
              <input type="text" name="phone" id="nphone" class="form-control" required/>
              <br />
              <button type="submit" class="btn btn-info">Submit Supplier</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateSupplier">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#supplierForm, #supplierUpdateForm {
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