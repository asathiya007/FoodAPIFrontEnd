// by Akshay Sathiya, 06/07/2019

// grab the DOM elements
const fgInput = document.querySelector('#food-group');
const fInput = document.querySelector('#food');
const sendRequestButton = document.querySelector('#send-request');
const outputArea = document.querySelector('#output');
const getFoodsButton = document.querySelector('#get-foods');

// obtain all food groups, put in the first select element
const getFG = new XMLHttpRequest();
const fgUrl = 'http://localhost:8080/foodgroups/';
getFG.open('GET', fgUrl, true);
getFG.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const foodGroups = JSON.parse(getFG.responseText);
        for (i = 0; i < foodGroups.length; i++) {
            const opt = document.createElement('option');
            opt.innerHTML = foodGroups[i].name;
            opt.value = foodGroups[i].id;
            fgInput.appendChild(opt);
        }
    } 
}
getFG.send();

// obtain the food groups, put in the second select element, and show
getFoodsButton.addEventListener('click', (e) => {
    e.preventDefault();
    let foods;
    const getF = new XMLHttpRequest();
    const fUrl = 'http://localhost:8080/foodgroups/' + fgInput.value + '/foods/';
    getF.open('GET', fUrl, true);
    getF.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            foods = JSON.parse(getF.responseText);
            for (j = 0; j < foods.length; j++) {
                const fOpt = document.createElement('option');
                fOpt.innerHTML = foods[j].name;
                fOpt.value = foods[j].id;
                fInput.appendChild(fOpt);
            }
        }
    }
    getF.send();
    fInput.style.visibility = "visible";
    sendRequestButton.style.visibility = "visible";
});

// obtain the data of the food, display in the textarea 
sendRequestButton.addEventListener("click", (e) => {
    e.preventDefault();
    const getData = new XMLHttpRequest();
    const url = 'http://localhost:8080/foodgroups/' + fgInput.value + '/foods/' + fInput.value;
    getData.open('GET', url, true);
    getData.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = JSON.parse(getData.responseText);
            outputArea.value = data;
            console.log(data);
        }
    }
    getData.send();
});

