import React, { useState } from "react";
import theme from "../../global/styles/theme.js";
import {
    Container,
    Title,
    Wrapper,
    Check,
    Button,
    Delete,
    Uncheck,
    Line
} from './styles.js'

export default function Item({item, list ,toggleCheck, removeItem}){

    return(
        <Container>
            <Title>
                { item.name }
            </Title>
            {
                item.hasCheck &&
                    <Line />
            }
            <Wrapper>
                {
                    item.hasCheck ?
                        <Button
                            style={{
                                backgroundColor: theme.colors.success
                            }}
                            onPress={() => toggleCheck(item.key, list)}
                        >
                            <Check />
                        </Button>
                    :

                        <Button
                            style={{
                                backgroundColor: theme.colors.attention
                            }}
                            onPress={() => toggleCheck(item.key, list)}
                        >
                            <Uncheck />
                        </Button>
                }                


                <Button
                    style={{
                        backgroundColor: theme.colors.shape
                    }}
                    onPress={() => removeItem(item.key, list)}
                >
                    <Delete />
                </Button>
                
            </Wrapper>
        </Container>
    )
}