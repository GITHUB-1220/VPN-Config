// KYC-Debug.JS
// 仅检测请求是否命中，不提取或输出 KYC 会话链接

try {
    const url = ($request && $request.url) || "";

    if (
        /^https:\/\/withpersona\.com\/api\/internal\/verify\/v1\/inquiries\/inq_[A-Za-z0-9]+(?:\?.*)?$/
            .test(url)
    ) {
        $notification.post(
            "Tuyo KYC",
            "Persona Inquiry 已捕获",
            "请求匹配成功"
        );
    }
} catch (e) {
    // 静默处理
}

$done({});
