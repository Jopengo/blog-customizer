import { useState, CSSProperties } from 'react';
import clsx from 'clsx';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from 'src/constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

type ArticleStyle = typeof defaultArticleState;

export const App = () => {
	const [articleStyles, setArticleStyles] =
		useState<ArticleStyle>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleStyles={setArticleStyles} />
			<Article />
		</div>
	);
};
