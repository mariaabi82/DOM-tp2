const mostrarUsuarios = () => {
  console.log('mostrar')

  fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
    .then(data => data.json())
    .then(result => {
      console.log(result)
      const rowEmployee = document.getElementById("employees")

      let acc = "";

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
       <i class="fa fa-pencil pencil-icon"></i>
       <i class="fa fa-trash trash-icon" id="${employee.id}"></i>
       </td>   
       </tr>`
      });

      rowEmployee.innerHTML = ` <thead><tr>
        <th>Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Phone</th>
        <th>Actions</th>
        </tr></thead>` + acc;

    })
}
const pencil = document.getElementsByClassName("pencil-icon")
const trash = document.getElementsByClassName("trash-icon")
const submitButton = document.getElementById("submit-button")
const modal = document.getElementById("modal")

const mostrarModal = () => {
  modal.innerHTML = `<div class="modal-form-title">
        <h2>Add Employee</h2>
        </div>
        <form action="" method="get" class="modal-form">
        <label>Name</label>
        <input type="text" id="new-name">
        <label>Email</label>
        <input type="text" id="new-email">
        <label>Adress</label>
        <textarea name="Adress" rows="3" cols="30" id="new-adress">
        </textarea> 
        <label>Phone</label>
        <input type="text" id="new-phone">
        </form>
        <div class="div-button">
        <button id="cancel">Cancel</button>
        <button id="add">Add</button></div>
        </form>`
}

submitButton.onclick = () => {
  modal.classList.remove('nomostrar')
  mostrarModal()

  const cancel = document.getElementById("cancel")

  cancel.onclick = () => {
    modal.classList.add('nomostrar')
  }

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

// if accion == edit/add/delete
//user[i].fullname, ...
for (let i = 0; i < pencil.length; i++) {
  pencil[i].onclick = () => {
    console.log(pencil[i])
    const edit = pencil[i].id
    console.log('cualquier cosa')
    mostrarModal()
    //enviar el array del usuario seleccionado

    //   fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${edit}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //   })
    //     .then(data => data.json())
    //     .then(result => console.log(result));
    // }
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

mostrarUsuarios()