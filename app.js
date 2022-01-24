let pagina = 1;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 1000) {
    pagina += 1;
    cargarPeliculas();
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina -= 1;
    cargarPeliculas();
  }
});

const cargarPeliculas = async () => {
  try {
    const respuestaApi = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=5a38c7eea76a13c287b426f528ea5078&language=es-MX&page=${pagina}`
    );
    console.log(respuestaApi);

    if (respuestaApi.status === 200) {
      const datos = await respuestaApi.json();

      let peliculas = "";
      datos.results.forEach((pelicula) => {
        peliculas += `
		<div class="pelicula">
		<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}"/>
		<h3 class="titulo">${pelicula.title}</h3>
		</div>`;
      });

      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuestaApi.status === 401) {
      console.log("Llave incorrecta");
    } else if (respuestaApi.status === 404) {
      console.log("Pelicula No encontrada");
    }
  } catch (error) {
    console.log(error);
  }
};
cargarPeliculas();
