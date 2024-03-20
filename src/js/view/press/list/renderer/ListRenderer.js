import { LIST_TAB, LIST } from "../../../../utils/Constants.js";

const ListRenderer = {
	totalTab($tabList) {
		$tabList.innerHTML = LIST_TAB.category.reduce((prev, curr) => {
			prev += `<li class="press__list__nav__item" role="tab" tabindex="0">
                        <span>${curr}</span>
						<div class="press__list__nav__item__info"></div>
                        <li class="press__list__nav__item--animation"></li>
                    </li>`;
			return prev;
		}, "");
	},
	totalTabInfo(totalList, $currTab) {
		const $div = $currTab.querySelector(".press__list__nav__item__info");
		const length = totalList[$currTab.innerText].totalCount
			.toString()
			.padEnd(LIST_TAB.charNum, " ")
			.replace(" ", "&nbsp;&nbsp;");

		$div.innerHTML = `
				<span class="press__list__nav__item__new-count curr">1</span>
				<span class="press__list__nav__item__new-count total">/ ${length}</span>`;
	},
	top(topJson) {
		const { aHref, imgSrc, spanText } = topJson;
		return `<a href=${aHref}>
					<img src=${imgSrc} />
				</a>
				<span>${spanText}</span>
				<button>+ 구독하기</button>`;
	},
	descLeft(descLeftJson) {
		const { aHref, aText, imgSrc } = descLeftJson;
		return `<a href=${aHref}>
					<img src="${imgSrc}"/>
				</a>
				<a href=${aHref}>${aText}</a>`;
	},

	descRight(descRightArr) {
		const innerElements = descRightArr.reduce((prev, curr) => {
			prev += `<li><a href=${curr.href}>${curr.text}</a></li>`;
			return prev;
		}, "<ul>");

		return `${innerElements}</ul>`;
	},
	setInnerHTML: (area, renderer, json) => (area.innerHTML = renderer(json)),
	totalNews(totalList, currIdx) {
		const headerArea = document.querySelector(".press__list__news-top");
		const [desLeft, desRight] = headerArea.nextElementSibling.children;
		// const $currNum = document.querySelector(".curr");

		const { header, descriptionLeft, descriptionRight } = totalList.totalNews[currIdx];
		ListRenderer.setInnerHTML(headerArea, ListRenderer.top, header);
		ListRenderer.setInnerHTML(desLeft, ListRenderer.descLeft, descriptionLeft);
		ListRenderer.setInnerHTML(desRight, ListRenderer.descRight, descriptionRight);
		// $currNum.innerHTML = currIdx + 1;
	},
};

export default ListRenderer;
