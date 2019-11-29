import "../vendor/glide.core.css";
import "../vendor/glide.theme.css";
import "../pages/about.css";
import Glide, { Breakpoints } from '../../node_modules/@glidejs/glide/dist/glide'
import GithubApi from './ghapi.js';
import Commit from './commit.js';

const commitList = document.querySelector('.glide__slides');
const bulletList = document.querySelector('.glide__bullets');
const slider = document.querySelector('.slider_hidden');

function showSlider() {
  slider.classList.remove('slider_hidden');
}

function hideSlider() {
  slider.classList.add('slider_hidden');
}

function starter() {

  return {
    ghApi: new GithubApi()
  }
}

/* Метод. Создаем DOM-элемент булета */
function createBullet() {
  function createElement(elType, classes) {
    const elContainer = document.createElement(elType);
    if (Array.isArray(classes) === true) {
      classes.forEach(element => {
        elContainer.classList.add(element);
      });
    }
    else {
      elContainer.classList.add(classes);
    }
    return elContainer;
  }

  const bullet = createElement('button', ['glide__bullet', 'slider__bullet']);

  return bullet;
}

function addBullet() {
  let bullet = createBullet();
  bulletList.appendChild(bullet);
}

let commits = [];

function getCommitsFromServer() {
  showSlider();
  commits = ghApi.getCommit(commits =>
    {
    for (let i=0; i<3; i++) {
      let commit = commits[i];
      let myCommit = new Commit(commit.commit.author.name, commit.commit.author.email, commit.commit.author.date, commit.commit.message, commit.author.avatar_url);
      commitList.appendChild(myCommit.element);
      addBullet();
    }

    if (commits === [] || commits === null || commits === undefined) {
      hideSlider();
      setTimeout( () => alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз') , 50);
    }
    else {
      new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 3,
        peek: 88,
        focusAt: 0,
        gap: 16,
        breakpoints: {
          1440: {
            type: "carousel",
            perView: 3,
            startAt: 0,
            focusAt: 0,
            gap: 16
          },
          768: {
            type: "slider",
            perView: 2,
            startAt: 0,
            focusAt: 0,
            peek: {
              before: 0,
              after: 70
            },
            gap: 8
          },
          576: {
            type: "slider",
            perView: 1,
            startAt: 0,
            focusAt: 0,
            peek: {
              before: 0,
              after: 32
            },
            gap: 8
          }
        }
      }).mount();
    }

  }, (error) => {
    hideSlider();
    setTimeout( () => alert('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз') , 50);
  });

}

let {ghApi} = starter();
getCommitsFromServer();



