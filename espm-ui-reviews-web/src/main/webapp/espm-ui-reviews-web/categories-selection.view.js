sap.ui.jsview("espm-ui-reviews-web.categories-selection", {

	getControllerName : function() {
		return "espm-ui-reviews-web.categories-selection";
	},

	createContent : function(oController) {

		// layout for categories label and dropdown box
		var oCategoriesLayout = new sap.ui.commons.layout.MatrixLayout({});
		oCategoriesLayout.createRow(new sap.ui.commons.layout.VerticalLayout({
			content : [ new sap.ui.commons.Label({
				text : "{i18n>CATEGORIES_LABEL}"
			}), this.getCategoriesDropdownBox(oController) ]
		}));

		return oCategoriesLayout;
	},

	getCategoriesDropdownBox : function(oController) {
		var oCategoriesDropdownBox = new sap.ui.commons.DropdownBox({
			id : "categories-selection-dropdown-box-id",
			width : "100%",
			change : function(oEvent) {
				oController.selectedCategoryChanged(oEvent.oSource.getSelectedKey());
			}
		});

		// bind items to model
		oCategoriesDropdownBox.bindItems("/AvailableCategories", new sap.ui.core.ListItem({
			text : "{Category}",
			key : "{Category}"
		}));

		return oCategoriesDropdownBox;
	},

});
