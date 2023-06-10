/* eslint-disable indent */
/* eslint-disable operator-linebreak */
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line fsd-react/layer-imports
import '@/app/styles/index.scss';
import { loginReducer } from '@/features/AuthByUsername/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';
import { articleDetailsReducer } from '@/entities/Article/testing';
import { scrollRecoveryReducer } from '@/features/ScrollRecovery/testing';
import { articlesPageReducer } from '@/pages/ArticlesPage/testing';
import { addCommentFormReducer } from '@/features/AddCommentForm/testing';
import { userReducer } from '@/entities/User/testing';
import { counterReducer } from '@/entities/Counter/testing';
import { articleDetailsCommentsReducer } from '@/pages/ArticleDetailsPage/testing';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
// eslint-disable-next-line import/order
import { ReducersMapObject } from '@reduxjs/toolkit';

const defaultAsyncReducers: ReducersList = {
	login: loginReducer,
	profile: profileReducer,
	articleDetails: articleDetailsReducer,
	articleDetailsComments: articleDetailsCommentsReducer,
	scrollRecovery: scrollRecoveryReducer,
	articlesPage: articlesPageReducer,
	addCommentForm: addCommentFormReducer,
	user: userReducer,
	counter: counterReducer,
};

export const StoreDecorator =
	(state: DeepPartial<StateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>) => (Story: Story) =>
		(
			<StoreProvider initialState={state} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
				<Story />
			</StoreProvider>
		);
