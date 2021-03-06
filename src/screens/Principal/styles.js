import styled from 'styled-components/native'
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons'
import theme from '../../global/styles/theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    dateTimePickerText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.medium,
        fontSize: 24,
    
      },
      DateTimePickerButton: {
        alignSelf: 'flex-start',
        marginLeft: 22,
        marginTop: 8,
        alignItems: 'center',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        left: -12
    
      }
    
})

export const Background = styled.View`
    flex: 1;
    background-color: ${ ({ theme }) => theme.colors.background };
    padding-top: ${getStatusBarHeight()}px;
`

export const Header = styled.View`
    width: 100%;
    padding: 10px 20px;
    background-color: ${ ({ theme }) => theme.colors.background };
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`
export const Title = styled.Text`
    color: ${({theme}) =>  theme.colors.light};
    font-size: 24px;
    font-family: ${({theme}) =>  theme.fonts.title};
`


export const Content = styled.View`
    flex: 1;
    padding: 20px;
`

export const Lister = styled.FlatList.attrs({
})`
    margin-bottom: 40px;
    width: 100%;
`

export const Footer = styled.View`
    width: 100%;
    height: 14%;
    bottom: 40px;
`
    
export const WrapperFooter = styled.View`
    width: 100%;
    align-items: center;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const ContainerSwitcher = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    padding-horizontal: 20px;
`

export const Input = styled.TextInput.attrs({
    placeholderTextColor:theme.colors.primary_light,
    autoCapitalize:'sentences',
    autoCorrect:false
})`
    background-color:  ${ ({ theme }) => theme.colors.shape };
    border-radius: 10px;
    width: 70%;
    height: 55px;
    padding: 12px;
    border: 2.4px solid ${ ({ theme }) => theme.colors.light };
    margin-left: 20px;
    color: ${({ theme }) => theme.colors.primary };
    font-size: 16px;
    font-family: ${({ theme }) => theme.fonts.regular };
`

export const Icon = styled(Ionicons).attrs({
    color: theme.colors.primary,
    name: "send",
    size:24

})``

export const Close = styled(AntDesign).attrs({
    color: theme.colors.primary,
    name: "closecircle",
    size:24

})``

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    width: 60px;
    height: 60px;
    border-radius: 15px;
    background-color:  ${ ({ theme }) => theme.colors.light };
    align-items: center;
    justify-content: center;
    margin-right: 24px;

`
export const ButtonRect = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    width: 120px;
    padding: 14px;
    border-radius: 5px;
    align-items: center;
    justify-content: center;

`

export const ButtonSwitch = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    width: 46px;
    height: 46px;
    margin-right: 6px;
    border-radius: 15px;
    background-color:  ${ ({ theme }) => theme.colors.light };
    align-items: center;
    justify-content: center;

`

export const Legend = styled.Text`
    color: ${({theme}) =>  theme.colors.light};
    font-size: 14px;
    font-family: ${({theme}) =>  theme.fonts.semiBold};
`

export const LegendDestaque = styled.Text`
    color: ${({theme}) =>  theme.colors.background_reverse};
    font-size: 14px;
    font-family: ${({theme}) =>  theme.fonts.semiBold};
`

export const LegendLight = styled.Text`
    color: ${({theme}) =>  theme.colors.shape};
    font-size: 14px;
    font-family: ${({theme}) =>  theme.fonts.semiBold};
`

export const LegendDark = styled.Text`
    color: ${({theme}) =>  theme.colors.primary};
    font-size: 14px;
    font-family: ${({theme}) =>  theme.fonts.semiBold};
`

export const LegendReverse = styled.Text`
    color: ${({theme}) =>  theme.colors.secondary};
    font-size: 14px;
    font-family: ${({theme}) =>  theme.fonts.semiBold};
`

export const SwipeModal = styled(AntDesign ).attrs({
    color: theme.colors.primary,
    name: "switcher",
    size:20

})`
    align-self: center;
`


export const Plus = styled(Feather).attrs({
    color: theme.colors.primary,
    name: "plus",
    size:24

})``


