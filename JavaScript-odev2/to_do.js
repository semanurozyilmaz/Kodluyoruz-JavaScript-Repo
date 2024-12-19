document.addEventListener("DOMContentLoaded", function () {
    loadList();
  });
  
function saveToLocalStorage() {
    const items = [];
    const liItems = document.querySelectorAll("#list li");
    liItems.forEach((li) => {
      items.push({
        text: li.childNodes[0].nodeValue.trim(),
        checked: li.classList.contains("checked"),
      });
    });
    localStorage.setItem("todoList", JSON.stringify(items));
}
  
function loadList() {
    const savedItems = JSON.parse(localStorage.getItem("todoList")) || [];
    const ulDOM = document.querySelector("#list");
    ulDOM.innerHTML = "";
  
    savedItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item.text;
  
      if (item.checked) {
        li.classList.add("checked");
      }
  
      const span = document.createElement("span");
      span.className = "close";
      span.innerHTML = "\u00D7";
      li.appendChild(span);
  
      ulDOM.appendChild(li);
  
      span.onclick = function () {
        let div = this.parentElement;
        div.style.display = "none";
        div.remove();
        saveToLocalStorage();
      };
    });
  
    ulDOM.addEventListener("click", function (done) {
      if (done.target.tagName === "LI") {
        done.target.classList.toggle("checked");
        saveToLocalStorage();
      }
    });
}
  
function newElement() {
    const li = document.createElement("li");
    const inputValue = document.querySelector("#task").value;
    if (inputValue === "" || inputValue.trim() === "") {
      $(".error").toast("show");
    } else {
      $(".success").toast("show");
      li.innerHTML = inputValue;
      document.querySelector("#list").appendChild(li);
    }
    document.querySelector("#task").value = "";
  
    const span = document.createElement("span");
    span.className = "close";
    span.innerHTML = "\u00D7";
    li.appendChild(span);
  
    span.onclick = function () {
      const div = this.parentElement;
      div.style.display = "none";
      div.remove();
      saveToLocalStorage();
    };
  
    saveToLocalStorage();
}
  