import { useState, useRef } from 'react';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
	OptionType,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

type ArticleParamsFormProps = {
	setArticleStyles: (styles: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setArticleStyles,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const divRef = useRef<HTMLDivElement | null>(null);
	const [formState, setFormState] = useState(defaultArticleState);

	const handleResetForm = () => {
		setFormState(defaultArticleState);
		setArticleStyles(defaultArticleState);
	};

	const handleChange = (type: keyof ArticleStateType, value: OptionType) => {
		setFormState({
			...formState,
			[type]: value,
		});
	};

	useOutsideClickClose({
		isOpen: isFormOpen,
		onChange: setIsFormOpen,
		rootRef: divRef,
	});

	const toggleForm = () => {
		setIsFormOpen((prev) => !prev);
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setArticleStyles(formState);
	};

	return (
		<>
			<ArrowButton isFormOpen={isFormOpen} toggleForm={toggleForm} />
			<div ref={divRef}>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isFormOpen,
					})}>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text
							size={31}
							weight={800}
							fontStyle='normal'
							uppercase
							family='open-sans'>
							Задайте параметры
						</Text>
						<Select
							selected={formState.fontFamilyOption}
							onChange={(selectedOption) =>
								handleChange('fontFamilyOption', selectedOption)
							}
							options={fontFamilyOptions}
							title='Шрифт'
						/>
						<RadioGroup
							selected={formState.fontSizeOption}
							name='radio'
							onChange={(selectedOption) =>
								handleChange('fontSizeOption', selectedOption)
							}
							options={fontSizeOptions}
							title='Размер шрифта'
						/>
						<Select
							selected={formState.fontColor}
							onChange={(selectedOption) =>
								handleChange('fontColor', selectedOption)
							}
							options={fontColors}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={formState.backgroundColor}
							onChange={(selectedOption) =>
								handleChange('backgroundColor', selectedOption)
							}
							options={backgroundColors}
							title='Цвет фона'
						/>
						<Select
							selected={formState.contentWidth}
							onChange={(selectedOption) =>
								handleChange('contentWidth', selectedOption)
							}
							options={contentWidthArr}
							title='Ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={handleResetForm} />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
