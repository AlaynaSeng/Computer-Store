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
#shipperForm {
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