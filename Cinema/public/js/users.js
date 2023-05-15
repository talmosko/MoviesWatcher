

function handlePermissionsChange(event) {
    if(event.target.checked)
    {
        if(event.target.value === 'Create Subscriptions' || event.target.value === 'Update Subscriptions' || event.target.value === 'Delete Subscriptions')
        {
           //change the 'checked' of View Subscriptions
            document.getElementById('View Subscriptions').checked = true;
        }

        if(event.target.value === 'Create Movies' || event.target.value === 'Update Movies' || event.target.value === 'Delete Movies')
        {
            //check all the MoviesPermissions
            document.getElementById('View Movies').checked = true;
        }
    }
   
}

async function deleteUser(userId)
{
    const res = await fetch('/users/' + userId, {method: 'DELETE'});
    console.log(res);
    if(res.status === 200)
    {
        location.href = '/users';
    }
    else
    {
        alert('Error deleting user');
    }
}

async function handleEditUser(e)
{
    e.preventDefault();
    const user = {}
    user._id = e.target.id.value;
    user.firstName = e.target.firstName.value;
    user.lastName = e.target.lastName.value;
    user.userName = e.target.userName.value;
    user.sessionTimeout = e.target.sessionTimeout.value;
    user.permissions = [];
    e.target.permissions.forEach(p => {if(p.checked) user.permissions.push(p.value)});
    console.log(user.permissions);
   
    const response = await fetch(`/users/${user._id}`, {method: 'PUT', body: JSON.stringify(user), headers: {'Content-Type': 'application/json'}})
    console.log(response.status);
    if (response.status === 201) {
      window.location.href = '/users'
    }
    else {
      alert('Error editing user')
    }
}