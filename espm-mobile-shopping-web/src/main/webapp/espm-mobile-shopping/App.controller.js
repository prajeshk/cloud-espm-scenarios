sap.ui.controller("espm-mobile-shopping.App", {


	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {
		var pageToNav = "Category";

		//Internationalization:
		//create global i18n resource bundle for texts in application UI
		appC.i18n = new sap.ui.model.resource.ResourceModel({
			bundleUrl: "i18n/i18n.properties",
			locale: sap.ui.getCore().getConfiguration().getLanguage()
		});
		sap.ui.getCore().setModel(appC.i18n, "i18n");

		// history management
		jQuery.sap.require("jquery.sap.history");
		jQuery.sap.history({
			routes: [{
				path: "page",
				handler: function(params, navType) {
					if (!params || !params.id) {
						jQuery.sap.log.error("invalid page parameter: " + params);
					} else {
						appC.navTo(params.id, false, navType);
					}
				}
			}],
			defaultHandler: function(navType) {
				appC.navTo(pageToNav, false, navType);
			}
		});
		appC.navTo(pageToNav, false, undefined);
	},

	//get the page id
	getPage : function(id) {
		return this.getView().app.getPage(id);
	},

	//navigation to next pages
	navTo : function(id, writeHistory, navType, param) {
		if (id === undefined) {
			jQuery.sap.log.error("navTo failed due to missing id");
			return;
		}
		var app = this.getView().app;
		if (navType === jQuery.sap.history.NavType.Back) {
			app.backToPage(id);
		} else {
			// lazy load view
			if (sap.ui.getCore().byId(id) === undefined) {
				jQuery.sap.log.info("now loading page '" + id + "'");
				app.addPage(sap.ui.jsview(id, "espm-mobile-shopping." + id));
			} 
			app.to(id, param);
		}

		// write history
		if (writeHistory === undefined || writeHistory) {
			jQuery.sap.history.addHistory("page", {id: id}, false);
		}

		// log
		jQuery.sap.log.info("navTo '" + id + "' (" + writeHistory + "," + navType + ")");
	},

	//navigation to previous pages
	navBack : function() {
		jQuery.sap.history.back();
		jQuery.sap.log.info("navBack");
	},
	
	openDialog : function(dialog) {
		jQuery.sap.history.addVirtualHistory();
		dialog.open();
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 */
//	onBeforeRendering: function() {

//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
//	onAfterRendering: function() {

//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
//	onExit: function() {

//	}

});