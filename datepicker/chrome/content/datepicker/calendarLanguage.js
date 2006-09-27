
var @EXTENSION@LanguageVar = {
    loadLanguage : function() {
        var calBundle = document.getElementById("cal-bundle");
        @EXTENSION@LanguageVar._DN = calBundle.getString("listWeekdays").split(",");
        @EXTENSION@LanguageVar._SDN = calBundle.getString("listWeekdaysAbbr").split(",");
        @EXTENSION@LanguageVar._MN = calBundle.getString("listMonths").split(",");
        @EXTENSION@LanguageVar._SMN = calBundle.getString("listMonthsAbbr").split(",");
        @EXTENSION@LanguageVar._HA = calBundle.getString("helpAbout");
    }
}
