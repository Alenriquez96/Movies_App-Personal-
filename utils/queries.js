//QUERIES

const signUpUserQuery = `INSERT INTO users(name,surname,email,password) VALUES ($1,$2,$3,$4)`
const getUsersQuery = `SELECT * FROM users`    
const deleteMovieQuery = `DELETE FROM movies WHERE movie_id = $1`
// const updateUserPassQuery = ``
const getUsersByEmail = `SELECT * FROM users WHERE email=$1`
const getFavs = `SELECT movie_id FROM movies INNER JOIN users ON users.user_id = movies.user_id WHERE users.email = $1`
const addFavs = `INSERT INTO movies(movie_id, user_id) VALUES ($1, $2)`

const queries = {
signUpUserQuery,
getUsersQuery,
deleteMovieQuery,
getUsersByEmail,
getFavs,
addFavs
}



module.exports = queries;