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
    }
}
