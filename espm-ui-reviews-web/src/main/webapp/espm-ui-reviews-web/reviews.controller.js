sap.ui.controller("espm-ui-reviews-web.reviews", {

	onInit : function() {
	},

	showProductSelectionPanel : function() {
		sap.app.uivisibility.setUiControlIsVisible("reviews-view-product-selection-panel-id", true);
	},

	showFilledCustomerReviewsPanel: function() {
		this.showProductSelectionPanel();
		sap.app.uivisibility.showRowRepeaterHeaderLayout();
		sap.app.uivisibility.showRowRepeater();
		sap.app.uivisibility.hideRowRepeaterFooterLayout();
	},

	showEmptyCustomerReviewsPanel: function() {
		this.showProductSelectionPanel();
		sap.app.uivisibility.hideRowRepeaterHeaderLayout();
		sap.app.uivisibility.hideRowRepeater();
		sap.app.uivisibility.showRowRepeaterFooterLayout();
	},

	showLoadingCustomerReviewsPanel: function() {
		sap.ui.getCore().byId("reviews-view-customer-reviews-panel-id").setVisible(true);
		sap.app.uivisibility.hideRowRepeaterHeaderLayout();
		sap.app.uivisibility.hideRowRepeater();
		sap.app.uivisibility.hideRowRepeaterFooterLayout();
	},

});
