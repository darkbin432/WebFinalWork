/**
 * @author 斌
 */

jQuery(
    function ($) {

        var noticeId = localStorage.getItem("noticeId");

        function getContent() {
            $.ajax({
                type: "POST",
                url: rootPath + "/api/selectOneNews",
                dataType: "json",
                data: {
                    id: noticeId
                },
                success: function (response) {
                    if (response.status === 200) {
                        var html = "<h2 class=\"blog-title\">" + response.data.title + "</h2>\n" +
                            "                    <div class=\"blog-meta\">\n" +
                            "                        <a href=\"\" class=\"ml-0\"><i class=\"blue-text fa fa-calendar\"></i>" + response.data.publishTime.substring(0,10) + "</a>\n" +
                            "                        <a href=\"\"><i class=\"blue-text fa fa-user\"></i>" + response.data.source + "</a>\n" +
                            "                        <a href=\"\"><i class=\"blue-text fa fa-eye\"></i>" + response.data.readCount + "</a>\n" +
                            "                    </div>\n" +
                            "                    <div>" + response.data.content + "</div>";
                        $("#content").html(html);
                    }
                },
                error: function () {

                }
            })
        }

        getContent();

    }
);