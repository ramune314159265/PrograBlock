import { HiCommandLine, HiInformationCircle, HiOutlineCommandLine, HiOutlineInformationCircle, HiOutlinePaintBrush, HiPaintBrush } from 'react-icons/hi2'
import { appInfo } from './appInfo'

export const settingItems = {
	'theme_color': {
		id: 'theme_color',
		type: 'color',
		name: 'テーマカラー',
		description: 'アプリ全体に使われる基本色を指定できます',
		defaultValue: '#ffffff',
		requireRestart: false
	},
	'theme_mode': {
		id: 'theme_mode',
		type: 'select',
		name: 'テーマモード',
		description: 'ライトモードかダークモードか指定できます',
		options: {
			'light': 'ライト',
			'dark': 'ダーク',
			'system': 'システムに合わせる'
		},
		defaultValue: 'system',
		requireRestart: false
	},
	'command_platte.start_key': {
		id: 'command_platte.start_key',
		type: 'hotkey',
		name: 'ショートカットキー',
		description: 'コマンドパレットを起動するキーを指定できます',
		defaultValue: ['Control', '/'],
		requireRestart: false
	}
}

export const settingPageItems = {
	'appearance': {
		id: 'appearance',
		name: '外観',
		icon: HiOutlinePaintBrush,
		iconSelected: HiPaintBrush,
		hidden: false,
		items: [
			{
				type: 'group',
				name: 'テーマ',
				items: [
					settingItems.theme_mode,
					settingItems.theme_color
				]
			}
		]
	},
	'command_platte': {
		id: 'command_platte',
		name: 'コマンドパレット',
		icon: HiOutlineCommandLine,
		iconSelected: HiCommandLine,
		hidden: false,
		items: [
			{
				type: 'group',
				name: 'コマンドパレット',
				items: [
					settingItems['command_platte.start_key']
				]
			},{
				type: 'group',
				name: 'ショートカットキー',
				items: [
					{
						type: 'custom_command_platte_shortcut_keys'
					}
				]
			}
		]
	},
	'about': {
		id: 'about',
		name: 'アプリについて',
		icon: HiOutlineInformationCircle,
		iconSelected: HiInformationCircle,
		hidden: false,
		items: [
			{
				type: 'group',
				name: 'アプリについて',
				items: [
					{
						type: 'custom_app_info'
					}, {
						type: 'link',
						name: 'ソースコードを表示',
						url: appInfo.source
					}, {
						type: 'link',
						name: 'issuesを表示',
						url: appInfo.issues
					}
				]
			}, {
				type: 'group',
				name: '情報',
				items: [
					{
						type: 'custom_licenses'
					}
				]
			}
		]
	}
}

export const settingPages = [
	settingPageItems.appearance,
	settingPageItems.command_platte,
	settingPageItems.about
]
