//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const DefaultItem = (props) => {
    return <Text style={{...styles.text,...props.styley}}>
        {props.children}
    </Text>
};

// define your styles
const styles = StyleSheet.create({
    text: {
        fontFamily:'OpenSans-Bold'
    },
});

//make this component available to the app
export default DefaultItem;
