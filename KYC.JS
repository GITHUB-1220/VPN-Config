// Tuyo KYC - Loon Legacy

try {
    var body = $response.body;

    if (!body) {
        console.log("[Tuyo KYC] response body is empty");
        $notification.post(
            "Tuyo KYC",
            "脚本已触发",
            "但是响应 Body 为空"
        );
        $done({});
    }

    var data = JSON.parse(String(body));
    var foundUrl = "";

    // 递归寻找 Persona 验证链接
    function findPersonaUrl(obj) {
        if (foundUrl) return;

        if (typeof obj === "string") {
            if (/https?:\/\/[^"' ]*tuyo\.withpersona\.com\/verify[^"' ]*/i.test(obj)) {
                var match = obj.match(
                    /https?:\/\/[^"' ]*tuyo\.withpersona\.com\/verify[^"' ]*/i
                );

                if (match) {
                    foundUrl = match[0];
                }
            }
            return;
        }

        if (!obj || typeof obj !== "object") {
            return;
        }

        if (Array.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
                findPersonaUrl(obj[i]);
                if (foundUrl) return;
            }
        } else {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    findPersonaUrl(obj[key]);
                    if (foundUrl) return;
                }
            }
        }
    }

    findPersonaUrl(data);

    if (foundUrl) {

        console.log("[Tuyo KYC] Persona URL found:");
        console.log(foundUrl);

        // 不再使用 persistentStore 去重
        // 每次发现链接都通知

        $notification.post(
            "Tuyo KYC",
            "已获取 Persona KYC 验证链接",
            foundUrl,
            {
                openUrl: foundUrl,
                clipboard: foundUrl
            }
        );

        console.log("[Tuyo KYC] notification sent");

    } else {

        console.log("[Tuyo KYC] Persona URL NOT found");

        $notification.post(
            "Tuyo KYC",
            "脚本已触发",
            "没有找到 Persona 验证链接"
        );
    }

} catch (e) {

    console.log("[Tuyo KYC] ERROR: " + e);

    $notification.post(
        "Tuyo KYC",
        "脚本执行异常",
        String(e)
    );
}

$done({});
