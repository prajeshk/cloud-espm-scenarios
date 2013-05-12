sap.ui.jsview("espm-ui-shopping-web.addToCart", {

	getControllerName : function() {
	return "espm-ui-shopping-web.addToCart";
	},

	createContent : function(oController) {
		var oVLayout = new sap.ui.commons.layout.VerticalLayout({
			content: [
				new sap.ui.commons.Panel({
					id : "add-to-cart-content",
					showCollapseIcon : false,
					content : [ this.panelContentTemplate() ],
					title : new sap.ui.commons.Title({
						icon: "images/icon.cart.24x24.png",
						text: "{i18n>SHOPPING_CART_TITLE}",
						width: "100%",
					}),
				})
			]
			}).addStyleClass("add-to-cart-layout");
		return oVLayout;
	},

	/**
	* create content of panel
	*/
	panelContentTemplate: function() {

		var oLayout = new sap.ui.commons.layout.VerticalLayout({
			content : [
				// text lines 1
				new sap.ui.commons.TextView({
					text : "{i18n>CART_CALLOUT_TXT1}",
				width : "100%",
				}).addStyleClass("addToCart-text"),

				// product name with ordered quantity
				new sap.ui.commons.TextView({
					design : sap.ui.commons.TextViewDesign.H4,
					text : {
						path : "Name",
						formatter : function(value) {
							var quantity = 0;
							if (this.getBindingContext()) {
								quantity = this.getBindingContext()["quantity"];
							}
							return quantity + "  " + value;
						}
					},
					width : "100%",
					wrapping : false,
				}).addStyleClass("addToCart-product"),

				// calculated product price
				new sap.ui.commons.TextView({
					design : sap.ui.commons.TextViewDesign.H3,
					text : {
						path : "Price",
						formatter : function(value) {
							var quantity = 0;
							if (this.getBindingContext()) {
								quantity = this.getBindingContext()["quantity"];
							}
							return sap.app.i18n.getProperty("PRODUCT_DETAIL_LABEL_PRICE") + " " +
									Math.floor(parseInt(quantity) * parseInt(value)) + " " +
									sap.app.config.currencySymbol;
						}
					},
					width : "100%",
					textAlign : sap.ui.core.TextAlign.End
				}).addStyleClass("addToCart-price"),

				//text lines 2
				new sap.ui.commons.TextView({
					text : "{i18n>CART_CALLOUT_TXT2}",
					width : "100%",
				}).addStyleClass("addToCart-popup-text"),
			],
			width : "100%"
		});
		return oLayout;
	}
});
