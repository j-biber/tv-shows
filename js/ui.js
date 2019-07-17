const $shows = $('.shows');
const $singleShow = $('.single-show');
const $displayShowDetails = $('.show-details');
const $numberOfSeasons = $('.season-number');
const $listOfSeasons = $('.show-seasons ul');
const $cast = $('.show-cast ul');
const $searchResults = $('.search-results ul');


function displayTopShows(listOfShows) {
    listOfShows.forEach(show => {
        const $showCard =
            `<div class="single-show-card card .col-12 .col-lg-3" data-id=${show.id} >
                <a href="#">
                    <img src=${show.image.medium} class="link card-img-top">
                </a>
                <div class="card-body">
                    <a href="#" class="link card-link">${show.title}</a>
                </div>
            </div>`
        $shows.append($showCard);
    });

}

function displaySingleShow(singleShow) {
    const $showPosterAndTitle = `<h1 class="show-title">${singleShow.title}</h1>
    <div class="show-image">
        <img src=${singleShow.image} alt=${singleShow.title}>
    </div>`
    const $showDetails = `<p>${singleShow.details}</p>`

    $singleShow.prepend($showPosterAndTitle);
    $displayShowDetails.append($showDetails);
}

function displaySeasons(seasons) {

    seasons.forEach(season => {
        const $seasonItem = `<li>${season.getData()}</li>`;
        $listOfSeasons.append($seasonItem);
    });

    $numberOfSeasons.append(`(${seasons.length})`);

}

function displayCast(cast) {
    cast.forEach(castMember =>
        $cast.append(`<li>${castMember.name}</li>`));
}

function displaySearchResults(searchList) {
    $searchResults.empty();

    searchList.forEach(searchItem =>
        $searchResults.append(
            `<li class="search-item" data-id=${searchItem.id}>
                <a href="#">${searchItem.title}</a>
            </li>`));
}

export {
    displayTopShows,
    displaySingleShow,
    displaySeasons,
    displayCast,
    displaySearchResults
}