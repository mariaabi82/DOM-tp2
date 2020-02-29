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
       
    

    const pencil = document.getElementsByClassName("pencil-icon")
    const trash = document.getElementsByClassName("trash-icon")
    const submitButton = document.getElementById("submit-button")
    const modal = document.getElementById("modal")

    submitButton.onclick = () => {
    modal.classList.remove('nomostrar')
    }

    const cancel = document.getElementById("cancel")

    cancel.onclick = () => {
      modal.classList.add('nomostrar')
    }

    const add = document.getElementById("add")

    add.onclick = () => {
      const name = document.getElementById("new-name").value
      const email = document.getElementById("new-email").value
      const adress = document.getElementById("new-adress").value
      const phone = document.getElementById("new-phone").value
      const newEmployee = {
        fullname: `${name}`,
        email: `${email}`,
        address: `${adress}`,
        phone: `${phone}`,
        
      };
      
      fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      })
        .then(data => data.json())
        .then(result => console.log(result));
    }

    /*pencil.onclick = () => {


      fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/edit/${2}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modifiedEmployee),
        })
            .then(data => data.json())
            .then(result => console.log(result));

    }*/

    for (let i = 0; i < trash.length; i++) {
      trash[i].onclick = () => {
        const remove = trash[i].id
        fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${remove}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(data => data.json())
        .then(result => console.log(result));
    }
      }
      
    
      

    /*const newEmployee = {
        fullname: 'Estefania Avalos',
        email: 'emlavalos92@gmail.com',
        address: 'Cochabamba 546',
        phone: '155386503',
        
      };

 
      fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/remove/${3}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(data => data.json())
        .then(result => console.log(result));
   
      fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      })
        .then(data => data.json())
        .then(result => console.log(result));

        const modifiedEmployee = {
            fullname: 'Tefi Avalos',
            email: 'emlavalos92@gmail.com',
            address: 'Cochabamba 546',
            phone: '155386503',
        };
        fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/edit/${2}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modifiedEmployee),
        })
            .then(data => data.json())
            .then(result => console.log(result));

    */
  })