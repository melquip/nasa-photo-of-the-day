import { injectGlobal } from 'emotion';
injectGlobal`
	@import 'reset.css';
	* {
		box-sizing: border-box;
	}
	body {
	margin: 0;
	font-family: 'Verdana', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	}

	code {
	font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
		monospace;
	}
`;