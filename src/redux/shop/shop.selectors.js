import { createSelector } from 'reselect';

//string value to id
const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
);

//passing string 
//select collection item
export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectCollections],
        collections => 
            collections[collectionUrlParam]
    );