sap.ui.jsview("espm-ui-shopping-web.customer-review-creation", {

	getControllerName : function() {
		return "espm-ui-shopping-web.customer-review-creation";
	},

	createContent : function(oController) {

		var oMatrixLayout = new sap.ui.commons.layout.MatrixLayout(
				{
					layoutFixed : false,
					width : "100%",
					columns : 2,
					widths : [ '50%', '50%' ]
				});

		// product name
		oMatrixLayout
				.createRow(new sap.ui.commons.layout.MatrixLayoutCell(
						{
							content : [ new sap.ui.commons.TextView(
									{
										id : "review-product-name-text-id",
										text : "",
										design : sap.ui.commons.TextViewDesign.Bold
									}) ]
						}));

		// review comment
		oMatrixLayout
				.createRow(new sap.ui.commons.layout.MatrixLayoutCell(
						{
							colSpan: 2,
							content : [ new sap.ui.commons.Label(
									{
										text : "{i18n>COMMENT_LABEL}"
									})]
						}));
		oMatrixLayout
				.createRow(new sap.ui.commons.layout.MatrixLayoutCell(
						{
							colSpan: 2,
							content : [ new sap.ui.commons.TextArea(
									{
										id : "review-comment-text-area-id",
										editable : true,
										wrapping : sap.ui.core.Wrapping.Off,
										value : '',
										width : "500px",
										height : "150px",
										liveChange : function(oEvent) 
										{
											oController.checkSubmitButtonEnabledState(oEvent.getParameter("liveValue"),null,null);
										}
									})]
						}));

		// rating
		oMatrixLayout
				.createRow(
						new sap.ui.commons.layout.MatrixLayoutCell(
								{
									content : [ new sap.ui.commons.Label(
											{
												text : "{i18n>RATING_LABEL}"
											}) ]
								}),
						new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Right,
									content : [ new sap.ui.commons.RatingIndicator(
											{
												id : "review-rating-indicator-id",
												editable : true,
												maxValue : 5,
												value : 0,
												visualMode : sap.ui.commons.RatingIndicatorVisualMode.Half,
												change : function() {
													oController
															.checkSubmitButtonEnabledState();
												}
											}) ]
								}));

		// firstName
		oMatrixLayout
				.createRow(
						new sap.ui.commons.layout.MatrixLayoutCell(
								{
									content : [ new sap.ui.commons.Label(
											{
												text : "{i18n>FIRST_NAME_LABEL}"
											}) ]
								}),
						new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Right,
									content : [ new sap.ui.commons.TextField(
											{
												id : "review-first-name-field-id",
												value : "",
												liveChange : function(oEvent) {
													oController.checkSubmitButtonEnabledState(null, oEvent.getParameter("liveValue"), null);;
												}
											}) ]
								}));
		// lastName
		oMatrixLayout
				.createRow(
						new sap.ui.commons.layout.MatrixLayoutCell(
								{
									content : [ new sap.ui.commons.Label(
											{
												text : "{i18n>LAST_NAME_LABEL}"
											}) ]
								}),
						new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Right,
									content : [ new sap.ui.commons.TextField(
											{
												id : "review-last-name-field-id",
												value : "",
												liveChange : function(oEvent) {
													oController.checkSubmitButtonEnabledState(null, null, oEvent.getParameter("liveValue"));
												}
											}) ]
								}));

		// creationDate (uncomment for DEVELOPMENT ONLY)
//		oMatrixLayout
//				.createRow(
//						new sap.ui.commons.layout.MatrixLayoutCell(
//								{
//									content : [ new sap.ui.commons.Label(
//											{
//												text : "Creation Date (DEVELOPMENT ONLY!)"
//											}) ]
//								}),
//						new sap.ui.commons.layout.MatrixLayoutCell(
//								{
//									hAlign : sap.ui.commons.layout.HAlign.Right,
//									content : [ new sap.ui.commons.TextField(
//											{
//												id : "review-creation-date-field-id",
//												value : "2013-07-01T11:55:00.0000000",
//											}) ]
//								}));

		// productId (uncomment for DEVELOPMENT ONLY)
//		oMatrixLayout
//				.createRow(
//						new sap.ui.commons.layout.MatrixLayoutCell(
//								{
//									content : [ new sap.ui.commons.Label(
//											{
//												text : "ProductId (DEVELOPMENT ONLY!)"
//											}) ]
//								}),
//						new sap.ui.commons.layout.MatrixLayoutCell(
//								{
//									hAlign : sap.ui.commons.layout.HAlign.Right,
//									content : [ new sap.ui.commons.TextField(
//											{
//												id : "review-product-id-field-id",
//												value : "HT-2001",
//											}) ]
//								}));

		return(oMatrixLayout);
	}

});
