var body = $response.body;

try {
    var data = JSON.parse(body);
    var kycUrl = null;

    if (Array.isArray(data.requirements)) {
        for (var i = 0; i < data.requirements.length; i++) {
            var item = data.requirements[i];

            if (
                item &&
                typeof item.url === "string" &&
                item.url.indexOf("tuyo.withpersona.com/verify") !== -1
            ) {
                kycUrl = item.url;
                break;
            }
        }
    }

    if (kycUrl) {
        console.log("[Tuyo KYC] Found URL:");
        console.log(kycUrl);

        $notification.post(
            "Tuyo KYC",
            "获取成功",
            kycUrl
        );
    } else {
        console.log("[Tuyo KYC] URL not found");
    }

} catch (e) {
    console.log("[Tuyo KYC] Error: " + e);

    $notification.post(
        "Tuyo KYC",
        "脚本异常",
        String(e)
    );
}

$done({});
