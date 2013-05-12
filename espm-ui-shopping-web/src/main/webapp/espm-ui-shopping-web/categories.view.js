sap.ui.jsview("espm-ui-shopping-web.categories", {

	getControllerName : function() {
		return "espm-ui-shopping-web.categories";
	},

	createContent : function(oController) {
		// create a title for RowRepeater
//		var oTitle = new sap.ui.commons.Title({ text: "{i18n>CATEGORIES_PRODUCT_CATEGORIES}" });
		// create RowRepeater for categories
		var oRowRepeater = new sap.ui.commons.RowRepeater({
			design: sap.ui.commons.RowRepeaterDesign.BareShell,
			id: "categories-list",
			noData: new sap.ui.commons.TextView({text: "{i18n>CATEGORIES_PRODUCT_LOADING_CATEGORIES}"}),
			numberOfRows: sap.app.config.categoriesNumRows
		});

		// create a model sorter and set to a model
		var oSorter = new sap.ui.model.Sorter("name", false);
		// remove sorting for ABAP, causing Accessories to come on top and also distorting the UI
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
			oRowRepeater.bindRows("/mainCategories", this.getMainCategoryTemplate(oController));
		} else {
			oRowRepeater.bindRows("/mainCategories", this.getMainCategoryTemplate(oController), oSorter);
		}
		return oRowRepeater;
	},

	/**
	 * getMainCategoryTemplate
	 */
	getMainCategoryTemplate: function(oController) {
		oMainCategoryTpl = new sap.ui.commons.RowRepeater({
			title: new sap.ui.commons.Title({ text: "{name}" }),
			numberOfRows: sap.app.config.categoriesNumRows
		});
		oMainCategoryTpl.addStyleClass("category-list");
		var oSorter = new sap.ui.model.Sorter("name", false);
		oMainCategoryTpl.bindRows("categories", this.getCategoryTemplate(oController), oSorter);
		return oMainCategoryTpl;
	},

	/**
	 * getCategoryTemplate
	 *	create row template for display of categories
	 */
	getCategoryTemplate: function(oController) {
		var oCategoryTpl = new sap.ui.commons.Link({
			text: {
				path: "name",
				formatter: sap.app.formatter.combinedCategoryCount
			},
			// link event handler: navigation to poduct list
			press: function() {
				var sCategory = this.getModel().getProperty("category", this.getBindingContext());
				oController.toProducts( new sap.ui.base.Event("categoryClick", this, { category: sCategory }) );
			}
		});
		return oCategoryTpl;
	}
});
