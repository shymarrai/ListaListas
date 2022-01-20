import styled from 'styled-components/native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import theme from '../../global/styles/theme'

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.9
})`
    width: 100%;
    padding: 10px;
    height: 50px;
    background-color: ${({theme}) =>  theme.colors.light};
    align-items: center;
    flex-direction:row;
    justify-content: space-between;
    border-radius: 6px;
    margin: 2px 0px;
`

export const Title = styled.Text`
    color: ${({theme}) =>  theme.colors.primary};
    font-size: 15px;
    font-family: ${({theme}) =>  theme.fonts.semiBold};
    

`

export const Wrapper = styled.View`
    align-self: center;
    align-items: center;
    flex-direction:row;
    justify-content: center;
`

export const TogglerUp = styled(Feather).attrs({
    color: theme.colors.primary,
    name: "arrow-up",
    size:24

})` margin-right: 14px;`

export const TogglerDown = styled(Feather).attrs({
    color: theme.colors.primary,
    name: "arrow-down",
    size:24

})` margin-right: 14px;`

export const Share = styled(Feather).attrs({
    color: theme.colors.primary,
    name: "share-2",
    size:24

})``

export const More = styled(Feather).attrs({
    color: theme.colors.primary,
    name: "more-vertical",
    size:24

})``

export const Button = styled.TouchableOpacity.attrs({
    activeOpacity: 0.9
})`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    padding: 4px;
    border-radius: 10px;
    background-color: ${({theme}) =>  theme.colors.shape};

`