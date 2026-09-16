const body = $response && $response.body;

try {
    const text = String(body || "");

    let inquiryId = null;
    const m = text.match(/inq_[A-Za-z0-9]+/);

    if (m) {
        inquiryId = m[0];
    }

    if (inquiryId) {
        const url =
            "https://tuyo.withpersona.com/inquiry?inquiry-id=" +
            inquiryId;

        $notification.post(
            "Tuyo KYC",
            "找到 Inquiry",
            url
        );

        console.log("[Tuyo KYC] " + url);
    } else {
        $notification.post(
            "Tuyo KYC",
            "脚本已触发",
            "但是响应里没有找到 inq_..."
        );
    }
} catch (e) {
    console.log("[Tuyo KYC] " + String(e));
}

$done({});
