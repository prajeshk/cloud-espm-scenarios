sap.ui.jsview("espm-ui-shopping-web.productDetail", {

	getControllerName : function() {
		return "espm-ui-shopping-web.productDetail";
	},

	/**
	 * createContent: creates the ThingInspector which is used for displaying the product details
	 * @param oController
	 */
	createContent : function(oController) {

		var that = this;
		var oProductDetail = new sap.ui.ux3.ThingInspector({
			id : "detail-layout-content",
			openButtonVisible : false,
			closeButtonVisible : true,
			firstTitle : "{Name}",
			type : "{Category}",
			icon : {
				path: "PictureUrl",
				formatter: sap.app.formatter.productImage
			},
			flagState : false,
			favoriteState : false,
			favoriteActionEnabled : false,
			updateActionEnabled : false,
			followActionEnabled : false,
			flagActionEnabled : false,
			actions : [ new sap.ui.ux3.ThingAction({
				id : "action_close",
				text : "{i18n>PRODUCT_DETAIL_BUTTON_CLOSE}",
				enabled : true,
			}) ],
			headerContent : this.getHeaderContent(),
			facets : [
				new sap.ui.ux3.NavigationItem({
					id : "detail_facet",
					text : "{i18n>TI_FACET_ITEM_DETAILS}",
					enabled : true,
					textDirection : sap.ui.core.TextDirection.Inherit,
					key : "detail_facet"
				})
			],
			facetContent : [this.getFacetContent()],
			actionSelected : [ function(oEvent) {
				var oAction = oEvent.getParameter("action");
				var sActionId = oAction.getId();

				if(sActionId == "action_close"){
					that.resetErrors(oEvent);
					if(oProductDetail.isOpen()){
						oProductDetail.close();
						return;
					}
				}
			} ],
			close : function(oEvent) {
				that.resetErrors(oEvent);
			}
		});

	},

	/**
	 * resetErrors: event handler invoked when thing inspector is closed, removes the errors in the notification bar
	 * @param oEvent
	 */
	resetErrors: function(oEvent) {
		// Reset the errors, otherwise the errors will persist when opening the thing inspector again (because view with thing inspector is cached)
		// here we reset to the default state in every case without evaluating before if it is really needed
		var oActionGroup = sap.ui.getCore().byId("detail_header_group3_actions");
		// set the quantity back to the default value 1
		var oQuantity = oActionGroup.quantityField;
		sap.app.messages.removeMessage( oQuantity.getId() );
		oQuantity.setValue("1");
		// remove the red color of the field
		oQuantity.setValueState( sap.ui.core.ValueState.None);
		// enable the buttons (again)
		var oButton = oActionGroup.buyNowButton;
		oButton.setEnabled(true);
		oButton = oActionGroup.addToCartButton;
		oButton.setEnabled(true);
	},

	/**
	 * getHeaderContent: get content for header of ThingInspector
	 */
	getHeaderContent: function () {
		// Group: general Information
		var oGeneralInfo = new sap.ui.ux3.ThingGroup({
			id : "detail_header_group1",
			title : "{i18n>TI_GROUP_GENERAL_INFORMATION}",
			content : [
				new sap.ui.commons.layout.MatrixLayout({
					rows: [
						this.subTitle("{i18n>PRODUCT_DETAIL_LABEL_DIMENSIONS}", sap.ui.commons.LabelDesign.Bold),
						this.propertyWithUnit("{i18n>PRODUCT_DETAIL_LABEL_WIDTH}", "{DimensionWidth}", "{DimensionUnit}"),
						this.propertyWithUnit("{i18n>PRODUCT_DETAIL_LABEL_HEIGHT}","{DimensionHeight}","{DimensionUnit}"),
						this.propertyWithUnit("{i18n>PRODUCT_DETAIL_LABEL_DEPTH}","{DimensionDepth}", "{DimensionUnit}"),
						this.subTitle("{i18n>PRODUCT_DETAIL_LABEL_WEIGHT}",sap.ui.commons.LabelDesign.Bold),
						this.propertyWithUnit("", "{Weight}" , "{WeightUnit}"),
						//this.subTitle("{i18n>PRODUCT_DETAIL_LABEL_SUPPLIER}", sap.ui.commons.LabelDesign.Bold ), //is not defined in a service
						// this.subTitle("{SupplierName}" ), is not defined in a service
					] })
			]
		});
		// Group: Price
		var oPriceInfo = new sap.ui.ux3.ThingGroup({
			id : "detail_header_group2",
			content : [
				new sap.ui.commons.layout.MatrixLayout({rows: [
					this.formattedPrice("{i18n>PRODUCT_DETAIL_LABEL_PRICE}", "Price", sap.app.formatter.price, "price-big-size")]
				})
			]
		});
		// Group: Action to add a product to the cart
		var oAddAction = new sap.ui.ux3.ThingGroup({
			id : "detail_header_group3",
			content :[
				new composite.productActions({
					id: "detail_header_group3_actions",
					width: "250px",
					layoutType: "detail",
					captionQuantity: "{i18n>FIELD_PRODUCT_QUANTITY}",
					captionBuyNow: "{i18n>BUTTON_BUY_NOW}",
					captionAddToCart: "{i18n>BUTTON_ADD_TO_CART}"
				})
			]
		});
		return [ oGeneralInfo, oPriceInfo, oAddAction ];
	},

	/**
	 * getFacetContent: get content for facet of ThingInspector
	 */
	getFacetContent: function() {
		// create facet group
		var oFacetGroup = new sap.ui.ux3.ThingGroup({
			id : "facet_group1",
			content : [
				oFacet = new sap.ui.commons.layout.MatrixLayout().addRow(
					// Row with Product picture
					new sap.ui.commons.layout.MatrixLayoutRow({
						cells : [
							new sap.ui.commons.layout.MatrixLayoutCell({
								hAlign : sap.ui.commons.layout.HAlign.Begin,
								vAlign : sap.ui.commons.layout.VAlign.Top,
								content: [
									new sap.ui.commons.Image({
										src: {
											path: "PictureUrl",
											formatter: sap.app.formatter.productImage
										},
										width: "175px",
										height: "175px"
									})
								]
							})
						]
					})
				),
				oFacet.addRow(
					// Row with Product description
					new sap.ui.commons.layout.MatrixLayoutRow({
						cells : [
							new sap.ui.commons.layout.MatrixLayoutCell({
								hAlign : sap.ui.commons.layout.HAlign.Begin,
								vAlign : sap.ui.commons.layout.VAlign.Center,
								content : [
									new sap.ui.commons.TextView({
										text: "{LongDescription}",
									})
								]
							})
						]
					})
				),
			]
		});
		return oFacetGroup;
	},

	/**
	* propertyWithUnit: creates row with three cells, one cell with label, one cell with a text view control, one cell with a Unit
	* @param sLabel1:Label
	* @param sText1
	* @param sText2
	* @returns {sap.ui.commons.layout.MatrixLayoutRow}
	*/
	propertyWithUnit: function(sLabel1, sText1, sText2) {
		var	oControl1 = new sap.ui.commons.TextView({
				text: sText1,
				tooltip: sText1
			});
		var oLabel1 = new sap.ui.commons.Label({
			text: sLabel1,
			labelFor: oControl1
		});
		var oControl2 = new sap.ui.commons.TextView({
			text: sText2,
			tooltip: sText2
		});
		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.End,
			vAlign : sap.ui.commons.layout.VAlign.Top,
			content : [ oLabel1 ]
		});
		var oCell2 = new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.End,
			vAlign : sap.ui.commons.layout.VAlign.Top,
			content : [ oControl1 ]
		});

		var oCell3 = new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Begin,
			vAlign : sap.ui.commons.layout.VAlign.Top,
			content : [ oControl2 ]
		});

		return new sap.ui.commons.layout.MatrixLayoutRow({
			cells : [ oCell1, oCell2, oCell3 ]
		});
	},

	/**
	 * formattedPrice: create row with two cells, one cell with a label, one cell with text view control (formatted or not)
	 * @param sLabel1
	 * @param sText1
	 * @param oFormatter
	 * @param sClassName
	 * @returns {sap.ui.commons.layout.MatrixLayoutRow}
	 */
	formattedPrice: function(sLabel1, sText1, oFormatter, sClassName) {
		var oControl1 = null;

		if (!oFormatter) {
			oControl1 = new sap.ui.commons.TextView({
				text: sText1,
				tooltip: sText1
			}).addStyleClass(sClassName);
		} else {
			oControl1 = new sap.ui.commons.TextView({
				text: {
					path: sText1,
					formatter: oFormatter
				},
				tooltip: sText1
			}).addStyleClass(sClassName);
		}
		var oLabel1 = new sap.ui.commons.Label({
			text: sLabel1,
			labelFor: oControl1
		}).addStyleClass(sClassName);

		var oCell1 = new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.End,
			vAlign : sap.ui.commons.layout.VAlign.Top,
			content : [ oLabel1 ]
		});
		var oCell2 = new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Begin,
			vAlign : sap.ui.commons.layout.VAlign.Top,
			content : [ oControl1 ]
		});

		return new sap.ui.commons.layout.MatrixLayoutRow({
				cells : [ oCell1, oCell2 ]
				});
	},

	/**
	* subTitle: create a row with one cell, cell contents the label and design for it
	* @param sLabel
	* @param sDesign
	* @returns {sap.ui.commons.layout.MatrixLayoutRow}
	*/
	subTitle: function(sLabel, sDesign) {
		// Create a label
		var oLabel = new sap.ui.commons.Label({
			text: sLabel,
			design: sDesign,
			width: "100%"
		});
		// create a cell with a label
		var oCell = new sap.ui.commons.layout.MatrixLayoutCell({
			hAlign : sap.ui.commons.layout.HAlign.Begin,
			vAlign : sap.ui.commons.layout.VAlign.Top,
			width: "100%",
			colSpan: 3,
			content : [ oLabel ]
		});

		return new sap.ui.commons.layout.MatrixLayoutRow({
				cells : [oCell]
				});
	}
});
