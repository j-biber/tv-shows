import * as data from './data.js';
import * as ui from './ui.js';

function init() {
    data.getShows(onSuccessHomePage);
    setupEventListenersSearchInput();
}

function initSinglePage() {
    const showId = localStorage.getItem('id');
    data.getSingleShow(showId, onSuccessSingleShow);
    data.getSeasons(showId, onSuccessSeasons);
    data.getCast(showId, onSuccessCast);
    setupEventListenersSearchInput();
}

function setupEventListenersSearchInput() {
    $('input').on('keyup', onKeyPressHandler);
}

function onKeyPressHandler() {
    const query = $('input').val();
    console.log(query)
    data.searchShows(query, onSuccessSearch);

}

function setupEventListenersCards() {
    $('.single-show-card').each(function (index, element) {
        element.onclick = function (event) {
            if ($(event.target).hasClass('link')) {
                localStorage.setItem('id', element.dataset.id);
                window.location.href = './show-page.html';
            }
        };
    });
}

function setupEventListenersSearchItems() {
    $('.search-item').each(function (index, element) {
        element.onclick = function (event) {
            localStorage.setItem('id', element.dataset.id);
            window.location.href = './show-page.html';
        };
    });
}

function onSuccessHomePage(shows) {
    ui.displayTopShows(shows);
    setupEventListenersCards();
}

function onSuccessSingleShow(show) {
    ui.displaySingleShow(show);
}

function onSuccessSeasons(seasons) {
    ui.displaySeasons(seasons);
}

function onSuccessCast(cast) {
    ui.displayCast(cast);
}

function onSuccessSearch(searchList) {
    ui.displaySearchResults(searchList);
    setupEventListenersSearchItems();
}

export {
    init,
    initSinglePage
}