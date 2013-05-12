sap.ui.jsview("espm-ui-shopping-web.checkoutStep4", {

	getControllerName : function() {
		return "espm-ui-shopping-web.checkoutStep4";
	},

	createContent : function(oController) {

		var oProductList = sap.ui.getCore().byId("checkout-cart-rr");

		var oTotal = sap.ui.getCore().byId("checkout-cart-total-amount");

		// Name & Address
		var oTitleName = new sap.ui.commons.TextView({
			text: "{i18n>TITLE_CHECKOUT_STEP_2}",
			design: sap.ui.commons.TextViewDesign.H2
		});
		var oDivider = new sap.ui.commons.HorizontalDivider();
		var oColumn1Layout = new sap.ui.commons.layout.VerticalLayout({
			id: "co4-address-columns-left",
			width: "200px"
		});
		var oColumn2Layout = new sap.ui.commons.layout.VerticalLayout({
			id: "co4-address-columns-right",
			width: "400px"
		});
		var oLabelFirstName = new sap.ui.commons.Label({
			text: "{i18n>LBL_FIRST_NAME}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldFirstName = new sap.ui.commons.TextView({
			text: "{/customer/FirstName}"
		});
		var oLabelLastName = new sap.ui.commons.Label({
			text: "{i18n>LBL_LAST_NAME}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldLastName = new sap.ui.commons.TextView({
			text: "{/customer/LastName}"
		});
		var oLabelDateOfBirth = new sap.ui.commons.Label({
			text: "{i18n>LBL_DATE_OF_BIRTH}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldDateOfBirth = new sap.ui.commons.TextView({
			text: { path: "/customer/DateOfBirth",  type: new sap.ui.model.type.Date()  },
		});
		var oLabelEmail = new sap.ui.commons.Label({
			text: "{i18n>LBL_EMAIL}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldEmail = new sap.ui.commons.TextView({
			text: "{/customer/EmailAddress}"
		});
		var oLabelStreet = new sap.ui.commons.Label({
			text: "{i18n>LBL_ADDRESS_STREET}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldStreet = new sap.ui.commons.TextView({
			text: "{/customer/Street}"
		});
		var oLabelCity = new sap.ui.commons.Label({
			text: "{i18n>LBL_ADDRESS_CITY}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldCity = new sap.ui.commons.TextView({
			text: "{/customer/City}"
		});
		var oLabelZipcode = new sap.ui.commons.Label({
			text: "{i18n>LBL_ADDRESS_ZIP}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldZipcode = new sap.ui.commons.TextView({
			text: "{/customer/PostalCode}"
		});
		var oLabelCountry = new sap.ui.commons.Label({
			text: "{i18n>LBL_ADDRESS_COUNTRY}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldCountry = new sap.ui.commons.TextView({
			text: {
				path: "/customer/Country",
				formatter: function(sCountryCode) {
					if (!sCountryCode) return;
					var sCountryName = sap.app.countryBundle.getText(sCountryCode);
					return sCountryName;
				}
			}
		});
		oColumn1Layout.addContent(oLabelFirstName);
		oColumn2Layout.addContent(oFieldFirstName);
		oColumn1Layout.addContent(oLabelLastName);
		oColumn2Layout.addContent(oFieldLastName);
		oColumn1Layout.addContent(oLabelDateOfBirth);
		oColumn2Layout.addContent(oFieldDateOfBirth);
		oColumn1Layout.addContent(oLabelEmail);
		oColumn2Layout.addContent(oFieldEmail);
		oColumn1Layout.addContent(oLabelStreet);
		oColumn2Layout.addContent(oFieldStreet);
		oColumn1Layout.addContent(oLabelCity);
		oColumn2Layout.addContent(oFieldCity);
		oColumn1Layout.addContent(oLabelZipcode);
		oColumn2Layout.addContent(oFieldZipcode);
		oColumn1Layout.addContent(oLabelCountry);
		oColumn2Layout.addContent(oFieldCountry);

		var oAddressLayout = new sap.ui.commons.layout.HorizontalLayout({
			id: "co4-address-layout",
			width: "600px",
			content: [
				oColumn1Layout,
				oColumn2Layout
			]
		}).addStyleClass("checkout-summary-area");


		// Payment info
		var oTitlePayment = new sap.ui.commons.TextView({
			text: "{i18n>TITLE_CHECKOUT_STEP_3}",
			design: sap.ui.commons.TextViewDesign.H2
		});
		var oDivider2 = new sap.ui.commons.HorizontalDivider();

		var oPaymentLayout1 = new sap.ui.commons.layout.VerticalLayout({
			width: "200px"
		});
		var oPaymentLayout2 = new sap.ui.commons.layout.VerticalLayout({
			width: "200px"
		});

		var oLabelCardType = new sap.ui.commons.Label({
			text: "{i18n>LBL_CARD_TYPE}",
			design: sap.ui.commons.LabelDesign.Bold
		});

		var sIconSrc = "images/icon-credit-" + sap.app.checkoutController.getView().getModel().getProperty("/payment/type") + ".png";
		var oImageCardType = new sap.ui.commons.Image({src : sIconSrc, height: "18px" });

		var oLabelCardOwner = new sap.ui.commons.Label({
			text: "{i18n>LBL_CARD_OWNER}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldCardOwner = new sap.ui.commons.TextView({
			text: "{/payment/cardOwner}"
		});
		var oLabelCardNumber = new sap.ui.commons.Label({
			text: "{i18n>LBL_CARD_NUMBER}",
			design: sap.ui.commons.LabelDesign.Bold
		});
		var oFieldCardNumber = new sap.ui.commons.TextView({
			text: {
				path: "/payment/cardNumber",
				formatter: sap.app.formatter.obfuscateCreditCardNumber
			}
		});
		oPaymentLayout1.addContent(oLabelCardType);
		oPaymentLayout2.addContent(oImageCardType);
		oPaymentLayout1.addContent(oLabelCardOwner);
		oPaymentLayout2.addContent(oFieldCardOwner);
		oPaymentLayout1.addContent(oLabelCardNumber);
		oPaymentLayout2.addContent(oFieldCardNumber);

		var oPaymentLayout = new sap.ui.commons.layout.HorizontalLayout({
			id: "co4-payment-layout",
			width: "600px",
			content: [
				oPaymentLayout1,
				oPaymentLayout2
			]
		}).addStyleClass("checkout-summary-area");

		var oWrapperItems = new sap.ui.commons.layout.VerticalLayout({
			id: "summary-content-of-items",
			width: "100%",
			content: [ oProductList ]
		});
		var oWrapperTotal = new sap.ui.commons.layout.VerticalLayout({
			id: "summary-content-of-total",
			width: "100%",
			content: [ oTotal ]
		});

		var oWrapper = new sap.ui.commons.layout.VerticalLayout({
			id: "summary-list",
			width: "100%",
			content: [
				oTitleName,
				oDivider,
				oAddressLayout,
				oTitlePayment,
				oDivider2,
				oPaymentLayout
			]
		});
		return [oWrapperItems, oWrapperTotal, oWrapper];
	}

});
