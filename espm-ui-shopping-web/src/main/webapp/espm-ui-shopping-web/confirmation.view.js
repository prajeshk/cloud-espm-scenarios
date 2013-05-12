sap.ui.jsview("espm-ui-shopping-web.confirmation", {

	getControllerName : function() {
	return "espm-ui-shopping-web.confirmation";
	},

	createContent : function(oController) {

		var oLayout = new sap.ui.commons.layout.VerticalLayout({
			width: "100%"
		});

		oTitle = new sap.ui.commons.TextView({
			id: "checkout-confirmation-title",
			text: "{i18n>TITLE_COMFIRMATION}",
			design: "H3"
		}).addStyleClass("uppercase");

		new sap.ui.commons.Image({
			id: "confirm_image",
			src: "images/icon-confirmation-success.png",
		});
		// Text for Order
		new sap.ui.commons.TextView({
			id: "confirm_order_text",
			width: "100%",
			design: sap.ui.commons.TextViewDesign.H5,
		});

		// Text for Customer
		new sap.ui.commons.TextView({
			id: "confirm_customer_text",
			width: "100%",
			design: sap.ui.commons.TextViewDesign.H5,
		});

		var oTextLayout = new sap.ui.commons.layout.MatrixLayout({
			id: "confirm_text_layout",
			widths : [ "10%", "90%" ]
		});

		
		// build layout with element, the texts for customer and/or for order will be set later in onAfterRendering
		oLayout.addContent(oTitle);
		oLayout.addContent(new sap.ui.commons.HorizontalDivider({
								height : sap.ui.commons.HorizontalDividerHeight.Large
							}));
		oLayout.addContent(oTextLayout);

		oLayout.addContent(new sap.ui.commons.HorizontalDivider({
								height : sap.ui.commons.HorizontalDividerHeight.Large
							}));

		return oLayout;
	}

});
