
var @EXTENSION@Var = {
    ticker: null,
    languageLoaded: false,

    checkLanguageLoaded: function() {
        if (!this.languageLoaded) {
            this.languageLoaded = true;
            @EXTENSION@LanguageVar.loadLanguage();
        }
    },

    setPanelPosition: function() {
        try {
            var position = getCharacterPreferenceValueWithDefault("position", Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch), "");
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
        this.refreshDate();
    },

    removeTicker: function() {
        try { window.clearInterval(this.ticker); } catch(ex) {}
    },

    refreshDate: function() {
        this.removeTicker();
        this.checkLanguageLoaded();
        this.updateDate();
        this.ticker = window.setInterval(Refresh@EXTENSION@Function, 200);
    },

    updateDate: function() {
        document.getElementById("statusbar-@EXTENSION@-display").setAttribute("label", new Date().print(getCharacterPreferenceValueWithDefault("shortDateFormat", Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch), "%d %b")));
    },

    showCalendar: function(event) {
        if (event.button == 0) {
            window.openDialog(
                "chrome://@EXTENSION@/content/showCal.xul",
                "_@EXTENSION@",
                "chrome,centerscreen,resizable=no,dependent=yes");
		}
    },

    showOptions: function() {
        window.openDialog(
                "chrome://@EXTENSION@/content/@EXTENSION@Prefs.xul",
                "_@EXTENSION@Options",
	 	        "chrome,modal,centerscreen,resizable=no,dependent=yes");
    }
}

window.addEventListener("load", function() {@EXTENSION@Var.init();}, false);
window.addEventListener("focus", function() {@EXTENSION@Var.refreshDate();}, false);
window.addEventListener("unload", function() { @EXTENSION@Var.removeTicker(); }, false);

function Refresh@EXTENSION@Function() {
	@EXTENSION@Var.updateDate();
}

