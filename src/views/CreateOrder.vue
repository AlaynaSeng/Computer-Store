<script setup>
import { ref, watch } from "vue";

function submitOrder(){
  
}

</script>

<template>
  <div id="orderform">
    <form @submit.prevent="submitOrder" id="orderForm">
      <h4>Product</h4>
      <select name="productid" id="product" class="form-control"></select>
      <br>
      <h4>Customer</h4>
      <select name="customerid" id="customer" class="form-control"></select>
      <br>
      <h4>Date</h4>
      <input type="date" name="date" id="date" class="form-control" required>
      <br>
      <h4>Employee</h4>
      <select name="employeeid" id="employeeid" class="form-control"></select>
      <br>
      <h4>Shipper</h4>
      <select name="shipperid" id="shipper" class="form-control"></select>
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