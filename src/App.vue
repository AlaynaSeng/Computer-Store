<script setup>
import{RouterView, RouterLink} from "vue-router"

</script>

<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light" >
  <div class="container-fluid">
        <a class="navbar-brand" href="#" id="title">Computer Store</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link active" id="" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" id="" to="/customer">Customers</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" id="" to="/employee">Employees</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" id="" to="/category">Categories</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" id="" to="/product">Products</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" id="" to="/supplier">Suppliers</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" id="" to="/shipper">Shippers</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" id="" to="/create">Order</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link active" id="" to="/orders">All Orders</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
<RouterView/>
</template>

<style>

</style>
