sap.ui.jsview("espm-ui-shopping-web.checkoutStep3", {

	getControllerName : function() {
		return "espm-ui-shopping-web.checkoutStep3";
	},

	createContent : function(oController) {

		var that = this;

		var oColumnLayout = new sap.ui.commons.layout.VerticalLayout({
			width: "400px"
		});

		var oMatrix = new sap.ui.commons.layout.MatrixLayout({
			rows : [ new sap.ui.commons.layout.MatrixLayoutRow({
						cells : [ new sap.ui.commons.layout.MatrixLayoutCell({
									content : [	new sap.ui.commons.RadioButton({
													id : "card-blue",
													groupName : "credit-card-group",
													key : "card-blue",
													select : function(oEvent) {
														that.getModel().setProperty("/payment/type", this.getId() );
													}
												}),
												new sap.ui.commons.Image({src : "images/icon-credit-card-blue.png"})
													.addStyleClass("icon-card-padding")
											]
								}),
								new sap.ui.commons.layout.MatrixLayoutCell({
									content : [	new sap.ui.commons.RadioButton({
													id : "card-green",
													groupName : "credit-card-group",
													key : "card-green",
													select : function(oEvent) {
														that.getModel().setProperty("/payment/type", this.getId() );
													}
												}),
												new sap.ui.commons.Image({src : "images/icon-credit-card-green.png"})
													.addStyleClass("icon-card-padding")
											]
								}),
								new sap.ui.commons.layout.MatrixLayoutCell({
									content : [	new sap.ui.commons.RadioButton({
													id : "card-gold",
													groupName : "credit-card-group",
													key : "card-gold",
													select : function(oEvent) {
														that.getModel().setProperty("/payment/type", this.getId() );
													}
												}),
												new sap.ui.commons.Image({src : "images/icon-credit-card-gold.png"})
													.addStyleClass("icon-card-padding")
											]
								})
								]
					})
					],
				width: "250px"
			});

		var sCardType = sap.app.checkoutController.getView().getModel().getProperty("/payment/type");
		if (sCardType == ""){
			sCardType = "card-blue";
		}
		sap.ui.getCore().byId( sCardType ).setSelected( true );
		
		
		var oLabelCardTypeGroup = new sap.ui.commons.Label({
			text: "{i18n>LBL_CARD_TYPE}"
		});
		var oFieldCardOwner = new sap.ui.commons.TextField({
			id: "input-card-owner",
			value: "{cardOwner}",
			width: "200px",
			required: true
		});
		var oLabelCardOwner = new sap.ui.commons.Label({
			labelFor: oFieldCardOwner,
			text: "{i18n>LBL_CARD_OWNER}"
		});
		var oFieldCardNumber = new sap.ui.commons.TextField({
			id: "input-card-number",
			value: "{cardNumber}",
			width: "200px",
			required: true
		});
		var oLabelCardNumber = new sap.ui.commons.Label({
			labelFor: oFieldCardNumber,
			text: "{i18n>LBL_CARD_NUMBER}"
		});
		var oFieldCardSecCode = new sap.ui.commons.TextField({
			id: "input-card-security-code",
			value: "{cardSecurityCode}",
			width: "200px",
			required: true
		});
		var oLabelCardSecCode = new sap.ui.commons.Label({
			labelFor: oFieldCardSecCode,
			text: "{i18n>LBL_CARD_SECURITY_CODE}"
		});

		oColumnLayout.addContent(oLabelCardTypeGroup);
		oColumnLayout.addContent(oMatrix);
		oColumnLayout.addContent(oLabelCardOwner);
		oColumnLayout.addContent(oFieldCardOwner);
		oColumnLayout.addContent(oLabelCardNumber);
		oColumnLayout.addContent(oFieldCardNumber);
		oColumnLayout.addContent(oLabelCardSecCode);
		oColumnLayout.addContent(oFieldCardSecCode);

		// IMPORTANT NOTICE:
		// in this example the credit card data is not bound and not send to the backend!!
		// here we perform only a check of the mandatory field
		// in reality a service of the corresponding credit card company would be invoked to validate the entered data!

		this.attachBrowserEvent("keyup", sap.app.validator.checkRequiredFields);

		this.bindContext("/payment");
		return oColumnLayout;

	}

});
