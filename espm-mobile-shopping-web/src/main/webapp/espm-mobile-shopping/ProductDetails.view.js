sap.ui.jsview("espm-mobile-shopping.ProductDetails", {

	getControllerName : function() {
		return "espm-mobile-shopping.ProductDetails";
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
			text: "{Name}",	
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

		//dimension fields
		this.dimLabel = new sap.m.Label({
			design: sap.m.LabelDesign.Bold,
			text: "{i18n>PRODUCT_DIMENSION_LABEL}",
		});
		this.dimLabel.addStyleClass("customlabel");
		this.widthLbl = new sap.m.Label({
			text: "{i18n>PRODUCT_WIDTH_LABEL}",	
		});
		this.widthLbl.addStyleClass("dimension");
		this.widthValue = new sap.m.Label({
			text:{
				path: "DimensionWidth",
				formatter: function(value) { 
					return value + sap.ui.getCore().getModel().getProperty("DimensionUnit", this.getBindingContext());
				},
			},	
		});
		this.widthValue.addStyleClass("dimension");
		this.heightLbl = new sap.m.Label({
			text: "{i18n>PRODUCT_HEIGHT_LABEL}",	
		});
		this.heightLbl.addStyleClass("dimension");
		this.heightValue = new sap.m.Label({
			text: {
				path: "DimensionHeight",
				formatter: function(value) { 
					return value +
					sap.ui.getCore().getModel().getProperty("DimensionUnit", this.getBindingContext());
				},
			},
		});
		this.heightValue.addStyleClass("dimension");
		this.depthLbl = new sap.m.Label({
			text: "{i18n>PRODUCT_DEPTH_LABEL}",	
		});
		this.depthLbl.addStyleClass("dimension");
		this.depthValue = new sap.m.Label({
			text: {
				path: "DimensionDepth" ,
				formatter: function(value) { 
					return value +
					sap.ui.getCore().getModel().getProperty("DimensionUnit", this.getBindingContext());
				},		
			},
		});
		this.depthValue.addStyleClass("dimension");

		//weight field
		this.weightLabel = new sap.m.Label({
			text : "{i18n>PRODUCT_WEIGHT_LABEL}",
			design: sap.m.LabelDesign.Bold,
		});
		this.weightLabel.addStyleClass("customlabel");
		this.weightValue = new sap.m.Label({
			text: {
				path: "Weight" ,
				formatter: function(value) { 
					return value +
					sap.ui.getCore().getModel().getProperty("WeightUnit", this.getBindingContext());
				}	
			},	
		});
		this.weightValue.addStyleClass("dimension");

		// create page
		this.page = new sap.m.Page({
			title:"{Name}",
			showNavButton : true,
			navButtonTap : [ oController.navButtonTap, oController ],
			icon : appV.bindingIcon.ui5,
			headerContent : [ new sap.m.Button({
				icon: appV.bindingIcon.cart,
				tap: [ oController.cartButtonTap, oController ]
			}),   
			],
			footer: new sap.m.Bar({
				contentMiddle : [ new sap.m.Button({
					text :"{i18n>PRODUCT_ADD_TO_CART_BUTTON}",
					tap : [ oController.addToCartButtonTap, oController ]
				})
				]
			}),         
			content: [
			          new sap.m.VBox({
			        	  alignItems : sap.m.FlexAlignItems.Center,
			        	  items : [ new sap.m.Image({
			        		  src : appV.bindingImg.image,
			        		  width: "130px",
			        		  height: "130px",
			        		  decorative : true,
			        		  densityAware : false
			        	  })
			        	  ]
			          }),
			          new sap.m.List({
			        	  items : [
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
			        	           new sap.m.CustomListItem({
			        	        	   content: [

			        	        	             new sap.m.VBox({
			        	        	            	 items: [ 
			        	        	            	         new sap.m.HBox({
			        	        	            	        	 items:[ this.dimLabel ],	
			        	        	            	         }),														        
			        	        	            	         new sap.m.HBox({
			        	        	            	        	 items:[
			        	        	            	        	        this.widthLbl,
			        	        	            	        	        this.widthValue,
			        	        	            	        	        this.heightLbl,
			        	        	            	        	        this.heightValue,
			        	        	            	        	        this.depthLbl,
			        	        	            	        	        this.depthValue
			        	        	            	        	        ],	
			        	        	            	         }),													    	        	             
			        	        	            	         ],
			        	        	             }),
			        	        	             ]
			        	           }),
			        	           new sap.m.CustomListItem({
			        	        	   content: [
			        	        	             new sap.m.VBox({
			        	        	            	 items: [ 
			        	        	            	         this.weightLabel,
			        	        	            	         this.weightValue
			        	        	            	         ]
			        	        	             })		        	        	             
			        	        	             ]
			        	           }),
			        	           ],
			          }),		          
			          ] 
		});
		return this.page;
	}
});