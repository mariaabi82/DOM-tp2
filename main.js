const submitButton = document.getElementById("submit-button")
const modal = document.getElementById("modal")


const mostrarUsuariosEnPantalla = (result) =>{
  let acc = "";
  const rowEmployee = document.getElementById("employees")
result.forEach(employee => {
  let name = employee.fullname
  let email = employee.email
  let address = employee.address
  let phone = employee.phone
  let actions = employee.actions

  acc += `<tr>
 <td>${name}</td>
 <td>${email}</td>
 <td>${address}</td>
 <td>${phone}</td>
 <td>
 <i class="fa fa-pencil pencil-icon" id="edit-${employee.id}"></i>
 <i class="fa fa-trash trash-icon" id="${employee.id}"></i>
 </td>   
 </tr>`
rowEmployee.innerHTML = ` <thead><tr>
  <th>Name</th>
  <th>Email</th>
  <th>Address</th>
  <th>Phone</th>
  <th>Actions</th>
  </tr></thead>` + acc;
})}


const mostrarUsuarios = () => {

  fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
    .then(data => data.json())
    .then(result => {
      mostrarUsuariosEnPantalla(result)
      
      

      
      const pencil = document.getElementsByClassName("pencil-icon")
      const trash = document.getElementsByClassName("trash-icon")


      for (let i = 0; i < pencil.length; i++) {
        pencil[i].onclick = () => {
          const edit = pencil[i].id
          result.forEach(element => {
            if (element.id == edit.split('-')[1]) {
              modal.classList.remove('nomostrar')
              mostrarModal(element.fullname, element.email, element.address, element.phone)

              const save = document.getElementById('edit')

              save.onclick = () => {
                const name = document.getElementById("new-name").value
                const email = document.getElementById("new-email").value
                const address = document.getElementById("new-adress").value
                const phone = document.getElementById("new-phone").value
                const newEmployee = {
                  fullname: name,
                  email: email,
                  address: address,
                  phone: phone,
                };


                fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${element.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newEmployee),
                })
                  .then(data => data.json())
                  .then(result => {
                    modal.classList.add('nomostrar')
                    mostrarUsuarios();
                  })
              }
            }
          });
        }
      }


      for (let i = 0; i < trash.length; i++) {
        trash[i].onclick = () => {
          const remove = trash[i].id
          fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${remove}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          })
            .then(dataDelete => dataDelete.json())
            .then(resultDelete => {
              fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
                .then(infoDelete => infoDelete.json())
                .then(resultadoDelete => {
                  mostrarUsuarios()

                })
            })
        }
      }
    })
}


const mostrarModal = (name = "", email = "", address = "", tel = "") => {
  modal.innerHTML = `<div class="modal-form-title">
        <h2>Add Employee</h2>
        </div>
        <form action="" method="get" class="modal-form">
        <label>Name</label>
        <input type="text" id="new-name" value=${name}>
        <label>Email</label>
        <input type="text" id="new-email" value=${email}>
        <label>Adress</label>
        <textarea name="Adress" rows="3" cols="30" id="new-adress">
        ${address}
        </textarea> 
        <label>Phone</label>
        <input type="text" id="new-phone" value=${tel}>
        </form>
        <div class="div-button">
        <button id="cancel">Cancel</button>

        ${name ? '<button id="edit">Save</button></div>' :
      '<button id="add">Add</button></div>'}
        </form>`

  const cancel = document.getElementById("cancel")

  cancel.onclick = () => {
    modal.classList.add('nomostrar')
  }

}

submitButton.onclick = () => {
  modal.classList.remove('nomostrar')
  mostrarModal()

  const add = document.getElementById("add")

  add.onclick = () => {
    const name = document.getElementById("new-name").value
    const email = document.getElementById("new-email").value
    const address = document.getElementById("new-adress").value
    const phone = document.getElementById("new-phone").value
    const newEmployee = {
      fullname: name,
      email: email,
      address: address,
      phone: phone,
    };


    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEmployee),
    })
      .then(data => data.json())
      .then(result => {
        modal.classList.add('nomostrar')
        mostrarUsuarios();
      })
  }
}



mostrarUsuarios()

const usuarioFiltrado = document.getElementById("filter")

usuarioFiltrado.onkeypress = e => {
  if (e.keyCode == 13) {
      fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users?search=${usuarioFiltrado.value}`)
          .then(data => data.json())
          .then(users => {
              mostrarUsuariosEnPantalla(users);
          })
  }
}