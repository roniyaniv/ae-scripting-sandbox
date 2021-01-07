// based on tutorial at https://www.youtube.com/watch?v=OUS0PMIwZyE

var project = app.project;
var comp = project.activeItem;

// predefined values
var fontSize = 68;
var fillColor = new Array(1, 1, 1);
var strokeColor = new Array(0, 0, 0);
var font = "TimesNewRomanPSMT";
var effectMatchName = "ADBE Black&White";
var scalePercent = 1.5;

// UI
var palette = new Window("palette", "Batch Processing Tutorial", undefined);
palette.orientation = "column";

var groupOne = palette.add("group", undefined, "groupOne");
groupOne.orientation = "row";
var timeButton = groupOne.add("button", undefined, "T:0");
timeButton.helpTip = "Sets beginning time code of every comp to 0";
var textButton = groupOne.add("button", undefined, "Text Tool");
textButton.helpTip = "Sets every text layer in the selected comp to predefined values";

var groupTwo = palette.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
var effectsButton = groupTwo.add("button", undefined, "Fx");
effectsButton.helpTip = "Adds " + effectMatchName + " to every layer in the selected comp"
var scaleButton = groupTwo.add("button", undefined, "Scale Tool");
scaleButton.helpTip = "Multiplies the scale of every layer in the selected comp by " + scalePercent;


palette.center();
palette.show();

// functionality
timeButton.onClick = function() {
    app.beginUndoGroup("Comp timecodes to 0");
    for (i = 1; i <= project.numItems; i++) {
        if (project.item(i) instanceof CompItem) {
            project.item(i).displayStartTime = 0;
        }
    }
    app.endUndoGroup();
    alert("Completed Successfully!");
};

textButton.onClick = function() {
    app.beginUndoGroup("Change all text layers");
    for (j = 1; j <= comp.numLayers; j++) {
        if (comp.layer(j) instanceof TextLayer) {
            var textProp = comp.layer(j).property("Source Text");
            var textDocument = textProp.value;
            textDocument.resetCharStyle();
            textDocument.font = font;
            textDocument.fontSize = fontSize;
            textDocument.strokeColor = strokeColor;
            textDocument.fillColor = fillColor;
            textProp.setValue(textDocument);
        }
    }
    app.endUndoGroup();
    alert("Changed text successfully");
}

effectsButton.onClick = function() {
    app.beginUndoGroup("Apply effects to layers");
    for (i = 1; i <= comp.numLayers; i++) {
        // See some ways of accessing the effects property here: https://ae-scripting.docsforadobe.dev/properties/propertybase/
        comp.layer(i)("Effects").addProperty(effectMatchName);
    }
    app.endUndoGroup();
    alert("Added effect");
}

scaleButton.onClick = function() {
    app.beginUndoGroup("Apply scaling");
    for (i = 1; i <= comp.numLayers; i++) {
        var curScale = comp.layer(i).property("Scale").value;
        var newScale = curScale * scalePercent;
        comp.layer(i).property("Scale").setValue(newScale);
    }
    app.endUndoGroup();
    alert("Done scaling");
}