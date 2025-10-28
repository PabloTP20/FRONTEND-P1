fetch('http://localhost:8080/estudiantes')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    createTable(data);
  })
  .catch(error => console.error(error));

  let table = document.createElement("myTable");
  function createTable(data) {
    let tableBody = document.getElementById("myTable");
    data.forEach(item => {
        let newRow = tableBody.insertRow();
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);
        let cell6 = newRow.insertCell(5);

        cell1.innerHTML = item.numero_control;
        cell2.innerHTML = item.nombre;
        cell3.innerHTML = item.apellido_paterno;
        cell4.innerHTML = item.aòpellido_materno;
        cell5.innerHTML = item.carrera;
        cell6.innerHTML = '<button onclick="editRowFunction(this)">Editar</button> <button onclick="deleteRowFunction(this)">Eliminar</button>';
    });
}

let form = document.getElementById("myForm");
let editRow = null;
form.addEventListener("submit", function(event) {
    event.preventDefault();
    let numero_control = document.getElementById("numero_control").value;
    let nombre = document.getElementById("nombre").value;
    let apellido_paterno = document.getElementById("apellido_paterno").value;
    let apellido_materno = document.getElementById("apellido_materno").value;
    let carrera = document.getElementById("carrera").value;
    if (editRow == null) {
        addRow(numero_control, nombre, apellido_paterno, apellido_materno, carrera);
    } else {
        updateRow(numero_control, nombre, apellido_paterno, apellido_materno, carrera);
        fetch(`http://localhost:8080/estudiantes/${numero_control}?carrera=${carrera}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "PUT",
                "Access-Control-Allow-Headers": "Content-Type" }
        });
    }
    form.reset();
});

function addRow(numero_control, nombre, apellido_paterno, apellido_materno, carrera) {
    let tableBody = document.getElementById("myTable");
    let newRow = tableBody.insertRow();
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    cell1.innerHTML = numero_control;
    cell2.innerHTML = nombre;
    cell3.innerHTML = apellido_paterno;
    cell4.innerHTML = apellido_materno;
    cell5.innerHTML = carrera;
    cell6.innerHTML = '<button onclick="editRowFunction(this)">Editar</button> <button onclick="deleteRowFunction(this)">Eliminar</button>';

    let data = new FormData();
    data.append('noControl', numero_control);
    data.append('nombre', nombre);
    data.append('apellido_paterno', apellido_paterno);
    data.append('apellido_materno', apellido_materno);
    data.append('carrera', carrera);
    fetch('http://localhost:8080/estudiantes', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Object.fromEntries(data))
    });
}