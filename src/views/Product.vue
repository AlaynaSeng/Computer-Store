<script setup>
import { ref, watch, onMounted } from "vue";

function submitProduct(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/product", {
    method: "POST",
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify(data)
  });
}
</script>

<template>
  <div id="product">
    <form @submit.prevent="submitProduct" id="productForm">
      <h4>Name</h4>
      <input type="text" name="name" id="name" class="form-control" required/>
      <br />
      <h4>Unit</h4>
      <input type="number" name="unit" id="unit" class="form-control" required/>
      <br />
      <h4>Price</h4>
      <input type="number" name="price" id="price" class="form-control" required/>
      <br />
      <h4>Category</h4>
      <select name="categoryid" id="category" class="form-control"></select>
      <br />
      <h4>Supplier</h4>
      <select name="supplierid" id="supplier" class="form-control"></select>
      <br />
      <button type="submit" class="btn btn-secondary">Submit Product</button>
    </form>
  </div>
  <br />
  <hr />
  <table class="table table-striped" id="pTable">
    <thead>
      <th>ID</th>
      <th>Name</th>
      <th>Unit</th>
      <th>Price</th>
      <th>Category</th>
      <th>Supplier</th>
      <th>Edit</th>
      <th>Delete</th>
    </thead>
    <tbody id="productTBody"></tbody>
  </table>
</template>

<style scoped>
#productForm {
  text-align: center;
  margin-top: 30px;
  border: 2px dotted black;
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
  padding: 30px;
  border-radius: 5px;
}
input,
select {
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
}

#pTable {
  text-align: center;
}
</style>