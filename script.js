consultarCliente();
function crearClientes(){
    event.preventDefault(); //evita que refresque pantalla
    const json = {};
    json["id"] = parseInt(document.getElementById("clienteID").value); 
    json["name"] = document.getElementById("clienteName").value;
    json["email"] = document.getElementById("clienteEmail").value;
    json["age"] = parseInt(document.getElementById("clienteAge").value);

    $.ajax({
        url: 'https://g96eb5b1dbdffbd-irv5il5sw6m661th.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        data: json,
        type: "POST",
        dataType: 'json',
        complete : function(){
            alert("Peticion OK");
            limpiarCampos();
           
        }
    })
}

function limpiarCampos(){
    document.getElementById("clienteID").value = ''; 
    document.getElementById("clienteName").value = '';
    document.getElementById("clienteEmail").value = '';
    document.getElementById("clienteAge").value = '';
}
function seleccionarCliente(elemento){
    cliente = elemento.parentElement.parentElement;
    document.getElementById("clienteID").value = cliente.cells[0].innerHTML; 
    document.getElementById("clienteName").value = cliente.cells[1].innerHTML;
    document.getElementById("clienteEmail").value = cliente.cells[2].innerHTML;
    document.getElementById("clienteAge").value = cliente.cells[3].innerHTML;
}
function eliminarCliente(id){
    $.ajax({
        url: 'https://g96eb5b1dbdffbd-irv5il5sw6m661th.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client'+id,
        data: null,
        type: "DELETE",
        dataType: 'json',
        complete : function(){
            alert("Eliminacion OK");
            location.reload();
        }
    })
}

function editarCliente(){
    const json = {};
    json["id"] = parseInt(document.getElementById("clienteID").value); 
    json["name"] = document.getElementById("clienteName").value;
    json["email"] = document.getElementById("clienteEmail").value;
    json["age"] = parseInt(document.getElementById("clienteAge").value);

    $.ajax({
        url: 'https://g96eb5b1dbdffbd-irv5il5sw6m661th.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        data: json,
        type: "PUT",
        dataType: 'json',
        complete : function(){
            alert("Peticion OK");
            limpiarCampos();
            //location.reload();
        }
    })
}

function consultarCliente(){
    const table = document.getElementById("listaCliente").getElementsByTagName('tbody')[0];
    $.ajax({
        url: 'https://g96eb5b1dbdffbd-irv5il5sw6m661th.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client',
        data: null,
        type: "GET",
        dataType: 'json',
        success: function(data){
            data.items.map( item => {
                const nuevoCliente = table.insertRow();
                nuevoCliente.insertCell(0).innerHTML = item.id;
                nuevoCliente.insertCell(1).innerHTML = item.name;
                nuevoCliente.insertCell(2).innerHTML = item.email;
                nuevoCliente.insertCell(3).innerHTML = item.age;
                nuevoCliente.insertCell(4).innerHTML = `
                <button onClick="seleccionarCliente(this)">Seleccionar</button>
                <button onClick="eliminarCliente(${item.id})">Eliminar</button>
                `;
            })
        },
        error: function(error){
            alert("Error Load");
            console.log(error);
        },
        complete : function(){
            alert("Carga OK");
        }
    })
}

