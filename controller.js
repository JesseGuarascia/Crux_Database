//
var MODE_STATES = {
	NONE : -1,
	EDIT : 1,
	NEW : 2
}

var MODE = MODE_STATES.NONE;
var locations = [];

$(document).ready(function(){
	updateLocationList();

	// Handle changing the location
	$("#location").change(function(){
		var $selected = $(this).find("option:selected");

		if ($selected.val() == "add-new"){
			$("#info-form-set").removeAttr("disabled");
			$("#location-name").val("").removeAttr("disabled");
			$("#location-id-suffix").val("");

			MODE = MODE_STATES.NEW;
		} else {
			$("#info-form-set").removeAttr("disabled");
			$("#location-name").prop("disabled", true);

			locationName = $selected.val();

			locations.forEach(function(element){

				if (element.name == locationName){
					$("#location-name").val(element.name);
					$("#location-id-suffix").val(element.id_suffix);

					return;
				}
			}, this);

			MODE = MODE_STATES.EDIT;
		}
	});

	// Handle the submit button
	$("#location_save").click(function(){
		// Add a new location
		if (MODE == MODE_STATES.NEW){
			var location_name = $("#location-name").val();
			var location_id_suffix = $("#location-id-suffix").val();

			jQuery.ajax({
				type: "GET",
				async: false,
				url: "database.php?option=add_location",
				datatype: "json",
				data: {name: location_name, id_suffix: location_id_suffix},
				success: function (text){
					updateLocationList();

					$("#location").val(location_name);
				}
			});
		} else if (MODE == MODE_STATES.EDIT){
			var location_name = $("#location-name").val();
			var location_id_suffix = $("#location-id-suffix").val();

			jQuery.ajax({
				type: "GET",
				async: false,
				url: "database.php?option=edit_location",
				datatype: "json",
				data: {name: location_name, id_suffix: location_id_suffix},
				success: function (text){
					updateLocationList();

					$("#location").val(location_name);
				}
			});
		}
	});

	// Remove button functionality
	$("#location_remove").click(function(){
		if (MODE == MODE_STATES.EDIT){
			var location_name = $("#location-name").val();
			var location_id_suffix = $("#location-id-suffix").val();

			jQuery.ajax({
				type: "GET",
				async: false,
				url: "database.php?option=remove_location",
				datatype: "json",
				data: {name: location_name},
				success: function (text){
					updateLocationList();

					$("#location-name").removeAttr("disabled").val("");
					$("#location-id-suffix").val("");
					$("#location-field-set").prop("disabled", true);
				}
			});
		}
	});
});

// Updates the available locations
updateLocationList = function() {
	$("#location").html("");
	$("#location").append("<option disabled selected value>-- select an option --</option>");
	
	locations = [];

	jQuery.ajax({
		type: "GET",
		async: false,
		url: "database.php?option=get_locations",
		success: function (text){
			if (text == "0 results") return;

			data = JSON.parse(text);

			data.forEach(function(element) {
				temp = new Object();
				temp.name = element[0];
				temp.id_suffix = element[1];

				locations.push(temp);

				$("#location").append("<option value='" + temp.name + "'>" + temp.name + "</option>");
			}, this);

			$("#location").append("<option value='add-new'>-- create new --</option>");
		}
	});
}