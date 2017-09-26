//
var MODE_STATES = {
	NONE : -1,
	EDIT : 1,
	NEW : 2
}

var MODE = MODE_STATES.NONE;

$(document).ready(function(){
	// Handle changing the location
	$("#location").change(function(){
		var $selected = $(this).find("option:selected");

		if ($selected.val() == "add-new"){
			$("#info-form-set").removeAttr("disabled");
			MODE = MODE_STATES.NEW;
		}
	});

	// Handle the submit button
	$("#submit").click(function(){
		// Add a new location
		if (MODE == MODE_STATES.NEW){
			var location_name = $("#location-name").text();
			var location_id_suffix = $("#location-id-suffix").text();

			jQuery.ajax({
				type: "POST",
				url: "database.php",
				dataType: "json",
				data: {name: location_name, id_suffix: location_id_suffix},
				success: function (text){
					alert(text);
				}
			});
		}
	});
});