import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import {
	ButtonForm,
	Toggle,
	InputWithValidation,
	Dropdown,
	AutocompleteSearchSA,
	AutocompleteSearch,
	Drawer,
	CardCollection,
	TagCollection,
	DatePicker,
	Pill,
	SnackBar,
	QuickSwitch,
	OptionDropdown,
	UserCard,
	Columnizer,
	TagText,
	gradients,
	colors,
	shadows,
} from '../../src'
// import '@atlaskit/css-reset'
import { Helmet } from 'react-helmet'
import axios from 'axios'

const Wrapper = styled.div`
	display: grid;
	position: relative;
	width: 100%;
	height: auto;
	grid-template: 160px 1fr / 240px 1fr;
	grid-template-areas: 'main-nav main-toolbar' 'context-nav context-body';
`

const Toolbar = styled.header`
	align-self: stretch;
	background: ${gradients.l_to_r};
	grid-area: main-toolbar;
`

const MainNav = styled.div`
	align-self: stretch;
	background: ${colors.primary};
	box-shadow: ${shadows.basic};
	grid-area: main-nav;
`

const ContextNav = styled.div`
	align-self: auto;
	background: ${colors.white};
	grid-area: context-nav;
`

const BodyContainer = styled.div`
	background: ${colors.bg_grey};
	height: 100%;
	width: 100%;
	padding: 24px;
	justify-content: center;
	align-items: center;
	grid-area: context-body;

	& > * {
		margin-bottom: 24px;
	}
`

const defaultStyle = `
	html {
		box-sizing: border-box;
		font-family: "Roboto", sans-serif;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0.5px;
		background: #F9F9F9;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
	}

	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	body {
		margin: 0 0;
		overscroll-behavior-y: contain;
		overscroll-behavior-x: none;
	}
`

const tags = [
	{
		key: 1,
		name: 'first',
	},
	{
		key: 2,
		name: 'second',
	},
	{
		key: 3,
		name: 'third',
	},
	{
		key: 4,
		name: 'first',
	},
	{
		key: 5,
		name: 'second',
	},
	{
		key: 6,
		name: 'third',
	},
]

const users = [
	{
		id: 1,
		name: 'User 1',
		status: 'available',
		description:
			'a few moments ago a few moments ago a few moments ago a few moments ago a few moments ago',
	},
	{
		id: 2,
		name: 'User 2',
		status: 'available',
		description: 'a few moments ago',
	},
	{
		id: 3,
		name: 'User 3',
		status: 'available',
		description: 'a few moments ago',
	},
]

const messages = [
	{
		text: 'Test notification',
	},
	{
		text: 'Another notification',
	},
]

const searchFunction = value => {
	if (value.length > 0) {
		return axios
			.get(`https://api.punkapi.com/v2/beers?beer_name=${value}`)
			.then(result => Promise.resolve(result.data))
			.catch(error => Promise.resolve(error))
	}
	return Promise.resolve([])
}

const formFields = [
	{
		fieldName: 'company',
		span: 2,
		component: (
			<AutocompleteSearch
				label={'Company'}
				placeholder={'Type to search companies'}
				onSearch={searchFunction}
			/>
		),
		defaultValue: '',
		required: true,
		validation: {
			rules: [
				{
					rule: value => value !== '',
					failureMessage: 'Field cannot be blank',
				},
			],
			prompt: 'Field is required',
		},
	},
	{
		fieldName: 'version',
		span: 2,
		component: (
			<AutocompleteSearch
				label={'Version'}
				placeholder={'Type to search versions'}
				onSearch={searchFunction}
			/>
		),
		defaultValue: '',
		required: true,
		validation: {
			rules: [
				{
					rule: value => value !== '',
					failureMessage: 'Field cannot be blank',
				},
			],
			prompt: 'Field is required',
		},
	},
	{
		fieldName: 'issue',
		span: 2,
		component: (
			<InputWithValidation
				multiline
				label={'Issue'}
				placeholder={'Type issue description'}
			/>
		),
		defaultValue: '',
		required: true,
		validation: {
			rules: [
				{
					rule: value => value !== '',
					failureMessage: 'Field cannot be blank',
				},
				{
					rule: value => value !== 'aa',
					failureMessage: 'Field cannot be "aa"',
				},
			],
			prompt:
				'Field is requiredField is requiredField is requiredField is requiredField is requiredField is requiredField is required',
		},
	},
]

const TestComponent = styled.div`
	height: 1000px;
	width: 1000px;
`

const columnizerConfig = {
	navItems: [
		{
			id: 'queue',
			name: 'queue',
		},
		{
			id: 'pending',
			name: 'pending',
		},
		{
			id: 'in_progress',
			name: 'in progress',
		},
	],
	pages: [
		{
			id: 'queue',
			component: <TestComponent />,
		},
		{
			id: 'pending',
			component: <TestComponent />,
		},
		{
			id: 'in_progress',
			component: <TestComponent />,
		},
	],
}

const filterOptions = [
	{
		id: 'name_filter',
		label: 'name',
		inputType: TagText.types.TEXT,
		prompt: 'Type name...',
		defaultValue: '',
	},
	{
		id: 'date_filter',
		label: 'date',
		inputType: TagText.types.DATE,
		prompt: 'Select date...',
		defaultValue: null,
	},
	{
		id: 'date_range_filter',
		label: 'date range',
		inputType: TagText.types.DATE_RANGE,
		prompt: 'Select date range...',
		defaultValue: { startDate: null, endDate: null },
	},
	{
		id: 'version_filter',
		label: 'version',
		inputType: TagText.types.TEXT,
		prompt: 'Type version...',
		defaultValue: '',
	},
]

const statuses = [
	{
		label: 'available',
		activeColor: colors.complete,
	},
	{
		label: 'busy',
		activeColor: colors.attention,
	},
	{
		label: 'unavailable',
		activeColor: colors.warning,
	},
]

class Demo extends Component {
	state = {
		messages: [
			{
				text: 'Test notification',
				id: 1,
				temporary: true,
			},
			{
				text: 'Another notification',
				id: 2,
				temporary: true,
			},
			{
				text: 'Another',
				id: 3,
				temporary: false,
				action: () => {
					console.log('retrying...')
				},
				actionLabel: 'retry',
			},
		],
		dateValue: {
			startDate: null,
			endDate: null,
		},
	}

	handleRemove = index => {
		this.setState(prevState => ({
			messages: prevState.messages.filter(item => item.id !== index),
		}))
	}

	render() {
		const { dateValue } = this.state
		return (
			<Fragment>
				<Helmet>
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
						rel="stylesheet"
					/>
					<link
						href="https://fonts.googleapis.com/css?family=Roboto:400,700"
						rel="stylesheet"
					/>
					<style>{defaultStyle}</style>
				</Helmet>
				<Wrapper>
					<MainNav />
					<Toolbar />
					<ContextNav />
					<BodyContainer>
						<ButtonForm
							buttonLabel="report issue"
							formName="test"
							formFields={formFields}
						/>
						<QuickSwitch
							label="change status"
							options={statuses}
							theme="default"
							prompt="I'm currently..."
						/>
						<Drawer
							label={'Tech Status'}
							centeredHeader
							collectionComponent={<CardCollection users={users} />}
						/>
						<TagText options={filterOptions} defaultLabel={'select filter'} />
						<Columnizer
							navItems={columnizerConfig.navItems}
							pages={columnizerConfig.pages}
						/>
						<SnackBar
							messages={this.state.messages}
							removeMessage={this.handleRemove}
						/>
					</BodyContainer>
				</Wrapper>
			</Fragment>
		)
	}
}

render(<Demo />, document.querySelector('#demo'))
