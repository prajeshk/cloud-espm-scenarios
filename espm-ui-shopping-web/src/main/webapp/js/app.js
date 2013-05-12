/** app.js
 *
 *  main application script
 *  - include required modules
 *  - instantiate localization model
 *  - init main shell view
 *  - instantiate main product model
 */

jQuery.sap.registerModulePath('app', 'js');

jQuery.sap.require("app.config");
jQuery.sap.require("app.formatter");
jQuery.sap.require("app.utility");
jQuery.sap.require("app.messages");
jQuery.sap.require("app.validator");
jQuery.sap.require("app.welcome");

// module path for custom controls
jQuery.sap.registerModulePath('composite', 'js/controls');
jQuery.sap.require("composite.productActions");


// Internationalization:
// create global i18n resource bundle for texts in application UI
sap.app.i18n = new sap.ui.model.resource.ResourceModel({
	bundleUrl: "i18n/i18n.properties",
	locale: sap.ui.getCore().getConfiguration().getLanguage()
});
sap.ui.getCore().setModel(sap.app.i18n, "i18n");

// create global i18n resource bundle for country names
sap.app.countryBundle = jQuery.sap.resources({
	url : "i18n/countries.properties",
	locale: sap.ui.getCore().getConfiguration().getLanguage()
});

// get the data for the dropdown listbox with the country names in the address view (checkoutStep2)
sap.app.countries = new sap.ui.model.json.JSONModel(sap.app.config.countriesModelUrl);
sap.app.countries.setSizeLimit(300);

// create initial filters and sorter for product listing
sap.app.product = {};
sap.app.product.searchFilter = null;
sap.app.product.categoryFilter = null;
sap.app.product.nameSorter = new sap.ui.model.Sorter("Name", false);

// instantiate initial view with a shell
sap.ui.localResources(sap.app.config.viewNamespace);
var oMainView = sap.ui.view({
	id:"main-shell",
	viewName:"espm-ui-shopping-web.main",
	type:sap.ui.core.mvc.ViewType.JS
});

jQuery.sap.require("sap.ui.model.odata.ODataListBinding");
sap.ui.model.odata.ODataListBinding.extend("ExtendedListBinding", {
	constructor : function(oModel, sPath, oContext, oSorter, aFilters, mParameters) {
		sap.ui.model.odata.ODataListBinding.apply(this, arguments); // call super-constructor
	},
	_createFilterSegment : function(sPath, sOperator, oValue1, oValue2, sFilterParam) {

		var oProperty = null;
		if (this.oEntityType) {
			if(this.oModel.oMetadata._getPropertyMetadata!==undefined){
				oProperty = this.oModel.oMetadata._getPropertyMetadata(this.oEntityType, sPath);
			}
		}

		if (oProperty!=null) {
			switch(oProperty.type) {
				case "Edm.String":
					// quote
					oValue1 = "'" + String(oValue1).replace(/'/g, "''") + "'";
					oValue2 = (oValue2) ? "'" + String(oValue2).replace(/'/g, "''") + "'" : null;
					break;
				case "Edm.Time":
					oValue1 = "time'" + oValue1 + "'";
					oValue2 = (oValue2) ? "time'" + oValue2 + "'" : null;
					break;
				case "Edm.DateTime":
					oValue1 = this.oDateTimeFormat.format(new Date(oValue1), true);
					oValue2 = (oValue2) ? this.oDateTimeFormat.format(new Date(oValue2), true) : null;
					break;
				case "Edm.DateTimeOffset":
					oValue1 = this.oDateTimeOffsetFormat.format(new Date(oValue1), true);
					oValue2 = (oValue2) ? this.oDateTimeOffsetFormat.format(new Date(oValue2), true) : null;
					break;
				case "Edm.Guid":
					oValue1 = "guid'" + oValue1 + "'";
					oValue2 = (oValue2) ? "guid'" + oValue2 + "'" : null;
					break;
				case "Edm.Binary":
					oValue1 = "binary'" + oValue1 + "'";
					oValue2 = (oValue2) ? "binary'" + oValue2 + "'" : null;
					break;
				default:
					break;
			}
		} else {
			jQuery.sap.assert(null, "Type for filter property could not be found in metadata!");
		}

		if (oValue1) {
			oValue1 = jQuery.sap.encodeURL(String(oValue1));
		}
		if (oValue2) {
			oValue2 = jQuery.sap.encodeURL(String(oValue2));
		}

		switch(sOperator) {
			case "EQ":
			case "NE":
			case "GT":
			case "GE":
			case "LT":
			case "LE":
				sFilterParam += sPath + "%20" + sOperator.toLowerCase() + "%20" + oValue1;
				break;
			case "BT":
				sFilterParam += "(" + sPath + "%20gt%20" + oValue1 + "%20and%20" + sPath + "%20lt%20" + oValue2 + ")";
				break;
			case "Contains":
				sFilterParam += "substringof(" + oValue1 + "," + sPath + ")%20eq%20true";
				break;
			case "StartsWith":
				sFilterParam += "startswith(" + sPath + "," + oValue1 + ")";
				break;
			case "EndsWith":
				sFilterParam += "endswith(" + sPath + "," + oValue1 + ")";
				break;
			default:
				sFilterParam += "true";
		}
		return sFilterParam;
	}
});

jQuery.sap.require("sap.ui.model.odata.ODataModel");
sap.ui.model.odata.ODataModel.extend("ExtendedOdataModel", {
	constructor : function(sServiceUrl, bJSON, sUser, sPassword) {
		sap.ui.model.odata.ODataModel.apply(this, arguments); // call super-constructor
	},
	/**
	 * @see sap.ui.model.Model.prototype.bindList
	 */
	bindList : function(sPath, oContext, oSorter, aFilters, mParameters) {
		var oBinding = new ExtendedListBinding(this, sPath, oContext, oSorter, aFilters, mParameters);
		return oBinding;
	}
});

//get business data from OData service
if (sap.app.localStorage.getPreference(sap.app.localStorage.PREF_USE_ABAP_BACKEND)) {
	sap.app.odatamodel = new sap.ui.model.odata.ODataModel("proxy/" + sap.app.utility.getBackendDestination(), true);
} else {
	sap.app.odatamodel = new ExtendedOdataModel("proxy/" + sap.app.utility.getBackendDestination(), true);
}

//ensure that CSRF token is not taken from cache
sap.app.odatamodel.refreshSecurityToken();

// set model to core
sap.ui.getCore().setModel(sap.app.odatamodel);

// get categories from OData model and set into JSON model of search.view. It is necessary to add entry 'All Categories' which is
// not available in a OData model
sap.app.odatamodel.read("/ProductCategories", null, null, false, sap.app.readOdata.readCategoriesSuccess, sap.app.readOdata.readError);

oMainView.placeAt("content");