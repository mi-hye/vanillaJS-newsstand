import SwiperVisibility from "./SwiperVisibility.js";

let binding;

function controlSwiper(firstPageIdx, lastPageIdx, render, isGrid) {
	const swiper = document.querySelector(".press__swiper");
	SwiperVisibility.init(isGrid, firstPageIdx, lastPageIdx);
	let currIdx = 0;

	const callback = async (e) => {
		const param = { firstPageIdx, lastPageIdx, render, isGrid };
		currIdx = await handleClickSwiper(e.target, currIdx, param);
		console.log("확인", render);
	};

	// swiper.removeEventListener("click", ({ target }) =>
	// binding(target, currIdx, firstPageIdx, lastPageIdx, render, isGrid)
	// );
	swiper.removeEventListener("click", binding);
	binding = callback;
	swiper.addEventListener("click", binding);
	// async ({ target }) => {
	// currIdx = await handleClickSwiper(target, currIdx, firstPageIdx, lastPageIdx, render, isGrid);
	// if (target.id === "right" && currIdx !== lastPageIdx) currIdx += 1;
	// if (target.id === "left" && currIdx) currIdx -= 1;

	// if (isGrid) await swipeGrid(currIdx, firstPageIdx, lastPageIdx, render);
	// else await swipeList(currIdx, render);
	// }
	// );
}

async function handleClickSwiper(target, currIdx, param) {
	const { firstPageIdx, lastPageIdx, render, isGrid } = param;
	if (target.id === "right" && currIdx !== lastPageIdx) currIdx += 1;
	if (target.id === "left" && currIdx) currIdx -= 1;

	if (isGrid) await swipeGrid(currIdx, firstPageIdx, lastPageIdx, render);
	else await swipeList(currIdx, render);

	return currIdx;
}

async function swipeGrid(currIdx, firstPageIdx, lastPageIdx, render) {
	await render(currIdx);
	SwiperVisibility.set(currIdx, firstPageIdx, lastPageIdx);
}

async function swipeList(currIdx, render) {
	await render(currIdx);
}

export default controlSwiper;
