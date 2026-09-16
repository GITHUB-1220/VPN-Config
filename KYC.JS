const body = $response.body;

try {
    let text = body || "";
    let inquiryId = null;

    // 方式一：从 JSON 中递归寻找 inq_...
    function findInquiry(obj) {
        if (!obj || typeof obj !== "object") return null;

        if (typeof obj === "string") {
            const m = obj.match(/inq_[A-Za-z0-9]+/);
            return m ? m[0] : null;
        }

        if (Array.isArray(obj)) {
            for (const item of obj) {
                const result = findInquiry(item);
                if (result) return result;
            }
        } else {
            for (const key in obj) {
                const result = findInquiry(obj[key]);
                if (result) return result;
            }
        }

        return null;
    }

    try {
        const data = JSON.parse(text);
        inquiryId = findInquiry(data);
    } catch (_) {}

    // 方式二：直接从响应文本中找 inq_...
    if (!inquiryId) {
        const match = text.match(/inq_[A-Za-z0-9]+/);
        if (match) {
            inquiryId = match[0];
        }
    }

    if (inquiryId) {
        const kycUrl =
            "https://tuyo.withpersona.com/inquiry?inquiry-id=" +
            inquiryId;

        const key = "TuyoKYC_InquiryURL_Last";
        const lastUrl = $prefs.valueForKey(key);

        // 只在新链接出现时通知
        if (lastUrl !== kycUrl) {
            $prefs.setValueForKey(key, kycUrl);

            $notify(
                "Tuyo KYC",
                "发现新的 Persona KYC",
                kycUrl
            );

            console.log("Tuyo Persona KYC: " + kycUrl);
        }
    }

} catch (e) {
    // 错误静默，不弹通知
    console.log("TuyoKYC Error: " + e);
}

$done({});
