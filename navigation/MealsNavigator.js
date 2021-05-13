import React from 'react'
import { Platform, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Colors from '../Constants/Colors'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoritesScreen from '../screens/FavoriteScreen'
import Icon from 'react-native-vector-icons/Ionicons';
import FavoriteScreen from '../screens/FavoriteScreen';
import FiltersScreen from '../screens/FilterScreen'

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
    },
    headerTitleStyle: {
        fontFamily: 'OpenSans-Regular'
    },
    headerBackTitleStyle: {
        fontFamily: 'OpenSans-Regular' // work in IOS
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle:'A Title'
}

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen, // long form
        navigationOptions: {
            headerTitle: 'Meal Categoriessssss'
        }
    },

    CategoryMeals: CategoryMealsScreen, // short form

    MealDetail: MealDetailScreen
}, {
    mode: 'modal', // works perfectly in IOS
    defaultNavigationOptions: defaultStackNavOptions
})

const favNavigator = createStackNavigator({
    Favorites: FavoriteScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Icon name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel:Platform.OS === 'android' ? <Text style={{ fontFamily: 'OpenSans-Bold' }}>
                Meals
            </Text> : 'Mealss'
        }
    },
    Favorites: {
        screen: favNavigator, navigationOptions: {
            tabBarLabel: 'Fav',
            tabBarIcon: (tabInfo) => {
                return <Icon name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor
        }
    }
}
 
const MealsFavTabNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        },

    })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'OpenSans-Regular'
            }
        }
    })

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    // navigationOptions:{
    //     drawerLabel:'Fillu'
    // },
    defaultNavigationOptions: defaultStackNavOptions
})

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: "Meals"
        }
    },
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'OpenSans-Bold'
        }
    }
})

export default createAppContainer(MainNavigator)

/**
 * defaultNavigationOptions will called if nothing is set and if there is set then it will overridden by that
 *
 *  headerTitle will apply and it will have more priority i.e. if we declare it here then it will render and if we
 *      even declare in that screen Page then also it will overridden by this which is here
 *
 * Priority Level
 *  DrawerNavigation > BottomTabsNavigation > StackNavigation
 */