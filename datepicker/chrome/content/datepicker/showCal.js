var @EXTENSION@DateFormat

function init() {
    @EXTENSION@LanguageVar.loadLanguage();
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
//    var cal = new Calendar(getIntegerPreferenceValue("weekStart", prefs, 0),
//            getIntegerPreferenceValue("weekend1", prefs, 0) + "," + getIntegerPreferenceValue("weekend2", prefs, 6));
//    cal.showsOtherMonths = getBooleanPreferenceValue("showOtherMonths", prefs);
//    cal.setRange(getIntegerPreferenceValue("years1", prefs, 1900), getIntegerPreferenceValue("years2", prefs, 2199));
//    cal.setDateFormat(getCharacterPreferenceValue("dateFormat", prefs, "%d %B %Y"));
//    cal.create(document.getElementById("calendarDiv"));
//    cal.callHandler();
    this.@EXTENSION@DateFormat = getCharacterPreferenceValue("dateFormat", prefs, "%d %B %Y");
}

function showDate(aDate) {
    document.getElementById("datebox").value = aDate.print(@EXTENSION@DateFormat);
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

