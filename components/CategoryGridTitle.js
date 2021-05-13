//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback } from 'react-native';

// create a component
const CategoryGridTitle = (props) => {

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }

    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }}
                onPress={props.onSelect}
            >
                <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text
                        numberOfLines={2}
                        style={{ fontFamily: 'OpenSans-Bold', textAlign: 'right' }}>{props.title}</Text>
                </View>
            </TouchableCmp>
        </View >
    );
};

// define your styles
const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 10,
        height: 100,
        borderRadius: 15,
        overflow: Platform.OS === 'android' && Platform.Version >= 21
            ? 'hidden'
            : 'visible',
        elevation: 10,
    },
    container: {
        flex: 1,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
});

//make this component available to the app
export default CategoryGridTitle;
