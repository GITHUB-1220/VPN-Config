// Tuyo KYC - Persona API
const body = $response && $response.body;

try {
    if (body) {
        const text = String(body);

        // 提取完整 Persona Inquiry API 地址
        const match = text.match(
            /https:\/\/withpersona\.com\/api\/internal\/verify\/v1\/inquiries\/inq_[A-Za-z0-9]+/
        );

        if (match) {
            const url = match[0];

            const key = "TuyoKYC_LastPersonaAPI";
            const oldUrl = $persistentStore.read(key);

            // 新链接才通知，重复的不通知
            if (oldUrl !== url) {
                $persistentStore.write(url, key);

                $notification.post(
                    "Tuyo KYC",
                    "发现新的 Persona KYC",
                    url
                );
            }
        }
    }
} catch (e) {
    // 错误静默，不弹通知
}

$done({});
