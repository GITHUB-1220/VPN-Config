(function () {
    try {
        const url = $request.url || "";

        const match = url.match(
            /\/api\/internal\/verify\/v1\/inquiries\/([^/?#]+)/i
        );

        if (!match) {
            $done({});
            return;
        }

        const inquiryId = decodeURIComponent(match[1]);

        if (!/^inq_[A-Za-z0-9]+$/.test(inquiryId)) {
            $done({});
            return;
        }

        const inquiryUrl =
            "https://tuyo.withpersona.com/inquiry?inquiry-id=" +
            encodeURIComponent(inquiryId);

        $persistentStore.write(
            inquiryId,
            "persona_inquiry_id"
        );

        $persistentStore.write(
            inquiryUrl,
            "persona_inquiry_url"
        );

        $notification.post(
            "Persona KYC",
            inquiryId,
            inquiryUrl,
            {
                clipboard: inquiryUrl
            }
        );

        console.log("[Persona] " + inquiryId);
        console.log("[Persona] " + inquiryUrl);

    } catch (e) {
        console.log("[Persona] Error: " + e);
    }

    $done({});
})();
