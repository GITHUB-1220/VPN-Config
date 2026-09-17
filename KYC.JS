const body = $response && $response.body;

try {
    if (!body) {
        console.log("[Tuyo KYC] 没有 response body");
        $done({});
        return;
    }

    const text = String(body);

    // 提取 Inquiry ID
    const match = text.match(/\binq_[A-Za-z0-9]+\b/);

    if (!match) {
        console.log("[Tuyo KYC] 没有找到 Inquiry ID");
        $done({});
        return;
    }

    const inquiryId = match[0];

    console.log("[Tuyo KYC] Inquiry ID: " + inquiryId);

    // 按指定格式进行字符串拼接
    const inquiryUrl =
        "https://tuyo.withpersona.com/inquiry?inquiry-id=" + inquiryId;

    console.log("[Tuyo KYC] 拼接结果: " + inquiryUrl);

    // 每次发现都通知，不去重
    $notification.post(
        "Tuyo KYC",
        "发现新的 Inquiry",
        inquiryUrl
    );

} catch (e) {
    // 错误静默，仅写日志
    console.log("[Tuyo KYC] 解析失败: " + e);
}

$done({});
