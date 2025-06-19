import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useState, useRef } from 'react';
import { Select } from 'src/ui/select/Select';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyClasses, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator/Separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useCloseOnOutsideClickOrEsc } from 'src/hooks/useCloseOnOutsideClickOrEsc';

type ArticleParamsFormProps = {
	onStyleChange: (styles: typeof defaultArticleState) => void;
	currentStyles: typeof defaultArticleState;
}

export const ArticleParamsForm = ({ currentStyles, onStyleChange }: ArticleParamsFormProps) => {
	const [isOpenForm, setIsOpenForm] = useState(false);
	const [formState, setFormState] = useState(currentStyles);
	const asideRef = useRef <HTMLDivElement>(null)

	useCloseOnOutsideClickOrEsc(asideRef, isOpenForm, () => setIsOpenForm(false))

	const handleApply = (e:React.FormEvent) => {
		e.preventDefault();
		onStyleChange(formState);
		setIsOpenForm(false);
	}

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onStyleChange(defaultArticleState);
	}

	const updateFormState = (field: keyof typeof defaultArticleState, value: OptionType) => {
		setFormState(prev => ({...prev, [field]: value }))
	}

	return (
		<>
			<ArrowButton isOpen={isOpenForm} onClick={() => {setIsOpenForm(!isOpenForm)}} />
			{isOpenForm && (
				<aside ref={asideRef} className={`${styles.container} ${isOpenForm ? styles.container_open : ''}`}>
					<form className={styles.form} onSubmit={handleApply} onReset={handleReset}>
						<Text as='h2' size={31} weight={800} uppercase dynamicLite>Задайте параметры</Text>
						<Select title="шрифт" 
						options={fontFamilyOptions} 
						selected={formState.fontFamilyOption} 
						onChange={(selected) => updateFormState('fontFamilyOption', selected)}/>
						<RadioGroup 
						name="размер шрифта" 
						title="размер шрифта" 
						options={fontSizeOptions} 
						selected={formState.fontSizeOption} 
						onChange={(selected) => updateFormState('fontSizeOption', selected)}/>
						<Select 
						title="цвет шрифта" 
						options={fontColors} 
						selected={formState.fontColor}  
						onChange={(selected) => updateFormState('fontColor', selected)}/>
						<Separator/>
						<Select 
						title="цвет фона" 
						options={backgroundColors} 
						selected={formState.backgroundColor}
						onChange={(selected) => updateFormState('backgroundColor', selected)}/>
						<Select 
						title="ширина контента" 
						options={contentWidthArr} 
						selected={formState.contentWidth}
						onChange={(selected) => updateFormState('contentWidth', selected)}/>
						<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};