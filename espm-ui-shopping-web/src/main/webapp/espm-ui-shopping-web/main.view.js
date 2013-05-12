sap.ui.jsview("espm-ui-shopping-web.main", {

	getControllerName : function() {
		return "espm-ui-shopping-web.main";
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
			notificationBar : new sap.ui.ux3.NotificationBar({
				messageNotifier : sap.ui.ux3.Notifier({messageSelected :  sap.app.messages.handleMessageSelected })
			}),
			worksetItems : [
				new sap.ui.ux3.NavigationItem({
					id : "nav-shopping",
					text : "{i18n>SHELL_WORKSET_SHOPPING}"
				}),
				new sap.ui.ux3.NavigationItem({
					id : "nav-checkout",
					text : "{i18n>SHELL_WORKSET_CHECKOUT}",
				})
			],
			paneBarItems : [ this.getShoppingCartPaneBarItem(oController) ],
			// Just one pane bar item, no need for switch
			paneContent : oController.getCachedView("cart"),
		});

		if(sap.app.localStorage.getPreference(sap.app.localStorage.PREF_DISPLAY_CUSTOMER_REVIEWS)){
			oShell.addWorksetItem(new sap.ui.ux3.NavigationItem({
				id : "nav-reviews",
				text : "{i18n>SHELL_WORKSET_ITEM_CUSTOMER_REVIEWS}"
			}));
		}

		var oSettingsButton = new sap.ui.commons.Button({
			text : "{i18n>SHELL_HEADER_ITEM_SETTINGS_TEXT}",
			tooltip : "{i18n>SHELL_HEADER_ITEM_SETTINGS_TOOLTIP}",
			press : function(oEvent) {
				oController.openSettingsDialog();
			}
		});
		oShell.addHeaderItem(oSettingsButton);

		// action when shell workset item  are clicked
		oShell.attachWorksetItemSelected(function(oEvent) {
			var sViewName = oEvent.getParameter("id").replace("nav-", "");
			oShell.setContent(oController.getCachedView(sViewName));
		});

		// initial shell content
		oShell.addContent(oController.getCachedView("shopping"));

		oShell.attachBrowserEvent("click", this.closeAddToCartPopup );

		return oShell;

	},

	/**
	 * closeAddToCartPopup: event handler for closing the add to cart popup if it is open
	 * @param oEvent
	 */
	closeAddToCartPopup: function(oEvent){

		if (sap.app.addToCartPopup && sap.app.addToCartPopup.isOpen()){
			sap.app.addToCartPopup.close();
		}
		if (oEvent.target.id == "shopping-cart-panebar-item"){
			if (sap.ui.getCore().byId("main").isPaneOpen() ){
				// the pane bar is about to close
				// check if there are errors related to quantity, if so set the quantity back to the last valid value and remove the error messages
				var aMessages = sap.app.messages.getMessagesOfView("cart");
				for (var i = 0; i < aMessages.length; i ++){
					var oMessage = aMessages[i];
					var oTextField = sap.ui.getCore().byId(oMessage["Field"]);
					if (oTextField){
						var context = oTextField.getBindingContext();
						var prop = sap.ui.getCore().byId("shopping-cart-rr").getModel().getProperty(context.getPath());
						oTextField.setValueState(sap.ui.core.ValueState.None);
						oTextField.setValue(prop["quantity"]);
					}
					sap.app.messages.removeMessageByInstance(oMessage);
				}
			}
		}
	},

	/**
	 * getShoppingCartPaneBarItem: create content of the shell panebar item
	 * @param oController
	 * @returns {sap.ui.core.Item}
	 */
	getShoppingCartPaneBarItem : function(oController) {

		var oPaneBarItem = new sap.ui.core.Item({
			id : "shopping-cart-panebar-item",
			key : "shopping-cart-panebar-item",
			text : "{i18n>SHELL_PANEBAR_ITEM_SHOPPING_CART}"
		});
		return oPaneBarItem;

	},

	/**
	 * Method called after the view is initialized.
	 */
	onAfterRendering: function() {
		this.getController().openWelcomeDialog();
	}

});
