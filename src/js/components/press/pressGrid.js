import readJSON from "../../utils/readJson.js";

async function renderPressGrid(idx) {
	const imagesJson = await readJSON("images");
	const gridWrap = document.querySelector(".press__grid-wrap__grid");
	const startIdx = idx * GRID.cellCount;
	const randomImages = imagesJson.sort(() => Math.random() - 0.5);

	gridWrap.innerHTML = Array.from({ length: GRID.cellCount }).reduce((prev, _, i) => {
		prev += `
		<div>
			<img src="${randomImages[startIdx + i].src}" alt="${randomImages[startIdx + i].alt}"/>
		<button>+ 구독하기</button>
		</div>`;
		return prev;
	}, "");
}

await renderPressGrid(GRID.firstPageIdx);

export default renderPressGrid;
