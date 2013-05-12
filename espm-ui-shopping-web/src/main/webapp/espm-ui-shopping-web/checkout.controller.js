sap.ui.controller("espm-ui-shopping-web.checkout", {

	onInit: function() {
		// get model from cart controller
		var oModel = sap.ui.getCore().byId("cart").getModel();
		// assign cart model to checkout
		this.getView().setModel(oModel);
	},

	/**
	 * onBeforeRendering: actions which are initially performed for the checkout view every time the view is accessed
	 */
	onBeforeRendering: function() {
		// close the pane (if open) when navigating to the checkout view
		sap.ui.getCore().byId("main").closePane();
		sap.ui.getCore().byId("main").destroyPaneBarItems(); // remove shopping cart

		// remove the messages of the notification bar
		if (sap.app.messages.hasMessages()){
			sap.app.messages.removeAllMessages();
		}

		sap.app.cartController.updateTotal("checkout-");
	},

	onAfterRendering: function() {
		// we start with the first step of the roadmap control every time we switch to the checkout workset
		if (this.getView().oRoadMapCheckout.getSelectedStep() !== "checkout-step-1") {
			this.getView().oRoadMapCheckout.setSelectedStep("checkout-step-1");
			this.getView().oRoadMapCheckout.fireStepSelected("checkout-step-1");
		}
	},

	/**
	 * setNextStepEnabled: control if the next step can be accessed
	 * @param bEnabled: next step is enabled if true
	 * @param sNextStep: id of the next step in the roadmap control
	 */
	setNextStepEnabled: function(bEnabled,sNextStep){
		var sNext;
		// here we have to do a mapping between the view id and the roadmap step, if this is called from sap.app.validator.checkRequiredFields()
		switch  (sNextStep){
			case "checkoutStep1":
				sNext = "checkout-step-2";
				break;
			case "checkoutStep2":
				sNext = "checkout-step-3";
				break;
			case "checkoutStep3":
				sNext = "checkout-step-4";
				break;
			default: sNext = sNextStep;
		}
		sap.ui.getCore().byId( "checkout-proceed-button-0").setEnabled(bEnabled);
		sap.ui.getCore().byId( "checkout-proceed-button-1").setEnabled(bEnabled);
		// fix button states
		if (bEnabled) {
			jQuery("#checkout-proceed-button-0").removeClass("sapUiBtnDsbl");
			jQuery("#checkout-proceed-button-1").removeClass("sapUiBtnDsbl");
		} else {
			jQuery("#checkout-proceed-button-1").addClass("sapUiBtnDsbl");
			jQuery("#checkout-proceed-button-0").addClass("sapUiBtnDsbl");
		}
		sap.ui.getCore().byId(sNext).setEnabled(bEnabled);
		if (bEnabled == false && sNext == "checkout-step-2"){
			sap.ui.getCore().byId("checkout-step-3").setEnabled(bEnabled);
		}
		if (bEnabled == false && (sNext == "checkout-step-2" || sNext == "checkout-step-3")){
			sap.ui.getCore().byId("checkout-step-4").setEnabled(bEnabled);
		}
	},

	/**
	 * checkCustomerEmailValid: evaluate if the entered email of the customer is valid 
	 * valid email in this context means: already existing for existing customers and not yet existing for new customers
	 * @param oRoadMapCheckout
	 * @returns {Boolean}
	 */
	checkCustomerEmailValid: function(oRoadMapCheckout){
		// check customer if exists with Email address as filter
		var bCustExisting = sap.app.checkoutController.isCustomerExisting();
		// depends on value in radio group and existence of customer navigation is allowed or not
		if (sap.app.checkoutController.setNextStepAllowed( bCustExisting) == false){
			oRoadMapCheckout.setSelectedStep("checkout-step-2");
			sap.app.checkoutController.setNextStepEnabled (false,"checkoutStep3");
			return false;
		}else{
			return true;
		}
	},
	
	/**
	 * isCustomerExisting: read customer email by means of GetCustomerByEmailAddress functionImport
	 */
	isCustomerExisting: function (oView) {
		// get value from field Email address
		var sEmail = this.getView().getModel().getProperty("/customer/EmailAddress");
		var sFunctionImportEmailParam = "EmailAddress='" + sEmail + "'";
		var aParams =[];
		aParams.push (sFunctionImportEmailParam);
		// read customer with a filter
		var fGetCustomerByEmailAddress = new sap.app.readOdata.getCustomerByEmailAddress();
		sap.app.odatamodel.read("/GetCustomerByEmailAddress", null, aParams , false, fGetCustomerByEmailAddress.successResponse, sap.app.readOdata.getCustomerByEmailAddressError);

		// in case of error response (i.e. customer with this e-mail does not exist) make result explicitly a boolean
		if(fGetCustomerByEmailAddress.result===undefined){
			fGetCustomerByEmailAddress.result = false;
		}
		return fGetCustomerByEmailAddress.result;
	},

	/**
	 * create customer
	 */
	createCustomer: function(){
		var customerId = (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND))? "" : null;
		sap.app.checkoutController.getView().getModel().setProperty("/customer/CustomerId", customerId);
		sap.ui.getCore().getModel().create("/Customers", this.getView().getModel().getProperty("/customer"), null, sap.app.readOdata.createCustomer, sap.app.readOdata.createCustomerError);
	},

	/**
	 * create order
	 */
	createOrder: function(){

		var sCustomerId = sap.app.checkoutController.getView().getModel().getProperty("/customer/CustomerId");
		var SalesOrderHeader = {};

		SalesOrderHeader.CustomerId = sCustomerId;

		if (!sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
			// link Customer with SalesOrderHeader
			var custID = "/Customers('" + sCustomerId + "')";
			SalesOrderHeader.Customers = {};
			SalesOrderHeader.Customers.__deferred = {};
			SalesOrderHeader.Customers.__deferred.uri = custID;
		}

		var items = [];
		var products = this.getView().getModel().getProperty("/items");
		for (var i = 0; i < products.length; i++) {
			var product = products[i];
			var item ={};

			if (!sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
				// link Product with SalesOrderItem
				item.Products = {};
				var prodID = "/Products('" + product.ProductId + "')";
				item.Products.__deferred = {};
				item.Products.__deferred.uri = prodID;
			}

			item.ProductId = product.ProductId;
			item.Quantity = product.quantity;
			// properties made mandatory later in Java backend
			item.QuantityUnit = product.QuantityUnit;
			item.DeliveryDate = "2013-07-01T11:55:00.0000000"; 
			items.push(item);
		}

		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
			SalesOrderHeader.Items = items;			
		} else{
			SalesOrderHeader.SalesOrderItems = items;			
		}

		sap.ui.getCore().getModel().create("/SalesOrderHeaders", SalesOrderHeader, null, sap.app.readOdata.createOrder, sap.app.readOdata.createOrderError );
	},
	
	/**
	 * updateTitle: update the title of the currently selected step in the roadmap
	 * @param sStepId: id of the currently selected step of the roadmap
	 */
	updateTitle : function( sStepId ){

		var oTitleArea = sap.ui.getCore().byId( "checkout-title-area");

		if (!oTitleArea){
			return;
		}

		oTitleArea.removeAllContent();

		var sText = '';
		var bBackPossible = true;
		var oImage = null;
		var oTitle = null;

		switch (sStepId) {
		case "checkout-step-2":
			sText = sap.app.i18n.getProperty("TITLE_CHECKOUT_STEP_2");
			break;
		case "checkout-step-3":
			sText = sap.app.i18n.getProperty("TITLE_CHECKOUT_STEP_3");
			break;
		case "checkout-step-4":
			oTitle = sap.ui.getCore().byId("checkout-cart-title");
			oImage = new sap.ui.commons.Image({ src : "images/icon.cart.24x24.png"	});
			//sap.app.cartController.updateTotal("checkout-");
			break;
		case "checkout-step-1":
		default:
			oTitle = sap.ui.getCore().byId("checkout-cart-title");
			if (!oTitle){
			oTitle = new sap.ui.commons.TextView({
				id: "checkout-cart-title",
				text: "{i18n>TITLE_CHECKOUT_STEP_1}",
				design: "H3"
				}).addStyleClass("uppercase");
			}
			oImage = new sap.ui.commons.Image({ src : "images/icon.cart.24x24.png"	});
			bBackPossible = false;
			break;
		}

		if (!oTitle) {
			oTitle = new sap.ui.commons.TextView({
				text: sText,
				design: "H3"
			}).addStyleClass("uppercase");
		}

		if (oImage){
			oTitleArea.addContent( oImage );
		}
		oTitleArea.addContent( oTitle );

		sap.ui.getCore().byId( "roadmap-back-button-0").setVisible( bBackPossible );
		sap.ui.getCore().byId( "roadmap-back-button-1").setVisible( bBackPossible );

	},

	/**
	 * setNextStepAllowed: controlls if the next roadmap step is allowed
	 * If customer already exists then should be checked for next step if navigation possible or not
	 * This check will be used for proceed button and for road map button
	 */
	setNextStepAllowed: function (bCustomerExists) {
		sap.app.messages.removeMessage( "address-email" );
		// get value of selected radio button group, depends on value there next step is allowed or not
		var sExistCustSelected = sap.ui.getCore().byId( "rbg_customer");
		// get value of selected radio button group,
		var bResult = false;
		if ( bCustomerExists == true ) {
			if (sExistCustSelected.getSelectedItem().getId() == "existing_customer") {
				bResult = true;
			} else {
				var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_CUSTOMER_EXISTS");
				sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , "address-email" );
			}
		} else {
			if (sExistCustSelected.getSelectedItem().getId() == "new_customer") {
				bResult = true;
			} else {
				var sMessageText = sap.app.i18n.getProperty("MSG_ERROR_CUSTOMER_NOT_EXISTS");
				sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , "address-email" );
			}
		};
		return bResult;
	},
	
	/**
	 * onProcceedButtonPressed: event handler for the procceed button on the checkout view
	 * @param oEvent
	 * @param oRoadMapCheckout
	 */
	onProcceedButtonPressed: function(oEvent, oRoadMapCheckout) {
		var sCurrentStep = oRoadMapCheckout.getSelectedStep();
		switch(sCurrentStep) {
			case "checkout-step-1":
				oRoadMapCheckout.setSelectedStep("checkout-step-2");
				sap.app.checkoutController.getView().setRoadmapContent("checkout-step-2");
				break;
			case "checkout-step-2":
//				if (!sap.app.checkoutController.checkCustomerEmailValid(oRoadMapCheckout)){
//					return;				
//				}
				oRoadMapCheckout.setSelectedStep("checkout-step-3");
				sap.app.checkoutController.getView().setRoadmapContent("checkout-step-3");
				break;
			case "checkout-step-3":
				oRoadMapCheckout.setSelectedStep("checkout-step-4");
				sap.app.checkoutController.getView().setRoadmapContent("checkout-step-4");
				break;
			case "checkout-step-4":
				if (!sap.app.checkoutController.isCustomerExisting()){
					sap.app.checkoutController.createCustomer();
				}
				if( sap.app.checkoutController.getView().getModel().getProperty("/customer/CustomerId") ){
					// create order only if customer data is available							
					sap.app.checkoutController.createOrder();
					// check if order was created
					var sSalesOrderId = sap.app.checkoutController.getView().getModel().getProperty("/order/SalesOrderId");
					if (sSalesOrderId && sSalesOrderId != '') {
						// load confirmation page and delete items from model
						sap.ui.getCore().byId("main").setContent(sap.app.mainController.getCachedView("confirmation"));
						var oOrderData = sap.app.checkoutController.getView().getModel().getData();
						oOrderData.items.splice(0, oOrderData.items.length);
						for (prop in oOrderData.order){
							if (prop != "SalesOrderId"){
								oOrderData.order[prop] = null;
							}
						}
						// set the cleared data back to the model
						sap.app.checkoutController.getView().getModel().setData(oOrderData);
						// disabled the roadmap steps again
						sap.ui.getCore().byId("checkout-step-2").setEnabled( false );
						sap.ui.getCore().byId("checkout-step-3").setEnabled( false );
						sap.ui.getCore().byId("checkout-step-4").setEnabled( false );
						// delete order data from model
						var oShoppingLayoutCellContent = sap.ui.getCore().byId("shopping-layout-content");
						oShoppingLayoutCellContent.removeAllContent();
						oShoppingLayoutCellContent.addContent(sap.app.mainController.getCachedView("categories"));
						sap.app.messages.removeAllMessages();
						// when the customer is newly created the customer is an existing one from now on
						sap.app.CustomerTypeRadio.setSelectedItem(sap.ui.getCore().byId("existing_customer"));
						// remove the address fields if displayed
						var oMatrix = sap.ui.getCore().byId("address");
						oMatrix.removeRow("address-fields");
					}
					
				}
		}
	},
	
	/**
	 * onBackButtonPressed: event handler for the back button on the checkout view
	 * @param oEvent
	 * @param oRoadMapCheckout
	 */
	
	onBackButtonPressed: function(oEvent, oRoadMapCheckout) {
		var sCurrentStep = oRoadMapCheckout.getSelectedStep();
		switch(sCurrentStep) {
			case "checkout-step-2":
//				if (!sap.app.checkoutController.checkCustomerEmailValid(oRoadMapCheckout)){
//					return;				
//				}
				oRoadMapCheckout.setSelectedStep("checkout-step-1");
				sap.app.checkoutController.getView().setRoadmapContent("checkout-step-1");
				break;
			case "checkout-step-3":
				oRoadMapCheckout.setSelectedStep("checkout-step-2");
				sap.app.checkoutController.getView().setRoadmapContent("checkout-step-2");
				break;
			case "checkout-step-4":
				oRoadMapCheckout.setSelectedStep("checkout-step-3");
				sap.app.checkoutController.getView().setRoadmapContent("checkout-step-3");
				break;
		}
	}


});
