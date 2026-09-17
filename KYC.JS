(function () {

    function findInquiryId(text) {
        if (!text) return null;

        var match = String(text).match(
            /inq_[A-Za-z0-9]+/i
        );

        return match ? match[0] : null;
    }

    try {

        var foundId = null;

        // 1. URL
        if ($request && $request.url) {
            foundId = findInquiryId($request.url);
        }

        // 2. Request Headers
        if (!foundId && $request && $request.headers) {
            foundId = findInquiryId(
                JSON.stringify($request.headers)
            );
        }

        // 3. Request Body
        if (!foundId && $request && $request.body) {
            foundId = findInquiryId($request.body);
        }

        // 4. Response Headers
        if (!foundId && $response && $response.headers) {
            foundId = findInquiryId(
                JSON.stringify($response.headers)
            );
        }

        // 5. Response Body
        if (!foundId && $response && $response.body) {
            foundId = findInquiryId($response.body);
        }

        if (!foundId) {

            $notification.post(
                "Persona KYC",
                "脚本已运行",
                "当前请求中没有找到 Inquiry ID"
            );

            console.log(
                "[KYC] URL = " +
                (($request && $request.url) || "")
            );

            $done({});
            return;
        }

        var inquiryUrl =
            "https://tuyo.withpersona.com/inquiry?inquiry-id=" +
            encodeURIComponent(foundId);

        // 保存
        $persistentStore.write(
            foundId,
            "persona_inquiry_id"
        );

        $persistentStore.write(
            inquiryUrl,
            "persona_inquiry_url"
        );

        console.log(
            "[KYC] Inquiry ID = " + foundId
        );

        console.log(
            "[KYC] Inquiry URL = " + inquiryUrl
        );

        // 通知 + 点击复制
        $notification.post(
            "Persona KYC",
            foundId,
            inquiryUrl,
            {
                clipboard: inquiryUrl
            }
        );

    } catch (e) {

        console.log(
            "[KYC] ERROR = " + String(e)
        );

        $notification.post(
            "Persona KYC",
            "脚本错误",
            String(e)
        );
    }

    $done({});
})();
