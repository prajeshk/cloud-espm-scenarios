sap.ui.controller("espm-ui-shopping-web.cart", {

	onInit: function() {
		var that = this;
		// create cart model with empty items array
		this.cartJSONModel = new sap.ui.model.json.JSONModel(sap.app.config.orderModelUrl);
		//sap.ui.getCore().byId("shopping-cart-rr").setModel(this.model);
		this.getView().setModel(this.cartJSONModel);
		// subscribe events for By now and Add to Cart
		var oEventBus = sap.ui.getCore().getEventBus();
		oEventBus.subscribe("sap.app", "buynow", function(sChannelId, sEventId, oItem) {
			that.buyNow(oItem);
		});
		oEventBus.subscribe("sap.app", "addtocart", function(sChannelId, sEventId, oItem) {
			that.addItem(oItem);
		});
	},

	/**
	 * buyNow: adds an item to the shopping cart and navigates to the checkout view of the shell
	 * @param oItem: item which is put to the shopping cart
	 */
	buyNow: function(oItem) {
		this.addItem(oItem, false);
		// go to checkout page after adding the item
		sap.ui.getCore().byId("main").setContent(sap.app.mainController.getCachedView("checkout"));
		sap.ui.getCore().byId("main").setSelectedWorksetItem("nav-checkout");
	},

	/**
	 * addItem: adds an item to the shopping cart and evtl. show a popup with the added item
	 * @param oItem: item which is put to the shopping cart
	 * @param bShowPopup: fla to show popup wiht added item
	 */
	addItem: function(oItem, bShowPopup) {
		if (bShowPopup === undefined) {
			// default value for bShowPopup
			bShowPopup = true;
		}

		// close the thing inspector when adding item to the shopping cart
		var oDetailView = sap.ui.getCore().byId("detail-layout-content");
		if (oDetailView && oDetailView.isOpen()) {
			oDetailView.close();
		}

		var data = this.cartJSONModel.getData();
		// check if item already exists
		var bDuplicate = false;
		for (var i = 0; i < data.items.length; i++) {
			if (data.items[i].ProductId == oItem.ProductId) {
				bDuplicate = true;
				// if item already exists, just increment quantity
				data.items[i].quantity = parseInt(data.items[i].quantity) + parseInt(oItem.quantity);
			}
		}
		// add new item to beginning of items array
		if (!bDuplicate) {
			data.items.unshift(oItem);
		}
		// open pane to reveal shopping cart
		sap.ui.getCore().byId("shopping-cart-rr").getModel().updateBindings();

		if (!sap.ui.getCore().byId("main").isPaneOpen() && bShowPopup){
		// show the tooltip only if the pane is currently not open
			this.showCartToolTip(oItem);
		}

		this.updateTotal();
	},

	/**
	 * removeItem: removes item from cart
	 * @param oContext
	 */
	removeItem: function(oContext, sPrefix) {
		var oData = this.cartJSONModel.getData();
		var index = oContext.sPath.split("/");
		index = index[index.length - 1];
		oData.items.splice(index, 1);
		this.cartJSONModel.setData(oData);
		this.updateTotal(sPrefix);
	},
	
	/**
	 * getTotal: gets the total price of the items in the shopping cart
	 */
	
	getTotal: function() {
		if (this.getView().hasModel()) {
			var data = this.getView().getModel().getData();
			var totalPrice = 0;

			for (var i=0; i<data.items.length; i++) {
				totalPrice += parseInt(data.items[i].quantity) * parseFloat(data.items[i].Price);
			}
			return totalPrice;
		}
	},

	/**
	 * getQuantity: gets the number quantity of the items in the shopping cart
	 */
	getQuantity: function() {
		if (this.getView().hasModel()) {
			var data = this.getView().getModel().getData();
			var totalQty = 0;

			for (var i=0; i<data.items.length; i++) {
				totalQty += parseInt(data.items[i].quantity);
			}
			return totalQty;
		}
	},

	/**
	 * updateTotal: updates the total price of the items in the shopping cart
	 * @param sPrefix
	 */
	updateTotal: function(sPrefix) {
		if (this.getView().hasModel()) {
			var data = this.getView().getModel().getData();
			var totalPrice = 0;
			var totalQty = 0;

			for (var i=0; i<data.items.length; i++) {
				totalPrice += parseInt(data.items[i].quantity) * parseFloat(data.items[i].Price);
				totalQty += parseInt(data.items[i].quantity);
			}
			// update total price: is used in two views, prefix is used for a difference of elements
			if (sPrefix) {
				sap.ui.getCore().byId(sPrefix + "cart-total-amount").setText(sap.app.formatter.total(totalPrice));
			} else {
				sap.ui.getCore().byId("cart-total-amount").setText(sap.app.formatter.total(totalPrice));
			}
			// update pane bar text & pane title
			if (data.items.length) {
				if (sap.ui.getCore().byId("checkout-cart-title")) {
					sap.ui.getCore().byId("checkout-cart-title").setText(sap.app.i18n.getProperty("TITLE_CHECKOUT_STEP_1")
						+ " (" + totalQty + ")");
				}
				// using the setText method on the panebar item causes rerendering of shell and flicker
				// using jQuery works better here
				if (jQuery("#shopping-cart-panebar-item").length) {
					jQuery("#shopping-cart-panebar-item").text(sap.app.i18n.getProperty("SHELL_PANEBAR_ITEM_SHOPPING_CART")
						+ " (" + totalQty + ")");
				}
				if (sap.ui.getCore().byId("shopping-cart-rr")) {
					sap.ui.getCore().byId("shopping-cart-rr").getTitle().setText(sap.app.i18n.getProperty("SHOPPING_CART_TITLE")
						+ " (" + sap.app.formatter.pluralize(totalQty, sap.app.i18n.getProperty("CART_ITEM"), sap.app.i18n.getProperty("CART_ITEMS") )+")");
				}
			} else {
				if (sap.ui.getCore().byId("checkout-cart-title")) {
					sap.ui.getCore().byId("checkout-cart-title").setText(sap.app.i18n.getProperty("TITLE_CHECKOUT_STEP_1"));
				}
				if (jQuery("#shopping-cart-panebar-item").length) {
					jQuery("#shopping-cart-panebar-item").text(sap.app.i18n.getProperty("SHELL_PANEBAR_ITEM_SHOPPING_CART"));
				}
				if (sap.ui.getCore().byId("shopping-cart-rr")) {
					sap.ui.getCore().byId("shopping-cart-rr").getTitle().setText(sap.app.i18n.getProperty("SHOPPING_CART_TITLE"));
				}
			}
		}
	},

	/**
	 * showCartToolTip: displays popup with added product, amount and price. Popup is set next to panebar of shopping cart
	 * @param item - added product
	 */
	showCartToolTip : function(oItem){

		var oPopup = new sap.ui.core.Popup();
		// get Panebar for position of popup
		var oCartPane = sap.ui.getCore().byId("shopping-cart-panebar-item");
		// get view for pupup and set a size
		var oAddToCartView = sap.app.mainController.getCachedView("addToCart");
		oAddToCartView.setWidth("350px");
		// set corresponding model
		if (oAddToCartView.hasModel() == false ) {
			oAddToCartView.setModel(this.cartJSONModel);
		}
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {	
			oAddToCartView.unbindContext();
		}
		oAddToCartView.setBindingContext(oItem);
		//set view to popup
		oPopup.setContent(oAddToCartView);
		oPopup.open( 500, sap.ui.core.Popup.Dock.BeginTop, sap.ui.core.Popup.Dock.RightTop, oCartPane, "10 10" );

		sap.app.addToCartPopup = oPopup;

		window.setTimeout(function () {
			oPopup.close();
		}, 4000);

	}

});
