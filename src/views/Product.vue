<script setup>
import { ref, watch, onMounted } from "vue";

let products = ref([]);
let categories = ref([]);
let suppliers = ref([])

onMounted(async () => {
  let res = await fetch("http://localhost:4000/product", {method: "GET",});
  products.value = await res.json();
  let cres = await fetch("http://localhost:4000/category", {method: "GET",});
  categories.value = await cres.json();
  let sres = await fetch("http://localhost:4000/supplier", {method: "GET",});
  suppliers.value = await sres.json();
  console.log(products.value)
});

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
  console.log(data);
}

let nameInput = ref(null);
let unitInput = ref(null);
let priceInput = ref(null);
let categoryInput = ref(null);
let supplierInput = ref(null);
let IDInput = ref(null);

function editProduct(product){
  nameInput.value.value = product.name;
  unitInput.value.value = product.unit;
  priceInput.value.value = product.price;
  categoryInput.value.value = product.categoryid;
  supplierInput.value.value = product.supplierid;
  IDInput.value.value = product.productid
  let modal = new bootstrap.Modal(document.querySelector('#edit-product'));
  modal.show();
}

function updateProduct(e){
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/product/update", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data)
}

async function deleteProduct(product) {
const res = await fetch(
    `http://localhost:4000/product/deleteProduct/${product.productid}`,
    {
      method: "Delete",
      headers: { "content-type": "application/json" },
    }
  );
  if(res.status == 400){
    alert(`There was an error deleting this product. Please make sure that no orders have been made under this product before continuing.`)
    return
  }
  location.reload();
}
</script>

<template>
  <div id="product">
    <form @submit="submitProduct" id="productForm">
      <h4>Name</h4>
      <input type="text" name="name" id="name" class="form-control" required/>
      <br />
      <h4>Unit</h4>
      <input type="number" name="unit" id="unit" class="form-control" required/>
      <br />
      <h4>Price</h4>
      <input type="decimal" name="price" id="price" class="form-control" required/>
      <br />
      <h4>Category</h4>
      <select name="categoryid" id="category" class="form-control">
        <option v-for="(category) in categories" :key="category.id" :value="category.categoryid">{{category.name}}</option>
      </select>
      <br />
      <h4>Supplier</h4>
      <select name="supplierid" id="supplier" class="form-control">
        <option v-for="(supplier) in suppliers" :key="supplier.id" :value="supplier.supplierid">{{supplier.name}}</option>
      </select>
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
      <th>Delete</th>
      <th>Edit</th>
    </thead>
    <tbody id="productTBody">
        <tr v-for="(product) in products" :key="product.id">
          <td>
            {{product.productid}}
          </td>
          <td>
            {{product.name}}
          </td>
          <td>
            {{product.unit}}
          </td>
          <td>
            {{product.price}}
          </td>
          <td>
            {{product.cname}}
          </td>
          <td>
            {{product.sname}}
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
          </td>
          <td>
            <button type="button" class="btn btn-success" @click="editProduct(product)">Edit</button>
          </td>
        </tr>
    </tbody>
  </table>

  <div class="modal fade" id="edit-product" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update product</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
            <form id="productUpdateForm" @submit="updateProduct">
              <h4>Name</h4>
              <input type="text" name="name" id="name" class="form-control" ref="nameInput" required/>
              <br />
              <h4>Unit</h4>
              <input type="number" name="unit" id="unit" class="form-control" ref="unitInput" required/>
              <br />
              <h4>Price</h4>
              <input type="decimal" name="price" id="price" class="form-control" ref="priceInput" required/>
              <br />
              <h4>Category</h4>
              <select name="categoryid" id="category" class="form-control" ref="categoryInput">
                <option v-for="(category) in categories" :key="category.id" :value="category.categoryid">{{category.name}}</option>
              </select>
              <br />
              <h4>Supplier</h4>
              <select name="supplierid" id="supplier" class="form-control" ref="supplierInput">
                <option v-for="(supplier) in suppliers" :key="supplier.id" :value="supplier.supplierid">{{supplier.name}}</option>
              </select>
              <br />
              <input type="hidden" name="productid" id="productid" ref="IDInput">
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
#productUpdateForm{
    text-align: center;
    padding: 30px;
}

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