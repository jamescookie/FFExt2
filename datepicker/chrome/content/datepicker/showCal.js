var @EXTENSION@ShowVar = {
    @EXTENSION@DateFormat: null,

    init: function() {
        @EXTENSION@LanguageVar.loadLanguage();
        var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        this.@EXTENSION@DateFormat = @EXTENSION@PrefUtilsVar.getCharacterPreferenceValue("dateFormat", prefs, "%d %B %Y");
        this.showDate(new Date());
    },

    showDate: function(aDate) {
        document.getElementById("datebox").value = aDate.@EXTENSION@Print(this.@EXTENSION@DateFormat);
    }
}

