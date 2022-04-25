<script setup>
import { ref, watch, onMounted } from "vue";

let orders = ref([]);
let products = ref([]);
let customers = ref([]);
let employees = ref([]);
let shippers = ref([]);


onMounted(async () => {
  let res = await fetch("http://localhost:4000/order", {method: "GET"});
  orders.value = await res.json();
  let pres = await fetch("http://localhost:4000/product", {method: "GET"});
  products.value = await pres.json();
  let cres = await fetch("http://localhost:4000/customer", {method: "GET"});
  customers.value = await cres.json();
  let eres = await fetch("http://localhost:4000/employee", {method: "GET"});
  employees.value = await eres.json();
  let sres = await fetch("http://localhost:4000/shipper", {method: "GET"});
  shippers.value = await sres.json();
});

let productInput = ref(null);
let customerInput = ref(null);
let dateInput = ref(null);
let employeeInput = ref(null);
let shipperInput = ref(null);
let IDInput = ref(null);

function editOrder(order){
  productInput.value.value = order.productid;
  customerInput.value.value = order.customerid;
  dateInput.value.value = order.date;
  employeeInput.value.value = order.employeeid;
  shipperInput.value.value = order.shipperid;
  IDInput.value.value = order.orderid
  let modal = new bootstrap.Modal(document.querySelector('#edit-order'));
  modal.show();
}

function updateOrder(e){
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/order/update", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data)
}


function deleteOrder(order) {
  fetch(`http://localhost:4000/order/deleteOrder/${order.orderid}`, {
      method: "Delete",
      headers: { "content-type": "application/json" },
    });
    location.reload();
}
</script>


<template>
  <div id="orders">
    <table class="table table-striped" id="oTable">
      <thead>
        <th>ID</th>
        <th>Product</th>
        <th>Customer</th>
        <th>Date</th>
        <th>Employee</th>
        <th>Shipper</th>
        <th>Edit</th>
        <th>Delete</th>
      </thead>
      <tbody id="orderTBody">
        <tr v-for="(order) in orders" :key="order.id">
          <td>
            {{order.orderid}}
          </td>
          <td>
            {{order.pname}}
          </td>
          <td>
            {{order.cname}}
          </td>
          <td>
            {{order.date.split("T")[0]}}
          </td>
          <td>
            {{order.ename}}
          </td>
          <td>
            {{order.sname}}
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="deleteOrder(order)">Delete</button>
          </td>
          <td>
            <button type="button" class="btn btn-success" @click="editOrder(order)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>

    

    <div class="modal fade" id="edit-order" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Order</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
            <form @submit="updateOrder" id="orderUpdateForm">
      <h4>Product</h4>
      <select name="productid" id="product" class="form-control" ref="productInput">
        <option v-for="(product) in products" :key="product.id" :value="product.productid">{{product.name}}</option>
      </select>
      <br>
      <h4>Customer</h4>
      <select name="customerid" id="customer" class="form-control" ref="customerInput">
        <option v-for="(customer) in customers" :key="customer.id" :value="customer.customerid">{{customer.fname}}</option>
      </select>
      <br>
      <h4>Date</h4>
      <input type="date" name="date" id="date" class="form-control" required ref="dateInput">
      <br>
      <h4>Employee</h4>
      <select name="employeeid" id="employeeid" class="form-control" ref="employeeInput">
        <option v-for="(employee) in employees" :key="employee.id" :value="employee.employeeid">{{employee.fname}}</option>
      </select>
      <br>
      <h4>Shipper</h4>
      <select name="shipperid" id="shipper" class="form-control" ref="shipperInput">
        <option v-for="(shipper) in shippers" :key="shipper.id" :value="shipper.shipperid">{{shipper.name}}</option>
      </select>
      <br>
      <input type="hidden" id="orderid" name="orderid" ref="IDInput">
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" >Save changes</button>
          </div>
    </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#oTable {
  text-align: center;
  margin-top: 30px;
}

#orderUpdateForm{
    text-align: center;
  padding: 30px;
}
</style>