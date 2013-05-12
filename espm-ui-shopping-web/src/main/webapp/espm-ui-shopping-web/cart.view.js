sap.ui.jsview("espm-ui-shopping-web.cart", {

	getControllerName : function() {
		return "espm-ui-shopping-web.cart";
	},

	createContent : function(oController) {

		sap.app.cartController = oController;
		// create row repeater for products in the shopping cart
		var oRowRepeater= new sap.ui.commons.RowRepeater({
			id: "shopping-cart-rr",
			title: new sap.ui.commons.Title({
				icon: "images/icon.cart.24x24.png",
				text: "{i18n>SHOPPING_CART_TITLE}"
			}),
			width: "100%",
			noData: new sap.ui.commons.TextView({text: "{i18n>SHOPPING_CART_EMPTY}"}),
			design: sap.ui.commons.RowRepeaterDesign.Standard,
			numberOfRows: sap.app.config.productsNumRows
			});

		oRowRepeater.bindRows("/items", this.getProductTemplate());

		// create total price of shooping cart
		var oTotal = new sap.ui.commons.TextView({
			id: "cart-total-amount",
			text: " ",
			width: "100%",
			textAlign: sap.ui.core.TextAlign.Right
		});

		// create button for chreckout
		var oCheckoutBtn = new sap.ui.commons.Button({
			text: "{i18n>SHOPPING_CART_BUTTON_CHECKOUT}",
			style: sap.ui.commons.ButtonStyle.Emph,
			press: function(oEvent) {
				// go to checkout page
				sap.ui.getCore().byId("main").setContent(sap.app.mainController.getCachedView("checkout"));
				sap.ui.getCore().byId("main").setSelectedWorksetItem("nav-checkout");
			}
		});
		// create layout and set elements
		var oLayout = new sap.ui.commons.layout.MatrixLayout({width: "100%"});
		oLayout.createRow(oRowRepeater);
		oLayout.createRow(oTotal);

		var oCheckoutRow = new sap.ui.commons.layout.MatrixLayoutRow({
			cells: [
				new sap.ui.commons.layout.MatrixLayoutCell({
					content: [ oCheckoutBtn ],
					width: "100%",
					hAlign: sap.ui.core.HorizontalAlign.Right
				})
			]
		});
		oLayout.addRow(oCheckoutRow);

		// attach validation handlers
		sap.ui.getCore().attachValidationError( function(oEvent){
			var oControl = oEvent.getSource();
			oControl.setValueState( sap.ui.core.ValueState.Error );
			var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_VALUE_NOT_GREATER_ZERO");
			sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , oControl.getId());
		});

		sap.ui.getCore().attachParseError( function(oEvent){
			var oControl = oEvent.getParameter("element");
			oControl.setValueState( sap.ui.core.ValueState.Error );
			var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_VALUE_NOT_VALID").replace(/&1/, "'" + oControl.getValue() + "'");
			sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , oControl.getId());
		});
		sap.ui.getCore().attachValidationSuccess( function(oEvent){
			var oControl = oEvent.getParameter("element");
			oControl.setValueState( sap.ui.core.ValueState.None );
			sap.app.messages.removeMessage( oControl.getId() );
		});

	return oLayout;
	},

	/**
	 * getProductTemplate: create template for row repeater of the product list in the shopping cart
	 * @returns {sap.ui.commons.layout.MatrixLayout}
	 */
	getProductTemplate: function() {
		var that = this;
		// Image
		var oCellImage = new sap.ui.commons.layout.MatrixLayoutCell({
			vAlign: sap.ui.commons.layout.VAlign.Top,
			content: [
				new sap.ui.commons.Image({
					src: {
						path: "PictureUrl",
						formatter: sap.app.formatter.productImage
					},
					width: "75px",
					height: "75px"
				})
			]
		});

		// Name
		var oCellName = new sap.ui.commons.layout.MatrixLayoutCell({
			vAlign: sap.ui.commons.layout.VAlign.Top,
			content: [
				new sap.ui.commons.TextView({
					design: sap.ui.commons.TextViewDesign.H4,
					text: "{Name}",
					width: "100%"
				}),
				new sap.ui.commons.TextView({
					text: "{ShortDescription}",
				width: "100%"
				}),
				new sap.ui.commons.layout.HorizontalLayout({
					content: [
						new sap.ui.commons.TextView({
							text: "{i18n>FIELD_PRODUCT_QUANTITY}",
							width: "70px"
						}).addStyleClass("caption-qty"),
						new sap.ui.commons.TextField({
							id: "cart-quantity-field",
							value: { path: "quantity",
							type: new sap.ui.model.type.Integer({}, {minimum: 1}) },
							width: "35px",
							textAlign: sap.ui.core.TextAlign.Right,
							change: function(e) {
								that.oController.updateTotal();
							}
						}),
						new sap.ui.commons.Link({
							text: "{i18n>LINK_REMOVE}",
							width: "100px",
							textAlign: sap.ui.core.TextAlign.Left,
							press: function(e) {
								that.oController.removeItem(this.getBindingContext());
								sap.app.messages.removeMessage( "cart-quantity-field" );
							}
						}).addStyleClass("cart-remove")
					]
				}),
				new sap.ui.commons.TextView({
					design: sap.ui.commons.TextViewDesign.Bold,
					text: {
						path: "Price",
						formatter: sap.app.formatter.price
					},
					width: "100%",
					textAlign: sap.ui.core.TextAlign.Right
				})
			]
		});

		var oProductTpl = new sap.ui.commons.layout.MatrixLayout({
			width: "100%",
			widths: ["100px", "80%"],
			rows: [
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						oCellImage,
						oCellName
					]
				})
			]
		});
		return oProductTpl;
	}

});
