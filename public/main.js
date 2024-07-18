document.addEventListener('DOMContentLoaded', () => {
    const formUsers = document.getElementById('form');
    const listaUsers = document.getElementById('lista');
    
    function showUsers(users) {
        listaUsers.innerHTML = '';
        users.forEach(user => {
            const ul = document.createElement('ul');
            ul.innerHTML = `
                            <p>${user.name} ${user.email} ${user.tel} <p>
                            <button onclick='actUser(${user.id})'> Actualizar</button>
                            <button onclick='eliminUser(${user.id})'> Eliminar</button>
                            `;
            listaUsers.appendChild(ul);
        })
    }
    function getUsers() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => showUsers(data));
    }
    
    formUsers.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(formUsers);
        const newUser = {
            name: data.get('nombre'),
            email: data.get('mail'),
            tel: data.get('tele')
        };
    
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify(newUser)
        })
        .then (response => response.json())
        .then (data => {
            getUsers();
            formUsers.reset();
        })
    });
    
    window.actUser = function(id) {
        const actUser = {
            name: prompt("Ingrese un nuevo nombre: "),
            email: prompt("Ingrese un nuevo E-mail: "),
            tel: prompt("Ingrese un nuevo telefono: ")
        };
    
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(actUser)
        })
        .then(response => response.json())
        .then(data => getUsers())
    };
    window.eliminUser = function(id) {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE'
        })
        .then(() => getUsers())
    };
    getUsers();
});