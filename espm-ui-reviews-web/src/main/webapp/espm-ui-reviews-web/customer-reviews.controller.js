sap.ui.controller("espm-ui-reviews-web.customer-reviews", {

	onInit: function () {

		var oModel = new sap.ui.model.json.JSONModel({selectedProductId: "", isInitialCustomerReviewsCall: true});
		this.getView().setModel(oModel);

		var that = this;
		var oEventBus = sap.ui.getCore().getEventBus();
		oEventBus.subscribe("sap.app", "selectedProductIdChanged", function(channelId, eventId, selectedProductId) {
			that.getView().getModel().setProperty("selectedProductId", selectedProductId );
			that.getCustomerReviews();
		});
	},

	getCustomerReviews: function() {
		var selectedProductId = this.getView().getModel().getData()["selectedProductId"];
		var isInitialCustomerReviewsCall = this.getView().getModel().getData()["isInitialCustomerReviewsCall"];

		// set initialCustomerReviewsCall to false
		this.getView().getModel().setProperty("isInitialCustomerReviewsCall", false );

		var extensionODataModel = sap.ui.getCore().getModel("extensionodatamodel");
		var oRowRepeater = sap.ui.getCore().byId("customer-reviews-row-repeater-id");

		// set model and bind rows
		oRowRepeater.setModel(extensionODataModel);

		// hide row repeater
		sap.app.uivisibility.showLoadingCustomerReviewsPanel();

		var oModelFilter = new sap.ui.model.Filter("ProductId", sap.ui.model.FilterOperator.EQ, selectedProductId);
		if(isInitialCustomerReviewsCall){
			// sorter
			var oModelSorter = new sap.ui.model.Sorter("CreationDate",true);
			var oModelFilters = [];
			oModelFilters.push( oModelFilter );

			// As bindRows is an aync call the getBinding().filter method call might get lost
			// so the filter has to be passed in the same call and not separately
			// check issue https://jtrack/browse/NGPBUG-7580
			oRowRepeater.bindRows("/CustomerReviews", this.oView.getRowRepeaterTemplate(), oModelSorter, oModelFilters );
			oRowRepeater.getBinding("rows").filter(oModelFilters);
		} else{
			// change row repeater filter
			var oRowReaterFilter = new sap.ui.commons.RowRepeaterFilter({text:"hiddenByCssClass",filters:[oModelFilter]});

			oRowRepeater.getBinding("rows").aFilters= [];
			oRowRepeater.getBinding("rows").aPredefinedFilters= [];

			oRowRepeater.removeAllFilters();
			oRowRepeater.addFilter(oRowReaterFilter);
			oRowRepeater.applyFilter(oRowReaterFilter.getId());
		}
	},

	setRatingIndicatorValue: function(ratingValue) {
		sap.ui.getCore().byId("customer-reviews-header-rating-indicator-id").setValue(ratingValue);
	},

	showRowRepeaterHeaderLayout: function() {
		sap.app.uivisibility.setUiControlIsVisible("customer-reviews-header-layout-id", true);
	},

	hideRowRepeaterHeaderLayout: function() {
		sap.app.uivisibility.setUiControlIsVisible("customer-reviews-header-layout-id", false);
	},

	showRowRepeaterFooterLayout: function() {
		sap.app.uivisibility.setUiControlIsVisible("customer-reviews-footer-layout-id", true);
	},

	hideRowRepeaterFooterLayout: function() {
		sap.app.uivisibility.setUiControlIsVisible("customer-reviews-footer-layout-id", false);
	},

	showRowRepeater: function() {
		sap.app.uivisibility.setUiControlIsVisible("customer-reviews-row-repeater-id", true);
	},

	hideRowRepeater: function() {
		sap.app.uivisibility.setUiControlIsVisible("customer-reviews-row-repeater-id", false);
	},

});