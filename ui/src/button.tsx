import type React from "react";

const BUTTON_TEXT = "I am a button";

export function Button(): React.ReactElement {
	return (
		<button type="button" aria-label="lol">
			{BUTTON_TEXT}
		</button>
	);
}
