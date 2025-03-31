const ul = document.querySelector('ul');
const add = document.getElementById('add');
const del = document.getElementById('delete');

function crearElemento(nombre, id, checked = false) {
   const li = document.createElement('li');
   li.id = id;
   //    CHECKBOX
   const checkbox = document.createElement('input');
   checkbox.type = 'checkbox';
   checkbox.id = 'checkbox-' + id;
   checkbox.checked = checked;
   checkbox.addEventListener('change', () =>
      localStorage.setItem(localStorage.key(id), checkbox.checked)
   );
   //    BTN
   const btn = document.createElement('button');
   btn.textContent = 'eliminar tarea';
   btn.addEventListener('click', () => {
      li.remove();
      localStorage.removeItem(localStorage.key(id));
   });
   //    LABEL
   const label = document.createElement('label');
   label.htmlFor = 'checkbox-' + id;
   //    P
   const p = document.createElement('p');
   p.textContent = nombre;
   li.appendChild(label);
   li.appendChild(p);
   li.appendChild(checkbox);
   li.appendChild(btn);
   ul.appendChild(li);
}

var lastId = -1;

function recargarTareas() {
   for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      crearElemento(key.split(';')[1], i, localStorage.getItem(key) === 'true');
      lastId = i;
   }
}

recargarTareas();

add.addEventListener('click', () => {
   var nombre = 'nuevo elemento';
   crearElemento(nombre, ++lastId);
   const d = new Date();
   const dString = d.toLocaleString() + ':' + d.getMilliseconds();
   localStorage.setItem(dString + ';' + nombre, false);
});

del.addEventListener('click', () => {
   ul.innerText = '';
   localStorage.clear();
});
