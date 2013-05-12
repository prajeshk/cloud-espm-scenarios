/** formatter.js
 *
 *
 */

jQuery.sap.declare("sap.app.formatter");

jQuery.sap.require("sap.app.config");
jQuery.sap.require("sap.ui.core.format.NumberFormat");

// define some formatting functions for usage on UI
sap.app.formatter = {

	currencyFormat : sap.ui.core.format.NumberFormat.getFloatInstance({
		maxFractionDigits : 2,
		minFractionDigits : 2,
		groupingEnabled : true,
		groupingSeparator : ".",
		decimalSeparator : ","
	}),

	productImage : function(src) {
		if (!src) return sap.app.config.productPlaceholderImg;
		return ("proxy/" + sap.app.utility.getBackendImagesDestination() + sap.app.utility.getImagesBaseUrl() + src);
	},

	price : function(price) {
		if (price !== 0 && !price) return;
		return sap.app.config.currencyFormat.replace("%1", sap.app.formatter.currencyFormat.format(price));
	},

	total : function(price) {
		if (price !== 0 && !price) return;
		return sap.app.i18n.getProperty("SHOPPING_CART_TOTAL") + " " + sap.app.config.currencyFormat.replace("%1", sap.app.formatter.currencyFormat.format(price));
	},

	pluralize : function(n, singular, plural) {
		if (n === 1) {
			return n + " " + singular;
		}
		return n + " " + plural;
	},

	combinedCategoryCount: function (category) {
		if (!category) return;
		var count = this.getModel().getProperty("numberOfProducts", this.getBindingContext());
		return category + " (" + count + ")";
	},

	combinedProductResultCount: function (text, count) {
		if (count <= 0) return;

		return text + " (" + count + ")";
	},

	/**
	 *  @description: replace all but the last for digits with asterisks
	 */
	obfuscateCreditCardNumber: function(sIn) {
		if (!sIn) return;
		sIn = sIn + ""; // convert input value to string, just in case
		var sOut = "";
		for (var i = 0; i < sIn.length - 4; i++) {
			sOut += "*";
		}
		sOut += sIn.substr(sIn.length - 4, 4);
		return sOut;
	},
	/**
	 *  @sSalesOrderId:  sales order id for confirmation page
	 */
	confirmationOrder : function(sSalesOrderId) {
		if (sSalesOrderId !== '' && !sSalesOrderId) return;
		return sap.app.i18n.getProperty("MSG_SUCCESS_ORDER_CREATED").replace(/&1/,sSalesOrderId);
	},
	/**
	 *  @salesOrderId:  sales order id for confirmation page
	 */
	confirmationCustomer : function(sCustomerId) {
		if (sCustomerId !== '' && !sCustomerId) return;
		//var sEmail = this.getModel().getProperty("/customer/EmailAddress");
		var sText = sap.app.i18n.getProperty("MSG_SUCCESS_ACCOUNT_CREATED").replace(/&1/,sCustomerId);
		//sText = sText.replace(/&2/,sEmail);
		return sText;
	},
};
