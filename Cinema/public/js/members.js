function deleteMember(memberId) {
    fetch(`/members/${memberId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then (res => {
      if (res.status === 200) {
        window.location.href = '/subscriptions'
      }
    })
   
  }

async function handleEditMember(e)
{
  e.preventDefault();
  const member = {}
  member._id = e.target.id.value;
  member.name = e.target.name.value;
  member.email = e.target.email.value;
  member.city= e.target.city.value;
  const response = await fetch(`/members/${member._id}`, {method: 'PUT', body: JSON.stringify(member), headers: {'Content-Type': 'application/json'}})
  if (response.status === 201) {
    window.location.href = '/subscriptions'
  }
  else {
    alert('Error editing member')
  }
}