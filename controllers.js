$(document).ready(function(){
$(document).keypress(
  		function(event){
    			if (event.which == '13') {
      			event.preventDefault();
    		}
	});
	/*$(initializeViz);
	$("#mapViz").hide().delay(2000);*/

	$( function() {
		$(".copy").tooltip();
		$("#tabs").tabs();
		$("#tabs-hlp").tabs();
		$("#map-hlp").tabs();
		$("#table-hlp").tabs();
	});
	
	$(".copy").prop('title', 'Click to copy this geography name to the clipboard.');

	function switchToTable(){
		workbook.activateSheetAsync("DataTable");
	}
	function switchToMap(){
		workbook.activateSheetAsync("Map");
	}
	
	async function firstInteractive (e){
		console.log("firstInteractive")
	}
	
	$("#btn-tbl").on("click", function(){
		//$("#btn-map").toggle();
		var sheet = "DataTable";
		//$("#btn-filter").show();
		//$("#btn-tbl").toggle();
		$("#mapViz").show();
		//$(".grp").toggle();
		$(initializeTable);
		$(switchToTable);
		$("#intro").hide();
		$("#mapHelp").hide();
		$("#tableHelp").show();
		$("#addressLookUp").show();
		
	});
	$("#btn-map").on("click", function(){
		//$("#btn-map").toggle();
		//$("#mapViz").toggle();
		//$("#btn-filter").toggle();
		//$("#btn-tbl").toggle();
		//$("#btn-filter2").toggle();
		//$(".grp").toggle();
		var sheet="Map";
		$("#mapViz").show();
		//$("#btn-filter").hide();
		$(initializeMap);
		$(switchToMap);
		$("#intro").hide();
		$("#mapHelp").show();
		$("#tableHelp").hide();
		$("#addressLookUp").show();
	});
	$("#home").on("click", function(){
		$("#mapViz").hide();
		//$("#btn-filter").hide();
		$("#intro").show();
		$("#addressLookUp").hide();
		$("#mapHelp").hide();
		$("#tableHelp").hide();
	});
	$("#btn-filter").on("click", function(){
		$("#modalOpn").trigger('click');
	});
	$("#addressLookUp").on("click", function(){
		$("#modalOpn2").trigger('click');
	});
	$("#help").on("click", function(){
		$("#modalOpn3").trigger('click');
	});
	$("#mapHelp").on("click", function(){
		$("#modalOpn4").trigger('click');
	});
	$("#tableHelp").on("click", function(){
		$("#modalOpn5").trigger('click');
	});
	$(".close-modal").click (function(){
		$("#info").toggle();
	});
	
	
	$("#sub").click(function(){
		$("#info").show();
		var add = $("#address").val(); //Get the address entered into the text box
		var API_KEY = 'AIzaSyAvV8J0hrjiL01jdojNKPE-hhcAc_6Q8zA';
		var url17 = 'https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=' + add +'&benchmark=Public_AR_Current&vintage=ACS2017_Current&layers_Census2020&layers=tract&format=json'; //Create the url needed to geocode the address from Census
		var url22 = 'https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress?address=' + add +'&benchmark=Public_AR_Current&vintage=ACS2022_Current&layers=tract&format=json';
		var urlSLDU = 'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=' + add +'&includeOffices=true&levels=administrativeArea1&roles=legislatorUpperBody&key='+API_KEY;
		var urlSLDL = 'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=' + add +'&includeOffices=true&levels=administrativeArea1&roles=legislatorLowerBody&key='+API_KEY;
		var urlCONG = 'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=' + add +'&includeOffices=true&levels=country&roles=legislatorLowerBody&key='+API_KEY;

		$.ajax({
			url: url17,
			dataType: 'jsonp',
			success: function(response) {
				console.log(response.result.addressMatches[0].geographies); //This will allow you to view all the results that you get for the address geocoder
				var tract17 = (response.result.addressMatches[0].geographies['Census Tracts'][0]['NAME']); //Remove the word Census from the tract name to match the AskCHIS Census Tract naming convention
				var cong17 = (response.result.addressMatches[0].geographies['115th Congressional Districts'][0]['NAME']);
				var sldl17 = (response.result.addressMatches[0].geographies['2016 State Legislative Districts - Lower'][0]['NAME']);
				var sldu17 = (response.result.addressMatches[0].geographies['2016 State Legislative Districts - Upper'][0]['NAME']);
				var county = (response.result.addressMatches[0].geographies['Counties'][0]['NAME']);
				var state = (response.result.addressMatches[0].geographies['States'][0]['NAME']);
				var geoid17 = (response.result.addressMatches[0].geographies['Census Tracts'][0]['GEOID']).substr(1); //Remove the first value from the GEOID to match the AskCHIS GEOID
				
				if(state == "California"){
					var tractName17 = tract17  + ', ' + county + ', California'; //Only display the tract name if the address is geocoded to California
					$("#geoid17").text(geoid17); //Only display the GEOID if the address is geocoded to California
				}else{
					var tractName17 = "Only use a California address."
					$("#geoid17").text('Only use a California address.');
				}
				console.log(tractName17);
				$("#tract17").text(tractName17);
				$("#name17").show();
				$("#cong17").text(cong17);
				$("#sldl17").text(sldl17);
				$("#sldu17").text(sldu17);
			},
			error: function(error) {
				console.log(error);
				$("span").text('Unable to find a Census Tract from the address provided.');
				$("#name17").show();
			}
		});
		$.ajax({
			url: url22,
			dataType: 'jsonp',
			success: function(response) {
				console.log(response.result.addressMatches[0].geographies); //This will allow you to view all the results that you get for the address geocoder
				var tract22 = (response.result.addressMatches[0].geographies['Census Tracts'][0]['NAME']); //Remove the word Census from the tract name to match the AskCHIS Census Tract naming convention
				var cong22 = (response.result.addressMatches[0].geographies['118th Congressional Districts'][0]['NAME']);
				var sldl22 = (response.result.addressMatches[0].geographies['2022 State Legislative Districts - Lower'][0]['NAME']);
				var sldu22 = (response.result.addressMatches[0].geographies['2022 State Legislative Districts - Upper'][0]['NAME']);
				var county = (response.result.addressMatches[0].geographies['Counties'][0]['NAME']);
				var state = (response.result.addressMatches[0].geographies['States'][0]['NAME']);
				var geoid22 = (response.result.addressMatches[0].geographies['Census Tracts'][0]['GEOID']).substr(1); //Remove the first value from the GEOID to match the AskCHIS GEOID
				
				if(state == "California"){
					var tractName22 = tract22 + ', ' + county + ', California'; //Only display the tract name if the address is geocoded to California
					$("#geoid22").text(geoid22); //Only display the GEOID if the address is geocoded to California
				}else{
					var tractName22 = "Only use a California address."
					$("#geoid22").text('Only use a California address.');
				}
				console.log(tractName22);
				$("#tract22").text(tractName22);
				$("#name22").show();
				$("#cong22").text(cong22);
				$("#sldl22").text(sldl22);
				$("#sldu22").text(sldu22);
			},
			error: function(error) {
				console.log(error);
				$("span").text('Unable to find a Census Tract from the address provided.');
				$("#name22").show();
			}
		});
		
		$.ajax({
			url: urlSLDU,
			dataType: 'jsonp',
			success: function(response){
				console.log(response);
				var slduName = (response.officials[0].name);
				var slduParty = (response.officials[0].party);
				console.log(slduName);
				$("#slduName").text(slduName + ' (' + slduParty + ')');
			}
		});
		
		$.ajax({
			url: urlSLDL,
			dataType: 'jsonp',
			success: function(response){
				console.log(response);
				var sldlName = (response.officials[0].name);
				var sldlParty = (response.officials[0].party);
				console.log(sldlName);
				$("#sldlName").text(sldlName + ' (' + sldlParty + ')');
			}
		});
		
		$.ajax({
			url: urlCONG,
			dataType: 'jsonp',
			success: function(response){
				console.log(response);
				var congName = (response.officials[0].name);
				var congParty = (response.officials[0].party);
				console.log(congName);
				$("#congName").text(congName + ' (' + congParty + ')');
			}
		});
			
	});
});
