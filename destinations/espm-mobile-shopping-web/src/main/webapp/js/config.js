jQuery.sap.declare("sap.app.config");

sap.app.config = {

		// If 'false' SMP is connected to ABAP Backend. Otherwise SMP connected to HANA Cloud backend
		useAbap: false,
		
		//when useWeb flag is set to true, the app can be run as a web app. 
		//when useWeb flag is set to false, the app can be run as a mobile app
		useWeb: true,
		
		//default SMP URL for espmhana account
		smpUrl: "https://smpmaas-espmhana.netweaver.ondemand.com",
		
		//default settings for HANA Cloud
		couldAppName: "espm_shopping_cloud",
		couldImgName: "espm_shopping_cloud_img",
		
		//default settings for ABAP Gateway
		abapAppName: "espm_shopping_abap",
		abapImgName: "espm_shopping_abap_img",
		abapUser: "ESPM_TEST",
		abapPassword: "Espm1234",
		
		connUrl: "/Connections",
		deviceType: "Android",
		
		//connection url for HANA Cloud 
		cloudConnUrl: "/public/odata/applications/latest/",
		
		//connection url for ABAP Gateway
		abapConnUrl: "/odata/applications/latest/",
		
		cloudReqRepUrl: "/public/",
		
		// Symbol for Currency Euro
		currencySymbol: "€",
			
		//binding for different Collection
		prodCategoriesCollection: "/ProductCategories",
		productCollection: "/Products",
		customerCollection: "/Customers",
		salesOrderHeaderCollection: "/SalesOrderHeaders",
		
		//Function Import for GetCustomerByEmailAddress
		getCustomerByEmailAddress: "/GetCustomerByEmailAddress"
};