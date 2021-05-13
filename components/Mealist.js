//import liraries
import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Mealitem from './MealItem'
import { useSelector } from 'react-redux'

// create a component
const MealList = (props) => {

    const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

    const renderMealitem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)
        return (
            <Mealitem
                title={itemData.item.title}
                onSelectMeal={() => {
                    props.navigation.navigate({
                        routeName: 'MealDetail',
                        params: {
                            mealId: itemData.item.id,
                            mealTitle: itemData.item.title,
                            isFav: isFavorite
                        }
                    })
                }}
                duration={itemData.item.duration}
                complexity={itemData.item.complexity}
                affordability={itemData.item.affordability}
                image={itemData.item.imageUrl}
            />
        )
    }

    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderMealitem}
                style={{ width: '98%', }}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//make this component available to the app
export default MealList;
