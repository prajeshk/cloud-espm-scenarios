sap.ui.jsview("espm-ui-reviews-web.main", {

	getControllerName : function() {
		return "espm-ui-reviews-web.main";
	},

	/**
	 * createContent: instantiate the shell which is the main container embedding all other content
	 * @param oController
	 * @returns {sap.ui.ux3.Shell}
	 */
	createContent : function(oController) {
		sap.app.mainController = oController;

		var oShell = new sap.ui.ux3.Shell({
			id : "main",
			appTitle : "{i18n>SHELL_HEADER_TITLE}",
			showLogoutButton : true,
			showSearchTool : false,
			showInspectorTool : false,
			showFeederTool : false,
			showTools : true,
			showPane : true,
			paneWidth : 500,
			worksetItems : [ new sap.ui.ux3.NavigationItem({
				id : "nav-customer-reviews-id",
				text : "{i18n>SHELL_WORKSET_ITEM_CUSTOMER_REVIEWS}"
			}) ]
		});

		var oSettingsButton = new sap.ui.commons.Button({
			text : "{i18n>SHELL_HEADER_ITEM_SETTINGS_TEXT}",
			tooltip : "{i18n>SHELL_HEADER_ITEM_SETTINGS_TOOLTIP}",
			press : function(oEvent) {
				oController.openSettingsDialog();
			}
		});
		oShell.addHeaderItem(oSettingsButton);

		// initial shell content
		oShell.addContent(oController.getCachedView("reviews"));

		return oShell;

	},
});
