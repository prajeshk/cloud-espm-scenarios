sap.ui.jsview("espm-ui-reviews-web.item1", {

	getControllerName : function() {
		return "espm-ui-reviews-web.item1";
	},

	createContent : function(oController) {

		var oMatrixLayout = new sap.ui.commons.layout.MatrixLayout({
			width : "100%",
		});

		// display data source info
		if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_DISPLAY_DATA_SOURCE_INFO)) {
			oMatrixLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
				content : [
						new sap.ui.commons.TextView({
							text : sap.app.i18n.getProperty("DATA_SOURCE_INFO") + ":",
							wrapping : false,
							design : sap.ui.commons.TextViewDesign.Bold
						}),
						new sap.ui.commons.TextView({
							text : sap.app.i18n.getProperty("DATA_SOURCE_INFO_DATA_RETRIEVED_FROM").replace(/&1/,
									sap.app.utility.getBackendTypeText()),
							wrapping : false,
						}).addStyleClass("textViewMarginsLeftRight"), new sap.ui.commons.TextView({
							text : '(',
							wrapping : false,
						}), new sap.ui.commons.Link({
							text : "{i18n>DATA_SOURCE_INFO_ESPM_LINK_TEXT}",
							href : sap.app.utility.getDataSourceInfoOdataServiceUrl(),
							target : "_blank"
						}), new sap.ui.commons.TextView({
							text : ')',
						}) ]
			}));
		}

		var oTable = new sap.ui.table.DataTable({
			columns : [ {
				label : "Product Id",
				template : "ProductId",
				sortProperty : "ProductId"
			}, {
				label : "Product Name",
				template : "Name",
				sortProperty : "Name"
			} ]
		});
		oTable.bindRows("/Products");

		oMatrixLayout.createRow(new sap.ui.commons.layout.MatrixLayoutCell({
			content : [ oTable ]
		}));

		return oMatrixLayout;
	}

});
