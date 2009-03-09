var @EXTENSION@ShowVar = {
    @EXTENSION@DateFormat: null,
    firstdayofweek: 0,

    init: function() {
        @EXTENSION@LanguageVar.loadLanguage();
        var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        this.@EXTENSION@DateFormat = @EXTENSION@PrefUtilsVar.getCharacterPreferenceValue("dateFormat", prefs, "%d %B %Y");
        this.firstdayofweek = @EXTENSION@PrefUtilsVar.getIntegerPreferenceValue("weekStart", prefs, 0);
        this.createNewCalendar();
    },

    createNewCalendar: function() {
        var cal = document.createElement("datepicker");
        cal.setAttribute('type', 'grid');
        cal.setAttribute('onchange', '@EXTENSION@ShowVar.showDate(this.dateValue)');
        cal.setAttribute('firstdayofweek', this.firstdayofweek);
        cal.setAttribute('id', 'datepicker');
        document.getElementById("datepickercontainer").appendChild(cal);
        this.showDate(new Date());
    },

    today: function() {
        var cal = document.getElementById("datepicker");
        document.getElementById("datepickercontainer").removeChild(cal);
        this.createNewCalendar();
    },

    showDate: function(aDate) {
        document.getElementById("datebox").value = aDate.@EXTENSION@Print(this.@EXTENSION@DateFormat);
    }
}

