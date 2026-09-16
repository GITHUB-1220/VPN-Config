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

    // 只有找到 KYC URL 才通知
    if (kycUrl) {
        $notification.post(
            "Tuyo KYC",
            "已获取 KYC 链接",
            kycUrl
        );

        console.log("Tuyo KYC URL: " + kycUrl);
    }

} catch (e) {
    // 所有错误静默处理
    console.log("TuyoKYC Error: " + e);
}

$done({});
