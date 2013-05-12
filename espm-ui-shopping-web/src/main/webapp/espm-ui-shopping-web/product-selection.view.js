sap.ui.jsview("espm-ui-shopping-web.product-selection", {

	getControllerName : function() {
		return "espm-ui-shopping-web.product-selection";
	},

	createContent : function(oController) {

		// layout for products label and dropdown box
		var oProductSelectionMatrixLayout = new sap.ui.commons.layout.MatrixLayout({});

		// products dropdown box with label
		oProductSelectionMatrixLayout.createRow(new sap.ui.commons.layout.VerticalLayout({
			content : [ new sap.ui.commons.Label({
				text : "{i18n>PRODUCTS_LABEL}"
			}), new sap.ui.commons.DropdownBox({
				id : "product-selection-dropdown-box-id",
				width : "280px",
				change : function(oEvent) {
					oController.selectedProductChanged(oEvent);
				}
			}) ]
		}));

		// selected product details
		oProductSelectionMatrixLayout.createRow(new sap.ui.commons.layout.VerticalLayout({
			content : [ new sap.ui.commons.Label({
				text : "{i18n>PRODUCT_DETAILS_LABEL}"
			}), this.getProductDetailsLayout() ]
		}));

		// write customer review button
		oProductSelectionMatrixLayout
				.createRow(new sap.ui.commons.layout.MatrixLayoutCell(
						{
							hAlign : sap.ui.commons.layout.HAlign.Left,
							content : [ new sap.ui.commons.Button(
									{
										text : "{i18n>WRITE_CUSTOMER_REVIEW_BUTTON}",
										press : oController.openCustomerReviewCreationDialog
									}) ]
						}));

		return oProductSelectionMatrixLayout;
	},

	getProductDetailsLayout : function() {

		var oVerticalProductNameDescLayout = new sap.ui.commons.layout.VerticalLayout({
			width : "500px",
			content : [ new sap.ui.commons.TextView({
				id : "selected-product-name-view-id",
				text : "{Name}",
			}), new sap.ui.commons.TextView({
				id : "selected-product-desc-view-id",
				text : "{ShortDescription}",
			}) ]
		}).addStyleClass("layoutPaddingProductDetails");

		var oProductDetailsLayout = new sap.ui.commons.layout.HorizontalLayout({
			content : [
					new sap.ui.commons.Image({
						id : "selected-product-image-id",
						src : {
							path : "PictureUrl",
							formatter : function(src) {
								if (!src) {
									return (sap.app.config.productPlaceholderImg);
								} else {
									var re = /.JPG/g;
									src = src.replace(re, ".jpg");
									return ("proxy/" + sap.app.utility.getBackendImagesDestination()
											+ sap.app.utility.getImagesBaseUrl() + src);
								}
							}
						},
						width : "75px",
						height : "75px"
					}), oVerticalProductNameDescLayout ]
		});

		return oProductDetailsLayout;
	},

	/**
	 * creates the template for products dropdown box
	 * 
	 * @returns {sap.ui.core.ListItem}
	 */
	getProductsListItemTemplate : function() {

		// return template immediately if already defined
		if (this.productTemplate) {
			return this.productTemplate;
		}

		var oProductsListItemTpl = new sap.ui.core.ListItem({
			id : "products-list-item-template-id",
			key : "{ProductId}",
			text : "{Name}"
		});

		this.productTemplate = oProductsListItemTpl;
		return this.productTemplate;
	}

});
