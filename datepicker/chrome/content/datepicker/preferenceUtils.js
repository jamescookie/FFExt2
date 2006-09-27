function getBooleanPreferenceValue(fieldName, prefs) {
	var tmp;

	if (prefs.getPrefType("@EXTENSION@."+fieldName) == prefs.PREF_BOOL){
		tmp = prefs.getBoolPref("@EXTENSION@."+fieldName);
	} else {
		tmp = false;
	}

	return tmp;
}

function getCharacterPreferenceValue(fieldName, prefs) {
	var tmp;

	if (prefs.getPrefType("@EXTENSION@."+fieldName) == prefs.PREF_STRING){
		tmp = prefs.getCharPref("@EXTENSION@."+fieldName);
	} else {
		tmp = "Unknown";
	}

	return tmp;
}

function getIntegerPreferenceValue(fieldName, prefs, defaultValue) {
	var tmp;

	if (prefs.getPrefType("@EXTENSION@."+fieldName) == prefs.PREF_INT){
		tmp = prefs.getIntPref("@EXTENSION@."+fieldName);
	} else {
		tmp = defaultValue;
	}

	return tmp;
}

function saveCharacterField(fieldName, prefs) {
	var tmp = document.getElementById(fieldName).value;
	prefs.setCharPref("@EXTENSION@."+fieldName, tmp);
}

function saveIntegerField(fieldName, prefs) {
	var tmp = document.getElementById(fieldName).value;
	prefs.setIntPref("@EXTENSION@."+fieldName, tmp);
}

function saveBooleanField(fieldName, prefs) {
	var tmp = document.getElementById(fieldName).checked;
	prefs.setBoolPref("@EXTENSION@."+fieldName, tmp);
}

function saveDropDownField(fieldName, prefs) {
	var tmp = document.getElementById(fieldName).selectedIndex;
	prefs.setIntPref("@EXTENSION@."+fieldName, tmp);
}
