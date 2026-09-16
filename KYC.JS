// Tuyo KYC - Persona Inquiry
const body = $response && $response.body;

try {
    if (body) {
        const text = String(body);
        const match = text.match(/inq_[A-Za-z0-9]+/);

        if (match) {
            const inquiryId = match[0];

            const kycUrl =
                "https://tuyo.withpersona.com/inquiry?inquiry-id=" +
                inquiryId;

            const key = "TuyoKYC_InquiryURL_Last";
            const oldUrl = $persistentStore.read(key);

            // 只通知新的 KYC 链接，避免重复通知
            if (oldUrl !== kycUrl) {
                $persistentStore.write(kycUrl, key);

                $notification.post(
                    "Tuyo KYC",
                    "发现新的 KYC 链接",
                    kycUrl
                );
            }
        }
    }
} catch (e) {
    // 错误静默，不弹通知
}

$done({});
