// const { myFetch } = require("./scriptHelper");
// const { addDestinationInfo } = require("./scriptHelper");
// const { formSubmission, pickPlanet } = require("./scriptHelper");

window.addEventListener("load", function() {
    // MISSION DESTINATION
    let listedPlanets, planet;
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        planet = pickPlanet(listedPlanets);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
        
    });

    // LAUNCH FORM
    let list = document.getElementById("faultyItems");
    let form = document.querySelector("form[data-testid=testForm]");
    form.addEventListener("submit", function(event) {
        let pilot = document.getElementById("pilotName").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoMass = document.querySelector("input[name=cargoMass]").value;
        
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
        event.preventDefault();
    });
});