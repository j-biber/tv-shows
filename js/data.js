import Show from './entites/Show.js'
import Season from './entites/Seasons.js'
import Cast from './entites/Cast.js'

const SHOW_API = 'http://api.tvmaze.com/shows';

function getShows(onSuccess) {
    fetch(SHOW_API)
        .then(function (response) {
            return response.json()
        })
        .then(function (shows) {
            const topRatedShows = sortShows(shows).slice(0, 50);
            const ourShows = topRatedShows.map(show => {
                const { name, image, id, summary } = show;

                return new Show(name, image, id, summary);
            })
            onSuccess(ourShows);
        })
        .catch(function (error) {
            console.log(error);
        });
}


function sortShows(listOfShows) {
    const newList = [...listOfShows];
    return newList.sort((show1, show2) =>
        show2.rating.average - show1.rating.average
    );
}


function getSingleShow(id, onSuccess) {
    fetch(`${SHOW_API}/${id}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            const singleShow = new Show(response.name, response.image.original, response.id, response.summary)
            onSuccess(singleShow);
        })
        .catch(function (error) {
            console.log(error);
        });
}


function getSeasons(id, onSuccess) {

    fetch(`${SHOW_API}/${id}/seasons`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const seasons = response.map(season => new Season(season.premiereDate, season.endDate))


            onSuccess(seasons);
        })
        .catch(function (error) {
            console.log(error);
        });
}


function getCast(id, onSuccess) {
    fetch(`${SHOW_API}/${id}/cast`)
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            const cast = response.map(castMember => new Cast(castMember.person.name))

            onSuccess(cast);
        })
        .catch(function (error) {
            console.log(error);
        });
}


function searchShows(query, onSuccess) {

    fetch(` http://api.tvmaze.com/search/shows?q=${query}`)
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            const ourResponse = [...response];
            ourResponse.slice(0, 10);

            const searchList = ourResponse.map(searchItem => {
                const id = searchItem.show.id;
                const title = searchItem.show.name;

                return { id, title }
            })

            onSuccess(searchList);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export {
    getShows,
    getSingleShow,
    getSeasons,
    getCast,
    searchShows
}