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
            searchResults = searchByTrait(people);
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
}function findPersonSpouse(person, people){
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