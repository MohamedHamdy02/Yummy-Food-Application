// ---------JQUERY START---------- //


$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css('overflow' , 'visible')
        })
    
})

function openSideNav() {
    $(".side-nav-menu").animate(
        {
            left: 0,
        },
        500
    );

    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-xmark");

    for (let i = 0; i < 6; i++) {
        $(".nav-links li")
            .eq(i)
            .animate(
                {
                    top: 0,
                },
                (i + 5) * 100
            );
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
    $(".side-nav-menu").animate(
        {
            left: -boxWidth,
        },
        500
    );

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-xmark");

    $(".nav-links li").animate(
        {
            top: 300,
        },
        500
    );
}

closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav();
    } else {
        openSideNav();
    }
});

// ---------JQUERY ENd---------- //

// ---------JAVASCRIPT / SEARCH & DISPLAY START---------- //

const displayData = document.getElementById("displayData");
const searchContainer = document.getElementById("searchContainer");
let submitBtn;

async function searchByName(name) {
    closeSideNav();
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
    $('.inner-loading-screen').fadeOut(300)
}

async function searchByLetter(letter) {
    closeSideNav();
    letter == "" ? (letter = "c") : "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    response = await response.json();
    response.meals ? displayMeals(response.meals) : displayMeals([]);
}

function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent text-white mb-4" placeholder="Search By Name..." name="" id="">
    </div>

    <div class="col-md-6">
        <input onkeyup="searchByLetter(this.value)" maxlength="1" type="text" class="form-control bg-transparent text-white" placeholder="Search By First Letter..." name="" id="">
    </div>`;
    displayData.innerHTML = "";
}

function displayMeals(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
    <div class="col-md-3">
        <div onclick="getMealsDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${arr[i].strMealThumb}">
        <div class="meal-layer position-absolute d-flex justify-content-center align-items-center text-black px-4 text-center">
            <h3>${arr[i].strMeal}</h3>
        </div>
        </div>
    </div>
    `;
    }
    displayData.innerHTML = cartoona;
}

// ---------SEARCH & DISPLAY END---------- //

// ---------CATEGORY START---------- //

async function getCategories() {
    closeSideNav();
    $('.inner-loading-screen').fadeIn(300)
    searchContainer.innerHTML = "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    response = await response.json();
    displayCategories(response.categories);
    $('.inner-loading-screen').fadeOut(300)
}

function displayCategories(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
    <div class="col-md-3">
        <div onclick="getCategoryMeals('${arr[i].strCategory
            }')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${arr[i].strCategoryThumb}">
        <div class="meal-layer position-absolute text-center text-black p-4">
            <h3>${arr[i].strCategory}</h3>
            <p>${arr[i].strCategoryDescription
                .split(" ")
                .slice(0, 19)
                .join(" ")}</p>
        </div>
        </div>
    </div>
    `;
    }
    displayData.innerHTML = cartoona;
}

async function getCategoryMeals(id) {
    closeSideNav();
    $('.inner-loading-screen').fadeIn(300)
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
    );
    response = await response.json();
    displayMeals(response.meals.slice(0, 32));
    $('.inner-loading-screen').fadeOut(300)
}

// ---------CATEGORY END---------- //

// ---------AREA START---------- //

async function getArea() {
    closeSideNav();
    $('.inner-loading-screen').fadeIn(300)
    searchContainer.innerHTML = "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    response = await response.json();
    displayArea(response.meals.slice(0, 24));
    $('.inner-loading-screen').fadeOut(300)
}

function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
    <div class="col-md-3">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fa-city fa-3x mb-3"></i>
            <h3>${arr[i].strArea}</h3>
        </div>
    </div>
    `;
    }
    displayData.innerHTML = cartoona;
}

async function getAreaMeals(id) {
    closeSideNav();
    $('.inner-loading-screen').fadeIn(300)
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`
    );
    response = await response.json();
    displayMeals(response.meals.slice(0, 32));
    $('.inner-loading-screen').fadeOut(300)
}

// ---------AREA END---------- //

// ---------INGREDIENT START---------- //

async function getIngredient() {
    closeSideNav();
    $('.inner-loading-screen').fadeIn(300)
    searchContainer.innerHTML = "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    response = await response.json();
    displayIngredient(response.meals.slice(0, 24));
    $('.inner-loading-screen').fadeOut(300)
}

function displayIngredient(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
    <div onclick="getIngredientsMeals('${arr[i].strIngredient
            }')" class="col-md-3">
        <div class="rounded-2 text-center cursor-pointer">
        <i class="fa-solid fa-bowl-food fa-3x mb-3"></i>
            <h3>${arr[i].strIngredient}</h3>
            <p class="mb-0 px-4">${arr[i].strDescription
                .split(" ")
                .splice(0, 20)
                .join(" ")}</p>
        </div>
    </div>
    `;
    }
    displayData.innerHTML = cartoona;
}

async function getIngredientsMeals(id) {
    closeSideNav();
    $('.inner-loading-screen').fadeIn(300)
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`
    );
    response = await response.json();
    displayMeals(response.meals.slice(0, 32));
    $('.inner-loading-screen').fadeOut(300)
}

// ---------INGREDIENT END---------- //

// ---------MEAL DETAILS START---------- //

async function getMealsDetails(id) {
    closeSideNav();
    $('.inner-loading-screen').fadeIn(300)
    searchContainer.innerHTML = "";
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    response = await response.json();
    displayMealDetails(response.meals[0]);
    $('.inner-loading-screen').fadeOut(300)
}

function displayMealDetails(meal) {
    closeSideNav();
    searchContainer.innerHTML = "";
    let ingredients = ``;

    for (let i = 0; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]
                } ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags?.split(",");
    if (!tags) tags = ["No Tags"];
    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }

    let cartoona = `
    <div class="col-md-4">
    <img class="w-100 rounded-3 mb-3" src="${meal.strMealThumb}">
    <h2 class="text-center">${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h4 class="mb-3">Area : <span class="text-muted"> ${meal.strArea
        }</span></h4>
    <h4 class="mb-3">Category : <span class="text-muted"> ${meal.strCategory
        }</span></h4>
    <h3>Recipes : </h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
    ${ingredients}
    </ul>
    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex ">
    ${tagsStr}
    </ul>
    <a href="${meal.strSource !== null ? meal.strSource : ""
        }" target="_blank" class="btn btn-success mx-2">Source</a>
    <a href="${meal.strYoutube
        }" target="_blank" class="btn btn-danger mx-1">Youtube</a>
        <div class="mt-4 ms-2 "><a class="btn btn-info" href="">Back <i class="fa-solid fa-arrow-left"></i></a></div>
    </div>
    `;
    displayData.innerHTML = cartoona;
}
// ---------MEAL DETAILS END--------- //

// ---------CONTACTS START---------- //

function showContacts() {
    searchContainer.innerHTML = "";
    $('.inner-loading-screen').fadeIn(300)
    displayData.innerHTML = `
    <h3 class="text-center">ContacUs...</h3>

    <div class="col-md-6 mt-3">
    <input onkeyup="inputsValidation()" type="text" class="form-control test" placeholder="Enter Your Name" id="name">
    <div id="nameAlert" class="alert alert-danger w-100 text-center mt-3 d-none">You have to enter a capital letter and at least 3 letters</div>
    </div>

    <div class="col-md-6 mt-3">
    <input onkeyup="inputsValidation()" type="email" class="form-control" placeholder="Enter Your Email" id="email">
    <div id="emailAlert" class="alert alert-danger w-100 text-center mt-3 d-none">Please enter your email adress in format: yourname@example.com</div>
    </div>

    <div class="col-md-6 mt-3">
    <input onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Phone" id="phone">
    <div id="phoneAlert" class="alert alert-danger w-100 text-center mt-3 d-none">Enter valid Phone Number</div>
    </div>

    <div class="col-md-6 mt-3">
    <input onkeyup="inputsValidation()" type="number" class="form-control" placeholder="Enter Your Age" id="age">
    <div id="ageAlert" class="alert alert-danger w-100 text-center mt-3 d-none">Enter valid Age</div>
    </div>

    <div class="col-md-6 mt-3">
    <input onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Enter Your Password" id="password">
    <div id="passwordAlert" class="alert alert-danger w-100 text-center mt-3 d-none">Enter valid password (Minimum eight characters, at least one capital letter and one number)</div>
    </div>

    <div class="col-md-6 mt-3">
    <input onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Re-enter Your Password" id="repassword">
    <div id="repasswordAlert" class="alert alert-danger w-100 text-center mt-3 d-none">Password is not matching</div>
    </div>

    <div class="text-center"><button onclick="searchByName(name)" id="submitBtn" disabled class="btn btn-outline-danger px-2"><a>Submit<a/></ href="#"></div>
    `
    submitBtn = document.getElementById('submitBtn');

    document.getElementById('name').addEventListener('focus' , ()=> {
        nameInput = true
    })

    document.getElementById('email').addEventListener('focus' , ()=> {
        emailInput = true
    })

    document.getElementById('phone').addEventListener('focus' , ()=> {
        phoneInput = true
    })

    document.getElementById('age').addEventListener('focus' , ()=> {
        ageInput = true
    })

    document.getElementById('password').addEventListener('focus' , ()=> {
        passwordInput = true
    })

    document.getElementById('repassword').addEventListener('focus' , ()=> {
        repasswordInput = true
    })
    $('.inner-loading-screen').fadeOut(300)
}

let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;

function inputsValidation() {

    if(nameInput) {
        if(nameValidation()) {
            document.getElementById('nameAlert').classList.replace('d-block','d-none')
            document.getElementById('name').classList.replace('is-invalid','is-valid')
        }else {
            document.getElementById('nameAlert').classList.replace('d-none','d-block')
            document.getElementById('name').classList.add('is-invalid')
        }
    }

    if(emailInput) {
        if(emailValidation()) {
            document.getElementById('emailAlert').classList.replace('d-block','d-none')
            document.getElementById('email').classList.replace('is-invalid','is-valid')
        }else {
            document.getElementById('emailAlert').classList.replace('d-none','d-block')
            document.getElementById('email').classList.add('is-invalid')
        }
    }

    if(phoneInput) {
        if(phoneValidation()) {
            document.getElementById('phoneAlert').classList.replace('d-block','d-none')
            document.getElementById('phone').classList.replace('is-invalid','is-valid')

        }else {
            document.getElementById('phoneAlert').classList.replace('d-none','d-block')
            document.getElementById('phone').classList.add('is-invalid')
        }
    }

    if(ageInput) {
        if(ageValidation()) {
            document.getElementById('ageAlert').classList.replace('d-block','d-none')
            document.getElementById('age').classList.replace('is-invalid','is-valid')

        }else {
            document.getElementById('ageAlert').classList.replace('d-none','d-block')
            document.getElementById('age').classList.add('is-invalid')
        }
    }

    if(passwordInput) {
        if(passwordValidation()) {
            document.getElementById('passwordAlert').classList.replace('d-block','d-none')
            document.getElementById('password').classList.replace('is-invalid','is-valid')

        }else {
            document.getElementById('passwordAlert').classList.replace('d-none','d-block')
            document.getElementById('password').classList.add('is-invalid')
        }
    }

    if(repasswordInput) {
        if(repasswordValidation()) {
            document.getElementById('repasswordAlert').classList.replace('d-block','d-none')
            document.getElementById('repassword').classList.replace('is-invalid','is-valid')

        }else {
            document.getElementById('repasswordAlert').classList.replace('d-none','d-block')
            document.getElementById('repassword').classList.add('is-invalid')
        }
    }

    if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        submitBtn.removeAttribute('disabled')
    } else {
        submitBtn.setAttribute('disabled', true)
    }
}

function nameValidation() {
    return (/^[A-Z][a-z]{4,6}$/.test(document.getElementById('name').value))
}

function emailValidation() {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('email').value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('phone').value))
}

function ageValidation() {
    return (/^(0?[0-9]{2})$/.test(document.getElementById('age').value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(document.getElementById('password').value))
}

function repasswordValidation() {
    return document.getElementById('repassword').value == document.getElementById('password').value
}

// ---------CONTACTS END---------- //
