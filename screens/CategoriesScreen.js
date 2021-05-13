//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data/dummy-data'
import Colors from '../Constants/Colors'
import CategoryGridTile from '../components/CategoryGridTitle'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'

// create a component 
const CategoriesScreen = (props) => {

    const renderGridItem = (itemData) => {
        return (
            <CategoryGridTile title={itemData.item.title}
                color={itemData.item.color}
                onSelect={() => {
                    props.navigation.navigate({
                        routeName: 'CategoryMeals',
                        params: {
                            categoryId: itemData.item.id
                        }
                    })
                }}
            />
        )
    }

    return (
        <FlatList
            numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItem}
            keyExtractor={(item, index) => item.id}
        />
    );
};

// if have to set only title thnen
// CategoriesScreen.navigationOptions = {
//     headerTitle:'xyz'
// }

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
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

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default CategoriesScreen;
