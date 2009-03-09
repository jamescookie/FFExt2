
var @EXTENSION@Var = {
    ticker: null,
    languageLoaded: false,
    windowHandle: null,

    checkLanguageLoaded: function() {
        if (!this.languageLoaded) {
            this.languageLoaded = true;
            @EXTENSION@LanguageVar.loadLanguage();
        }
    },

    setPanelPosition: function() {
        try {
            var position = @EXTENSION@PrefUtilsVar.getCharacterPreferenceValueWithDefault("position", Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch), "");
            var myRegExp = new RegExp(" ", "");
            if (myRegExp.test(position) && (RegExp.rightContext != "")) {
                var statusbar = document.getElementById("status-bar");
                var myPanel = document.getElementById("statusbar-@EXTENSION@-display");
                var panels = statusbar.getElementsByAttribute("id", RegExp.rightContext);
                if (panels.length > 0) {
                    if (RegExp.leftContext == "before") {
                        statusbar.removeChild(myPanel);
                        statusbar.insertBefore(myPanel, panels[0]);
                    } else if (RegExp.leftContext == "after") {
                        statusbar.removeChild(myPanel);
                        statusbar.insertBefore(myPanel, panels[0].nextSibling);
                    }
                }
            }
        } catch(ex) { dump(ex + "\n"); }
    },

    init: function() {
        this.setPanelPosition();
        this.setDefaultPreferences();
        this.refreshDate();
    },

    setDefaultPreferences: function() {
        this.checkLanguageLoaded();
        var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref("@EXTENSION@.dateFormat", @EXTENSION@PrefUtilsVar.getCharacterPreferenceValueWithDefault("dateFormat", prefs, @EXTENSION@LanguageVar.dateFormat));
        prefs.setCharPref("@EXTENSION@.shortDateFormat", @EXTENSION@PrefUtilsVar.getCharacterPreferenceValueWithDefault("shortDateFormat", prefs, @EXTENSION@LanguageVar.shortDateFormat));
        prefs.setIntPref("@EXTENSION@.weekStart", @EXTENSION@PrefUtilsVar.getIntegerPreferenceValue("weekStart", prefs, @EXTENSION@LanguageVar.weekStart));
    },

    removeTicker: function() {
        try { window.clearInterval(this.ticker); } catch(ex) {}
    },

    refreshDate: function() {
        this.removeTicker();
        this.checkLanguageLoaded();
        this.updateDate();
        this.ticker = window.setInterval(Refresh@EXTENSION@Function, @EXTENSION@Var.getInterval());
    },

    getInterval: function() {
        var sdf = @EXTENSION@Var.getShortDateFormat()
        if (sdf.indexOf('%s') > -1 || sdf.indexOf('%S') > -1) {
            return 200;
        } else if (sdf.indexOf('%M') > -1) {
            return 10000;
        } else {
            return 50000;
        }
    },

    updateDate: function() {
        document.getElementById("statusbar-@EXTENSION@-display").setAttribute("label", new Date().@EXTENSION@Print(@EXTENSION@Var.getShortDateFormat()));
    },

    getShortDateFormat: function() {
        return @EXTENSION@PrefUtilsVar.getCharacterPreferenceValueWithDefault("shortDateFormat", Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch), "%d %b");
    },

    showCalendar: function(event) {
        if (event.button == 0) {
            if (@EXTENSION@Var.windowHandle == null || @EXTENSION@Var.windowHandle.closed) {
                @EXTENSION@Var.windowHandle = window.openDialog(
                    "chrome://@EXTENSION@/content/showCal.xul",
                    "_@EXTENSION@",
                    "chrome,centerscreen,resizable=no");
            } else {
                @EXTENSION@Var.windowHandle.focus();
            }
        }
    },

    showOptions: function() {
        window.openDialog(
                "chrome://@EXTENSION@/content/@EXTENSION@Prefs.xul",
                "_@EXTENSION@Options",
	 	        "chrome,toolbar,modal,centerscreen,resizable=no,dependent=yes");
    }
}

window.addEventListener("load", function() {@EXTENSION@Var.init();}, false);
window.addEventListener("focus", function() {@EXTENSION@Var.refreshDate();}, false);
window.addEventListener("unload", function() { @EXTENSION@Var.removeTicker(); }, false);

function Refresh@EXTENSION@Function() {
	@EXTENSION@Var.updateDate();
}

