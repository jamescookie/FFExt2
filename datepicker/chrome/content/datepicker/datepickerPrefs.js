function init() {
    @EXTENSION@LanguageVar.loadLanguage();
    @EXTENSION@PreferenceLanguageVar.loadLanguage();
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

    populateLists("weekStart", getIntegerPreferenceValue("weekStart", prefs, 0));
    populateLists("weekend1", getIntegerPreferenceValue("weekend1", prefs, 0));
    populateLists("weekend2", getIntegerPreferenceValue("weekend2", prefs, 6));
    document.getElementById("years1").setAttribute("value", getIntegerPreferenceValue("years1", prefs, 1900));
    document.getElementById("years2").setAttribute("value", getIntegerPreferenceValue("years2", prefs, 2199));
    document.getElementById("showOtherMonths").setAttribute("checked", getBooleanPreferenceValue("showOtherMonths", prefs));
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

function populateLists(listId, selected) {
    var menuItem;
    var menu = document.getElementById(listId);
    var menuPopUp = document.createElement("menupopup");
    menu.appendChild(menuPopUp);
    for (var i = 0; i < 7; i++) {
        menuItem = document.createElement("menuitem");
        menuItem.setAttribute("label", @EXTENSION@LanguageVar._DN[i]);
        menuItem.setAttribute("value", i);
        menuPopUp.appendChild(menuItem);
    }
    menu.selectedIndex = selected;
}

function accept() {
	var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

    // tab 1
    if (document.getElementById("weekend1").selectedIndex == document.getElementById("weekend2").selectedIndex) {
        alert(@EXTENSION@PreferenceLanguageVar._ERROR1);
        return false;
    }

    var years1 = document.getElementById("years1").value;
    var years2 = document.getElementById("years2").value;
    if (isNaN(years1) ||
        isNaN(years2)) {
        alert(@EXTENSION@PreferenceLanguageVar._ERROR2);
        return false;
    }

    var year = new Date().getFullYear();
    var year1 = Math.round(Math.abs(years1));
    var year2 = Math.round(Math.abs(years2));
    if (year1 > year2 ||
        year1 > year ||
        year2 < year) {
        alert(@EXTENSION@PreferenceLanguageVar._ERROR3);
        return false;
    }

    saveDropDownField("weekStart", prefs);
    saveDropDownField("weekend1", prefs);
    saveDropDownField("weekend2", prefs);
    saveIntegerField("years1", prefs);
    saveIntegerField("years2", prefs);
    saveBooleanField("showOtherMonths", prefs);
    saveCharacterField("dateFormat", prefs);
    saveCharacterField("shortDateFormat", prefs);

    // tab 2
    prefs.setCharPref("@EXTENSION@.position", document.getElementById("listOrder").value + " " + document.getElementById("listPanels").value);
    var win = Components.classes["@mozilla.org/appshell/window-mediator;1"].
              getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
    if (win) win.@EXTENSION@Var.setPanelPosition();

    return true;
}

