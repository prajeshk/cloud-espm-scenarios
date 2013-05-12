sap.ui.jsview("espm-mobile-shopping.Order", {

	getControllerName : function() {
		return "espm-mobile-shopping.Order";
	},

	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},

	createContent : function(oController) {

		var totalText = appC.i18n.getProperty("ORDER_TOTAL_TEXT");
		// create Label
		this.totalLabel = new sap.m.Label({
			text: totalText + " " + appC.total + sap.app.config.currencySymbol,
			design: sap.m.LabelDesign.Bold,
		});

		// create buttons
		this.editButton = new sap.m.Button({
			text : "{i18n>ORDER_EDIT_BUTTON}",
			tap : [ oController.editTap, oController ]
		});
		this.doneButton = new sap.m.Button({
			text : "{i18n>ORDER_DONE_BUTTON}",
			type : sap.m.ButtonType.Accept,
			visible : false,
			tap : [ oController.editTap, oController ]
		});
		this.proceedButton = new sap.m.Button({
			text : "{i18n>PROCEED_BUTTON}",
			tap : [ oController.proceedTap, oController ]
		});

		//create page
		this.page =  new sap.m.Page({
			title : "{i18n>ORDER_TITLE}",
			icon : appV.bindingIcon.ui5,
			showNavButton : true,
			navButtonTap : [ oController.navButtonTap, oController ],

			footer: new sap.m.Bar({
				contentLeft : [ this.totalLabel ],
				contentRight : [ this.editButton,
				                 this.doneButton,
				                 this.proceedButton
				                 ],
			}),         
			content: [
			          this.orderList = new sap.m.List({
			        	  "delete" : function(e) {
			        		  oController.deleteListItem(e);
			        	  },
			          }),
			          ], 
		});
		return this.page;
	}
});