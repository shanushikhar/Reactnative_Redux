//import liraries
import React, { Component } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    ImageBackground
} from 'react-native';
import DefaultText from './DefaultText'

// create a component
const MealItem = (props) => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity
                onPress={props.onSelectMeal}
            >
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground
                            source={{
                                uri: props.image
                            }}
                            style={styles.bgImage}
                        >
                            <View style={styles.titleContainer}>
                                <Text
                                    style={styles.title}>
                                    {props.title}
                                </Text>
                            </View>

                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                        <DefaultText styley={{fontFamily:'OpenSans-Regular'}}>
                            {props.duration}
                        </DefaultText>
                        <Text>
                            {props.complexity.toUpperCase()}
                        </Text>
                        <DefaultText>
                            {props.affordability}
                        </DefaultText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    mealItem: {
        height: 140,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 13,
        overflow: 'hidden',
        // marginVertical:5
        marginTop: 5
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '86%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        //height:'10%'
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        color: 'white', textAlign: 'center',
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingVertical: 3,
    }
});

//make this component available to the app
export default MealItem;
