var win = new Window("dialog", "Add Title and Cut", undefined, { closeButton: true, resizeable: true });
// see https://javascript-tools-guide.readthedocs.io/user-interface-tools/scriptui-programming-model.html#creating-a-window for an explanation about the different types of windows.

var okButton = win.add("button", undefined, "OK");
var cancelButton = win.add("button", undefined, "Cancel");
win.show()