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
        var key = "TuyoKYC_LastURL";
        var lastUrl = $persistentStore.read(key);

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
    console.log("TuyoKYC Error: " + e);
}

$done({});
