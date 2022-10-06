// Imports

import fetchFollowers from './fetchFollower.js';
import displayFollowers from './displayFollowers.js';
import paginate from './paginate.js';
import displayButtons from './displayButton.js';


const title = document.querySelector('.section-title h1');
const btnContainer = document.querySelector('.btn-container');

let index = 0
let pages = []

const setupUI = () => {
    displayFollowers(pages[index])
    displayButtons(btnContainer, pages, index)
}

const init = async () => {
    try {
        const followers = await fetchFollowers();
        title.textContent = 'pagination';
        pages = paginate(followers);
        setupUI();
    } catch (err) {
        title.style.fontSize = `${1.1}rem`;
        title.textContent = `${err} your request, please check your internet connection`;
    }
}

btnContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-container')) return
    if (e.target.classList.contains('page-btn')) {
        index = parseInt(e.target.dataset.index)
    }
    if (e.target.classList.contains('next-btn')) {
        index++
        if (index > pages.length - 1) {
            index = 0
        }
    }
    if (e.target.classList.contains('prev-btn')) {
        index--
        if (index < 0) {
            index = pages.length - 1
        }
    }
    setupUI()
})

window.addEventListener('load', init);