import Colors from '@/constants/Colors';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import { StyleSheet, Platform } from 'react-native';

export interface SelectProps extends PickerSelectProps {

}

function Select(props: SelectProps) {
    return (
        <RNPickerSelect
            style={{
                inputIOS: styles.inputIOS,
                inputAndroid: styles.inputAndroid,
                iconContainer: styles.iconContainer
            }}
            useNativeAndroidPickerStyle={false}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    inputIOS: {
        height: 50,
        width: '100%',
        color: Colors.dark.foreground,
        backgroundColor: Colors.dark.background,
        borderColor: Colors.dark.primary,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    inputAndroid: {
        height: 50,
        width: '100%',
        color: Colors.dark.foreground,
        backgroundColor: Colors.dark.background,
        borderColor: Colors.dark.primary,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 10,
    },
    iconContainer: {
        top: Platform.OS === 'ios' ? 10 : 15,
        right: 12,
        backgroundColor: 'transparent',
    },
});

export default Select