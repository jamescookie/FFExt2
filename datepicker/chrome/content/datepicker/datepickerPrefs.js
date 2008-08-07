function init() {
    @EXTENSION@LanguageVar.loadLanguage();
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

    document.getElementById("dateFormat").setAttribute("value", getCharacterPreferenceValue("dateFormat", prefs));
    document.getElementById("shortDateFormat").setAttribute("value", getCharacterPreferenceValue("shortDateFormat", prefs));

    var listOrder = document.getElementById("listOrder");
    var listPanels = document.getElementById("listPanels");
    var myRegExp = new RegExp(" ", "");
    myRegExp.test(getCharacterPreferenceValueWithDefault("position", prefs, ""));
    if (RegExp.leftContext != "") {
        try { listOrder.value = RegExp.leftContext; } catch(ex) { dump(ex + "\n"); }
    }
    if (RegExp.rightContext != "") {
        var statusbar;
        var win = Components.classes["@mozilla.org/appshell/window-mediator;1"].
                  getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
        if (win) statusbar = win.document.getElementById("status-bar");
        if (!statusbar || (!statusbar.hasChildNodes())) { return; }
        var id;
        var childNodes = statusbar.childNodes;
        var length = 0;
        for (var i=0; i < childNodes.length; i++) {
            id = childNodes[i].getAttribute("id");
            if ((id == "") || (id == "statusbar-@EXTENSION@-display")) { continue; }
            listPanels.appendItem(id, id);
            ++length;
        }
        try { listPanels.value = RegExp.rightContext; } catch(ex) { dump(ex + "\n"); }
        if ((listPanels.selectedIndex < 0) && (length > 0)) {
            listPanels.selectedIndex = length - 1;
        }
    }
}

function accept() {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

    // tab 1
    prefs.setCharPref("@EXTENSION@.dateFormat", document.getElementById("dateFormat").value);
    prefs.setCharPref("@EXTENSION@.shortDateFormat", document.getElementById("shortDateFormat").value);

    // tab 2
    prefs.setCharPref("@EXTENSION@.position", document.getElementById("listOrder").value + " " + document.getElementById("listPanels").value);
    var win = Components.classes["@mozilla.org/appshell/window-mediator;1"].
              getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
    if (win) win.@EXTENSION@Var.setPanelPosition();

    return true;
}

