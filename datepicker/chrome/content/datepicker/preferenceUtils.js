function getCharacterPreferenceValue(fieldName, prefs) {
	return getCharacterPreferenceValueWithDefault(fieldName, prefs, "Unknown");
}

function getCharacterPreferenceValueWithDefault(fieldName, prefs, defaultValue) {
	var tmp;

	if (prefs.getPrefType("@EXTENSION@."+fieldName) == prefs.PREF_STRING){
		tmp = prefs.getCharPref("@EXTENSION@."+fieldName);
	} else {
		tmp = defaultValue;
	}

	return tmp;
}
