<script setup>
import { ref, watch, onMounted } from "vue";

let shippers = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/shipper", {method: "GET",});
  shippers.value = await res.json();
});

function submitShipper(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/shipper", {
    method: "POST",
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify(data)
  });
  console.log(data)
}

function deleteShipper(shipper) {
  fetch(`http://localhost:4000/shipper/deleteShipper/${shipper.shipperid}`, {
      method: "Delete",
      headers: { "content-type": "application/json" },
    });
    location.reload();
}
</script>

<template>
  <div id="shipper">
    <form @submit.prevent="submitShipper" id="shipperForm">
      <h4>Name</h4>
      <input type="text" name="name" id="name" class="form-control" required />
      <br />
      <br />
      <h4>Phone Number</h4>
      <input type="text" name="phone" id="phone" class="form-control" required/>
      <br />
      <br />
      <button type="submit" class="btn btn-danger">Submit Shipper</button>
    </form>
    <br />
    <hr />
    <table class="table table-striped" id="shTable">
      <thead>
        <th>Name</th>
        <th>Phone</th>
        <th>Delete</th>
        <th>Edit</th>
      </thead>
      <tbody id="shipperTBody">
        <tr v-for="(shipper) in shippers" :key="shipper.id">
          <td>
            {{shipper.name}}
          </td>
          <td>
            {{shipper.phone}}
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="deleteShipper(shipper)">Delete</button>
          </td>
          <td>
            <button type="button" class="btn btn-success">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

     <div class="modal fade" id="edit-shipper" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Customer</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
            <form id="shipperUpdateForm">
              <h4>Name</h4>
              <input type="text" name="name" id="uname" class="form-control" required/>
              <br />
              <h4>Phone Number</h4>
              <input type="text" name="phone" id="nphone" class="form-control" required/>
              <br />
              <button type="submit" class="btn btn-info">Submit Shipper</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="updateShipper">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#shipperForm, #shipperUpdateForm {
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

#shTable {
  text-align: center;
}
</style>