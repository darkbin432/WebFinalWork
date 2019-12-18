$(function () {
	$('.a').click(function () {
		// alert('hello world');
		var activityId = $('#activityId').val();
		$.ajax({
			type: "GET",
			url: rootPath + "/api/test/getActivityQR/" + activityId,
			dataType: "json",
			async: false,
			data: {},
			success: function (data) {
				if (data.status === 200) {
					var user = data.data;
					// alert(user);
					$('#test').html(user)
				} else {
				}
			},
			error: function () {
			}
		});
	});
});