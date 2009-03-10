var @EXTENSION@ShowVar = {
    @EXTENSION@DateFormat: null,
    firstdayofweek: 0,

    init: function() {
        @EXTENSION@LanguageVar.loadLanguage();
        var date = new Date();
        var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        this.@EXTENSION@DateFormat = @EXTENSION@PrefUtilsVar.getCharacterPreferenceValue("dateFormat", prefs, "%d %B %Y");
        this.firstdayofweek = @EXTENSION@PrefUtilsVar.getIntegerPreferenceValue("weekStart", prefs, 0);
        @EXTENSION@PrefUtilsVar.populateLists('month', date.getMonth(), 12, @EXTENSION@LanguageVar._MN);
        document.getElementById('year').value = date.getFullYear();
        this.createNewCalendar(date);
    },

    createNewCalendar: function(date) {
        var cal = document.createElement("datepicker");
        cal.setAttribute('type', 'grid');
        cal.setAttribute('onchange', '@EXTENSION@ShowVar.showDate(this.dateValue)');
        cal.setAttribute('firstdayofweek', this.firstdayofweek);
        cal.setAttribute('id', 'datepicker');
        cal.setAttribute('value', date.@EXTENSION@Print('%Y-%m-%d'));
        document.getElementById("datepickercontainer").appendChild(cal);
        this.showDate(date);
    },

    redisplayCalendar: function(date) {
        var cal = document.getElementById("datepicker");
        document.getElementById("datepickercontainer").removeChild(cal);
        this.createNewCalendar(date);
    },

    today: function() {
        this.redisplayCalendar(new Date());
    },

    changeDate: function() {
        var date = new Date();
        date.setMonth(document.getElementById('month').selectedIndex)
        date.setFullYear(document.getElementById('year').value)
        this.redisplayCalendar(date);
    },

    showDate: function(date) {
        document.getElementById("datebox").value = date.@EXTENSION@Print(this.@EXTENSION@DateFormat);
    }
}

