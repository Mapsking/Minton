
/* =========================================
   Electric Pixel Inn - Main JS (CLEAN)
========================================= */

document.addEventListener("DOMContentLoaded", () => {

	/* =========================
	   NIGHT MODE TOGGLE
	========================= */

	const toggle = document.getElementById("themeToggle");
	const switchImage = document.getElementById("switchImage");

	if (toggle) {

		const applyMode = (on) => {
			document.body.classList.toggle("night-mode", on);

			if (switchImage) {
				switchImage.src = on
					? "images/purple_lightswitch_on.png"
					: "images/white_lightswitch_off.png";
			}

			toggle.setAttribute(
				"aria-label",
				on ? "Disable night mode" : "Enable night mode"
			);
		};

		let nightMode = localStorage.getItem("nightMode") === "true";
		applyMode(nightMode);

		toggle.addEventListener("click", () => {
			nightMode = !nightMode;
			localStorage.setItem("nightMode", String(nightMode));
			applyMode(nightMode);
		});
	}


	/* =========================
	   ACTIVE NAV HIGHLIGHT
	========================= */

	const links = document.querySelectorAll("nav a");
	const currentPage = location.pathname.split("/").pop();

	links.forEach(link => {
		if (link.getAttribute("href") === currentPage) {
			link.classList.add("active");
		}
	});


	/* =========================
	   EVENT FILTER (LINEUP PAGE ONLY)
	========================= */

	const filter = document.getElementById("eventFilter");
	const rows = document.querySelectorAll("table tr[data-type]");

	if (filter && rows.length) {

		const applyFilter = (value) => {
			rows.forEach(row => {
				const type = row.dataset.type;
				row.style.display = (value === "all" || type === value) ? "" : "none";
			});
		};

		applyFilter("all");

		const saved = localStorage.getItem("eventFilter");
		if (saved) {
			filter.value = saved;
			applyFilter(saved);
		}

		filter.addEventListener("change", () => {
			localStorage.setItem("eventFilter", filter.value);
			applyFilter(filter.value);
		});
	}


	/* =========================
	   FLIP CARDS (LINEUP PAGE ONLY)
	========================= */

	const cards = document.querySelectorAll(".flip-card");

	if (cards.length) {
		cards.forEach(card => {
			card.addEventListener("click", () => {
				card.classList.toggle("flipped");
			});
		});
	}

});