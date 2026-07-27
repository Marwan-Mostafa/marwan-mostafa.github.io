const DEFAULT_PER_PAGE = 16;

const FILTER_ELEMENT_IDS = {
    filterBtn: "filterBtn",
    showItems: "showItems",
    sortItems: "sortItems",
    gridView: "gridView",
    listView: "listView",
};

const BOUND_DATASET_KEY = "filtersBound";

export function setupFilters({
    onPerPageChange,
    onSortChange,
    onViewChange,
    onFilterToggle,
} = {}) {

    bindFilterToggle(
        FILTER_ELEMENT_IDS.filterBtn,
        onFilterToggle
    );

    bindShowItems(
        FILTER_ELEMENT_IDS.showItems,
        onPerPageChange
    );

    bindSortItems(
        FILTER_ELEMENT_IDS.sortItems,
        onSortChange
    );

    bindViewMode(
        FILTER_ELEMENT_IDS.gridView,
        "grid",
        onViewChange
    );

    bindViewMode(
        FILTER_ELEMENT_IDS.listView,
        "list",
        onViewChange
    );

}

function bindFilterToggle(id, callback) {

    const button = getElement(id);

    if (!button) return;

    button.addEventListener("click", () => {

        const expanded =
            button.getAttribute("aria-expanded") === "true";

        const nextState = !expanded;

        button.setAttribute(
            "aria-expanded",
            String(nextState)
        );

        callback?.(nextState);

    });

}

function bindShowItems(id, callback) {

    const select = getElement(id);

    if (!select) return;

    select.addEventListener("change", ({ target }) => {

        const value = target.value;

        const perPage =

            value === "All"
                ? Infinity
                : Number(value) || DEFAULT_PER_PAGE;

        callback?.(perPage);

    });

}

function bindSortItems(id, callback) {

    const select = getElement(id);

    if (!select) return;

    select.addEventListener("change", ({ target }) => {

        callback?.(

            target.value.toLowerCase()

        );

    });

}

function bindViewMode(id, mode, callback) {

    const button = getElement(id);

    if (!button) return;

    button.addEventListener("click", () => {

        callback?.(mode);

    });

}

function getElement(id) {

    const element = document.getElementById(id);

    if (!element) {

        return null;

    }

    if (isAlreadyBound(element)) {

        return null;

    }

    markBound(element);

    return element;

}

function isAlreadyBound(element) {

    return (

        element.dataset[BOUND_DATASET_KEY] === "true"

    );

}

function markBound(element) {

    element.dataset[BOUND_DATASET_KEY] = "true";

}