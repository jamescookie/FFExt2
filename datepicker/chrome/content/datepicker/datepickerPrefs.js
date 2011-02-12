var @EXTENSION@PrefsVar = {
    init: function() {
        @EXTENSION@LanguageVar.loadLanguage();
        var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

        @EXTENSION@PrefUtilsVar.populateLists("weekStart", @EXTENSION@PrefUtilsVar.getIntegerPreferenceValue("weekStart", prefs, 0), 7, @EXTENSION@LanguageVar._DN);
        document.getElementById("dateFormat").setAttribute("value", @EXTENSION@PrefUtilsVar.getCharacterPreferenceValue("dateFormat", prefs));
        document.getElementById("shortDateFormat").setAttribute("value", @EXTENSION@PrefUtilsVar.getCharacterPreferenceValue("shortDateFormat", prefs));

        var listOrder = document.getElementById("listOrder");
        var listPanels = document.getElementById("listPanels");
        var myRegExp = new RegExp(" ", "");
        myRegExp.test(@EXTENSION@PrefUtilsVar.getCharacterPreferenceValueWithDefault("position", prefs, ""));
        if (RegExp.leftContext != "") {
            try { listOrder.value = RegExp.leftContext; } catch(ex) { dump(ex + "\n"); }
        }
        if (RegExp.rightContext != "") {
            var addonbar;
            var win = Components.classes["@mozilla.org/appshell/window-mediator;1"].
                      getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
            if (win) addonbar = win.document.getElementById("addon-bar");
            if (!addonbar || (!addonbar.hasChildNodes())) { return; }
            var id;
            var childNodes = addonbar.childNodes;
            var length = 0;
            for (var i=0; i < childNodes.length; i++) {
                id = childNodes[i].getAttribute("id");
                if ((id == "") || (id == "addonbar-@EXTENSION@-display")) { continue; }
                listPanels.appendItem(id, id);
                ++length;
            }
            try { listPanels.value = RegExp.rightContext; } catch(ex) { dump(ex + "\n"); }
            if ((listPanels.selectedIndex < 0) && (length > 0)) {
                listPanels.selectedIndex = length - 1;
            }
        }
    },

    accept: function() {
        var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);

        // tab 1
        @EXTENSION@PrefUtilsVar.saveCharacterField("dateFormat", prefs)
        @EXTENSION@PrefUtilsVar.saveCharacterField("shortDateFormat", prefs)
        @EXTENSION@PrefUtilsVar.saveDropDownField("weekStart", prefs);

        // tab 2
        prefs.setCharPref("@EXTENSION@.position", document.getElementById("listOrder").value + " " + document.getElementById("listPanels").value);
        var win = Components.classes["@mozilla.org/appshell/window-mediator;1"].
                  getService(Components.interfaces.nsIWindowMediator).getMostRecentWindow("navigator:browser");
        if (win) win.@EXTENSION@Var.setPanelPosition();

        return true;
    }
}

