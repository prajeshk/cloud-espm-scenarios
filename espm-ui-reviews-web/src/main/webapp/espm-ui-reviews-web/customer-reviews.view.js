jQuery.sap.require("sap.ui.core.format.DateFormat");

sap.ui.jsview("espm-ui-reviews-web.customer-reviews", {

	getControllerName : function() {
		return "espm-ui-reviews-web.customer-reviews";
	},

	createContent : function(oController) {

		var oCustomerReviewsLayout = new sap.ui.commons.layout.MatrixLayout({
			width : "100%"
		});

		// display data source info
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO)) {
			oCustomerReviewsLayout.createRow( this.getDataSourceInfoLayout() );
		}
		oCustomerReviewsLayout.createRow( this.getRowRepeaterHeaderLayout() );
		oCustomerReviewsLayout.createRow( this.getRowRepeater() );
		oCustomerReviewsLayout.createRow( this.getRowRepeaterFooterLayout() );

		return oCustomerReviewsLayout;
	},

	getDataSourceInfoLayout: function() {
		var oDataSourceInfoLayout = new sap.ui.commons.layout.MatrixLayout({
			width : "100%",
		});

		oDataSourceInfoLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [
					new sap.ui.commons.TextView({
						text : sap.app.i18n.getProperty("DATA_SOURCE_INFO") + ":",
						wrapping : false,
						design : sap.ui.commons.TextViewDesign.Bold
					}),
					new sap.ui.commons.TextView({
						text : sap.app.i18n.getProperty("DATA_SOURCE_INFO_EXT_DATA_RETRIEVED_FROM"),
						wrapping : false,
					}).addStyleClass("textViewMarginsLeftRight"), new sap.ui.commons.TextView({
						text : '(',
						wrapping : false,
					}), new sap.ui.commons.Link({
						text : "{i18n>DATA_SOURCE_INFO_EXT_LINK_TEXT}",
						href : sap.app.config.cloudExtentionOdataServiceUrl,
						target : "_blank"
					}), new sap.ui.commons.TextView({
						text : ')',
					}) ]
		}));

		return oDataSourceInfoLayout;
	},

	getRowRepeaterHeaderLayout: function() {

		var oRowRepeaterHeaderLayout = new sap.ui.commons.layout.MatrixLayout({
			id : "customer-reviews-header-layout-id",
			visible : false,
			layoutFixed : false,
			columns : 1,
			width : "100%"
		});

		var oAverageRatingIndicator = new sap.ui.commons.RatingIndicator({
			id : "customer-reviews-header-rating-indicator-id",
			maxValue : 5,
			value : 3,
			editable : false
		});

		var oAverageRatingVerticalLayout = new sap.ui.commons.layout.VerticalLayout({
			content : [new sap.ui.commons.TextView({text: "{i18n>AVARAGE_RATING_LABEL}"}), oAverageRatingIndicator]
		});

		// layout <- row <- cell <- content
		oRowRepeaterHeaderLayout
				.addRow(new sap.ui.commons.layout.MatrixLayoutRow()
						.addCell(new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Left,
									content : [ oAverageRatingVerticalLayout ]
								})));

		return oRowRepeaterHeaderLayout;
	},

	getRowRepeaterFooterLayout: function() {

		var oRowRepeaterFooterLayout = new sap.ui.commons.layout.MatrixLayout({
			id : "customer-reviews-footer-layout-id",
			visible : false,
			layoutFixed : false,
			columns : 1,
			width : "100%"
		});

		// layout <- row <- cell <- content
		oRowRepeaterFooterLayout
				.addRow(new sap.ui.commons.layout.MatrixLayoutRow()
						.addCell(new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Left,
									content : [ new sap.ui.commons.TextView({text: "{i18n>NO_CUSTOMER_REVIEWS_MSG}"}) ]
								})));

		return oRowRepeaterFooterLayout;
	},

	getRowRepeater: function() {
		// row repeater 
		var oRowRepeater = new sap.ui.commons.RowRepeater({
				id : "customer-reviews-row-repeater-id",
				visible : false,
				numberOfRows : 2,
				currentPage : 1,
				design : sap.ui.commons.RowRepeaterDesign.Standard,
				noData : new sap.ui.commons.TextView({
					text : ""
				})
			});
		oRowRepeater.addStyleClass("hiddenRowRepeaterToolbarCustomerReviews");
		oRowRepeater.addStyleClass("hiddenRowRepeaterBarCustomerReviews");

		return oRowRepeater;
	},

	getRowRepeaterTemplate: function() {

		// return template immediately if already defined
		if (this.rowRepeaterTemplate){
			return this.rowRepeaterTemplate;
		}

		// create the template control that will be repeated and display the customer review data
		var oRowRepeaterLayoutTemplate = new sap.ui.commons.layout.MatrixLayout(
				{
					layoutFixed : false,
					columns : 2,
					width : "100%"
				});

		// 1. row repeater line: firstName, lastName, date and rating indicator
		oRowRepeaterLayoutTemplate
				.createRow(
						new sap.ui.commons.layout.MatrixLayoutCell(
								{
									content : [ new sap.ui.commons.layout.HorizontalLayout(
											{
												content : [
														new sap.ui.commons.TextView(
																{
																	text : "{FirstName}"
																})
																.addStyleClass("textViewMarginCustomerReviewHeader"),
														new sap.ui.commons.TextView(
																{
																	text : "{LastName}"
																}),
														new sap.ui.commons.TextView(
																{
																	text : ","
																})
																.addStyleClass("textViewMarginCustomerReviewHeader"),
														new sap.ui.commons.TextView(
																{
																	text : {
																		path : "CreationDate",
																		formatter : function formatDisplayDateTime(
																				d) {
																			if (d != null) {
																				var oDate = new Date(d);
																				return (oDate.toLocaleDateString()
																						+ " " + oDate.toLocaleTimeString());
																			} else {
																				return (sap.app.i18n.getProperty("CORRUPT_DATE_FORMAT_MSG"));
																			}
																		}
																	}
																}),
														new sap.ui.commons.TextView(
																{
																	text : "{ProductId}"
																})
																.addStyleClass("hiddenTextViewProductId") ]
											})
											.addStyleClass("layoutPaddingCustomerReviewHeader") ]
								}),
						new sap.ui.commons.layout.MatrixLayoutCell(
								{
									hAlign : sap.ui.commons.layout.HAlign.Right,
									content : [ new sap.ui.commons.RatingIndicator(
											{
												editable : false,
												maxValue : 5,
												value : {
													path : "Rating",
													formatter : function(
															value) {
														return parseFloat(value);
													}
												},
												visualMode : sap.ui.commons.RatingIndicatorVisualMode.Continuous
											})
											.addStyleClass("ratingIndicatorPadding") ]
								}));

		// 2. row repeater line: comment area
		oRowRepeaterLayoutTemplate
				.createRow(new sap.ui.commons.layout.MatrixLayoutCell(
						{
							colSpan : 2,
							content : [ new sap.ui.commons.TextArea(
									{
										value : "{Comment}",
										editable : false,
										width : "100%",
										rows : 4
									}) ]
						}));

		this.rowRepeaterTemplate = oRowRepeaterLayoutTemplate;

		return this.rowRepeaterTemplate;
	}

});
