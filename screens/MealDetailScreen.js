//import liraries
import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import HeaderButton from '../components/HeaderButton'
import Icon from 'react-native-vector-icons/Ionicons';
import DefaultText from '../components/DefaultText'
import { toogleFavorite } from '../store/actions/meals'

const ListItem = props => {
    return <View style={{ ...styles.listItem, ...props.style }}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}

// create a component
const MealsDetailScreen = (props) => {

    const availableMeals = useSelector(state => state.meals.meals)

    const mealId = props.navigation.getParam('mealId')
    const currentMealIsFavorite = useSelector(state =>
        state.meals.favoriteMeals.some(meal => meal.id === mealId))

   // const mealId = props.navigation.getParam('mealId')
    const selectedMeal = availableMeals.find(meal => meal.id === mealId)

    const dispatch = useDispatch();

    const toogleFavoriteHandler = useCallback(() => {
        dispatch(toogleFavorite(mealId))
    }, [dispatch, mealId])

    useEffect(() => {
        props.navigation.setParams({
            toggleFav: toogleFavoriteHandler
        })
    }, [toogleFavoriteHandler])

    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite })
    }, [currentMealIsFavorite])


    return (
        <ScrollView>
            <View style={{ margin: 5 }}>
                <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.details}>
                <DefaultText styley={{ fontFamily: 'OpenSans-Regular' }}>
                    {selectedMeal.duration}
                </DefaultText>
                <Text>
                    {selectedMeal.complexity.toUpperCase()}
                </Text>
                <DefaultText>
                    {selectedMeal.affordability}
                </DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(x =>
                <ListItem style={{ borderColor: 'tomato', borderWidth: 0 }} key={x} >{x}</ListItem>)}

            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(x =>
                <ListItem key={x} >{x}</ListItem>)}
        </ScrollView>
    );
};

MealsDetailScreen.navigationOptions = (navigationData) => {
    // const mealId = navigationData.navigation.getParam('mealId')
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    // const selectedMeal = MEALS.find(meal => meal.id === mealId)
    const toggleFavorite = navigationData.navigation.getParam('toggleFav')
    const isFavorite = navigationData.navigation.getParam('isFav')

    return {
        headerTitle: mealTitle,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item
                title='Favorite'
                iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                onPress={toggleFavorite}
            />
        </HeaderButtons>
    }
}

// define your styles
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'grey',
        padding: 3
    }
});

//make this component available to the app
export default MealsDetailScreen;
