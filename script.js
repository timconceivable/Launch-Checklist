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
    const list = document.getElementById("faultyItems");
    const submitForm = document.querySelector("form[data-testid=testForm]");
    submitForm.addEventListener("submit", function(event) {
        const pilot = document.getElementById("pilotName").value;
        const copilot = document.querySelector("input[name=copilotName]").value;
        const fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        const cargoMass = document.querySelector("input[name=cargoMass]").value;
        
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass);
        event.preventDefault();
    });
});