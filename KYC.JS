// Tuyo KYC - Loon
const body = $response && $response.body;

try {
    if (!body) {
        $done({});
        return;
    }

    const text = String(body);

    // 提取 Persona Inquiry ID
    const match = text.match(/inq_[A-Za-z0-9]+/);

    if (match) {
        const inquiryId = match[0];

        // 按确认后的格式生成链接
        const kycUrl =
            "https://tuyo.withpersona.com/inquiry?inquiry-id=" +
            inquiryId;

        const key = "TuyoKYC_InquiryURL_Last";
        const oldUrl = $persistentStore.read(key);

        // 只通知新的链接
        if (oldUrl !== kycUrl) {
            $persistentStore.write(kycUrl, key);

            $notification.post(
                "Tuyo KYC",
                "已获取 Persona KYC 链接",
                kycUrl,
                {
                    openUrl: kycUrl,
                    clipboard: kycUrl
                }
            );

            console.log("[Tuyo KYC] " + kycUrl);
        }
    }
} catch (e) {
    // 错误静默，不通知
    console.log("[Tuyo KYC] Error");
}

$done({});
