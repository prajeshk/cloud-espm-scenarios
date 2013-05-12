sap.ui.controller("espm-ui-reviews-web.product-selection", {

	onInit : function() {
		var that = this;

		var oEventBus = sap.ui.getCore().getEventBus();
		oEventBus.subscribe("sap.app", "selectedCategoryChanged", function(channelId, eventId, selectedCategory) {
			that.getProductDropDownBoxContents(selectedCategory);
		});

		var aFilter = [];

		var oProductsDropdownBox = sap.ui.getCore().byId("product-selection-dropdown-box-id");

		// set binding for items to make filtering working
		oProductsDropdownBox.bindItems("/Products", this.oView.getProductsListItemTemplate(), new sap.ui.model.Sorter(
				"Name", false), aFilter);
	},

	getProductDropDownBoxContents : function(selectedCategory) {
		var aFilter = [];

		if (selectedCategory !== sap.app.i18n.getProperty("ALL_CATEGORIES_LIST_ENTRY")) {
			var categoryFilter = new sap.ui.model.Filter("Category", sap.ui.model.FilterOperator.EQ, selectedCategory);
			aFilter.push(categoryFilter);
		}
		// get dropdown box
		var oProductsDropdownBox = sap.ui.getCore().byId("product-selection-dropdown-box-id");

		// set binding for items to make filtering working
		oProductsDropdownBox.bindItems("/Products", this.oView.getProductsListItemTemplate(), new sap.ui.model.Sorter(
				"Name", false), aFilter);
	},

	selectedProductChanged : function(oEvent) {

		// set binding context for product details controls
		var selectedItemId = oEvent.oSource.getSelectedItemId();
		var bindingCtx = sap.ui.getCore().byId(selectedItemId).getBindingContext();
		this.getView().getController().setProductDetailsBindingContext(bindingCtx);

		var oEventBus = sap.ui.getCore().getEventBus();
		var selectedKey = oEvent.oSource.getSelectedKey();
		oEventBus.publish("sap.app", "selectedProductIdChanged", selectedKey);
},

	setProductDetailsBindingContext : function(bindingCtx) {
		sap.ui.getCore().byId("selected-product-image-id").setBindingContext(bindingCtx);
		sap.ui.getCore().byId("selected-product-name-view-id").setBindingContext(bindingCtx);
		sap.ui.getCore().byId("selected-product-desc-view-id").setBindingContext(bindingCtx);
	},

	openCustomerReviewCreationDialog: function() {
		var oCustomerReviewCreationView = sap.app.mainController.getCachedView("customer-review-creation");
		var oCustomerReviewCreationDialog = sap.ui.getCore().byId("customer-review-creation-dialog-id");

		if( oCustomerReviewCreationDialog==null){
			oCustomerReviewCreationDialog = new sap.ui.commons.Dialog({
				id : "customer-review-creation-dialog-id",
				showCloseButton : true,
				resizable : true,
				title : "{i18n>CREATE_REVIEW_DIALOG_TITLE}",
				buttons : [ new sap.ui.commons.Button({
						id : "customer-review-creation-submit-button-id",
						text : "{i18n>SUBMIT_BUTTON}",
						enabled: false,
						press : function(){oCustomerReviewCreationView.getController().publishReview(
								sap.ui.getCore().byId(
										"product-selection-dropdown-box-id")
										.getSelectedKey());}
								}) ],
				content : [oCustomerReviewCreationView],
			});
			oCustomerReviewCreationDialog.addButton();
		}
		oCustomerReviewCreationView.getController().resetReviewCreationForm();
		oCustomerReviewCreationDialog.open();
	}

});
