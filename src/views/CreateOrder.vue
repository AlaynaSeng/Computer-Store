<script setup>
import { ref, watch, onMounted } from "vue";

let products = ref([]);
let customers = ref([]);
let employees = ref([]);
let shippers = ref([]);


onMounted(async () => {
  let pres = await fetch("http://localhost:4000/product", {method: "GET"});
  products.value = await pres.json();
  let cres = await fetch("http://localhost:4000/customer", {method: "GET"});
  customers.value = await cres.json();
  let eres = await fetch("http://localhost:4000/employee", {method: "GET"});
  employees.value = await eres.json();
  let sres = await fetch("http://localhost:4000/shipper", {method: "GET"});
  shippers.value = await sres.json();
});

function submitOrder(e){
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/order", {
    method: "POST",
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify(data)
  });
  alert("Your order had been submitted and processed! Go to the All Orders tab to see your order.")
  location.reload();
}



</script>

<template>
  <div id="orderform">
    <form @submit="submitOrder" id="orderForm">
      <h4>Product</h4>
      <select name="productid" id="product" class="form-control">
        <option v-for="(product) in products" :key="product.id" :value="product.productid">{{product.name}}</option>
      </select>
      <br>
      <h4>Customer</h4>
      <select name="customerid" id="customer" class="form-control">
        <option v-for="(customer) in customers" :key="customer.id" :value="customer.customerid">{{customer.fname}}</option>
      </select>
      <br>
      <h4>Date</h4>
      <input type="date" name="date" id="date" class="form-control" required>
      <br>
      <h4>Employee</h4>
      <select name="employeeid" id="employeeid" class="form-control">
        <option v-for="(employee) in employees" :key="employee.id" :value="employee.employeeid">{{employee.fname}}</option>
      </select>
      <br>
      <h4>Shipper</h4>
      <select name="shipperid" id="shipper" class="form-control">
        <option v-for="(shipper) in shippers" :key="shipper.id" :value="shipper.shipperid">{{shipper.name}}</option>
      </select>
      <br>
      <button type="submit" class="btn btn-dark">Submit Order</button>
    </form>
  </div>
</template>

<style scoped>
#orderForm{
  text-align: center;
  margin-top: 30px;
  border: 2px dotted black;
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
  padding: 30px;
  border-radius: 5px;
}
input, select{
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
}
</style>