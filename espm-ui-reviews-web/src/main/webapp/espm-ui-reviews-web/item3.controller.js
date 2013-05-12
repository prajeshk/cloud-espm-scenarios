sap.ui.controller("espm-ui-reviews-web.item3", {
	createReview : function() {
		var oCommentField = sap.ui.getCore().byId("item3-comment-field-id");

		var oCustomerReview = {};

		// user defined
		oCustomerReview.Comment = oCommentField.getValue();
		oCustomerReview.FirstName = "First name (test)";
		oCustomerReview.LastName = "Last name (test)";
		oCustomerReview.Rating = "3";
		oCustomerReview.CreationDate = new Date().toISOString().replace("Z", "0000");
		oCustomerReview.ProductId = "HT-2000";

		// create customer review
		sap.ui.getCore().getModel("extensionodatamodel").create("/CustomerReviews", oCustomerReview, null,
				sap.app.readOdata.readSuccess, sap.app.readOdata.readError);

	}
});