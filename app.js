/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            // searchResults = searchByNumberOfTraits(people);
            alert(searchResults);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual. Please check your spelling and try again.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            // alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = displayFam(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = displayPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        case "test":
            //Test functions at bottom of the page.
            console.log('This is test!');
            break;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
//Developing a findPersonFamily function

function findPersonSpouse(person, people){
    let spouseList = people.filter(function(el){
        if (el.currentSpouse === person.id) {
            return true;
        }
        else{
            return false;
        }});
    return spouseList;
}

function findPersonParents(person, people){
    let parentList = people.filter(function(el){
        if (person.parents.length > 0 && person.parents.includes(el.id)) {
            return true;
        }
        else{
            return false;
        }});
    return parentList;
}

function findPersonSiblings(person, people){
    let siblingList = people.filter(function(el){
        if (person !== el) {
        if (person.parents.length > 0 && person.parents.toString() === el.parents.toString()) {
            return true;
        }
        else{
            return false;
        }}});
    return siblingList;
}

function displayFam(person, people){
    let spouse = findPersonSpouse(person, people);
    let parents = findPersonParents(person, people);
    let siblings = findPersonSiblings(person,people);
    let spouseMap = spouse.map(function(el){
        return `${person.firstName}'s spouse is ${el.firstName} ${el.lastName}.\n`;
    });
    let parentsMap = parents.map(function(el){
        return `One of their parents is ${el.firstName} ${el.lastName}.\n`;
    });
    let sibsMap = siblings.map(function(el){
        return `One of their siblings is ${el.firstName} ${el.lastName}.\n`;
    });
    return spouseMap + parentsMap + sibsMap;
}

function findPersonDescendants(person, people){
    let descendantList = people.filter(function(el){
        if (el.parents.includes(person.id)) {
            return true;
        }
        else{
            return false;
        }});
    return descendantList;
}

function displayPersonDescendants(person, people){
    let descendants = findPersonDescendants(person,people);
    let descendantsMap = descendants.map(function(el){
        return `One of their descendants is ${el.firstName} ${el.lastName}.\n`;
    });
    return descendantsMap;      
}

function searchByTraits(people){
    let numOfTraits = prompt("How many traits do you know? Enter 'one' or 'more than one'").toLowerCase();
    if (numOfTraits === 'one' || numOfTraits === 'more than one') {
        if (numOfTraits === 'one') {
            searchByTraitsIfOne(people);
        } else {
            searchByTraitsIfMoreThanOne(people);
        }
        return searchByTraitsIfOne(people);
    } else {
        searchByTraits(people);
    }
}

function searchByTraitsIfOne(people) {
    let soleTrait = prompt("What trait do you know about them?\n Do you know their gender, dob, height, weight, or eye color?", chars).toLowerCase();
    switch (soleTrait){
        case "gender":
            break;
        case "dob":
            break;
        case "height":
            break;
        case "weight":
            break;
        case "eye color":
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            searchByTraitsIfOne(people);
            break;
    }
    let searchTrait = prompt(`What is the value for ${soleTrait}`);
    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.soleTrait === searchTrait) {
            return true;
        }
    });
    return foundPerson;
}

function findPerson(){

}

function searchByTraitsIfMoreThanOne(people) {
    let firstTrait = promptFor("What is the trait?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName.toLowerCase() === firstName.toLowerCase() && person.lastName.toLowerCase() === lastName.toLowerCase()) {
            return true;
        }
    });
    return foundPerson;
}

function recursiveFindTraits(obj, array = [0]) {
    let subArray = obj.subsidiaries;
    array = [obj];
    //Base case -- Terminating Condition (end of branch)
    if (subArray.length === 0) {
        return array;
    }
    //Recrusive Case -- Branch has sub-branches, search continues
    for (let i = 0; i < subArray.length; i++) {
        array = array.concat(
            recursiveFindTraits(subArray[i])
        );
    }
    return array;
}
