var @EXTENSION@DateFormat

function init() {
    @EXTENSION@LanguageVar.loadLanguage();
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    this.@EXTENSION@DateFormat = getCharacterPreferenceValue("dateFormat", prefs, "%d %B %Y");
    showDate(new Date());
}

function showDate(aDate) {
    document.getElementById("datebox").value = aDate.@EXTENSION@Print(@EXTENSION@DateFormat);
}

