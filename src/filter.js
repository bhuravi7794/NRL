import { useState } from 'react';
import DropDown from './dropdown';
function Filter() {
    const prevDropdownValue = [{ value: "if something than something", label: "if something than something", firstoperator: "if", secondoperator: "than" },
    { value: "Set to Something", label: "Set to Something", firstoperator: "Set to", secondoperator: "" }]

    const firstDropdownValue = [{ value: "Something is equal to something", label: "Something is equal to something", operator: "is equal to" },
    { value: "Something is not equal to something", label: "Something is not equal to something", operator: "is not equal to" },
    { value: "Something is greater then something", label: "Something is greater then something", operator: "is greater then" },
    { value: "Something is less then something", label: "Something is less then something", operator: "is less then " }]
    const firstdata = { id: Math.random(), firstfieldValue: "", firstoperator: "", secondoperator: "", setValue: { setdropdownvalue: "", settextValue: "" }, ifThanValue: { ifValue: {}, thanValue: {} } }
    const matchingData = [{ value: "Currency", label: "Currency" },
    { value: "Effecttive Date", label: "Effecttive Date" },
    { value: "Fixed Date", label: "Fixed Date" },
    { value: "National", label: "National" }]

    const secondmatchingData = [{ value: "text", label: "A Field" },
    { value: "date", label: "A Date" },
    { value: "email", label: "Email" },
    { value: "text", label: "Time" }]

    const [ruleData, setRuleData] = useState([]);
    const addNewRule = () => {
        let Count = ruleData.length;
        const newData = [...ruleData, firstdata]
        setRuleData(newData);
    }
    const updatedataforFilter = (eve, data, fieldName) => {
        const data1 = ruleData.find((item) => data.id === item.id);
        if (fieldName === "previous Main") {
            data1.firstfieldValue = eve.label;
            data1.firstoperator = eve.firstoperator;
            data1.secondoperator = eve.secondoperator;
        }
        const newData = ruleData.filter((item) => data.id !== item.id);
        setRuleData([...newData, data1]);
    }
    const updateSetValue = (eve, data, fieldName,parentData) => {
        let data1,newData;
        if(parentData){
            data1 = ruleData.find((item) => Number(parentData.id) === Number(item.id));
            newData = ruleData.filter((item) => Number(parentData.id) !== Number(item.id));
            data1.ifThanValue.thanValue.setValue.setdropdownvalue= eve.value
           
        }else {
            data1 = ruleData.find((item) => Number(data.id) === Number(item.id));
            newData = ruleData.filter((item) => Number(data.id) !== Number(item.id));
            data1.setValue.setdropdownvalue = eve.value;
        }
        setRuleData([...newData,data1]);
    }
    const updatechoiceforFilter = (eve, data, fieldName,parentData) => {
        let data1,newData;
        if(parentData){
            data1 = ruleData.find((item) => Number(parentData.id) === Number(item.id));
            newData = ruleData.filter((item) => Number(parentData.id) !== Number(item.id));
            const field =data1.ifThanValue.thanValue.ifThanValue.ifValue;
            if (Object.entries(field).length) {
                const length = field.conditionData.length - 1;
                if (fieldName === "Someting Main1") {
                    field.conditionData[length].firstValue = eve.value;
                } else {
                    field.conditionData[length].secondValue.seconddropValue = eve.value;
                }
            } else {
                data1.ifThanValue.thanValue.ifThanValue.ifValue = {
                    id: Math.random(), previousMainValue: eve.value, previousMainOperator: eve.operator, conditionData: [{ nextOperator: "", firstValue: "", secondValue: { seconddropValue: "", secondTextValue: "" } }]
                }
            }
        }else {
            data1 = ruleData.find((item) => Number(data.id) === Number(item.id));
            newData = ruleData.filter((item) => Number(data.id) !== Number(item.id));
            const field =data1.ifThanValue.ifValue;
            if (Object.entries(field).length) {
                const length = field.conditionData.length - 1;
                if (fieldName === "Someting Main1") {
                    field.conditionData[length].firstValue = eve.value;
                } else {
                    field.conditionData[length].secondValue.seconddropValue = eve.value;
                }
            } else {
                data1.ifThanValue.ifValue = {
                    id: Math.random(), previousMainValue: eve.value, previousMainOperator: eve.operator, conditionData: [{ nextOperator: "", firstValue: "", secondValue: { seconddropValue: "", secondTextValue: "" } }]
                }
            }
        }
        setRuleData([...newData,data1]);
    }
    const updatechoice2forFilter = (eve, data, fieldName) => {
        const data1 = ruleData.find((item) => data.id === item.id);
        const defaultData = firstdata
        defaultData.firstfieldValue = eve.label;
        defaultData.firstoperator = eve.firstoperator;
        defaultData.secondoperator = eve.secondoperator;
        data1.ifThanValue.thanValue = defaultData;
        const newData = ruleData.filter((item) => data.id !== item.id);
        setRuleData([...newData, data1]);
    }
    const addAndOperator = (ele) => {
        const id = ele.target.id.split("-");
        const data1 = ruleData.find((item) => Number(id[0]) === Number(item.id));
        if(id.length > 1){
            const length = data1.ifThanValue.thanValue.ifThanValue.ifValue.conditionData.length - 1;
            data1.ifThanValue.thanValue.ifThanValue.ifValue.conditionData[length].nextOperator = "and";
            data1.ifThanValue.thanValue.ifThanValue.ifValue.conditionData = [...data1.ifThanValue.thanValue.ifThanValue.ifValue.conditionData, { nextOperator: "", firstValue: "", secondValue: { seconddropValue: "", secondTextValue: "" } }]
        }else{
            const length = data1.ifThanValue.ifValue.conditionData.length - 1;
            data1.ifThanValue.ifValue.conditionData[length].nextOperator = "and";
            data1.ifThanValue.ifValue.conditionData = [...data1.ifThanValue.ifValue.conditionData, { nextOperator: "", firstValue: "", secondValue: { seconddropValue: "", secondTextValue: "" } }]   
        
        }
        const newData = ruleData.filter((item) => Number(id[0]) !== Number(item.id));
        setRuleData([...newData, data1]);
    }
    const addOrOperator = (ele) => {
        const id = ele.target.id.split("-");
        const data1 = ruleData.find((item) => Number(id[0]) === Number(item.id));
        if(id.length>1){
            const length = data1.ifThanValue.thanValue.ifThanValue.ifValue.conditionData.length - 1;
            data1.ifThanValue.thanValue.ifThanValue.ifValue.conditionData[length].nextOperator = "or";
            data1.ifThanValue.thanValue.ifThanValue.ifValue.conditionData = [...data1.ifThanValue.thanValue.ifThanValue.ifValue.conditionData, { nextOperator: "", firstValue: "", secondValue: { seconddropValue: "", secondTextValue: "" } }]
        }else{
            const length = data1.ifThanValue.ifValue.conditionData.length - 1;
            data1.ifThanValue.ifValue.conditionData[length].nextOperator = "or";
            data1.ifThanValue.ifValue.conditionData = [...data1.ifThanValue.ifValue.conditionData, { nextOperator: "", firstValue: "", secondValue: { seconddropValue: "", secondTextValue: "" } }]   
        
        }
        const newData = ruleData.filter((item) => Number(id[0]) !== Number(item.id));
        setRuleData([...newData, data1]);
    }
    const getchoiceSelectedValue = (item) => {
        return item.ifThanValue.ifValue.conditionData && item.ifThanValue.ifValue.conditionData.map((ele, index) => {
            return <div>
                {ele.firstValue ? ele.firstValue : <DropDown key={"if" + item.id + index} data={item} name={"Someting Main1"} dropdowndata={matchingData} update={updatechoiceforFilter}></DropDown>}
                <div>{item.ifThanValue.ifValue.previousMainOperator}</div>
                {ele.secondValue.seconddropValue ? <input id={`${item.id}-${item.ifThanValue.ifValue.id}-"Someting Main2"-${index}`} value={ele.secondValue.secondTextValue} type={ele.secondValue.seconddropValue} placeholder={ele.secondValue.seconddropValue} onChange={onTextFieldChange} />
                    :
                   <DropDown key={"ifSecond" + item.id + index} data={item} name={"Someting Main2"} dropdowndata={secondmatchingData} update={updatechoiceforFilter}></DropDown>}
                <div>
                    {ele.nextOperator ? ele.nextOperator : <div>
                        <button id={`${item.id}`} onClick={addAndOperator}>AND</button>
                        <button id={`${item.id}`} onClick={addOrOperator}>OR</button>
                    </div>}
                </div>
            </div>
        })
    }
    const getchoice2SelectedValue = (item) => {
        return item.ifThanValue.thanValue.ifThanValue.ifValue.conditionData && item.ifThanValue.thanValue.ifThanValue.ifValue.conditionData.map((ele, index) => {
            return <div>
                {ele.firstValue ? ele.firstValue : <DropDown key={"if" + item.id + index} data={item} parentData={item} name={"Someting Main1"} dropdowndata={matchingData} update={updatechoiceforFilter}></DropDown>}
                <div>{item.ifThanValue.thanValue.ifThanValue.ifValue.previousMainOperator}</div>
                {ele.secondValue.seconddropValue ? <input id={`${item.id}-${item.ifThanValue.ifValue.id}"-secodif"-"Someting Main2"-${index}`} value={ele.secondValue.secondTextValue} type={ele.secondValue.seconddropValue} placeholder={ele.secondValue.seconddropValue} onChange={onTextFieldChange} />
                    :
                   <DropDown key={"ifSecond" + item.id + index} data={item} name={"Someting Main2"} parentData= {item} dropdowndata={secondmatchingData} update={updatechoiceforFilter}></DropDown>}
                <div>
                    {ele.nextOperator ? ele.nextOperator : <div>
                        <button id={`${item.id}-${item.ifThanValue.ifValue.id}-"second"`} onClick={addAndOperator}>AND</button>
                        <button id={`${item.id}-${item.ifThanValue.ifValue.id}-"second"`} onClick={addOrOperator}>OR</button>
                    </div>}
                </div>
            </div>
        })
    }
    const getifselectedvalue = (item) => {
        return <div> {Object.entries(item.ifThanValue.ifValue).length ? getchoiceSelectedValue(item)
            : <DropDown key={"if" + item.id} data={item} name={"Someting Main1"} dropdowndata={firstDropdownValue} update={updatechoiceforFilter}></DropDown>}
            <div>{item.secondoperator}</div>
            {Object.entries(item.ifThanValue.thanValue).length ? 
                getif2selectedvalue(item.ifThanValue.thanValue,item)
            :<DropDown key={"than" + item.id} data={item} name={"Someting Main2"} dropdowndata={prevDropdownValue} update={updatechoice2forFilter}></DropDown>
            }
            </div>
    }
    const getif2selectedvalue = (item,parentData) => {
        return <div>
            {item.firstoperator ? <div>{item.firstoperator}</div>:""}
            {!(item.firstoperator && item.secondoperator) ? getset2selectedvalue(item, item.id,parentData): ""}
            {Object.entries(item.ifThanValue.ifValue).length ? getchoice2SelectedValue(parentData)
            : item.firstoperator && item.secondoperator ? <DropDown key={"if" + item.id} data={item} name={"Someting Main1"} parentData={parentData} dropdowndata={firstDropdownValue} update={updatechoiceforFilter}></DropDown>:""}
            <div>{item.secondoperator}</div>
            {Object.entries(item.ifThanValue.thanValue).length ? 
                getifselectedvalue(item.ifThanValue.thanValue)
            : item.firstoperator && item.secondoperator ? <DropDown key={"than" + item.id} data={item} name={"Someting Main2"} parentData={parentData} dropdowndata={prevDropdownValue} update={updatechoice2forFilter}></DropDown>
            :""}
            </div>
    }
    const onTextFieldChange = (event) => {
        console.log(event);
        const id = event.target.id.split("-");
        const data1 = ruleData.find((item) => Number(id[0]) === Number(item.id));
        const newData = ruleData.filter((item) => Number(id[0]) !== Number(item.id));
        if(id.includes("setFieldText")){
            if(id.length === 3){
            data1.ifThanValue.thanValue.setValue.settextValue = event.target.value;
            }
            else {
                data1.setValue.settextValue = event.target.value;
            }
        } else {
        if (id.length === 3) {
            data1.ifThanValue.ifValue.conditionData[id[id.length - 1]].secondValue.secondTextValue = event.target.value;
        }
        else if (id.length === 4) {
            data1.ifThanValue.thanValue.ifValue.conditionData[id[id.length - 1]].secondValue.secondTextValue = event.target.value;
        }
    }
        
        setRuleData([...newData, data1]);
    }
    const getset2selectedvalue = (item, id, parentData) => {
        return item.setValue.setdropdownvalue ? <input id={`${id}-${item.id}-setFieldText`} value={item.setValue.settextValue} type={item.setValue.setdropdownvalue} placeholder={item.setValue.setdropdownvalue} onChange={onTextFieldChange} />
            : <DropDown key={"set" + id} data={item} name={"setTo Main"} parentData={parentData} dropdowndata={secondmatchingData} update={updateSetValue}></DropDown>
    }
    const getsetselectedvalue = (item, id) => {
        return item.setValue.setdropdownvalue ? <input id={`${id}-setFieldText`} value={item.setValue.settextValue} type={item.setValue.setdropdownvalue} placeholder={item.setValue.setdropdownvalue} onChange={onTextFieldChange} />
            : <DropDown key={"set" + id} data={item} name={"setTo Main"} dropdowndata={secondmatchingData} update={updateSetValue}></DropDown>
    }
    const rules = ruleData && ruleData.map((item, index) => {
        return !item.firstfieldValue ?
            <DropDown key={"previous" + item.id} data={item} name={"previous Main"} dropdowndata={prevDropdownValue} update={updatedataforFilter}></DropDown>
            : <div>
                <div>{item.firstoperator}</div>
                {item.firstoperator && item.secondoperator ? getifselectedvalue(item)
                    : getsetselectedvalue(item, item.id)}
            </div>

    })
    return (
        <div>
            <div className="filter">
                <div className="filterText"> Filter Rule</div>
                <div className="filterButton"> <button onClick={addNewRule}>Add Rulte</button></div>
            </div>
            <div>
                {rules}
            </div>
        </div>
    );
}

export default Filter;
