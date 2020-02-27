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
       <td>${actions}</td>
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

    const newEmployee = {
        fullname: 'Estefania Avalos',
        email: 'emlavalos92@gmail.com',
        address: 'Cochabamba 546',
        phone: '155386503',
        
      };

 
      /*fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/remove/${3}`, {
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