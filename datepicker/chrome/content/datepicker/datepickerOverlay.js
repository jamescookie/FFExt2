
var @EXTENSION@Var = {

    checkLanguageLoaded: function() {
        if (!@EXTENSION@Var.languageLoaded) {
            @EXTENSION@Var.languageLoaded = true;
            @EXTENSION@LanguageVar.loadLanguage();
        }
    },

    refreshDate: function() {
        @EXTENSION@Var.checkLanguageLoaded();
        document.getElementById("statusbar-@EXTENSION@-display").label = new Date().print(getCharacterPreferenceValue("shortDateFormat", Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch), "%d %b"));
    },

    showCalendar: function() {
        @EXTENSION@Var.refreshDate();
        window.openDialog(
            "chrome://@EXTENSION@/content/showCal.xul",
            "_blank",
            "chrome,modal,centerscreen,resizable=no,dependent=yes");
    }
}

window.addEventListener("load", function() {@EXTENSION@Var.refreshDate();}, false);
window.addEventListener("focus", function() {@EXTENSION@Var.refreshDate();}, false);

