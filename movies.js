"use strict";

let allMovies = [];
let allSeries = [];

const hamburger = document.querySelector(".bars");
const navList = document.querySelector(".navlist");

const allSlides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const categoryBtn = document.getElementById("categoryBtn");
const categoryMenu = document.getElementById("categoryMenu");

const movieCont = document.querySelector(".movie-card-1");
const seriesCont = document.querySelector("#series-container");

const movieModal = document.querySelector(".movie-modal");
const movieModalImg = document.querySelector(".movie-modal .modal-image img");
const movieModalTitle = document.querySelector(".movie-modal .modal-title");
const movieModalDesc = document.querySelector(
  ".movie-modal .modal-description",
);
const closeMovieModalBtn = document.getElementById("close-movie-modal-btn");
const movieModalRelease = document.querySelector(
  ".movie-modal .modal-release-date",
);
const movieModalRating = document.querySelector(".movie-modal .modal-rating");

const seriesModal = document.querySelector(".series-modal");
const seriesModalImg = document.querySelector(".series-modal .modal-image img");
const seriesModalTitle = document.querySelector(".series-modal .modal-title");
const seriesModalDesc = document.querySelector(
  ".series-modal .modal-description",
);
const closeseriesModalBtn = document.getElementById("close-series-modal-btn");
const seriesModalRelease = document.querySelector(
  ".series-modal .modal-release-date",
);
const seriesModalRating = document.querySelector(".series-modal .modal-rating");

console.log(hamburger, navList);

function handleNavDisplay() {
  hamburger.classList.toggle("hamburgerIsActive");
  navList.classList.toggle("active");
}

hamburger.addEventListener("click", handleNavDisplay);

// window.addEventListener("click", function () {
//   if (hamburger.classList.contains("show")) {
//     hamburger.classList.remove("show");
//   }
// });

// function filterGenre(genre) {
//   const filteredMovies = movies.filter((movie) => movie.genre === genre);

//   displayMovies(filteredMovies);
// }

// show first slide

const genreMap = {
  28: "Action",
  16: "Anime",
  35: "Comedies",
  99: "Documentaries",
  18: "Dramas",
  27: "Horror",
  878: "Sci-Fi",
  53: "Thriller",
};

function filterGenre(name) {
  const genreId = Number(
    Object.keys(genreMap).find((id) => genreMap[id] === name),
  );

  // // Movies
  // const filteredMovies = allMovies.filter((movie) =>
  //   movie.genre_ids.includes(genreId),
  // );

  // displayAllMovies(filteredMovies);

  // // Series
  // const filteredSeries = allSeries.filter((series) =>
  //   series.genre_ids.includes(genreId),
  // );

  displayAllSeries(filteredSeries);
}

async function searchFunction() {

const value = document
.getElementById("searchInput")
.value
.trim();

if(value === ""){
displayAllMovies(allMovies);
displayAllSeries(allSeries);
return;
}

const movieRes = await fetch(
`https://api.themoviedb.org/3/search/movie?query=${value}&language=en-US&page=1`,
options
);

const movieData = await movieRes.json();

displayAllMovies(movieData.results);

const seriesRes = await fetch(
`https://api.themoviedb.org/3/search/tv?query=${value}&language=en-US&page=1`,
options
);

const seriesData = await seriesRes.json();

displayAllSeries(seriesData.results);

}
let currentSlide = 0;
let autoSlide;
// allSlides[currentSlide].style.opacity = 1;
showSlide(currentSlide);

// function to display a slide
function showSlide(index) {
  for (let i = 0; i < allSlides.length; i++) {
    allSlides[i].style.opacity = 0;
  }

  allSlides[index].style.opacity = 1;
}

// next slide
function moveSlide() {
  currentSlide++;

  if (currentSlide >= allSlides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}

// previous slide
function prevSlide() {
  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = allSlides.length - 1;
  }

  showSlide(currentSlide);
}

// auto slide
function startAutoSlide() {
  autoSlide = setInterval(moveSlide, 2000);
}

//stop auto sliding
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// button events
nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  moveSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

startAutoSlide();

// Toggle the dropdown
categoryBtn.addEventListener("click", function (e) {
  categoryMenu.classList.toggle("show");
  e.stopPropagation();
});

window.addEventListener("click", function () {
  if (categoryMenu.classList.contains("show")) {
    categoryMenu.classList.remove("show");
  }
});

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzBkNTg4MzJmMzlhODcxYjM1N2Y4YjNiMjRhNjAwZCIsIm5iZiI6MTc3ODMyMDQwMC44NjcsInN1YiI6IjY5ZmYwNDEwMDI1ZmZiOGEwYmFlOGQxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SfpQH1CNNr9swbRKfyQJt1aMvM02ltw1bCulEQrir9k",
  },
};

function displayAllMovies(movies) {
  const mapped = movies.map((movie) => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const size = "w500";
    const posterUrl = baseUrl + size + movie.poster_path;
    return `
   <div class="card-box" data-id=${movie.id}>
          <img src="${posterUrl}" />
          <h3>${movie.original_title}</h3>
           <p class="release-date">${movie.release_date}</p>
          <div class="release-badge">
            <span class="star">&#9733</span>
            <span class="score">${movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
  `;
  });

  movieCont.innerHTML = mapped.join("");
}

async function getAllMovies(id) {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    options,
  );

  const data = await res.json();
  console.log(data);
 allMovies = [...allMovies, ...data.results];
  displayAllMovies(allMovies);
}

getAllMovies();

async function getMovieDetails(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    options,
  );

  const dataDetails = await res.json();

  return dataDetails;
}

movieCont.addEventListener("click", async function (e) {
  console.log(e.target.parentElement);
  if (
    !e.target.classList.contains("card-box") &&
    !e.target.parentElement.classList.contains("card-box")
  )
    return;

  const movieId = e.target.dataset.id || e.target.parentElement.dataset.id;
  console.log(movieId);

  const movieDetail = await getMovieDetails(movieId);
  console.log(movieDetail);

  if (!movieDetail) return;

  const baseUrl = "https://image.tmdb.org/t/p/";
  const size = "w500";
  const posterUrl = baseUrl + size + movieDetail.poster_path;
  /*
{
    "adult": false,
    "backdrop_path": "/4k99kV4R1bbbrsnjR205v91Xbin.jpg",
    "belongs_to_collection": {
        "id": 1704738,
        "name": "Obsession Universe",
        "poster_path": null,
        "backdrop_path": null
    },
    "budget": 750000,
    "genres": [
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 53,
            "name": "Thriller"
        }
    ],
    "homepage": "http://www.focusfeatures.com/obsession",
    "id": 1339713,
    "imdb_id": "tt37287335",
    "origin_country": [
        "US"
    ],
    "original_language": "en",
    "original_title": "Obsession",
    "overview": "After breaking the mysterious \"One Wish Willow\" to win his crush's heart, a hopeless romantic finds himself getting exactly what he asked for but soon discovers that some desires come at a dark, sinister price.",
    "popularity": 718.2017,
    "poster_path": "/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg",
    "production_companies": [
        {
            "id": 155758,
            "logo_path": "/iZi0zd9ijrcWR9zlEUUthG8d600.png",
            "name": "Tea Shop Productions",
            "origin_country": "GB"
        },
        {
            "id": 273145,
            "logo_path": null,
            "name": "Under the Shell",
            "origin_country": "US"
        },
        {
            "id": 154063,
            "logo_path": "/r4anaxYa8OL5KaUbU35VkrIe88L.png",
            "name": "Capstone Pictures",
            "origin_country": "US"
        },
        {
            "id": 3172,
            "logo_path": "/rzKluDcRkIwHZK2pHsiT667A2Kw.png",
            "name": "Blumhouse Productions",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        },
        {
            "iso_3166_1": "GB",
            "name": "United Kingdom"
        }
    ],
    "release_date": "2026-05-13",
    "revenue": 287181980,
    "runtime": 108,
    "softcore": false,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "Be careful who you wish for…",
    "title": "Obsession",
    "video": false,
    "vote_average": 7.9,
    "vote_count": 783
}*/

  movieModal.classList.add("is-open");

  movieModalTitle.textContent = movieDetail.title;
  movieModalDesc.textContent = movieDetail.overview;
  movieModalImg.src = posterUrl;
  // movieModalRelease.textContent = movieDetail.release_date;
  movieModalRelease.textContent = `${movieDetail.release_date} • ${movieDetail.runtime} mins`;
  // movieModalRating.textContent = movieDetail.vote_average;
  movieModalRating.textContent = `⭐ ${movieDetail.vote_average.toFixed(1)}`;
});

closeMovieModalBtn.addEventListener("click", () => {
  movieModal.classList.remove("is-open");
});

function searchFunction() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filteredMovies = allMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchValue),
  );

  displayAllMovies(filteredMovies);

  const filteredSeries = allSeries.filter((series) =>
    series.name.toLowerCase().includes(searchValue),
  );

  displayAllSeries(filteredSeries);
}

function displayAllSeries(series) {
  const mapped = series.map((series) => {
    const baseUrl = "https://image.tmdb.org/t/p/";
    const size = "w500";
    const posterUrl = baseUrl + size + series.poster_path;
    return `
   <div class="card-box" data-id=${series.id}>
          <img src="${posterUrl}" />
          <h3>${series.original_name}</h3>
           <p class="release-date">${series.first_air_date}</p>
          <div class="release-badge">
            <span class="star">&#9733</span>
            <span class="score">${series.vote_average.toFixed(1)}</span>
          </div>
        </div>
  `;
  });

  seriesCont.innerHTML = mapped.join("");
}

async function getAllSeries(id) {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
    options,
  );

  const data = await res.json();
  console.log(data);
 allSeries = [...allSeries, ...data.results];
  displayAllSeries(allSeries);
}

getAllSeries();

async function getSeriesDetails(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
    options,
  );

  const dataDetails = await res.json();

  console.log(dataDetails);
  return dataDetails;
}

seriesCont.addEventListener("click", async function (e) {
  console.log(e.target.parentElement);
  if (
    !e.target.classList.contains("card-box") &&
    !e.target.parentElement.classList.contains("card-box")
  )
    return;

  const seriesId = e.target.dataset.id || e.target.parentElement.dataset.id;
  console.log(seriesId);

  const seriesDetail = await getSeriesDetails(seriesId);

  if (!seriesDetail) return;

  const baseUrl = "https://image.tmdb.org/t/p/";
  const size = "w500";
  const posterUrl = baseUrl + size + seriesDetail.poster_path;

  seriesModal.classList.add("is-open");

  seriesModalTitle.textContent = seriesDetail.name;
  seriesModalDesc.textContent = seriesDetail.overview;
  console.log(seriesModalImg);
  console.log(posterUrl);
  seriesModalImg.src = posterUrl;
  // seriesModalRelease.textContent = seriesDetail.first_air_date;
  seriesModalRelease.textContent = `${seriesDetail.first_air_date} • ${seriesDetail.number_of_seasons} Seasons`;
  // seriesModalRating.textContent = seriesDetail.vote_average;
  seriesModalRating.textContent = `⭐ ${seriesDetail.vote_average.toFixed(1)}`;
});

closeseriesModalBtn.addEventListener("click", () => {
  seriesModal.classList.remove("is-open");
});
