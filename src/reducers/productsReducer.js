import products from '../data/products.json';
import categories from '../data/categories.json';

let arr = {numbers:[]};

const productsReducer = (state = products, action) => {
    switch (action.type) {
        case "CLICK_CATEGORY":
            arr = {numbers:[]};
            const catSelectedS= action.payload;
            const catSelected = parseInt(catSelectedS, 10);
            state = [];
            for (let c=0;c<categories.length ;c++) {
                let currCat = categories[c];
                findSubCat(catSelected, currCat.sublevels, arr);
                let subcats = arr.numbers;
                state = [];
                for (let i=0;i<products.length;i++) {
                    let done = false;
                    for (let j=0;j<subcats.length && !done;j++) {
                        if (products[i].sublevel_id === subcats[j]) {
                            state.push(products[i]);
                            done = true;
                        }
                    }
                }
            }
            return state;

        case "CLICK_SUBCATEGORY":
            const currSubS= action.payload.key;
            const currSub = parseInt(currSubS, 10);
            state = [];
            for (let i=0;i<products.length;i++){
                if (products[i].sublevel_id === currSub)
                    state.push(products[i]);
            }
            return state;
        default:
            return state
    }
};

const findSubCat = (sel, sub, arr) => {
    let found = false;
    if (sub) {
        for (let s=0;s<sub.length && !found;s++) {
            let currSub = sub[s];
            if (currSub.id === sel) {
                checkSubCats(currSub, arr);
                found = true;
            } else {
                findSubCat(sel, currSub.sublevels, arr);
            }
        }
    }

};

const checkSubCats = (cat, arr) => {
    if (cat.sublevels) {
        for (let i=0;i<cat.sublevels.length;i++) {
            let currSub = cat.sublevels[i];
            checkSubCats(currSub, arr);
        }
    }
    arr.numbers.push(cat.id);
};

export default productsReducer;