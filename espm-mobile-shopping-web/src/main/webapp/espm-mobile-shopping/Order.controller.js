jQuery.sap.require("sap.m.MessageBox");
sap.ui.controller("espm-mobile-shopping.Order", {


	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {

	},

	onBeforeShow : function(evt) {
		var view = this.getView();
		view.orderList.setMode(sap.m.ListMode.None).removeAllItems();
		var del = sap.m.ListMode.Delete === view.orderList.getMode();
		this.editDelete(!del);
		this.loadCartItems();
	},

	//loading the selected cart items
	loadCartItems: function(evt){
		var oController = this;
		var view = this.getView();
		var totalText = appC.i18n.getProperty("ORDER_TOTAL_TEXT");

		if (appC.cartItems.length != 0){
			appC.total = 0;
			for(var i=0;i<appC.cartItems.length;i++){
				var curItem = appC.cartItems[i];
				var item = new sap.m.StandardListItem({
					title: appC.cartItems[i].name,
					description: (Math.round(appC.cartItems[i].price *10)/10) + sap.app.config.currencySymbol + " " + " X " + appC.cartItems[i].quantity, 
					type : sap.m.ListType.Navigation,
					tap:function() {
						oController.orderEditTap(this.data("index"));
					},
					customData: [
					             new sap.ui.core.CustomData({
					            	 key: "index",
					            	 value: i
					             }),
					             ],
				});
				view.orderList.addItem(item);
				appC.total = Math.round((appC.total + (curItem.quantity * curItem.price))*10)/10;
			}
			view.totalLabel.setText(totalText + " " + appC.total + sap.app.config.currencySymbol); 

		}else{
			//open the dialog when cart is empty
			sap.m.MessageBox.show(
					"{i18n>ORDER_DIALOG_LABEL}",
					sap.m.MessageBox.Icon.WARNING, 
					"{i18n>DIALOG_TITLE_ALERT}", 
					[sap.m.MessageBox.Action.CLOSE],
					function(oAction) {
						// navigate back to the Home page
						appC.navTo("Category", true, undefined, "");
					}
			);
			appC.total  = 0;
			view.totalLabel.setText(totalText + " " + appC.total + sap.app.config.currencySymbol); 
		}
	},

	//navigation to previous page
	navButtonTap : function(evt) { 
		appC.navBack();
	},

	//clicking on the Edit button
	editTap : function(evt) {
		var view = this.getView();		
		var del = sap.m.ListMode.Delete === view.orderList.getMode();
		this.editDelete(del);
	},

	//clicking on the delete icons
	editDelete: function(del){
		var view = this.getView();
		view.orderList.setMode((del) ? sap.m.ListMode.None : sap.m.ListMode.Delete);// toggle mode
		view.editButton.setVisible(del);
		view.doneButton.setVisible(!del);
		view.proceedButton.setVisible(del);
		view.page.setShowNavButton(del);
		view.orderList.getItems().forEach(function (item) {
			item.setType((del) ? sap.m.ListType.Navigation : sap.m.ListType.None);
		});
	},

	//removes the deleted items from the list
	deleteListItem: function(evt) {
		var view = this.getView();
		var index = evt.getParameter('listItem').data("index");
		appC.cartItems.splice(index,1);
		view.orderList.removeAllItems();
		this.loadCartItems();
	},

	//clicking on the item in the cart takes to the orderEdit screen to change the quantity
	orderEditTap : function(index) {
		var param = { 
				productIndex: index,
				productName : appC.cartItems[index].name,
				productId : appC.cartItems[index].productId,
				productPrice : appC.cartItems[index].price,
				productQuantity : appC.cartItems[index].quantity,
				productDescription : appC.cartItems[index].description,
				productWidth : appC.cartItems[index].width,
				productHeight : appC.cartItems[index].height,
				productDepth : appC.cartItems[index].depth,
				productWeight : appC.cartItems[index].weight,
				productWeightUnit : appC.cartItems[index].weightUnit

		};
		appC.navTo("OrderEdit", true, undefined, param);
	},

	//clicking on the proceed button
	proceedTap : function(evt) {
		var param = { context : evt.oSource.getBindingContext() };
		appC.navTo("Customer", true, undefined, param);

	},


	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 */
//	onBeforeRendering: function() {

//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
//	onAfterRendering: function() {

//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
	onExit: function() {
		var view = this.getView();
		view.orderList.destroyItems();
	}

});