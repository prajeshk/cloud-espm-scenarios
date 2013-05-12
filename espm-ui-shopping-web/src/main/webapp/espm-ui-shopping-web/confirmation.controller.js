sap.ui.controller("espm-ui-shopping-web.confirmation", {

	onInit: function() {
		// get model from cart controller
		var oModel = sap.ui.getCore().byId("cart").getModel();
		// assign cart model to checkout
		this.getView().setModel(oModel);
	},

	onAfterRendering: function(){
		// set text for confirmation page depend on created customer and/or order
		var oTextLayout = sap.ui.getCore().byId("confirm_text_layout");
		oTextLayout.removeAllRows();
				
		var oImage = sap.ui.getCore().byId("confirm_image");
		
		var oOrderText = sap.ui.getCore().byId("confirm_order_text");
		oOrderText.setText(sap.app.i18n.getProperty("MSG_SUCCESS_ORDER_CREATED").replace(/&1/,this.getView().getModel().getProperty("/order/SalesOrderId")));
		
		if (sap.app.customerCreated == true){
			var oCustomerText = sap.ui.getCore().byId("confirm_customer_text");
			var oCustomer = this.getView().getModel().getProperty("/customer");
			oCustomerText.setText(sap.app.i18n.getProperty("MSG_SUCCESS_ACCOUNT_CREATED").replace(/&1/,oCustomer.CustomerId).replace(/&2/,oCustomer.EmailAddress));
			
			var oRow = new sap.ui.commons.layout.MatrixLayoutRow();
			oRow.addCell( new sap.ui.commons.layout.MatrixLayoutCell({ rowSpan : 2, content : [ oImage ]	}));
			oRow.addCell( new sap.ui.commons.layout.MatrixLayoutCell({ content : [ oCustomerText ]	}));
			oTextLayout.addRow( oRow);
			oTextLayout.createRow(oOrderText);
		} else {
			oTextLayout.createRow( oImage, oOrderText );
		}
	}
});