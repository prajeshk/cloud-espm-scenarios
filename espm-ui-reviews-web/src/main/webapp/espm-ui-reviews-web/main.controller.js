sap.ui.controller("espm-ui-reviews-web.main", {

	// instantiated view will be added to the oViewCache object and retrieved from there
	oViewCache : {},

	onInit : function() {

	},

	/**
	 * getCachedView checks if view already exists in oViewCache object, will create it if not, and return the view
	 */
	getCachedView : function(viewName) {
		if (!this.oViewCache[viewName]) {
			var fullViewName = sap.app.config.viewNamespace + "." + viewName;
			this.oViewCache[viewName] = sap.ui.view({
				id : viewName,
				viewName : fullViewName,
				type : sap.ui.core.mvc.ViewType.JS
			});
		}
		return this.oViewCache[viewName];
	},

	openSettingsDialog : function() {
		var oSettingsView = sap.app.mainController.getCachedView("settings");
		var oSettingsDialog = sap.ui.getCore().byId("settings-dialog-id");

		if (oSettingsDialog == null) {
			oSettingsDialog = new sap.ui.commons.Dialog({
				id : "settings-dialog-id",
				showCloseButton : true,
				resizable : true,
				title : "{i18n>SETTINGS_DIALOG_TITLE}",
				buttons : [ new sap.ui.commons.Button({
					id : "settings-ok-button-id",
					text : "{i18n>SETTINGS_OK_BUTTON}",
					press : oSettingsView.getController().okButtonClicked
				}), new sap.ui.commons.Button({
					id : "settings-cancel-button-id",
					text : "{i18n>SETTINGS_CANCEL_BUTTON}",
					press : oSettingsView.getController().cancelButtonClicked
				}) ],
				content : [ oSettingsView ],
			});
		}
		oSettingsView.getController().initializeSettingsDialog();
		oSettingsDialog.open();
	}
});
