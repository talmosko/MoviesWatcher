function deleteMovie(id) {
    fetch(`/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then (res => {
      if (res.status === 200) {
        window.location.href = '/movies'
      }
    })
   
  }

async function handleEditMovie(e)
{
  e.preventDefault();
  const movie = {}
  movie._id = e.target.id.value;
  movie.name = e.target.name.value;
  movie.genres = e.target.genres.value;
  movie.image= e.target.image.value;
  movie.premiered = e.target.premiered.value;
  console.log(movie)
  const response = await fetch(`/movies/${movie._id}`, {method: 'PUT', body: JSON.stringify(movie), headers: {'Content-Type': 'application/json'}})
  console.log(response.status)
  if (response.status === 201) {
    window.location.href = '/movies'
  }
  else {
    alert('Error editing movie')
  }
}