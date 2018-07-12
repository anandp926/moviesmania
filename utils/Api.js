/**
 * Created by rozer on 7/12/2018.
 */

export const search = (movie = '') =>{
    return fetch(`http://www.omdbapi.com/?type=movie&apikey=a1b5f9ec&s=${movie}`)
        .then((res) => res.json())
};

export const movieDetails = (id = '') =>{
    return fetch(`http://www.omdbapi.com/?i=${id}&apikey=a1b5f9ec`)
        .then((res) => res.json())
};
