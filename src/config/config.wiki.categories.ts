import { Categories, SubCategories } from '@enums';

const CategoryConfig = {
    [Categories.Anthropology] : [
        SubCategories.Biographies,
        SubCategories.Cultures,
        SubCategories.Linguistics,
        SubCategories.Literature,
        SubCategories.Politics,
        SubCategories.Races,
        SubCategories.Science,
        SubCategories.Technology,
        SubCategories.Theology,
    ],
    [Categories.Archeology]: [
        SubCategories.Archiecture,
        SubCategories.Clothing,
        SubCategories.FoodAndDrink,
        SubCategories.Objects,
        SubCategories.SpecialItems,
        SubCategories.Weapons,
    ],
    [Categories.Ecology]: [
        SubCategories.Behemoths,
        SubCategories.Fauna,
        SubCategories.Flora,
    ],
    [Categories.Geography]: [
        SubCategories.Cities,
        SubCategories.Mountains,
        SubCategories.Places,
        SubCategories.Regions,
        SubCategories.WaterBodies,
    ],
    [Categories.History]: [
        SubCategories.TheAgeOfAwakening,
        SubCategories.TheAgeOfBeginnings,
        SubCategories.TheAgeOfUncertainty,
        SubCategories.TheAgeOfEmpires,
        SubCategories.TheAgeOfRaces,
        SubCategories.TheAgeOfCreation,
    ]
};

export default CategoryConfig;