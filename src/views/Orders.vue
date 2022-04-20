<script setup>
import { ref, watch, onMounted } from "vue";

let orders = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/order", {method: "GET"});
  orders.value = await res.json();
});


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
            {{order.date}}
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
            <button type="button" class="btn btn-success">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
#oTable {
  text-align: center;
  margin-top: 30px;
}
</style>