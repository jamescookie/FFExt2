var @EXTENSION@PrefUtilsVar = {
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

    saveDropDownField: function (fieldName, prefs) {
        var tmp = document.getElementById(fieldName).selectedIndex;
        prefs.setIntPref("@EXTENSION@."+fieldName, tmp);
    }
}
