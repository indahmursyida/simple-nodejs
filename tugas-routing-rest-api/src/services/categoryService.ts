import { Category } from "../models/category";

export const addCategory = (categories: Category[], newCategory: Category): Category[] => {
    return [...categories, newCategory];
};

export const removeCategory = (categories: Category[], categoryId: number): Category[] => {
    return categories.filter(category => category.id !== categoryId);
};

export const updateCategory = (categories: Category[], updatedCategory: Category): Category[] | undefined => {
    const categoryIndex = categories.findIndex(category => category.id === updatedCategory.id);
    if (categoryIndex === -1){
        return undefined;
    }

    categories[categoryIndex] =  updatedCategory;
    return categories;
};

export const getCategories = (categories: Category[]): Category[] => {
    return categories;
};

export const getCategoryDetail = (categories: Category[], categoryId: number): Category | undefined => {
    return categories.find(category => category.id === categoryId);
};