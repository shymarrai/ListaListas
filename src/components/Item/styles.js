import styled from 'styled-components/native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import theme from '../../global/styles/theme'

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.9
})`
    width: 95%;
    padding: 4px;
    height: 40px;
    margin: 2px 0px;
    background-color: ${({theme}) =>  theme.colors.background_reverse}; /* primary background_reverse */
    padding-left: 10px;
    align-items: center;
    align-self: center;
    flex-direction:row;
    justify-content: space-between;
    border-radius: 5px;
`

export const Title = styled.Text`
    color: ${({theme}) =>  theme.colors.secondary}; /* light primary */
    font-size: 15px;
    font-family: ${({theme}) =>  theme.fonts.medium};
    width: 68%;
    overflow: hidden;
`

export const Line = styled.View`
    height: 2px;
    border-radius: 2px;
    width: 68%;
    background-color: ${({theme}) =>  theme.colors.secondary}; /* light primary */
    position: absolute;
    left: 6px;
`

export const Wrapper = styled.View`
    align-self: center;
    align-items: center;
    flex-direction:row;
    justify-content: center;
`

export const Uncheck = styled(Feather).attrs({
    color: theme.colors.shape,
    name: "check-square",
    size:18

})``

export const Check = styled(Feather).attrs({
    color: theme.colors.shape,
    name: "x-square",
    size:18

})``

export const Delete = styled(Feather).attrs({
    color: theme.colors.shape,
    name: "trash",
    size:18

})``

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.9
})`
    width: 30px;
    height: 30px;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    padding: 4px;
    border-radius: 6px;

`