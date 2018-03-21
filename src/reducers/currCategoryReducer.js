import categories from '../data/categories.json';

const currCategoryReducer = (state = {levels:[], found:false}, action) => {
    switch (action.type) {
        case "CLICK_CATEGORY":
            let arr1 = {levels:[], found:false};
            const catSelectedS = action.payload;
            const catSelected = parseInt(catSelectedS, 10);
            for (let c=0;c<categories.length && !arr1.found;c++) {
                let currCat = categories[c];
                findSubCat(catSelected, currCat.sublevels, arr1);
                if(arr1.found)
                    arr1.levels.unshift(currCat);
            }
            return arr1;

        case "CLICK_SUBCATEGORY":
            let arr = {levels:[], found:false};
            const currSubS = action.payload.key;
            const currSub = parseInt(currSubS, 10);
            for (let c=0;c<categories.length && !arr.found;c++) {
                let currCat = categories[c];
                findSubCat(currSub, currCat.sublevels, arr);
                if(arr.found)
                    arr.levels.unshift(currCat);
            }
            return arr;

        case "NO_CATEGORY":
            let arr2 = {levels:[], found:false};
            return arr2;

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
