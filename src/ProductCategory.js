import React from 'react';

import classes from './ProductCategory.module.css';

class ProductCategory extends React.Component {

    state = {
        categoryList : JSON.parse(localStorage[('LocalData')]).productsPage.categories,
        popUpIsVisible: false
    }

    popUp = React.createRef();
    categoryInput = React.createRef();

    showPopUp = () => {
        this.popUp.current.style.display = 'flex';
        this.setState({popUpIsVisible: true});
    }

    closePopUp = () => {
        this.popUp.current.style.display = 'none';
        this.setState({popUpIsVisible: false});
    }

    addNewCategory = () => {

        if ( this.categoryInput.current.value !== '') {

            let Storage = JSON.parse(localStorage[('LocalData')]);
            const updatedCategoryList = Storage.productsPage.categories;
    
            const newCategory = this.categoryInput.current.value;
            updatedCategoryList.push(newCategory);
            Storage.productsPage.categories = updatedCategoryList;
    
            localStorage.setItem('LocalData', JSON.stringify(Storage));
            this.setState({categoryList: Storage.productsPage.categories})
            this.categoryInput.current.value = '';
            this.closePopUp();

        } else alert ('Enter category name you want to add');

    }

    removeCategory = (pos,e) => {
        
        e.preventDefault();

        const mArr = this.state.categoryList;
        let Storage = JSON.parse(localStorage[('LocalData')]);

        mArr.splice(pos, 1);

        Storage.productsPage.categories = mArr;
        localStorage.setItem('LocalData', JSON.stringify(Storage));
        this.setState({categoryList: mArr});

    }

    componentDidMount() {
        document.addEventListener("keydown", (e)=>{
            if (e.keyCode === 27) {
                this.closePopUp();
              }
        }, false);

        document.addEventListener("keydown", (e)=>{
            if (e.keyCode === 13 && this.state.popUpIsVisible) {
                this.addNewCategory();
            }

        }, false);
    }

    render() {
        
        const data = JSON.parse(localStorage[('LocalData')]).productsPage.categories;
        
        const renderingData = data.map((item,pos) => {
            return (
                <tr key={pos+1}>
                    <td className="tm-product-name">{item}</td>
                    <td className={classes.cats}>
                        <a onClick={(e)=>this.removeCategory(pos,e)} href="/" className="tm-product-delete-link">
                            <i className="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                    </td>
              </tr>
            )
        });
        
        return (
            <div className={classes.category}>
                <div className={classes.subcategory}>

                    <div onClick={this.closePopUp} ref={this.overlay}></div>

                    <div ref={this.popUp} className={classes.addcategory}>

                        <label>Enter category name</label>
                        <input ref={this.categoryInput}  type="text" />
                        <div style={{display:'flex'}}>
                        <button onClick={this.addNewCategory} style={{marginRight:'10px'}} className={classes.btn}>
                            Add
                        </button>

                        <button onClick={this.closePopUp} className={classes.btn}>Close</button>
                        </div>
                    </div>

                    <h2 className="tm-block-title">Product Categories</h2>

                    <div className={classes.categorytablewrapper}>
                        <table className={classes.table}>
                            <tbody>
                                {renderingData}
                            </tbody>
                        </table>
                    </div>

                    <button onClick={this.showPopUp} className={classes.btn}>
                        Add new category
                    </button>

                </div>

            </div>
        )
    }
}

export default ProductCategory;