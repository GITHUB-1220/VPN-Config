var body = $response.body;

try {
    var data = JSON.parse(body);
    var inquiryId = null;

    if (Array.isArray(data.requirements)) {
        for (var i = 0; i < data.requirements.length; i++) {
            var item = data.requirements[i];

            if (item && typeof item.url === "string") {
                var match = item.url.match(/inq_[A-Za-z0-9]+/);

                if (match) {
                    inquiryId = match[0];
                    break;
                }
            }
        }
    }

    if (inquiryId) {
        var kycUrl =
            "https://tuyo.withpersona.com/inquiry?inquiry-id=inquiries/" +
            inquiryId;

        $notification.post(
            "Tuyo KYC",
            "已获取 KYC 链接",
            kycUrl
        );

        console.log("Tuyo KYC URL: " + kycUrl);
    }

} catch (e) {
    console.log("TuyoKYC Error: " + e);
}

$done({});
