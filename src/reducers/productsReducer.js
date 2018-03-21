import products from '../data/products.json';
import categories from '../data/categories.json';

let arr = {numbers:[]};

const productsReducer = (state = products, action) => {
    switch (action.type) {
        case "CLICK_CATEGORY":
            arr = {numbers:[]};
            const catSelectedS= action.payload;
            const catSelected = parseInt(catSelectedS, 10);
            for (let c=0;c<categories.length ;c++) {
                let currCat = categories[c];
                findSubCat(catSelected, currCat.sublevels, arr);
            }
            let subcats = arr.numbers;
            let newstate = [];
            for (let i=0;i<products.length;i++) {
                if (subcats.includes(products[i].sublevel_id))
                    newstate.push(products[i]);
            }
            return newstate;

        case "CLICK_SUBCATEGORY":
            const currSubS= action.payload.key;
            const currSub = parseInt(currSubS, 10);
            let nState = [];
            for (let i=0;i<products.length;i++){
                if (products[i].sublevel_id === currSub)
                    nState.push(products[i]);
            }
            return nState;

        case "FILTER_SEARCH":
            const reg = action.payload;
            const strReg = reg.toString();
            if (strReg!=='/(?:)/gi')
                return state.map((record) => {
                    const match = record.name.match(reg);
                    if (!match) {
                        return null;
                    }
                    return {
                        ...record,
                        name: record.name
                    };
                }).filter(record => !!record);
            else return products;

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
            } else
                findSubCat(sel, currSub.sublevels, arr);
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
