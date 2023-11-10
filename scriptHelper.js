require('cross-fetch/polyfill');

async function myFetch() {
    let planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json");
    let planetsJson = await planetsReturned.json();
    return planetsJson;
}

function pickPlanet(planets) {
    return planets[Math.floor(Math.random()*planets.length)];
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTargetDiv = document.getElementById("missionTarget");
    missionTargetDiv.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

function validateInput(testInput) {
    // let value = testInput.trim();
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number"; 
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel, event) {
    event.preventDefault();
    const launchStatusDiv = document.getElementById('launchStatus');
    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");
    const fuelStatus = document.getElementById("fuelStatus");
    const cargoStatus = document.getElementById("cargoStatus");
    let readyToLaunch = true;

    // INPUT VALIDATION
    if (validateInput(pilot) === "Empty" || validateInput(pilot) === "Is a Number") {
        alert("Pilot name is missing or invalid.");
        pilotStatus.innerHTML = `Pilot is missing`;
        readyToLaunch = false;
    } else { 
        pilotStatus.innerText = `Pilot ${pilot} is ready for launch`; 
    }

    if (validateInput(copilot) === "Empty" || validateInput(copilot) === "Is a Number") {
        alert("Co-pilot name is missing or invalid.");
        copilotStatus.innerHTML = `Co-pilot is missing`;
        readyToLaunch = false;
    } else { 
        copilotStatus.innerText = `Co-pilot ${copilot} is ready for launch`;
    }

    if (validateInput(fuelLevel) === "Empty" || validateInput(fuelLevel) === "Not a Number") {
        alert("Fuel Level is missing or invalid.");
        readyToLaunch = false;
    }

    if (validateInput(cargoLevel) === "Empty" || validateInput(cargoLevel) === "Not a Number") {
        alert("Cargo Mass is missing or invalid.");
        readyToLaunch = false;
    }

    // CHECK LAUNCH REQUIREMENTS
    if (fuelLevel < 10000) {
        readyToLaunch = false;
        list.style.visibility = "visible";
        fuelStatus.innerText = "Fuel level too low for launch";
        launchStatusDiv.style.color = "red";
        launchStatusDiv.innerHTML = "Shuttle Not Ready for Launch";
    }
    if (cargoLevel > 10000) {
        readyToLaunch = false;
        list.style.visibility = "visible";
        cargoStatus.innerText = "Cargo mass too heavy for launch";
        launchStatusDiv.style.color = "red";
        launchStatusDiv.innerHTML = "Shuttle Not Ready for Launch";
    }
    if (readyToLaunch) {
        list.style.visibility = "visible";
        launchStatusDiv.style.color = "green";
        launchStatusDiv.innerHTML = "Shuttle is Ready for Launch";
    } else {
        list.style.visibility = "visible";
        launchStatusDiv.style.color = "red";
        launchStatusDiv.innerHTML = "Shuttle Not Ready for Launch";
    }
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;