//import liraries
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import Colors from '../Constants/Colors'
import { useDispatch } from 'react-redux'
import { setFilters } from '../store/actions/meals'

const FilterSwitch = props => {
    return <View style={styles.filterContainer}>
        <Text>
            {props.label}
        </Text>
        <Switch
            trackColor={{ true: Colors.primaryColor }}
            thumbColor={Platform.OS === 'android' ? Colors.accentColor : ''}
            value={props.state}
            onValueChange={props.onChange}
        />
    </View>
}

const FilterScreen = (props) => {

    const { navigation } = props;

    const [isGluteenFree, setIsGluteenFree] = useState(false)
    const [isLactoseFree, setLactoseFree] = useState(false)
    const [isVegan, setVegan] = useState(false)
    const [isVegetarian, setVegetarian] = useState(false)

    const dispatch = useDispatch();

    // Now to make sure that save filters only updates when our state changes, we can import the use callback
    // hook from React, another hook built into React
    // and this allows us to wrap a function so that this function is actually cached by React and is only
    // recreated if its dependencies changed.
    // We wrap this around our save filters functions, just like this, so we pass this function as an argument
    // to use callback and use callback

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGluteenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegeterian: isVegetarian
        }
        console.log(appliedFilters)
        dispatch(setFilters(appliedFilters))
    }, [isGluteenFree, isLactoseFree, isVegan, isVegetarian])

    useEffect(() => {
        navigation.setParams({ save: saveFilters }) // just point the saveFilters fn and execute, if have to execute immediately then add saveFilters()
    }, [saveFilters])

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Restrictions</Text>
            <FilterSwitch
                label='Gluten-free'
                state={isGluteenFree}
                onChange={newValue => setIsGluteenFree(newValue)}
            />
            <FilterSwitch
                label='Lactose-free'
                state={isLactoseFree}
                onChange={newValue => setLactoseFree(newValue)}
            />
            <FilterSwitch
                label='Vegan'
                state={isVegan}
                onChange={newValue => setVegan(newValue)}
            />
            <FilterSwitch
                label='Vegetarian'
                state={isVegetarian}
                onChange={newValue => setVegetarian(newValue)}
            />
        </View>
    );
};

FilterScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filter Meals',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer()
            }} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='save' iconName='ios-save' onPress={
                navData.navigation.getParam('save')
            } />
        </HeaderButtons>,
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
}

// define your styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        margin: 10,
        textAlign: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 20
    }
});

//make this component available to the app
export default FilterScreen;
