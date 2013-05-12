sap.ui.controller("espm-ui-reviews-web.customer-review-creation", {

	onBeforeRendering: function() {
  		var oProductsDropdownBox = sap.ui.getCore().byId("product-selection-dropdown-box-id");
  		var oProductNameText = sap.ui.getCore().byId("review-product-name-text-id");

  		oProductNameText.setText( sap.app.i18n.getProperty("PRODUCT_NAME_LABEL") + ": " + oProductsDropdownBox.getValue());
	},
	
	publishReview: function(selectedProductId) {

		var oCommentField = sap.ui.getCore().byId("review-comment-text-area-id");
		var oRatingField = sap.ui.getCore().byId("review-rating-indicator-id");
		var oFirstNameField = sap.ui.getCore().byId("review-first-name-field-id");
		var oLastNameField = sap.ui.getCore().byId("review-last-name-field-id");
	
		var customerReview = {};

		// user defined
		customerReview.Comment = oCommentField.getValue();
		customerReview.FirstName = oFirstNameField.getValue();
		customerReview.LastName = oLastNameField.getValue();
		customerReview.Rating = oRatingField.getValue();

		// calculated (productive) or predefined (for development only)

		// creation date
		var oCreationDateField = sap.ui.getCore().byId("review-creation-date-field-id");

		// development case
		if(oCreationDateField!=null){
			customerReview.CreationDate = oCreationDateField.getValue();
		} else{
			customerReview.CreationDate = new Date().toISOString().replace("Z", "0000");
		}
		var oProductIdField = sap.ui.getCore().byId("review-product-id-field-id");

		if(oProductIdField!=null){
			customerReview.ProductId = oProductIdField.getValue();
		} else{
			customerReview.ProductId = selectedProductId;
		}

		// create customer review
		sap.ui.getCore().getModel("extensionodatamodel").create("/CustomerReviews", customerReview, null, sap.app.readOdata.createCustomerReviewSuccess, sap.app.readOdata.readError );
		sap.ui.getCore().byId("customer-review-creation-dialog-id").close();
	},

	checkSubmitButtonEnabledState: function(commentLiveValue, firstNameLiveValue, lastNameLiveValue) {

		// comment
		var commentEnabled;
		if (commentLiveValue!=null) {
			commentEnabled = (commentLiveValue!=="");
		} else {
			commentEnabled = sap.ui.getCore().byId(
					"review-comment-text-area-id").getValue()!=="";
		}
		
		// rating indicator
		var ratingIndicatorEnabled = sap.ui.getCore().byId("review-rating-indicator-id").getValue()>0;

		// first name
		var firstNameEnabled;
		if (firstNameLiveValue!=null) {
			firstNameEnabled = (firstNameLiveValue!=="");
		} else {
			firstNameEnabled = sap.ui.getCore().byId("review-first-name-field-id").getValue()!=="";
		}

		// last name
		var lastNameEnabled;
		if (lastNameLiveValue!=null) {
			lastNameEnabled = (lastNameLiveValue!=="");
		} else {
			lastNameEnabled = sap.ui.getCore().byId("review-last-name-field-id").getValue()!=="";
		}
		
		// submit button
		var oSubmitButton = sap.ui.getCore().byId("customer-review-creation-submit-button-id");
		if(commentEnabled && ratingIndicatorEnabled && firstNameEnabled && lastNameEnabled ){
			oSubmitButton.setEnabled(true);			
		}else{
			oSubmitButton.setEnabled(false);	
		}
	},

	resetReviewCreationForm: function() {
		// comment
		var oCommentTextArea = sap.ui.getCore().byId("review-comment-text-area-id");
		if(oCommentTextArea!=null){
			oCommentTextArea.setValue("");			
		}
		// rating
		var oRatingIndicator = sap.ui.getCore().byId("review-rating-indicator-id");
		if(oRatingIndicator!=null){			
			oRatingIndicator.setValue(0.0);
		}
		
		// firstName
		var oFirstNameField = sap.ui.getCore().byId("review-first-name-field-id");
		if(oFirstNameField!=null){			
			oFirstNameField.setValue("");
		}
		
		// lastName
		var oLastNameField = sap.ui.getCore().byId("review-last-name-field-id");
		if(oLastNameField!=null){			
			oLastNameField.setValue("");
		}
	},

});