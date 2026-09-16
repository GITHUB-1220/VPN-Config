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

    // 只有找到 KYC 链接才通知
    if (kycUrl) {
        var key = "TuyoKYC_LastURL";
        var lastUrl = $persistentStore.read(key);

        // 新链接才通知
        if (lastUrl !== kycUrl) {
            $persistentStore.write(kycUrl, key);

            $notification.post(
                "Tuyo KYC",
                "已获取 KYC 链接",
                kycUrl
            );

            console.log("Tuyo KYC URL: " + kycUrl);
        }
    }

} catch (e) {
    // 失败不通知，只写日志
    console.log("TuyoKYC Error: " + e);
}

$done({});
