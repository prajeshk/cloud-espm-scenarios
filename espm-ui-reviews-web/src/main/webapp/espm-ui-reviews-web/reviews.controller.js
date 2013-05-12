sap.ui.controller("espm-ui-reviews-web.reviews", {

	onInit : function() {
	},

	showProductSelectionPanel : function() {
		sap.app.uivisibility.setUiControlIsVisible("reviews-view-product-selection-panel-id", true);
	},
});
