
var @EXTENSION@PreferenceLanguageVar = {
    loadLanguage : function() {
        var calBundle = document.getElementById("cal-pref-bundle");
        @EXTENSION@PreferenceLanguageVar._ERROR1 = calBundle.getString("error1");
        @EXTENSION@PreferenceLanguageVar._ERROR2 = calBundle.getString("error2");
        @EXTENSION@PreferenceLanguageVar._ERROR3 = calBundle.getString("error3");
    }
}
