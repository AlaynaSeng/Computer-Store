<script setup>
import { ref, watch } from "vue";

function submitCategory() {}
</script>

<template>
  <div id="category">
    <form @submit.prevent="submitCategory" id="categoryForm">
      <h4>Name</h4>
      <input type="text" name="name" id="name" class="form-control" required />
      <br />
      <br />
      <h4>Description</h4>
      <input type="text" name="description" id="description" class="form-control" required/>
      <br />
      <br />
      <button type="submit" class="btn btn-success">Submit Category</button>
    </form>
    <br />
    <br />
    <hr />
    <table class="table table-striped" id="catTable">
      <thead>
        <th>Name</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </thead>
      <tbody id="categoryTBody"></tbody>
    </table>
  </div>
</template>

<style scoped>
#categoryForm {
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

#catTable {
  text-align: center;
}
</style>