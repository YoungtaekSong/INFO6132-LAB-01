import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
    title: string;
}

const Header: React.FC<Props> = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        borderTopWidth: 1,
        borderTopColor: '#CFCFCF',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#CFCFCF'
    },
    headerText: {
        fontSize: 26,
        color: "#EB8634"
    }
});

export default Header;