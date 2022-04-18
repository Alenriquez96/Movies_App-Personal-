const fetch = require("node-fetch")


const getFilmsByTitle = async (title) => {
  try {
    let response = await fetch(`${process.env.GET_FILMS_URL}${process.env.API_KEY_MOVIES}/${title}`);//{}
    let films = await response.json();//{}
    return films;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
}

const getFilmInfo = async (id) => {
  try {
    let response = await fetch(`${process.env.GET_INFO_URL}${process.env.API_KEY_MOVIES}/${id}`);//{}
    let filmInfo = await response.json();//{}
    return filmInfo;
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    return [];
  }
}

const films = {
  getFilmsByTitle,
  getFilmInfo
}

module.exports = films;