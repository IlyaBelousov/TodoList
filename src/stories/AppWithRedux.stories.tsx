import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AppWithRedux} from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';


export default {
    title: 'TodoList/AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof AppWithRedux>;


const AppWithReduxTemplate: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux  />;


export const AppWithReduxStory = AppWithReduxTemplate.bind({});



