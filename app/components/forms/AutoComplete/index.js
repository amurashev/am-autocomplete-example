import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import { memoize, throttle } from 'lodash';

import { Input, InputDecor, Icon, List, SearchListItem } from '../../base';

import './styles.styl';

const DALAY = 600;

const componentName = 'auto-complete';

export default class AutoComplete extends React.Component {

    constructor(props){
        super(props);

        /**
         * Кешируем результат выполнения поисковых операций
         */
        this.memoizeGetFilterData = memoize(this.getFilteredData);
    }

    static defaultProps = {
        maxResultCount: 10,    //Максимальное число отображаемых данных с списке найденных
        placeHolder: '',       //Подсказка для текстового поля
        data: [],              //Массив входных данных
        value: null,           //Выбранное значение в АК
        
        onSelectItem: void 0,  //Событие выбора элемента из списка
       // onDeleteItem: void 0,  //Событие очистки выбранного значения
        onChange: void 0,      //Событие изменение текстового поля АК
        onFocus: void 0        //Событие получение фокуса текстового значения АК
    };

    state = {
        filteredData: [],       //Отфильтрованный и отсортированный массив данных
        listIsShow: false,      //Показывать ли список найденных значений
        inputText: '',          //Значерие текстового поля АК
        inputIsFocus: false,    //Сосотяние фокуса элемента
        isListDown: true,       //Положение списка (верх/низ)
        
        _listShowTemp: false    //исп для взаимодествия при вычислении высоты списка
    };

    componentWillMount(){
        this.setValue(this.props);
    }

    componentWillReceiveProps(props) {
        this.setValue(props);
    }

    componentDidMount() {
        this.addScrollListiner();
    }

    componentDidUpdate(oldProps, oldState) {
	    /**
	     * Запускаем отображение списка (handleListToggle) только в случае если сменилась переменная _listShowTemp
         */
        if(oldState._listShowTemp === false && this.state._listShowTemp === true) {
            this.handleListToggle(true);
        }
    }

	/**
     * Следим за скроллом и если список активный - вычисляем его положение
     */
    addScrollListiner() {
        this.scrollListiner = throttle(() => {
            const { listIsShow } = this.state;
            if(listIsShow) {
                this.prepareListSideCalculate();
            }
        }, 50);
        window.addEventListener("scroll", this.scrollListiner);
    }


	/**
	 * Устанавливаем уже готовое значение АК
     */
    setValue(props) {
        const { value } = props;
        
        if(value) {            
            const newInputText = this.getNormalInputValue(value);
            this.setState({
                inputText: newInputText
            });            
        }
    }

	/**
	 * Формируем строку ввода по шаблону inputTemplate
     */
    getNormalInputValue(item) {
        //const { inputTemplate, dataKey } = this.props;
		/**
         * Для примера работа с входными данными идет через ключ (value), 
         * но это для примера, в идеале надо реализовать работу с указанным ключем
         */
        return item.value;
    }
    
    
    
    
	/**
     * Подготавливаем список данных для введенного значения
     * @param value - введенное значение
     */
    handlePrepareDataList(value) {
        const { data, maxResultCount } = this.props;

        this.setState({
            filteredData: this.memoizeGetFilterData(
                value,
                data,
                maxResultCount
            )
        });
        
        this.prepareListSideCalculate();
    }

	/**
	 * Предварительно сортируем массив данных.
     * Если есть значение - фильтруем по нему
     * Затем обрезаем массив  
     */
    getFilteredData(value, data, maxResultCount) {
        var newData = [...data.sort((a,b) => ((a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0)))];

        if(value) {
            newData = this.getDataBySts(newData, value);
        }
        return newData.slice(0, maxResultCount);
    }

	/**
     * Ищем данные по строке с помощью регулярки
     */
    getDataBySts(data, str) {
        return data.filter(d => {
            return new RegExp(str, 'i').test(d.value);
        });
    }


	/**
	 * Указываем, что нужно отобразить список
     * Устанавливаем его в нижнее положение (isListDown) и активируем _listShowTemp
     */
    prepareListSideCalculate() {
        this.setState({
            isListDown: true,
            _listShowTemp: true
        });
    }

	/**
     * Включение / выключение списка
     * Включение происходит через событие componentDidUpdate при передаче переменной _listShowTemp
     * @param value
     */
    handleListToggle(value) {
        this.setState({
            listIsShow: value,
            _listShowTemp: false
        });

        if(value) {
            this.setListSide();
        }
    }

	/**
     * Вычисляем положение списка на экране и указываем в какую сторону его отриовывать
     */
    setListSide() {
        const listRect = this.refs.list.getBoundingClientRect();
        const documentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const isListDown = documentHeight > listRect.bottom;

        this.setState({
            isListDown: isListDown
        })
    }
    
    
    


	/**
	 * Событие установки фокуса на input.
     * Передаем значение фокуса в стейт (inputIsFocus)
     * Если АК активен - отображаем список найденных элементов
     */
    handleOnFocus(data){
        const { onFocus } = this.props;
        const { listIsShow, inputText } = this.state;               
        
        this.setState({ inputIsFocus: true });

		/**
		 * Загружаем новый список тоько если список не был открыт до этого момента
         */
        if(!listIsShow) {
            this.handlePrepareDataList(inputText);
        }

        if(typeof onFocus === "function") {
            onFocus(data);
        }
    }

    /**
     * Событие сброса фокуса с input.
     * Не используется во избежании ситуации когда фокус снят (будет первым событием, а значение еще не установилось)
     * Вся логика реализована в событии отключении списка handleListCancel
     */
    handleOnBlur(e){}
    

    /**
     * Событие изменения текстового поля.
     * Изменеяем значение АК
     * Отображаем список найденных элементов
     */
    onInputChange(value) {
        this.setState({
            inputText: value
        });

        this.handlePrepareDataList(value);
    }
    
    
    

    /**
     * Событие выбора значения из списка
     * Запускаем событие выбора значения
     */
    handleItemSelect(selectedItem){
        const { i } = selectedItem;
        const { filteredData } = this.state;            
        
        this.handleListToggle(false);
        
        if(filteredData && filteredData[i]) {
            const selectedValue = filteredData[i];
            this.handleChangeValueFunction(selectedValue)
        }
    }


	/**
	 * Событие закрытия списка данных 
     */
    handleListCancel(){
        const { listIsShow } = this.state;
        if(listIsShow) {
            this.setState({
                inputIsFocus: false
            });
            this.handleListToggle(false);
        }
    }

	/**
	 * Обработчик изменения значения АК.
     * Выполняем onChange
     */
    handleChangeValueFunction(value){
        const { onChange } = this.props;
        if(typeof onChange === "function") {
            onChange(value);
        }
    }
    
  

    render() {

        const { listIsShow, inputText, inputIsFocus, isListDown, filteredData } = this.state;
        const { placeHolder } = this.props;     
        

        const hasValue = !!(inputText && inputText.length);
        const hasData = !!(filteredData && filteredData.length);
        const isFocusDecor = inputIsFocus || hasValue;

	    /**
	     * Скрываем placeHolder при условии когда список отображается на отображается на вверху
         */
        const hasPlaceHolder = isListDown || !listIsShow;

        /**
         * Параметр отображения InputDecor.
         */
        const inputDecorSide = !listIsShow ? 'full' : (isListDown ? 'down' : 'up');
        
        const listElementIsShow = hasData && listIsShow;
        const notFoundBoxIsShow = !hasData && listIsShow;
        

        return (
            <div className={classNames(componentName, {
                [`${componentName}--list-down`]: isListDown,
                [`${componentName}--list-up`]: !isListDown 
            })}>
                <InputDecor 
                    isFocus={isFocusDecor}
                    isShow={hasPlaceHolder}
                    placeHolder={placeHolder}
                    side={inputDecorSide}
                >                    
                    <div className={classNames(componentName + '__inner-box')}>                        
                        <div className={classNames(componentName + '__input-box')}>
                            <Input
                                value={inputText}
                                blurWithEqualValues={true}
                                onChange={(arr) => this.onInputChange(arr)}
                                onFocus={(data) => this.handleOnFocus(data)}
                                onBlur={(data) => this.handleOnBlur(data)}
                            />                                         
                        </div>
    
                        <div className={classNames(componentName + '__icon-box')}>
                            <Icon type={isListDown ? "arrow_drop_down" : "arrow_drop_up"} />
                        </div>                        
                    </div>
                </InputDecor>               

                <div
                    className={classNames(componentName + '__items-box', {
                        [componentName + '__items-box--is-show']: listElementIsShow
                    })}
                    ref={'list'}
                >
                    <List
                        data={filteredData}
                        itemTemplate={SearchListItem}
                        itemProps={{str: inputText}}
                        onItemClick={(data) => this.handleItemSelect(data)}
                        onCancelClick={() => this.handleListCancel()}
                    />
                </div>

                {
                    notFoundBoxIsShow ? 
                         <div className={classNames(componentName + '__not-found-box')}>
                            По вашему запросу элементов не найдено
                        </div> : void 0
                }
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollListiner);
    }

}


