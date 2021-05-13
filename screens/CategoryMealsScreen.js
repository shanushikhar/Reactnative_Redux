//import liraries
import React, { Component } from 'react';
import { View } from 'react-native'
import DefaultText from '../components/DefaultText'
import { useSelector } from 'react-redux'
import { CATEGORIES } from '../data/dummy-data'
import MealList from '../components/Mealist'

// create a component
const CategoryMealsScreen = (props) => {

    const catId = props.navigation.getParam('categoryId')
    //const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    )

    if (displayedMeals.length === 0) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DefaultText>
                No Meals found,,check your Filters
            </DefaultText>
        </View>
    }

    return (
        <MealList
            listData={displayedMeals}
            navigation={props.navigation}
        />
    );
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    //console.log(navigationData)
    const catId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    return {
        headerTitle: selectedCategory.title,

    }
}

// define your styles


//make this component available to the app
export default CategoryMealsScreen;
