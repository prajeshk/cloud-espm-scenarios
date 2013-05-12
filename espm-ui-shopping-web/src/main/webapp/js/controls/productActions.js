sap.ui.core.Control.extend("composite.productActions", {
	metadata: {
		properties: {
			layoutType: {	// control the layout inside list & detail view
				defaultValue: "list"	// possible values: list, detail
			},
			quantity: {
				type: "integer",
				defaultValue: 1
			},
			width: {
				type: "sap.ui.core.CSSSize",
				defaultValue: "150px"
			},
			captionQuantity: {
				defaultValue: "QTY"
			},
			captionBuyNow: {
				defaultValue: "BuyNow"
			},
			captionAddToCart: {
				defaultValue: "AddToCard"
			}
		},
		events: {
			buyNow: {},
			addToCart: {}
		}
	},

	init: function() {
		var that = this;
		
		// index is used here to supply the buttons with an individual ID for easy access of the element e.g. for testing purposes
		var index = sap.app.utility.getCounter();

		this.quantityField = new sap.ui.commons.TextField({
			textAlign: sap.ui.core.TextAlign.End,
			width: "100%",
			liveChange: function() { // check if user entered an integer
				// Validation in type system can't be used without databinding :(
				var positiveIntRegex = /^[1-9][0-9]*$/;
				if (positiveIntRegex.test(this.getLiveValue())) {
					this.setValueState("None");
					that.buyNowButton.setEnabled(true);
					that.addToCartButton.setEnabled(true);
					sap.app.messages.removeMessage( this.getId());
				} else {
					this.setValueState("Error");
					that.buyNowButton.setEnabled(false);
					that.addToCartButton.setEnabled(false);
					var sMessageText;
					if (this.getLiveValue() != 0){
						sMessageText = sap.app.i18n.getProperty("MSG_ERROR_VALUE_NOT_VALID").replace(/&1/, "'" + this.getLiveValue() + "'");
					}else{
						sMessageText = sap.app.i18n.getProperty("MSG_ERROR_VALUE_NOT_GREATER_ZERO");
					}
					sap.app.messages.addMessage(sMessageText, sap.ui.core.MessageType.Error , this.getId());
				}
				that.buyNowButton.rerender();
				that.addToCartButton.rerender();
			}
		});
		this.quantityLabel = new sap.ui.commons.Label({
			labelFor: this.quantityField,
		});
		this.buyNowButton = new sap.ui.commons.Button({
			id: 'buy-now-button' + index,
			width: "100%",
			press: function(oEvent) {
				that.fireEvent("buynow");
			}
		});
		this.addToCartButton = new sap.ui.commons.Button({
			id: 'add-to-cart-button' + index,
			style: sap.ui.commons.ButtonStyle.Emph,
			width: "100%",
			press: function(oEvent) {
				that.fireEvent("addtocart");
			}
		});

		var oEventBus = sap.ui.getCore().getEventBus();
		oEventBus.subscribe("sap.app", "resetErrors", function(sChannelId, sEventId) {
			var sElemId = that.quantityField.getId();
			sap.app.messages.removeMessage( sElemId );
			that.quantityField.setValue("1");
			that.quantityField.setValueState( sap.ui.core.ValueState.None);
			that.buyNowButton.setEnabled(true);
			that.addToCartButton.setEnabled(true);
		});

	},

	fireEvent: function(sEventName) {
		// use jQuery extend method to create a deep copy and decouple item from oData model
		var oItem = jQuery.extend({}, this.getModel().getProperty('',this.getBindingContext()));
		oItem.Price = parseFloat(oItem.Price);
		oItem.quantity = this.quantityField.getValue();
		oItem.Price = parseFloat(oItem.Price);
		// only send event if quantity is ok
		if (this.quantityField.getValueState() !== "Error") {
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.publish("sap.app", sEventName, oItem);
		} else {
			jQuery.sap.log.error("Can't add non-numeric quantities to shopping cart", null, "composite.productActions");
		}
	},

	renderer: function(oRm, oCtrl) {
		// Sanity checks
		if (oCtrl.getLayoutType() !== "list" && oCtrl.getLayoutType() !== "detail") {
			jQuery.sap.log.error("Invalid value for layoutType", oCtrl.getLayoutType() + " is not valid, should be 'list' or 'detail'", "composite.productActions");
		}

		// set dynamic values
		oCtrl.quantityField.setValue(oCtrl.getQuantity());
		oCtrl.quantityLabel.setText(oCtrl.getCaptionQuantity());
		oCtrl.buyNowButton.setText(oCtrl.getCaptionBuyNow());
		oCtrl.addToCartButton.setText(oCtrl.getCaptionAddToCart());

		// render control
		oRm.write("<div");
		oRm.writeControlData(oCtrl);
		oRm.addStyle("width", oCtrl.getWidth());
		oRm.writeStyles();
		oRm.addClass("product-actions");
		if (oCtrl.getLayoutType() === "detail") {
			oRm.addClass("product-actions-detail");
		} else {
			oRm.addClass("product-actions-list");
		}
		oRm.writeClasses();
		oRm.write(">");
		oRm.write('<div class="product-actions-row product-actions-quantity">');
		oRm.write('<div class="product-actions-quantity-label">');
		oCtrl.quantityLabel.getRenderer().render(oRm, oCtrl.quantityLabel);
		oRm.write("</div>");
		oRm.write('<div class="product-actions-quantity-field">');
		oCtrl.quantityField.getRenderer().render(oRm, oCtrl.quantityField);
		oRm.write("</div>");
		oRm.write('<div class="product-actions-cleaner"></div>'); // needed to clear floats
		oRm.write("</div>");
		oRm.write('<div class="product-actions-row product-actions-buynow">');
		oCtrl.buyNowButton.getRenderer().render(oRm, oCtrl.buyNowButton);
		oRm.write("</div>");
		oRm.write('<div class="product-actions-row product-actions-addtocart">');
		oCtrl.addToCartButton.getRenderer().render(oRm, oCtrl.addToCartButton);
		oRm.write("</div>");
		oRm.write('<div class="product-actions-cleaner"></div>'); // needed to clear floats for detail view
		oRm.write("</div>");
	}

}

);
