const body = $response && $response.body;

try {
    if (!body) {
        console.log("[Tuyo KYC] No response body");
        $done({});
        return;
    }

    const text = String(body);

    // Extract Inquiry ID
    const match = text.match(/\binq_[A-Za-z0-9]+\b/);

    if (!match) {
        console.log("[Tuyo KYC] Inquiry ID not found");
        $done({});
        return;
    }

    const inquiryId = match[0];

    // Get current time: HH.MM.SS
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const time = `${hh}.${mm}.${ss}`;

    console.log("[Tuyo KYC] Time: " + time);
    console.log("[Tuyo KYC] Inquiry ID: " + inquiryId);
    console.log("[Tuyo KYC] Inquiry ID extraction completed.");

    // Notify every time; no deduplication
    $notification.post(
        "Tuyo KYC",
        "New Inquiry ID detected",
        inquiryId
    );

} catch (e) {
    // Errors are logged only; no error notification
    console.log("[Tuyo KYC] Parse error: " + e);
}

$done({});
