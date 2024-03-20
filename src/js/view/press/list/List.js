import controlSwiper from "../../../components/swiper.js";
import { LIST } from "../../../utils/Constants.js";
import { getJson } from "../../../utils/fetchJson.js";
import ListRenderer from "./renderer/ListRenderer.js";

const List = {
	binding: () => {},
	totalList: await getJson("totalList"),
	$tabList: document.querySelector(".press__list__nav"),
	$currTab: "",
	async init() {
		const totalList = await getJson("totalList");
		List.clickTab(totalList, List.$tabList);
	},
	async totalRender() {
		const totalList = await getJson("totalList");
		const a = totalList.totalNews; // 246개뉴스
		ListRenderer.totalTab(List.$tabList);

		List.clickTab(totalList, List.$tabList); // TODO 나중에 main으로 빼야함

		const firstCategory = document.querySelector(".press__list__nav__item");
		firstCategory.click();
		ListRenderer.totalNews(totalList, 0); // 이거 바꿔
	},
	nextNewsRender(idx) {
		ListRenderer.totalNews(List.totalList, idx);
		List.resetAnimation(List.$currTab);
	},
	clickTab() {
		const callback = ({ target }) => {
			List.$currTab = List.handleProgressEvent(target);
			ListRenderer.totalTabInfo(List.totalList, List.$currTab);
			List.resetAnimation(List.$currTab);
			const currTabText = List.$currTab.children[0].innerText;
			const currTabStartIdx = List.totalList[currTabText].startIdx;
			List.nextNewsRender(currTabStartIdx);
			controlSwiper(currTabStartIdx, LIST.lastPageIdx, List.nextNewsRender, false);
		};

		// const intervalBox = ["dumy"];
		List.$tabList.removeEventListener("click", List.binding);
		List.binding = callback;
		List.$tabList.addEventListener("click", List.binding);
	},
	handleProgressEvent(target) {
		const tabs = document.querySelectorAll(".press__list__nav__item");
		tabs.forEach((tab) => (tab.ariaSelected = false));
		const currentTab = target;
		const li = currentTab.closest("li");
		li.ariaSelected = true;
		return li;
	},
	resetAnimation($currTab) {
		const animation = $currTab.querySelector(".press__list__nav__item--animation");
		animation.classList.remove("active");
		void animation.offsetWidth;
		animation.classList.add("active");
	},
};

export default List;
