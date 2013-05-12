sap.ui.jsview("espm-ui-shopping-web.checkoutStep1", {

	getControllerName : function() {
		return "espm-ui-shopping-web.checkoutStep1";
	},

	createContent : function(oController) {

		// create RowRepeater for ordered product list
		var oRowRep = new sap.ui.commons.RowRepeater({
			id: "checkout-cart-rr",
			width: "100%",
			noData: new sap.ui.commons.TextView({text: "{i18n>SHOPPING_CART_EMPTY}"}),
			design: sap.ui.commons.RowRepeaterDesign.BareShell,
			numberOfRows: sap.app.config.productsNumRows
		});

		oRowRep.bindRows("/items", this.getProductTemplate());

		// create a sorter which includes label and combo box, and attach event 'change' for this view
		var oSorter = sap.app.utility.getProductSorterControl();
		oSorter.attachChangeEvent(this);

		// create total amount
		var oTotal = new sap.ui.commons.TextView({
			id: "checkout-cart-total-amount",
			text: "",
			width: "100%",
			textAlign: sap.ui.core.TextAlign.Right
		});
		var oProductsLayout = new sap.ui.commons.layout.MatrixLayout({
			id: "chekout_row_with_sorter",
			width: "100%",
			rows: [
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							id : "checkout-content-of-sorter",
							hAlign : sap.ui.commons.layout.HAlign.End,
							content: [ oSorter ]
						}),
					]
				}),
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							id : "checkout-content-of-items",
							content: [ oRowRep ]
						}),
					]
				}),
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							id : "checkout-content-of-total",
							content: [ oTotal ]
						}),
					]
				}),
			]
		});

		return  oProductsLayout ;
	},

	/**
	* Create template for RowRepeater
	*/
	getProductTemplate: function() {
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
				new sap.ui.commons.Link({
					text:"{i18n>PRODUCT_LIST_LINK_DETAILS}",
					press: function(oEvent) {
						sap.app.productsController.toDetail( new sap.ui.base.Event("detailClick", this) );
					}
				}),
			]
		});
		// Price
		var oCellPrice = new sap.ui.commons.layout.MatrixLayoutCell({
			vAlign: sap.ui.commons.layout.VAlign.Top,
			hAlign: sap.ui.commons.layout.HAlign.Left,
			content: [
				new sap.ui.commons.Label({
					text: "{i18n>PRODUCT_DETAIL_LABEL_PRICE}",
					design: sap.ui.commons.LabelDesign.Bold
				}).addStyleClass("price-middle-size"),
				new sap.ui.commons.TextView({
					design: sap.ui.commons.TextViewDesign.H4,
					text: {
						path: "Price",
						formatter: sap.app.formatter.price
					}
				})
			]
		});
		// Actions
		var oCellActions = new sap.ui.commons.layout.MatrixLayoutCell({
			vAlign: sap.ui.commons.layout.VAlign.Top,
			hAlign: sap.ui.commons.layout.HAlign.Right,
			content: [
				new sap.ui.commons.layout.VerticalLayout({
					width: "140px",
					content: [
						new sap.ui.commons.layout.HorizontalLayout({
							content: [
								//Quantity
								new sap.ui.commons.TextView({
								text: "{i18n>FIELD_PRODUCT_QUANTITY}",
								width: "70px"
								}).addStyleClass("caption-qty"),
								new sap.ui.commons.TextField({
									id : "checkout-quantity-field",
									value : "{quantity}",
									width : "35px",
									textAlign : sap.ui.core.TextAlign.Right,
									change : function(e) {
										sap.app.cartController.updateTotal("checkout-");
										var bEnabled = sap.app.cartController.getTotal() <= 0
												|| sap.app.cartController.getQuantity() > 9999
												|| sap.app.cartController.getQuantity() <= 0 ? false : true;
										sap.app.checkoutController.setNextStepEnabled(bEnabled, "checkoutStep1");
									}
								}).attachBrowserEvent("keyup", sap.app.validator.checkQuantity),
							],
						}),
						new sap.ui.commons.Link({
							id: "checkout-remove-link",
							text: "{i18n>LINK_REMOVE}",
							width: "100px",
							textAlign: sap.ui.core.TextAlign.Left,
							press: function(e) {
								sap.app.cartController.removeItem(this.getBindingContext(), "checkout-");
								var sField = this.getId();
								Field = sField.replace("checkout-remove-link","checkout-quantity-field");
								sap.app.messages.removeMessage( sField );
								var oShoppingCart = sap.ui.getCore().byId("shopping-cart-rr");
								var bEnabled = oShoppingCart.getRows().length == 0 ? false : true;
								sap.app.checkoutController.setNextStepEnabled(bEnabled,"checkoutStep1");
							}
						}).addStyleClass("cart-remove")
					]
				})
			]
		});

		var productTpl = new sap.ui.commons.layout.MatrixLayout({
			width: "100%",
			widths: ["100px", "100%", "200px", "200px"],
				rows: [
					new sap.ui.commons.layout.MatrixLayoutRow({
						cells: [
							oCellImage,
							oCellName,
							oCellPrice,
							oCellActions
						]
					})
				]
			});

		return productTpl;
	},

	/**
	 * getDataForSorting: get RowRepeater as data for sorting
	 * @returns RowRepeater
	 */
	getDataForSorting :function () {
		return sap.ui.getCore().byId("checkout-cart-rr");
	},
	/**
	 * getParentContentOfSorter: get parent of sorting composite control to be able restore it again after reuse
	 * @returns RowRepeater
	 */
	getParentContentOfSorter: function() {
		return sap.ui.getCore().byId("checkout-content-of-sorter");
	}
});
