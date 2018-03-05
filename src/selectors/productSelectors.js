import { createSelector } from 'reselect';


export const getAvailableProducts = state => state.product.availableProducts;
export const getCategory = state => state.product.category.toUpperCase();

export const getCategoriesToProductsMap = createSelector(
    [getAvailableProducts],
    (availableProducts) => {
        const mappedCategoryToProductsObj = {};
        // TODO: more filter logic for more categories
        mappedCategoryToProductsObj.all = availableProducts.instant || null;
        mappedCategoryToProductsObj.sxsw = availableProducts.instant || null;
        return mappedCategoryToProductsObj;
    }
);

export const getCategories = createSelector(
    [getCategoriesToProductsMap],
    (mappedCategoryToProductsObj) =>
        Object.keys(mappedCategoryToProductsObj).map((category) => category.toUpperCase())
);

export const getProductsByCategory = createSelector(
    [getCategory, getCategoriesToProductsMap],
    (category, categoriesToProductsMap) => {
        switch (category) {
            case 'ALL':
                return categoriesToProductsMap.all;
            case 'SXSW':
                return categoriesToProductsMap.sxsw;
            default:
                return categoriesToProductsMap.all;
        }
    }
);

export const getNumberOfProducts = createSelector(
    [getProductsByCategory],
    (products) =>
        (products ? Object.keys(products).length : null)
);

export const getProductPicRefs = createSelector(
    [], () => {}
);
