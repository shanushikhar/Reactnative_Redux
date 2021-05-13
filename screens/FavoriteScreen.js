//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MealList from '../components/Mealist'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import Colors from '../Constants/Colors'
import DefautText from '../components/DefaultText'
// create a component
const FavoriteScreen = (props) => {

    const favMeals = useSelector(state => state.meals.favoriteMeals)

    if (favMeals.length === 0 || !favMeals) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <DefautText>No Favorite meals found.Start adding some</DefautText>
        </View>
    }

    return (
        <MealList
            listData={favMeals}
            navigation={props.navigation}
        />
    );
};

FavoriteScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
}

//make this component available to the app
export default FavoriteScreen;
