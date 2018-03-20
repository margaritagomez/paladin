import categories from '../data/categories.json';

let arr = {levels:[], found:false};

const currCategoryReducer = (state = {levels:[]}, action) => {
    switch (action.type) {
        case "CLICK_CATEGORY":
            arr = {levels:[], found:false};
            const catSelectedS = action.payload;
            const catSelected = parseInt(catSelectedS, 10);
            for (let c=0;c<categories.length && !arr.found;c++) {
                let currCat = categories[c];
                findSubCat(catSelected, currCat.sublevels, arr);
                if(arr.found)
                    arr.levels.unshift(currCat);
            }
            state = arr;
            return state;

        case "CLICK_SUBCATEGORY":
            arr = {levels:[], found:false};
            const currSubS = action.payload.key;
            const currSub = parseInt(currSubS, 10);
            for (let c=0;c<categories.length && !arr.found;c++) {
                let currCat = categories[c];
                findSubCat(currSub, currCat.sublevels, arr);
                if(arr.found)
                    arr.levels.unshift(currCat);
            }
            state = arr;
            return state;
        default:
            return state
    }
};

const findSubCat = (sel, sub, arr) => {
    if (sub) {
        for (let s=0;s<sub.length && !arr.found;s++) {
            let currSub = sub[s];
            if (currSub.id === sel) {
                arr.found = true;
            } else {
                findSubCat(sel, currSub.sublevels, arr);
            }
            if (arr.found)
                arr.levels.unshift(currSub)
        }

    }
};

export default currCategoryReducer;
