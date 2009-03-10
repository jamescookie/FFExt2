var @EXTENSION@PrefUtilsVar = {
    populateLists: function(listId, selected, count, objArray) {
        var menuItem;
        var menu = document.getElementById(listId);
        var menuPopUp = document.createElement("menupopup");
        menu.appendChild(menuPopUp);
        for (var i = 0; i < count; i++) {
            menuItem = document.createElement("menuitem");
            menuItem.setAttribute("label", objArray[i]);
            menuItem.setAttribute("value", i);
            menuPopUp.appendChild(menuItem);
        }
        menu.selectedIndex = selected;
    },

    getCharacterPreferenceValue: function(fieldName, prefs) {
        return this.getCharacterPreferenceValueWithDefault(fieldName, prefs, "Unknown");
    },

    getCharacterPreferenceValueWithDefault: function(fieldName, prefs, defaultValue) {
        var tmp;

        if (prefs.getPrefType("@EXTENSION@."+fieldName) == prefs.PREF_STRING){
            tmp = prefs.getCharPref("@EXTENSION@."+fieldName);
        } else {
            tmp = defaultValue;
        }

        return tmp;
    },

    getIntegerPreferenceValue: function(fieldName, prefs, defaultValue) {
        var tmp;

        if (prefs.getPrefType("@EXTENSION@."+fieldName) == prefs.PREF_INT){
            tmp = prefs.getIntPref("@EXTENSION@."+fieldName);
        } else {
            tmp = defaultValue;
        }

        return tmp;
    },

    saveCharacterField: function(fieldName, prefs) {
        var tmp = document.getElementById(fieldName).value;
        prefs.setCharPref("@EXTENSION@."+fieldName, tmp);
    },

    saveDropDownField: function (fieldName, prefs) {
        var tmp = document.getElementById(fieldName).selectedIndex;
        prefs.setIntPref("@EXTENSION@."+fieldName, tmp);
    }
}
