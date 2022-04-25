<script setup>
import { ref, watch, onMounted } from "vue";

let categories = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/category", {method: "GET",});
  categories.value = await res.json();
});

function submitCategory(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/category", {
    method: "POST",
    headers: {
      "content-type":"application/json"
    },
    body: JSON.stringify(data)
  });
  console.log(data)
}

let nameInput = ref(null);
let descriptionInput = ref(null);
let IDInput = ref(null);

function editCategory(category){
  nameInput.value.value = category.name;
  descriptionInput.value.value = category.description;
  IDInput.value.value = category.categoryid
  let modal = new bootstrap.Modal(document.querySelector('#edit-category'));
  modal.show();
}

function updateCategory(e){
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/category/update", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data)
}

async function deleteCategory(category) {
const res = await fetch(
    `http://localhost:4000/category/deleteCategory/${category.categoryid}`,
    {
      method: "Delete",
      headers: { "content-type": "application/json" },
    }
  );
  if(res.status == 400){
    alert(`There was an error deleting this category. Please make sure that no orders have been made under this category before continuing.`)
    return
  }
  location.reload();
}
</script>

<template>
  <div id="category">
    <form @submit="submitCategory" id="categoryForm">
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
        <th>Delete</th>
        <th>Edit</th>
      </thead>
      <tbody id="categoryTBody">
        <tr v-for="(category) in categories" :key="category.id">
          <td>
            {{category.name}}
          </td>
          <td>
            {{category.description}}
          </td>
          <td>
            <button type="button" class="btn btn-danger" @click="deleteCategory(category)">Delete</button>
          </td>
          <td>
            <button type="button" class="btn btn-success" @click="editCategory(category)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal fade" id="edit-category" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Customer</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
            <form id="categoryUpdateForm" @submit="updateCategory">
              <h4>Name</h4>
              <input type="text" name="name" id="uname" class="form-control" ref="nameInput" required/>
              <br />
              <h4>Description</h4>
              <input type="text" name="description" id="ndescription" class="form-control" ref="descriptionInput" required/>
              <br />
              <input type="hidden" name="categoryid" id="categoryid" ref="IDInput">
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#categoryUpdateForm{
   text-align: center;
    padding: 30px;
}

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