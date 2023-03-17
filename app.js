let allInputs = document.querySelectorAll('input');
allInputs.forEach(input => {
    input.onfocus = () => {
        input.style.borderColor = 'hsl(213, 96%, 18%)';
    };
    input.onblur = () => {
        input.style.borderColor = 'hsl(229, 24%, 87%)';
    };
});



let stepsNum = document.querySelectorAll('.step-num');
let tabs = document.querySelectorAll('.steps');
let nextBtns = document.querySelectorAll('.steps .next');
let backBtns = document.querySelectorAll('.steps .back');
let currentTab = 0;



nextBtns.forEach(nextBtn => {
    nextBtn.addEventListener('click', () => {
        if (!nameInput.value || !emailInput.value || !phoneInput.value) {
            currentTab = 0;
        } else {
            currentTab++;
            tabsAndSteps();
        }
    });
});
backBtns.forEach(backBtn => {
    backBtn.addEventListener('click', () => {
        currentTab--;
        tabsAndSteps();
    });
});

tabsAndSteps();
function tabsAndSteps() {
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    tabs[currentTab].classList.add('active');
    stepsNum.forEach(stepNum => {
        stepNum.classList.remove('active');
    });
    currentTab < stepsNum.length ? stepsNum[currentTab].classList.add('active') : stepsNum[stepsNum.length - 1].classList.add('active');
}


let nameInput = document.querySelector('.name-input');
let emailInput = document.querySelector('.email-input');
let phoneInput = document.querySelector('.phone-input');
let checkBtn = document.querySelector('.personal-info button');
let nameErr = document.querySelector('.name-err');
let emailErr = document.querySelector('.email-err');
let phoneErr = document.querySelector('.phone-err');


checkBtn.addEventListener('click', formValidation);


function formValidation() {
    let nameRegex = /^[a-z\s]+$/ig;
    let emailRegex = /[a-z0-9]+@[a-z]+\.([a-z]{2,3})/ig;
    let phoneRegex = /^\+?[0-9]+$/g;

    nameInput.value == '' ? fieldRequired(nameInput, nameErr) : !nameRegex.test(nameInput.value) ? wrongFormat(nameInput, nameErr) : validForm(nameInput, nameErr);
    emailInput.value == '' ? fieldRequired(emailInput, emailErr) : !emailRegex.test(emailInput.value) ? wrongFormat(emailInput, emailErr) : validForm(emailInput, emailErr);
    phoneInput.value == '' ? fieldRequired(phoneInput, phoneErr) : !phoneRegex.test(phoneInput.value) ? wrongFormat(phoneInput, phoneErr) : validForm(phoneInput, phoneErr);
};

function fieldRequired(input, error) {
    input.style.borderColor = 'hsl(354, 84%, 57%)';
    error.style.display = 'block';
    error.innerText = 'This field is required';
}

function wrongFormat(input, error) {
    input.style.borderColor = 'hsl(354, 84%, 57%)';
    error.style.display = 'block';
    error.innerText = 'Wrong format';
}

function validForm(input ,error) {
    error.style.display = 'none';
    input.style.borderColor = 'hsl(229, 24%, 87%)';
}



let billingCheckbox = document.querySelector('.billing-checkbox');
let plans = document.querySelectorAll('.plans > div');
let monthlyWord = document.querySelector('.monthly');
let yearlyyWord = document.querySelector('.yearly');

plans.forEach(plan => {
    plan.addEventListener('click', (e) => {
        plans.forEach(plan => {
            plan.classList.remove('active');
        });
        e.target.classList.add('active');
        e.target.tagName == 'IMG' || e.target.tagName == 'DIV' ?
            e.target.parentElement.classList.add('active') :
                e.target.tagName == 'P' ? e.target.parentElement.parentElement.classList.add('active') :
                    e.target.classList.add('active');
    });
});



billingCheckbox.addEventListener('click', changePlan);

changePlan();
function changePlan() {
    plans.forEach(plan => {
        let price = plan.querySelector('.price');
        let free = plan.querySelector('.free');
        let monthlyPrice = `$${price.innerText.split('').filter(Number).join('')}/mo`;
        let yearlyPrice = `$${price.innerText.split('').filter(Number).join('') * 10}/yr`;

        if (billingCheckbox.checked) {
            price.innerText = yearlyPrice;
            yearlyyWord.classList.add('active');
            monthlyWord.classList.remove('active');
            free.style.display = 'block';
        } else {
            price.innerText = monthlyPrice;
            monthlyWord.classList.add('active');
            yearlyyWord.classList.remove('active');
            free.style.display = 'none';
        }
    });
}



let picks = document.querySelectorAll('.picks > div');

picks.forEach(pick => {
    let checkbox = pick.querySelector('.pick-ons');
    pick.addEventListener('click', () => {
        if (!pick.classList.contains('active')) {
            pick.classList.add('active');
            checkbox.checked = true;
        } else {
            pick.classList.remove('active');
            checkbox.checked = false;
        }
    });
});



billingCheckbox.addEventListener('click', picksMode);

picksMode();
function picksMode() {
    picks.forEach(pick => {
        let pickPrice = pick.querySelector('.pick-price');
        let checkbox = pick.querySelector('.pick-ons');
        
        let pickPriceMonthly = pickPrice.innerText.split('').filter(Number).join('');
        let pickPriceYearly = (pickPrice.innerText.split('').filter(Number).join('') * 10);
        if (billingCheckbox.checked) {
            pickPrice.innerText = `$${pickPriceYearly}/yr`;
            pick.classList.remove('active');
            checkbox.checked = false;
        } else {
            pickPrice.innerText = `$${pickPriceMonthly}/mo`;
            pick.classList.remove('active');
            checkbox.checked = false;
        }
    });
}


let planName = document.querySelector('.plan-name');
let pickPriceFinal = document.querySelector('.pick-price-final');
let changePlanBtn = document.querySelector('.change-plan');


finishing();
function finishing() {
    plans.forEach(plan => {
        plan.addEventListener('click', () => {
            finalPLanName();
        });
        billingCheckbox.addEventListener('click', () => { 
            finalPLanName();
        })
    });

}


finalPLanName();
function finalPLanName() {
    let planText = document.querySelector('.plans > div.active').children[1].children[0].innerText;
    let planFinalPrice = document.querySelector('.plans > div.active').children[1].children[1].innerText;
    planName.innerText = `${planText} (monthly)`;
    pickPriceFinal.innerText = planFinalPrice;
    billingCheckbox.checked ? planName.innerText = `${planText} (yearly)` : planName.innerText = `${planText} (monthly)`;
};


changePlanBtn.addEventListener('click', (e) => {
    e.preventDefault();
    currentTab = currentTab - 2;
    tabsAndSteps();
});


let servicesContainer = document.querySelector('.ons');
let totalText = document.querySelector('.total-text');
let totalPrice = document.querySelector('.total');


pickOns();
function pickOns() {
    picks.forEach(pick => {
        pick.addEventListener('click', () => {
            picksTextsDeal(pick);
        });
    });
    totalText.innerText = 'Total (per month)';
    billingCheckbox.addEventListener('click', () => {
        billingCheckbox.checked ? totalText.innerText = 'Total (per year)' : totalText.innerText = 'Total (per month)';
    });
}


function picksTextsDeal(pick) {
    let pickPrice = pick.children[1].children[1].innerText;
    let pickName = pick.children[1].children[0].children[0].innerText;
    let checkbox = pick.querySelector('.pick-ons');
    let services = document.createElement('div');
    let servicesContent = ` <p class="on-name">${pickName}</p> <div class="on-price">${pickPrice}</div>`;
    services.innerHTML = servicesContent;
    let priceMonthly = pickPrice.split('').filter(Number).join('');
    let priceYearly = (pickPrice.split('').filter(Number).join('') * 10);
    if (checkbox.checked) {
        billingCheckbox.addEventListener('click', () => {
            services.remove();
            billingCheckbox.checked ? pickPrice = `$${priceYearly}/yr` : pickPrice = `$${priceMonthly}/mo`;
        });
        servicesContainer.appendChild(services);
    }
    pick.addEventListener('click', () => {
        services.remove();
    });
}


document.querySelector('.pick .next').addEventListener('click', () => {
    let pricesArr = [];
    let planPrice = eval(document.querySelector('.plans > div.active').children[1].children[1].innerText.split('').filter(Number).join(''));
    pricesArr.push(planPrice);

    picks.forEach(pick => {
        let servicePrices = eval(pick.children[1].children[1].innerText.split('').filter(Number).join(''));
        if (pick.classList.contains('active')) {
            pricesArr.push(servicePrices);
        }
    });
    let totalPrices = pricesArr.reduce((total, arg) => total + arg, 0);
    
    if (totalText.innerText == 'Total (per year)') {
        totalPrice.innerText = `$${totalPrices * 10}/yr`;
    } else {
        totalPrice.innerText = `$${totalPrices}/mo`;
    }
});



let confirmBtn = document.querySelector('.finishing .confirm');

confirmBtn.addEventListener('click', () => {
    currentTab++;
    tabsAndSteps();
});