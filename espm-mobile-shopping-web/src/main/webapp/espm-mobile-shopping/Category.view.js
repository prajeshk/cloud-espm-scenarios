sap.ui.jsview("espm-mobile-shopping.Category", {

	getControllerName : function() {
		return "espm-mobile-shopping.Category";
	},
	
	onBeforeShow : function(evt) {
		this.getController().onBeforeShow(evt);
	},

	createContent : function(oController) {
		//create list for displayed categories
		this.categoryList = new sap.m.List({
			headerText : "{i18n>LIST_HEADER_CATEGORY}",
		});
		
		//bind the list to the ProductCategories Collection
		this.categoryList.bindAggregation("items", {
			path: sap.app.config.prodCategoriesCollection,
			template: new sap.m.StandardListItem({
				title : '{Category}',
				counter: "{count}",
				tap: [oController.productListTap, oController],
				type: sap.m.ListType.Navigation,
				customData: [ new sap.ui.core.CustomData({
					key: "id",
					value: "{Category}"
				}),
				]
			})
		});

		//create page
		this.page = new sap.m.Page({
			title: "{i18n>APPLICATION_TITLE}",
			icon: appV.bindingIcon.ui5,
			headerContent : [ new sap.m.Button({
				icon: appV.bindingIcon.cart,
				tap: [oController.cartButtonTap, oController]
			})],
			footer: new sap.m.Bar({
				contentRight : [ new sap.m.Button({
					icon: appV.bindingIcon.settings,
					tap : [ oController.settingsTap, oController ]
				})
				]
			}),
			content : [ this.categoryList ] 
		});
		return this.page; 
	}
});