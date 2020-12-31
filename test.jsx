function CreateLayer(compName, layerName, title) {
    app.beginUndoGroup("CreateLayer");
    var newComp = app.project.items.addComp(compName, 1920, 1080, 1, 10, 29.97);
    var newLayer = newComp.layers.addText(title);
    newLayer.name = layerName;
    newLayer.property("position").setValue([100, 200, 0]);;
    // newLayer.position.expression = "wiggle(2, 50)";
    newLayer.opacity.addKey(0);
    newLayer.opacity.addKey(1);
    newLayer.opacity.setValueAtKey(1, 0);
    newLayer.opacity.setValueAtKey(2, 100);
    app.endUndoGroup;
}

var compNames = ["Comp1", "Comp2", "Comp3"];
var layerNames = ["Layer1", "Layer2", "Layer3"];
var titles = ["Title1", "Title2", "Title3"];

for (i = 0; i < compNames.length; i++) {
    CreateLayer(compNames[i], layerNames[i], titles[i]);
}

