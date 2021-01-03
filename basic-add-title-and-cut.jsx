// TODO: change this script to a command line script

// For this to work, you need to have the app active and a comp selected
var mainComp = app.project.activeItem;
var mainLayer = mainComp.layer(1);

var dlg = new Window("dialog", "Add Title and Cut", undefined, { resizeable: true });

// We are creating two UI element groups: one for input, one for main buttons

// Group ONE of UI elements
var groupOne = dlg.add("group", undefined, "groupOne");
groupOne.orientation = "column";

groupOne.add("statictext", undefined, "This script allows you to add a title and cut your video.");
var titleName = groupOne.add("edittext", undefined, "Title of Video");

var titleDurationLbl = groupOne.add("statictext", undefined, "Duration of Title");
var titleDuration = groupOne.add("edittext", undefined, "Duration of Title");

var cutOneLbl = groupOne.add("statictext", undefined, "Cut Point 1");
var cutOne = groupOne.add("edittext", undefined, "Cut Point 1");

var cutTwoLbl = groupOne.add("statictext", undefined, "Cut Point 2");
var cutTwo = groupOne.add("edittext", undefined, "Cut Point 2");

// Group TWO of UI elements
var groupTwo = dlg.add("group", undefined, "Buttons");
groupTwo.orientation = "row";

var startButton = groupTwo.add("button", undefined, "Start");
var cancelButton = groupTwo.add("button", undefined, "Cancel");

startButton.onClick = function () {
    // validate inputs are numbers
    inputsToCheck = [titleDuration, cutOne, cutTwo];
    inputsLabels = [titleDurationLbl, cutOneLbl, cutTwoLbl]
    for (i in inputsToCheck) {
        if (isNaN(inputsToCheck[i].text)) {
            alert("Please input a number for " + inputsLabels[i].text);
            return false;
        }
    }
    app.beginUndoGroup("Tutorial");
    doStuff();
}

cancelButton.onClick = function () {
    dlg.close();
}

function doStuff() {
    var compDuration = mainComp.duration;
    var titleSeconds = parseInt(titleDuration.text);
    var cutOneSeconds = parseInt(cutOne.text);
    var cutTwoSeconds = parseInt(cutTwo.text);

    var titleText = mainComp.layers.addText(titleName.text);
    titleText.outPoint = titleSeconds;

    var middleLayer = mainLayer.duplicate();
    var topLayer = middleLayer.duplicate();

    mainLayer.outPoint = cutOneSeconds;
    middleLayer.inPoint = cutOneSeconds;
    middleLayer.outPoint = cutTwoSeconds;
    topLayer.inPoint = cutTwoSeconds;
    topLayer.outPoint = compDuration;

    dlg.close();
    app.endUndoGroup();

}

dlg.show();
dlg.center();
