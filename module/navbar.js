class NavbarElement extends HTMLElement {
	constructor() {
		super()
		var shadow = this.attachShadow({mode:'open'})

		function renderNavLink(pathname,label)	{
			if( window.location.pathname === pathname )	{
				return `
				<li class="nav-item active">
					<a class="nav-link" href="${pathname}">${label}</a>
				</li>
				`;
			}
			else {
				return `
				<li class="nav-item">
					<a class="nav-link" href="${pathname}">${label}</a>
				</li>
				`;
			}
		}

		var getParentUrl = async function()	{
			var path = '/config.json'
			var archive = new DatArchive(window.location);
			var config = await archive.readFile(path);
			return config.parent;
		};

		shadow.innerHTML = `
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

		<nav class="navbar navbar-expand-sm bg-dark navbar-dark fixed-top justify-content-left">
			<a class="navbar-brand" href="/">Image Sharing Portal</a>

			<ul class="navbar-nav">
				${renderNavLink(`${getParentUrl()}`,'Home')}
			</ul>
		</nav>

		<div class="contents">
			<slot></slot>
		</div>
		`
	}
}

customElements.define('my-navbar',NavbarElement)
