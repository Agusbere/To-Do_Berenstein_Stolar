"use strict";

const ul = document.querySelector("ul");
const add = document.getElementById("add");
const del = document.getElementById("delete");
const name = document.getElementById("name");

var lastId = -1;

function crearElemento(nombre, id, checked = false) {
  const li = document.createElement("li");
  li.id = id;
  //    CHECKBOX
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkbox-" + id;
  checkbox.checked = checked;
  checkbox.addEventListener("change", () => {
    localStorage.setItem(
      localStorage.key(li.id),
      checkbox.checked ? getDate() : false
    );
    masRapida();
  });
  //    BTN
  const btn = document.createElement("button");
  btn.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
  btn.addEventListener("click", () => {
    li.remove();
    localStorage.removeItem(localStorage.key(id));
    location.reload();
  });
  //    LABEL
  const label = document.createElement("label");
  label.htmlFor = "checkbox-" + id;
  label.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
  //    P
  const p = document.createElement("p");
  p.textContent = nombre;
  li.appendChild(label);
  li.appendChild(p);
  li.appendChild(checkbox);
  li.appendChild(btn);
  ul.appendChild(li);
}

function recargarTareas() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    crearElemento(key.split(";")[1], i, localStorage.getItem(key) !== "false");
    lastId = i;
  }
}

recargarTareas();

function getDate() {
  const d = new Date();
  return d.toLocaleString() + ":" + d.getMilliseconds();
}

function strToDate(fechaStr) {
  const [fechaPart, horaPart] = fechaStr.split(", ");
  const [dia, mes, año] = fechaPart.split("/").map(Number);
  const [hora, minutos, segundos, milisegundos] = horaPart
    .split(":")
    .map(Number);
  const fecha = new Date(año, mes, dia, hora, minutos, segundos, milisegundos);
  return fecha;
}

function masRapida() {
  let r = Number.MAX_VALUE;
  let rKey = null;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key); // False / fecha
    if (value !== "false" && key !== "null") {
      const dif = strToDate(value) - strToDate(key.split(";")[0]);
      if (dif < r) rKey = key.split(";")[1];
      r = Math.min(dif, r);
    }
  }
  document.getElementById("masRapida").textContent = rKey;
}

masRapida();

add.addEventListener("click", () => {
  var nombre = name.value;
  name.value = "";
  crearElemento(nombre, ++lastId);
  const dString = getDate();
  localStorage.setItem(dString + ";" + nombre, false);
});

del.addEventListener("click", () => {
  ul.innerText = "";
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    if (value !== "false") localStorage.removeItem(key);
  }
  location.reload();
});
