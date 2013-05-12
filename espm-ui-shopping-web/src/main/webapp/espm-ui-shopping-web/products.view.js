sap.ui.jsview("espm-ui-shopping-web.products", {

	getControllerName : function() {
		return "espm-ui-shopping-web.products";
	},

	createContent : function(oController) {
		// set product controller for a further use
		sap.app.productsController = oController;

		// create Navigation Link for navigation to Product Categories
		var oBackNav = new sap.ui.commons.Link({
			id: "back-to-categories-link",
			text: sap.app.i18n.getProperty("PRODUCT_LIST_LINK_BACK"),
			width: "100%",
			press: function() {
				oController.toCategories();
			},
		});

		// create initial title for product list. Depends on a search this title will be replaced
		var oTitle = new sap.ui.commons.TextView({
			id: "products-list-title",
			text: "{i18n>PRODUCT_LIST_ALL_PRODUCTS}",
			design: sap.ui.commons.TextViewDesign.H3
		}).addStyleClass("uppercase");

		// create RowRepeater for product list
		var oRowRepeater = new sap.ui.commons.RowRepeater({
			id: "product-rr",
			design: sap.ui.commons.RowRepeaterDesign.BareShell,
			noData: new sap.ui.commons.TextView({text: "{i18n>PRODUCT_LIST_LOADING_PRODUCTS}"}),
			numberOfRows: sap.app.config.productsNumRows
		});
		
		oRowRepeater.onAfterRendering = function() {
			oController.setProductsCount();
		};

		// create a sorter which includes label and combo box, and attach event 'change' for this view
		var oSorter = sap.app.utility.getProductSorterControl();
		oSorter.attachChangeEvent(this);


		var oProductHeaderLayout = new sap.ui.commons.layout.MatrixLayout({
			width: "100%",
			rows: [
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							colSpan: 2,
							content: [
								oTitle,
								new sap.ui.commons.HorizontalDivider({width: "100%"})
							]
						})
					]
				}),
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							content: [ oBackNav ]
						}),
						new sap.ui.commons.layout.MatrixLayoutCell({
							id: "products-content-of-sorter",
							hAlign : sap.ui.commons.layout.HAlign.End,
							content: [ oSorter ]
						}),
					]
				})
			]
		});
		return [ oProductHeaderLayout, oRowRepeater ];

	},

	/**
	 * getProductTemplate: create template for row repeater of the product list
	 * @returns {sap.ui.commons.layout.MatrixLayout}
	 */
	getProductTemplate: function() {

		// return template immediately if already defined
		if (this.productTemplate){
			return this.productTemplate;
		}

		// Image
		var oCellImage= new sap.ui.commons.layout.MatrixLayoutCell({
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
					design: sap.ui.commons.TextViewDesign.H3,
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
		var oColumn1Table = new sap.ui.commons.layout.MatrixLayout({
			width: "50%",
			widths: [ "100px", "80%" ],
			rows: [
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						oCellImage,
						oCellName
					]
				})
			]
		}).addStyleClass("product-column-1-table");

		// Price
		var oCellPrice = new sap.ui.commons.layout.MatrixLayoutCell({
			vAlign: sap.ui.commons.layout.VAlign.Top,
			hAlign: sap.ui.commons.layout.HAlign.Right,
			content: [
				new sap.ui.commons.TextView({
					design: sap.ui.commons.TextViewDesign.H3,
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
				new composite.productActions({
					id: "prodaction",
					layoutType: "list",
					captionQuantity: "{i18n>FIELD_PRODUCT_QUANTITY}",
					captionBuyNow: "{i18n>BUTTON_BUY_NOW}",
					captionAddToCart: "{i18n>BUTTON_ADD_TO_CART}"
				})
			]
		});
		var oColumn2Table = new sap.ui.commons.layout.MatrixLayout({
			width: "50%",
			rows: [
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						oCellPrice,
						oCellActions
					]
				})
			]
		}).addStyleClass("product-column-2-table");

		var oProductTpl = new sap.ui.commons.layout.MatrixLayout({
			width: "100%",
			rows: [
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							content: [
								oColumn1Table,
								oColumn2Table
							]
						})
					]
				})
			]
		});

		this.productTemplate = oProductTpl;
		return this.productTemplate;
	},

	/**
	 * getDataForSorting: get RowRepeater as data for sorting
	 * @returns RowRepeater
	 */
	getDataForSorting :function () {
		return sap.ui.getCore().byId("product-rr");
	},

	/**
	 * getParentContentOfSorter: get parent of sorting composite control to be able restore it again after reuse
	 * @returns RowRepeater
	 */
	getParentContentOfSorter: function() {
		return sap.ui.getCore().byId("products-content-of-sorter");
	}
});
