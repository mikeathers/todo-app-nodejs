$(document).ready(function() {
  $.getJSON("/api/todos")
    .then(addTodos)
    .catch((err) => {
      console.log(err);
    });
  $("#todoInput").keypress((e) => {
    if (e.which == 13) { // keycode value for the enter key.
      createTodo();
    }
  });

  $(".list").on("click", "li", function() {
    updateTodo($(this))
  })
  $(".list").on("click", "span", function(e) {
    // Stop events moving up the dom. Stops the above method from being called
    e.stopPropagation();
    removeTodo($(this).parent());
  });
});

// add todos to the page
function addTodos(todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  })
}

function addTodo(todo) {
  let newTodo = $("<li class='task'>" + todo.name + "<span>X</span></li>");
  newTodo.data("id", todo._id);
  newTodo.data("completed", todo.completed);
  if (todo.completed) {
    newTodo.addClass("done");
  }
  $(".list").append(newTodo);
}

function createTodo() {
  let userInput = $("#todoInput").val();
  $.post("/api/todos", {
      name: userInput
    })
    .then((newTodo) => {
      $("#todoInput").val("");
      addTodo(newTodo);
    })
    .catch((err) => {
      console.log(err);
    })
}

function removeTodo(todo) {
  let clickedId = todo.data("id");
  let deleteUrl = "/api/todos/" + clickedId;
  $.ajax({
      method: "DELETE",
      url: deleteUrl
    })
    .then(() => {
      todo.remove();
    })
    .catch((err) => {
      console.log(err);
    })
}

function updateTodo(todo) {
  let updateUrl = "/api/todos/" + todo.data("id");
  let isDone = !todo.data("completed");
  let updateData = {
    completed: isDone
  }
  $.ajax({
      method: "PUT",
      url: updateUrl,
      data: updateData
    })
    .then((updatedTodo) => {
      todo.toggleClass("done");
      todo.data("complete", isDone);
    })
}
