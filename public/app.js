var main = function() {
        initialRequest();

};

var initialRequest = function() {
    var url = 'https://restcountries.eu/rest/v1';
    var request = new XMLHttpRequest();

    // console.log(request);
    request.open("GET", url);
    request.onload = function() {
        if(request.status === 200){
            console.log("got the data");
            var jsonString = request.responseText;
            var countries = JSON.parse( jsonString );
            // var country = countries[0];
            // console.log(country);
            // console.log(country.nativeName);
            // console.log(countries[0].name);
            createContent(countries);
            // var myMenu = document.getElementById('country-content');
            // myMenu.onchange = menuChange();
        }
    };
    request.send(null);

};

var createContent = function(countries) {
    var countriesForm = document.createElement('form');
    countriesForm.setAttribute( 'id', 'countries-form');

    var countriesLabel = document.createElement('label');
    countriesLabel.setAttribute( 'id', 'countries-dropdown');
    countriesLabel.innerText = "Choose a country:  ";

    var countriesSelect = document.createElement('select');
    countriesSelect.setAttribute( 'id', 'country-content');

    countriesSelect.onchange = menuChange;

    var formish = document.getElementById('formish');

    countriesLabel.appendChild(countriesSelect);
    countriesForm.appendChild(countriesLabel);
    formish.appendChild(countriesForm);

    for(var country in countries){

        var object = countries[country];

        makeDropDown( object );
    }
    createCountryInfo( countries[0]);
};

var makeDropDown = function( object ) {
    // console.log(object);
    var countriesOption = document.createElement('option');

    countriesOption.text = object.nativeName;
    countriesOption.setAttribute( 'class', 'countryClass' );
    newObject = JSON.stringify(object);
    countriesOption.setAttribute( 'value', newObject );

    var countriesSelect = document.getElementById('country-content');

    countriesSelect.appendChild(countriesOption);

};

var menuChange = function(event) {
    // console.log(event);

    var select = document.getElementById('country-content');

    console.log(select);

    object = select.options[select.selectedIndex].value;

    thisObject = JSON.parse(object);

    // console.log(thisObject);

    newCountryInfo(thisObject);
};

var createCountryInfo = function( country ) {
    var li1 = document.createElement( 'li' );
    li1.setAttribute( 'id', 'li1' );
    li1.innerText = "Country: " + country.nativeName;

    var li2 = document.createElement( 'li' );
    li2.setAttribute( 'id', 'li2' );
    li2.innerText = "Population: " + country.population;

    var li3 = document.createElement( 'li' );
    li3.setAttribute( 'id', 'li3' );
    li3.innerText = "Capital: " + country.capital;
    // console.log( li );

    var ul = document.getElementById('country-list');

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
};

var newCountryInfo = function( country ) {
    var li1 = document.getElementById( 'li1' );
    li1.innerText = "Country: " + country.nativeName;

    var li2 = document.getElementById( 'li2' );
    li2.innerText = "Population: " + country.population;

    var li3 = document.getElementById( 'li3' );
    li3.innerText = "Capital: " + country.capital;
    // console.log( li );

    var ul = document.getElementById('country-list');

    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    var jcountry = JSON.stringify( country );
    localStorage.setItem( 'thiscountry', jcountry );

    console.log(jcountry);
};

// <label for="size">Select your size:</label>
// <select name="size">
//   <option value= "7">7</option>
//   <option value= "8">8</option>
//   <option value= "9">9</option>
//   <option value= "10">10</option>
//   <option value= "11">11</option>
// </select><br>








window.onload = main;
