
var @EXTENSION@Var = {

    checkLanguageLoaded: function() {
        if (!@EXTENSION@Var.languageLoaded) {
            @EXTENSION@Var.languageLoaded = true;
            @EXTENSION@LanguageVar.loadLanguage();
        }
    },

    refreshDate: function() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth();
        @EXTENSION@Var.checkLanguageLoaded();
        document.getElementById("statusbar-@EXTENSION@-display").label = day + " " + @EXTENSION@LanguageVar._SMN[month];
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

