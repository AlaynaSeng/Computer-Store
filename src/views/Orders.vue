<script setup>
import { ref, watch } from "vue";
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
      <tbody id="orderTBody"></tbody>
    </table>
  </div>
</template>

<style scoped>
#oTable {
  text-align: center;
  margin-top: 30px;
}
</style>