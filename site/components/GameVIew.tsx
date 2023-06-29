import * as React from "react";
import { cssVars } from "lib/ui";
import View, { ViewProps } from "components/View";

export interface GameViewRef {
    run: (code: string) => void;
    send: (msg: any, origin?: string) => void;
}

const wrapGame = (code: string) => `
<!DOCTYPE html>
<head>
	<style>
		${cssVars}
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		body,
		html {
			width: 100%;
			height: 100%;
		}
		body {
			background: var(--color-bg2);
		}
	</style>
</head>
<body>
	<script src="/dist/mandarina.js"></script>
	<script>
${code}
	</script>
</body>
`;

interface GameViewProps {
    code: string;
}

const GameView = React.forwardRef<GameViewRef, GameViewProps & ViewProps>(
    ({ code, ...args }, ref) => {
        const iframeRef = React.useRef<HTMLIFrameElement>(null);

        React.useImperativeHandle(ref, () => ({
            run(code: string, msg?: any) {
                if (!iframeRef.current) return;
                const iframe = iframeRef.current;
                iframe.srcdoc = wrapGame(code);
            },
            send(msg: any, origin = "*") {
                if (!iframeRef.current) return;
                const iframe = iframeRef.current;
                iframe.contentWindow?.postMessage(JSON.stringify(msg), origin);
            },
        }));

        return (
            <View
                {...args}
                css={{
                    overflow: "hidden",
                }}
            >
                <iframe
                    ref={iframeRef}
                    tabIndex={0}
                    css={{
                        border: "none",
                        background: "var(--background-bg2)",
                        width: "100%",
                        height: "100%",
                    }}
                    srcDoc={wrapGame(code ?? "")}
                />
            </View>
        );
    },
);

export default GameView;
