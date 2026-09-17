const body = $response && $response.body;

try {
    if (!body) {
        console.log("[Tuyo KYC] 没有 response body");
        $done({});
        return;
    }

    const text = String(body);

    // 只识别 Inquiry ID
    const match = text.match(/\binq_[A-Za-z0-9]+\b/);

    if (match) {
        const inquiryId = match[0];

        console.log("[Tuyo KYC] Inquiry ID: " + inquiryId);

        $notification.post(
            "Tuyo KYC",
            "发现 Inquiry ID",
            inquiryId
        );
    } else {
        console.log("[Tuyo KYC] 没有找到 Inquiry ID");
    }

} catch (e) {
    console.log("[Tuyo KYC] 解析失败: " + e);
}

$done({});
