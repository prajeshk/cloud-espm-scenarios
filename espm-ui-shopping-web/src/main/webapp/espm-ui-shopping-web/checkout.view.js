sap.ui.jsview("espm-ui-shopping-web.checkout", {

	oHeader: null,

	oFooter: null,

	getControllerName : function() {
		return "espm-ui-shopping-web.checkout";
	},

	createContent : function(oController) {

		sap.app.checkoutController = oController;

		var that = this;

		this.oRoadMapCheckout = new sap.ui.commons.RoadMap({
			id: "checkout-roadmap",
			numberOfVisibleSteps: 4,
			selectedStep: "checkout-step-1",
			steps: [
				new sap.ui.commons.RoadMapStep({
					id: "checkout-step-1",
					label: "{i18n>LABEL_CHECKOUT_STEP_1}"
				}),
				new sap.ui.commons.RoadMapStep({
					id: "checkout-step-2",
					label: "{i18n>LABEL_CHECKOUT_STEP_2}"
				}),
				new sap.ui.commons.RoadMapStep({
					id: "checkout-step-3",
					label: "{i18n>LABEL_CHECKOUT_STEP_3}",
					enabled: false
				}),
				new sap.ui.commons.RoadMapStep({
					id: "checkout-step-4",
					label: "{i18n>LABEL_CHECKOUT_STEP_4}",
					enabled: false
				})
			],
			stepSelected: function(oEvent) {
				var sStepId = oEvent.getParameter("stepId");
				that.setRoadmapContent(sStepId);
			}
		});


		var oCheckoutLayout = new sap.ui.commons.layout.MatrixLayout({
			id: "checkout-layout",
			rows: [
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							id: "checkout-layout-roadmap",
							content: this.oRoadMapCheckout
						})
					]
				}),
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							id: "checkout-layout-header",
							//content: this.getCheckoutContentTitle(true)
							content: this.getHeader()
						})
					]
				}),
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							content: [
								new sap.ui.commons.HorizontalDivider()
							]
						})
					]
				}),
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							id: "checkout-layout-content",
							content: sap.app.mainController.getCachedView("checkoutStep1")
						})
					]
				}),
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							content: [
								new sap.ui.commons.HorizontalDivider()
							]
						})
					]
				}),
				new sap.ui.commons.layout.MatrixLayoutRow({
					cells: [
						new sap.ui.commons.layout.MatrixLayoutCell({
							id: "checkout-layout-footer",
							content: this.getFooter()
						})
					]
				})
			]
		});

		sap.app.checkoutController.updateTitle( "checkout-step-1" );
		
		this.oRoadMapCheckout.currentSelectedStep = "checkout-step-1";
		
		return oCheckoutLayout;
	},

	/**
	 * getHeader: get the cached header line with the title of the content and buttons of the selected step of the roadmap
	 * @returns: header content, title and buttons
	 */
	getHeader: function(){

		if (!this.oHeader){
			this.oHeader = this.createButtonBar( true );
		}
		return this.oHeader;
	},

	/**
	 * getFooter: get the cached footer line with buttons of the selected step of the roadmap
	 * @returns: footer content, buttons
	 */
	getFooter: function(){

		if (!this.oFooter){
			this.oFooter = this.createButtonBar( false );
		}
		return this.oFooter;
	},

	/**
	 * createButtonBar: create cached button bar with the buttons of the roadmap, used for header and footer
	 * @param bWithTitle: show title for header
	 * @returns {sap.ui.commons.layout.MatrixLayout}
	 */
	createButtonBar : function( bWithTitle ){

		var that = this;

		var oLayout = new sap.ui.commons.layout.MatrixLayout({
			width: "100%"
		});
		var sIndex;
		bWithTitle == true ? sIndex = 0 : sIndex = 1;

		// define buttons for header/footer actions
		var sButtonId = "roadmap-back-button-" + sIndex;
		var oButtonBack = new sap.ui.commons.Button({
			id : sButtonId,
			text: "{i18n>BTN_BACK}",
		});
		oButtonBack.attachPress(that.oRoadMapCheckout, sap.app.checkoutController.onBackButtonPressed);
		
		var oButtonShopping = new sap.ui.commons.Button({
			text: "{i18n>BTN_CONTINUE_SHOPPING}",
			press: function(oEvent) {
				// go to shopping page
				sap.ui.getCore().byId("main").setContent(sap.app.mainController.getCachedView("shopping"));
				sap.ui.getCore().byId("main").setSelectedWorksetItem("nav-shopping");
			}
		});

		sButtonId = "checkout-proceed-button-" + sIndex;
		var oButtonProceed = new sap.ui.commons.Button({
			id: sButtonId,
			text: "{i18n>BTN_PROCEED}",
			style: sap.ui.commons.ButtonStyle.Emph,
		});
		oButtonProceed.attachPress(that.oRoadMapCheckout, sap.app.checkoutController.onProcceedButtonPressed);

		if (bWithTitle) {
			var oTitleArea = new sap.ui.commons.layout.HorizontalLayout({ id : "checkout-title-area" });
		 }else {
			 oTitleArea = null;
		}
		oLayout.addRow(new sap.ui.commons.layout.MatrixLayoutRow({
			cells: [
				new sap.ui.commons.layout.MatrixLayoutCell({
					content: [oTitleArea]
				}),
				new sap.ui.commons.layout.MatrixLayoutCell({
					hAlign: "End",
					content: [oButtonBack, oButtonShopping, oButtonProceed]
				})
			]
		}));

		return oLayout;

	},

	/**
	 * setRoadmapContent: sets the content of the selected roadmap step
	 * @param sStepId
	 */
	
	setRoadmapContent: function(sStepId) {
		
		var that = this;
		
		var oContentCell = sap.ui.getCore().byId("checkout-layout-content");

		if (sStepId != "checkout-step-4") {
			// the procceed button has the text "Proceed" on the first 3 steps but "Order" on the last step
			sap.ui.getCore().byId("checkout-proceed-button-0").setText( sap.app.i18n.getProperty("BTN_PROCEED") );
			sap.ui.getCore().byId("checkout-proceed-button-1").setText( sap.app.i18n.getProperty("BTN_PROCEED") );
		}

		if (that.oRoadMapCheckout.currentSelectedStep == "checkout-step-2") {
			if (sStepId == "checkout-step-1" && this.getModel().getProperty("/customer/EmailAddress") == "") {
				// if no email is entered a navigation back to the first view should be possible
				sap.app.messages.removeMessage("address-email");
			} else {
				// dont allow navigation to proceed if email is invalid
				if (sStepId == "checkout-step-3"
						&& !sap.app.checkoutController.checkCustomerEmailValid(that.oRoadMapCheckout)) {
					this.oRoadMapCheckout.setSelectedStep("checkout-step-2");
					return;
				} else {
					// just in case
					sap.app.messages.removeMessage("address-email");
				}
			}
		}

		switch (sStepId) {
			case "checkout-step-2":
				oContentCell.removeAllContent();
				oContentCell.addContent(sap.app.mainController.getCachedView("checkoutStep2"));
				break;
			case "checkout-step-3":
				oContentCell.removeAllContent();
				oContentCell.addContent(sap.app.mainController.getCachedView("checkoutStep3"));
				break;
			case "checkout-step-4":
				oContentCell.removeAllContent();
				oContentCell.addContent(sap.app.mainController.getCachedView("checkoutStep4"));
				sap.ui.getCore().byId("checkout-proceed-button-0").setText( sap.app.i18n.getProperty("BTN_ORDER") );
				sap.ui.getCore().byId("checkout-proceed-button-1").setText( sap.app.i18n.getProperty("BTN_ORDER") );
				break;
			case "checkout-step-1":
			default: // fall thru to first step
				oContentCell.removeAllContent();
				oContentCell.addContent(sap.app.mainController.getCachedView("checkoutStep1"));
				break;
		}

		sap.app.checkoutController.updateTitle( sStepId );
		
		this.oRoadMapCheckout.currentSelectedStep = sStepId;
		
	}	
	
});
