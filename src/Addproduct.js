import React from 'react';
// import './AddProductPage.css';
import classes from './Addproduct.module.css'

class AddProductPage extends React.Component {

    imageInput = React.createRef();
    productName = React.createRef();
    productCategory = React.createRef();
    expireDate = React.createRef();
    stockUnits = React.createRef();
    

    state = {
        productName: '',
        productCategory: '',
        expireDate: '',
        stockUnits: 0,
        details:'false'
        
    }

    onHandleElements = () => {
        const DateOptions = {day: '2-digit', month: 'long', year: 'numeric'};
        const Date = new Intl.DateTimeFormat('en-GB', DateOptions).format(this.expireDate.current.valueAsDate);

        this.setState({
            productName: this.productName.current.value,
            productCategory: this.productCategory.current.selectedOptions[0].label,
            expireDate: Date,
            stockUnits: this.stockUnits.current.value,
           
        })

    }

    onImageInput = () => {
        this.imageInput.click();
    }

    onUploadFile = (e) => {
        const fileSize = Math.round((e.target.files[0].size/1024));

        if (fileSize > 1024)  {
            alert('File size can\'t be more than 1 MB');
            return false;
        }

    }

    onAddNewProduct = () => {

        let Storage = JSON.parse(localStorage[('LocalData')]);
        const updatedProductList = Storage.productsPage.products;
        const pro=this.state

        const data = {
            category: pro.productCategory,
            expireDate: pro.expireDate,
            name: pro.productName,
            stock: pro.stockUnits,
        }

       


            if (data.category!==" " && data.expireDate!=="" && data.name!=="" && data.stock!==""){
                this.setState({details:'true'})
            }

            else {this.setState({details:'false'})}
        

        if (pro.details===false) {
            alert('Please fill in all the fields!');
            return false;
        } else {
            updatedProductList.push(data);
            Storage.productsPage.products = updatedProductList;
    
            localStorage.setItem('LocalData', JSON.stringify(Storage));
            this.props.history.push('/Product');
        }

    }

    render() {
        return (
            <div className={classes.main}>
                <div className={classes.container}>
                    <div className={classes.contentWrapper}>
                        <div className={classes.content}>
                            <div className={classes.container}>
                                <div className={classes.heading}>
                                    <h2>Add Product</h2>
                                </div>
                            </div>
                            <div className={classes.container}>
                                <div className={classes.col}>
                                    <form>
                                        <div className={classes.form}>
                                            <label for="name">Product Name</label>    
                                            <input type="text" ref={this.productName} onChange={this.onHandleElements}/>
                                        </div>
                                        <div className={classes.form}>
                                            <label for="description">Description</label>
                                            <textarea rows="3" required></textarea>
                                        </div>
                                        <div className={classes.form}>
                                            <label for="category">Category</label>    
                                            <select id="category" ref={this.productCategory} onChange={this.onHandleElements}>
                                                <option selected>Selected Category</option>
                                                <option value="1">New Arrival</option>
                                                <option value="2">Most Popular</option>
                                                <option value="3">Trending</option>
                                            </select>
                                        </div>
                                        <div className={classes.container1}>
                                            <div className={classes.form1}>
                                                <label for="expire_date">Expire Date</label>
                                                <input required ref={this.expireDate} onChange={this.onHandleElements} type="date" />
                                            </div>
                                            <div className={classes.form1}>
                                                <label for="stocks">Units in Stock</label>
                                                <input type="text" id="stock" name="stock" required ref={this.stockUnits} onChange={this.onHandleElements}/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className={classes.col}>
                                    <div className={classes.avatar}>
                                        <div className={classes.icons}>
                                            <i class="fas fa-cloud-upload-alt" onClick={this.onImageInput}></i>
                                        </div>
                                    </div>
                                    <div className={classes.btnwrap}>
                                         <input onChange={(e)=>{this.onUploadFile(e)}} accept=".jpg, .png, .bmp, .svg, .webp" ref={input => this.imageInput = input} type="file" style={{display: 'none'}} />
                                        <input type="button" className={classes.btn} defaultValue="UPLOAD PRODUCT IMAGE" onClick={this.onImageInput} /></div>
                                </div>
                                      <div className={classes.btnWrapper}>
                                    <button onClick={this.onAddNewProduct} type="submit" className={classes.btn}>ADD PRODUCT NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddProductPage;