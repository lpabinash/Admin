import React, { Component } from 'react'
import classes from './Prod.module.css'
import {withRouter, Link} from 'react-router-dom'
export class Prod extends Component {
    state = {
        Data: JSON.parse(localStorage.getItem('LocalData')).productsPage.products,
        nArr:[],
        checkedItems: []
    }
    removeProduct = (pos,e) => {
        e.preventDefault();

        const mArr = this.state.Data;
        let Storage = JSON.parse(localStorage[('LocalData')]);

        mArr.splice(pos, 1);

        Storage.productsPage.products = mArr;
        localStorage.setItem('LocalData', JSON.stringify(Storage));
        this.setState({Data: mArr});
    }
    // selected=(pos,e)=>{
    //     // e.preventDefault();
    //     if (this.state.nArr.indexOf(pos)<0){
    //         this.state.nArr.push(pos);
    //         console.log(this.state.nArr)
    //         console.log(pos)
    
    //     }
    //     if(this.state.nArr.indexOf(pos)>=0){
    //         this.state.nArr.splice(pos,1)
    //     }
       

    // }
    onChecked = (pos,e) => {
        if (e.target.checked) {
            this.state.checkedItems.push(pos);
            e.target.style.backgroundColor = '#f5a623';
        }
        else {
            e.target.style.backgroundColor = '#394e64';
            const index = this.state.checkedItems.indexOf(pos);
            if (index !== -1) this.state.checkedItems.splice(index, 1);
        }

        this.setState({checkedItems: this.state.checkedItems});

    }
    removeMultipleElements = () => {

        let Storage = JSON.parse(localStorage[('LocalData')]);
         const indexSet = new Set(this.state.checkedItems);        
        const arrayWithValuesRemoved = this.state.Data.filter((item, i) => !indexSet.has(i));
        
        Storage.productsPage.products = arrayWithValuesRemoved;
        localStorage.setItem('LocalData', JSON.stringify(Storage));

        this.setState({Data: arrayWithValuesRemoved, checkedItems: []});
        
        this.uncheckAllItems();
    }
    uncheckAllItems = () => {
        
        [...document.querySelectorAll('input[type=checkbox]')].map(item=> {
            if (item.checked) {
                item.checked = false;
                item.style.backgroundColor = '#394e64';
             }
         });

    }
    // onclick=()=>{
    //     this.props.history.push('/EditItem');
    // }
    
 

    render() {
        console.log(this.state.Data)
        const renderingData = this.state.Data.map((item,pos) => {
            return (
                <tr key={pos+1} className={classes.mainRow}>
                <Link to="/EditItem" className={classes.underline} >
                    <td >
                        <label >
                            <input className={classes.input} type="checkbox" onClick={(e)=>this.selected(pos,e)} />
                        </label>
                    </td>
                    <td className={classes.productname} style={{textDecoration:'none'}}>{item.name}</td>
                    <td className={classes.productsold}>{item.unitSold}</td>
                    <td className={classes.productstock}>{item.stock}</td>
                    <td className={classes.productexpire}>{item.expireDate}</td>
                    <td className={classes.deleteIcon}>
                        <a href='/' onClick={(e)=>this.removeProduct(pos,e)} >
                            <i className="far fa-trash-alt"></i>
                        </a>
                    </td>
                </Link>
                </tr>
            )
        });
        return (
            <div className={classes.product}>
                <div className={classes.productwrapper}>
                    <div className={classes.producttable}>
                        <div style={{padding: '0 1px'}}>
                            <table className={classes.table}>
                                <tbody>
                                    <tr>
                                        <th style={{width: '20px'}}></th>
                                        <th>PRODUCT NAME</th>
                                        <th>UNIT SOLD</th>
                                        <th>IN STOCK</th>
                                        <th>EXPIRE DATE</th>
                                        <th style={{width: '20px'}}></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            <table className={[classes.table,classes.datatable].join(' ')}>
                            <tbody>        
                                {renderingData}
                            </tbody>
                            </table>
                    </div>
                    <div className={classes.btnWrapper}>
                    {/* <button  className={classes.btn}>
                        Add new product
                    </button> */}
                    <Link to="/Addproduct" className={classes.btn}>Add new product</Link>
                    <button onClick={this.removeMultipleElements} className={classes.btn}>
                        Delete Selected product
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Prod
