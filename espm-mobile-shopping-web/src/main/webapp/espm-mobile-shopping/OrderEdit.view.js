sap.ui.jsview("espm-mobile-shopping.OrderEdit", {

	getControllerName : function() {
		return "espm-mobile-shopping.OrderEdit";
	},

	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},

	createContent : function(oController) {
		//name field
		this.nameLabel = new sap.m.Label({
			design: sap.m.LabelDesign.Bold,
			text: "{i18n>PRODUCT_NAME_LABEL}",
		});
		this.nameLabel.addStyleClass("customlabel");
		this.nameValue = new sap.m.Text({
			wrapping: true
		});
		this.nameValue.addStyleClass("dimension");

		//price field
		this.priceLabel = new sap.m.Label({
			design: sap.m.LabelDesign.Bold,
			text: "{i18n>PRODUCT_PRICE_LABEL}",
		});
		this.priceLabel.addStyleClass("customlabel");
		this.priceValue = new sap.m.Text({
			text: appV.bindingPrice.price,
		});
		this.priceValue.addStyleClass("dimension");

		//description field
		this.descLabel = new sap.m.Label({
			design: sap.m.LabelDesign.Bold,
			text: "{i18n>PRODUCT_DESCRIPTION_LABEL}",
		});
		this.descLabel.addStyleClass("customlabel");
		this.descValue = new sap.m.Text({
			text: "{LongDescription}",	
			wrapping: true
		});
		this.descValue.addStyleClass("dimension");

		//quantity field
		this.quantityInput = new sap.m.InputListItem({
			label: "{i18n>PRODUCT_QUANTITY_LABEL}",
			design: sap.m.LabelDesign.Bold,
			content: [new sap.m.Input({
				type: sap.m.InputType.Number,
				change: function(evt){
					this.newQuantity = evt.getParameters().newValue;
					var index = this.data("index");
					if (this.newQuantity != '') {
						if (isNaN(this.newQuantity) || this.newQuantity < 1 || this.newQuantity > 99999) {
							sap.m.MessageBox.show(
									"{i18n>DIALOG_TEXT4}",
									sap.m.MessageBox.Icon.ERROR, 
									"{i18n>DIALOG_TITLE}", 
									[sap.m.MessageBox.Action.OK]
							);          			 
						} 
						else {
							var modItem = appC.cartItems[index];
							modItem.quantity = this.newQuantity;

						}
					}
				}
			})],
		});

		//create page
		this.page = new sap.m.Page({
			title: "{i18n>ORDER_TITLE}",
			icon: appV.bindingIcon.ui5,
			showNavButton : true,
			navButtonTap : [ oController.navButtonTap, oController ],
			content: [
			          new sap.m.List({
			        	  items:[
			        	         new sap.m.CustomListItem({
			        	        	 content: [
			        	        	           new sap.m.VBox({
			        	        	        	   items: [ 
			        	        	        	           this.nameLabel,
			        	        	        	           this.nameValue
			        	        	        	           ],
			        	        	           })       	        	             
			        	        	           ]
			        	         }),

			        	         new sap.m.CustomListItem({
			        	        	 content: [
			        	        	           new sap.m.VBox({
			        	        	        	   items: [ 
			        	        	        	           this.priceLabel,
			        	        	        	           this.priceValue
			        	        	        	           ]
			        	        	           })		        	        	             
			        	        	           ]
			        	         }),
			        	         new sap.m.CustomListItem({
			        	        	 content: [
			        	        	           new sap.m.VBox({
			        	        	        	   items: [ 
			        	        	        	           this.descLabel,
			        	        	        	           this.descValue
			        	        	        	           ]
			        	        	           })		        	        	             
			        	        	           ]
			        	         }),
			        	         this.quantityInput
			        	         ]
			          }),
			          ], 
		});
		return this.page;
	}

});