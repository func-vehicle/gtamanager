export function playNotification(business, title, body) {
    if (business != null) {
		if (!userInfo.settings.audio.enabled || userInfo[business].muted) {
			return;
		}
	}
}