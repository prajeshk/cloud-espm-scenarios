sap.ui.jsview("espm-mobile-shopping.App", {

	getControllerName : function() {
		return "espm-mobile-shopping.App";
	},

	createContent : function(oController) {
		//write global references to app view & controller
		appV = this;
		appC = oController;
		appC.cartItems = new Array();
		appV.app = new sap.m.App();
		return appV.app;
	},

	//For image loading
	bindingImg : {
		image : {
			path : "ProductId", 
			formatter :  function(value) {
				var imageUrl = "";
				var temp = "";
				if(value != null){
					if(sap.app.config.useAbap==false){
						//url to read images from HANA Cloud backend
						imageUrl = sap.app.config.smpUrl + sap.app.config.cloudReqRepUrl + sap.app.config.couldImgName + "/" + value + ".jpg";
						jQuery.ajax({
							type : 'GET',
							async: false,						
							url: imageUrl,
							beforeSend : function(jqXHR, settings) {
								jqXHR.setRequestHeader('Access-Control-Allow-Origin', '*');
								jqXHR.setRequestHeader('X-SUP-APPCID', appC.appCID);
								jqXHR.overrideMimeType('text/plain; charset=x-user-defined');
							},
							success : function(responseData, textStatus, jqXHR) {
								var data = '';
								for ( var i = 0; i < responseData.length; i++) {
									data += String.fromCharCode(( responseData[ i ].charCodeAt(0) & 0xff));
								}
								data = btoa( data );
								temp = "data:image/jpeg;base64," + data;
							},
							error : function(responseData, textStatus, errorThrown) {
								//alert("POST failed");
							}
						});
					}else{
						//url to read images from ABAP Gateway backend
						imageUrl = sap.app.config.smpUrl + "/" + sap.app.config.abapImgName + "/" + value + ".jpg";
						jQuery.ajax({
							type : 'GET',
							async: false,				
							url: imageUrl,
							beforeSend : function(jqXHR, settings) {
								jqXHR.setRequestHeader('Access-Control-Allow-Origin', '*');
								jqXHR.setRequestHeader('X-SUP-APPCID', appC.appCID);
								jqXHR.setRequestHeader('Authorization', ('Basic ' + btoa( appC.user + ':' + appC.password)));
								jqXHR.overrideMimeType('text/plain; charset=x-user-defined');								
							},
							success : function(responseData, textStatus, jqXHR) {
								var data = '';
								for ( var i = 0; i < responseData.length; i++) {
									data += String.fromCharCode(( responseData[ i ].charCodeAt(0) & 0xff));
								}
								data = btoa( data );
								temp = "data:image/jpeg;base64," + data;
							},
							error : function(responseData, textStatus, errorThrown) {
								//alert("POST failed");
							}
						});

					}
					return temp;
				}
			}
		}
	},

	//For price formatting
	bindingPrice : {
		price : {
			path : "Price", 
			formatter :  function(value) { return (Math.round(value * 10)/10 + sap.app.config.currencySymbol); }
		}
	},

	//For icons
	bindingIcon : {
		ui5 : "images/sapui5.png",
		cart : "images/cart.png",
		settings: "images/settings.png"
	}, 	
});