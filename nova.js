var boardsToMove;

var gamesToOpen = [];

function openGames() {
    var chatAtGamesOpen = localStorage['chatAtGamesOpen'];
    if (chatAtGamesOpen == "true") {
        chrome.tabs.create({url: "https://online-go.com/chat"});
    }

    var open = localStorage['open'];
    if (gamesToOpen.length == 0 || open == null || open == 'summary') {
        chrome.tabs.create({url: "https://online-go.com/"});
        return;
    }

    for (var i = 0; i < gamesToOpen.length; i++) {
        chrome.tabs.create({url: "https://online-go.com/game/" + gamesToOpen[i]});
        if (open == 'firstGame') {
            break;
        }
    }
    
    gamesToOpen = []
    chrome.browserAction.setBadgeText({text: ""});
}

function checkForGames() {
    $.get("https://online-go.com/api/v1/me/notifications", updateAwaitingGames, "json")
}


function updateAwaitingGames(notifications) {
    console.debug(JSON.stringify(notifications));

    var awaitingGamesNo = 0;
    var newGamesToOpen = []
    for(var i = 0; i < notifications.length; i++){
        if(notifications[i].type == 'yourMove'){
            awaitingGamesNo++;
            newGamesToOpen.push(notifications[i].game_id);
        }
    }
    console.debug("awaiting games number: " + awaitingGamesNo);

    var awaitingGamesLabel = awaitingGamesNo > 0 ? "" + awaitingGamesNo : "";
    chrome.browserAction.setBadgeText({text: awaitingGamesLabel});
    gamesToOpen = newGamesToOpen;
}

chrome.browserAction.onClicked.addListener(openGames);

console.info("setting game check interval to 1 minute");
window.setInterval(checkForGames, 60000);

var chatAtStartup = localStorage['chatAtStartup'];
if (chatAtStartup == "true") {
    chrome.tabs.create({url: "https://online-go.com/chat"});
}

// do initial check for games
checkForGames();
console.info("started");
