sap.ui.controller("espm-ui-shopping-web.shopping", {

	onBeforeRendering: function() {
		// pane bar for shopping cart is available only in shopping work area.
		// navigation to checkout area will delete this pane bar,
		// navigation to shopping area will restore the pane bar for shopping cart
		var aPaneBarItems = sap.ui.getCore().byId("main").getPaneBarItems();
		var hasShoppingCartPane = false;

		for (var i=0; i<aPaneBarItems.length; i++) {
			if (aPaneBarItems[i].getId() == "shopping-cart-panebar-item") {
				hasShoppingCartPane = true;
			}
		}
		if (!hasShoppingCartPane) {
		// add shopping cart
		sap.ui.getCore().byId("main").addPaneBarItem(sap.app.mainController.oView.getShoppingCartPaneBarItem());
		sap.app.cartController.updateTotal();
		}
	}

});
