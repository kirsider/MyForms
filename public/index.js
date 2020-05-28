"use strict";

import Home from './views/pages/Home.js';
import SignIn from './views/pages/SignIn.js';
import SignUp from './views/pages/SignUp.js';
import NewForm from './views/pages/NewForm.js';
import Form from './views/pages/Form.js';
import FormResult from './views/pages/FormResult.js';
import Error404 from './views/pages/Error404.js';

import Header from './views/components/Header.js';

import Utils from './services/Utils.js';


const routes = {
    '/': Home,
    '/signin': SignIn,
    '/signup': SignUp,
    '/newform': NewForm,
    '/form/:id': Form,
    '/formresult/:id': FormResult
}

const router = async () => {
    const header = null || document.getElementById('header-content');
    const main_content = null || document.getElementById("main-content");

    header.innerHTML = await Header.render();
    await Header.after_render();

    let request = Utils.parseRequestURL()

    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    console.log(parsedURL)

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    main_content.innerHTML = await page.render();
   
    await page.after_render();
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
